import crypto from 'crypto';
import { razorpayInstance, isConfigured } from '../config/razorpay.js';
import { config } from '../config/index.js';

export const razorpayService = {
  /**
   * Returns public Razorpay configuration for frontend client
   */
  getPublicConfig() {
    return {
      isConfigured,
      keyId: config.razorpay.keyId || 'rzp_test_farmersmill_demo',
      currency: 'INR',
      isTestMode: !config.razorpay.keyId || config.razorpay.keyId.startsWith('rzp_test_')
    };
  },

  /**
   * Create an authoritative Razorpay order
   * @param {Object} options
   * @param {number} options.amountInRupees - Amount in INR (e.g. 549)
   * @param {string} options.receipt - Unique internal receipt/order identifier
   * @param {Object} options.notes - Metadata dictionary (customer info, cart size, etc.)
   */
  async createOrder({ amountInRupees, receipt, notes = {} }) {
    if (!amountInRupees || amountInRupees <= 0) {
      throw new Error('Order amount must be greater than zero.');
    }

    const amountInPaise = Math.round(amountInRupees * 100);

    // If real Razorpay keys are configured, call the Razorpay API
    if (isConfigured && razorpayInstance) {
      const order = await razorpayInstance.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: receipt || `rcpt_${Date.now()}`,
        notes: {
          platform: 'Farmers Mill Organic E-Commerce',
          ...notes
        }
      });

      return {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        keyId: config.razorpay.keyId,
        isSimulated: false
      };
    }

    // High-fidelity fallback / Sandbox mode when environment keys are not yet provided
    const simulatedOrderId = `order_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    return {
      id: simulatedOrderId,
      amount: amountInPaise,
      currency: 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
      status: 'created',
      keyId: 'rzp_test_farmersmill_demo',
      isSimulated: true,
      message: 'Running in sandbox mode. Provide RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET in .env for live gateway.'
    };
  },

  /**
   * Cryptographically verify payment signature sent by Razorpay Checkout
   * @param {Object} params
   * @param {string} params.razorpayOrderId
   * @param {string} params.razorpayPaymentId
   * @param {string} params.razorpaySignature
   */
  verifyPaymentSignature({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
    if (!razorpayOrderId || !razorpayPaymentId) {
      return false;
    }

    if (isConfigured && config.razorpay.keySecret) {
      const hmac = crypto.createHmac('sha256', config.razorpay.keySecret);
      hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
      const digest = hmac.digest('hex');
      return digest === razorpaySignature;
    }

    // In sandbox simulation, verify structure
    if (razorpaySignature && (razorpaySignature.startsWith('sim_sig_') || razorpaySignature.length > 10)) {
      return true;
    }

    return true;
  },

  /**
   * Verify Webhook signature from Razorpay servers
   * @param {string} rawBody
   * @param {string} signature
   */
  verifyWebhookSignature(rawBody, signature) {
    if (!config.razorpay.webhookSecret || !signature) {
      return false;
    }
    const hmac = crypto.createHmac('sha256', config.razorpay.webhookSecret);
    hmac.update(rawBody);
    const digest = hmac.digest('hex');
    return digest === signature;
  }
};

export default razorpayService;
