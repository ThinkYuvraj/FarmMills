import { razorpayService } from '../services/razorpayService.js';
import { pricingService } from '../services/pricingService.js';
import { orderService } from '../services/orderService.js';

export const paymentController = {
  /**
   * GET /api/payments/razorpay/config
   * Public config (Key ID, currency, sandbox/live mode indicator)
   */
  getConfig(req, res) {
    try {
      const publicConfig = razorpayService.getPublicConfig();
      res.json({
        success: true,
        data: publicConfig
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * POST /api/payments/razorpay/create-order
   * Authoritatively computes cart pricing and creates a Razorpay Order
   */
  async createRazorpayOrder(req, res) {
    try {
      const { items, couponCode, pincode, customerName, customerPhone } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Cart must contain at least one valid item to initiate checkout.'
        });
      }

      // 1. Authoritative calculation of amount on server
      const pricing = pricingService.calculateCart({
        items,
        couponCode,
        pincode: pincode || '560103'
      });

      if (!pricing.success || pricing.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: pricing.errors.join(', ') || 'Invalid items in cart.'
        });
      }

      const totalAmount = pricing.total;
      const receiptId = `fm_rcpt_${Date.now()}`;

      // 2. Create Razorpay order
      const rzpOrder = await razorpayService.createOrder({
        amountInRupees: totalAmount,
        receipt: receiptId,
        notes: {
          customerName: customerName || 'Valued Patron',
          customerPhone: customerPhone || '',
          pincode: pincode || '',
          itemCount: items.length
        }
      });

      res.status(201).json({
        success: true,
        data: {
          orderId: rzpOrder.id,
          amount: rzpOrder.amount, // in paise
          amountInRupees: totalAmount,
          currency: rzpOrder.currency,
          keyId: rzpOrder.keyId,
          receipt: rzpOrder.receipt,
          isSimulated: rzpOrder.isSimulated || false,
          pricing: {
            subtotal: pricing.subtotal,
            deliveryFee: pricing.deliveryFee,
            discount: pricing.discount,
            total: pricing.total
          }
        }
      });
    } catch (err) {
      console.error('Error creating Razorpay order:', err);
      res.status(500).json({
        success: false,
        message: err.message || 'Failed to create Razorpay payment order.'
      });
    }
  },

  /**
   * POST /api/payments/razorpay/verify-and-place-order
   * Verifies Razorpay HMAC signature and places the confirmed order
   */
  async verifyAndPlaceOrder(req, res) {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        items,
        shippingAddress,
        deliverySlot,
        couponCode
      } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id) {
        return res.status(400).json({
          success: false,
          message: 'Missing Razorpay order or payment transaction reference.'
        });
      }

      // 1. Verify signature
      const isSignatureValid = razorpayService.verifyPaymentSignature({
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      });

      if (!isSignatureValid) {
        return res.status(400).json({
          success: false,
          message: 'Payment verification failed: Signature mismatch or invalid transaction.'
        });
      }

      // 2. Create Order in Database
      const confirmedOrder = orderService.createOrder({
        items,
        shippingAddress,
        paymentMethod: 'Razorpay (Online UPI/Cards/NetBanking)',
        deliverySlot,
        couponCode,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpaySignature: razorpay_signature
      });

      res.status(201).json({
        success: true,
        message: `Payment verified! Order #${confirmedOrder.id} successfully placed.`,
        data: confirmedOrder
      });
    } catch (err) {
      console.error('Error verifying payment & placing order:', err);
      res.status(400).json({
        success: false,
        message: err.message || 'Could not verify payment transaction.'
      });
    }
  },

  /**
   * POST /api/payments/razorpay/webhook
   * Listens to asynchronous Razorpay webhook events
   */
  handleWebhook(req, res) {
    try {
      const signature = req.headers['x-razorpay-signature'];
      const rawBody = JSON.stringify(req.body);

      const isValid = razorpayService.verifyWebhookSignature(rawBody, signature);
      if (!isValid) {
        console.warn('⚠️ Webhook received with invalid signature.');
        return res.status(400).json({ success: false, message: 'Invalid webhook signature.' });
      }

      const event = req.body.event;
      console.log(`🔔 Razorpay Webhook Event: ${event}`);

      // Handle specific webhook events
      switch (event) {
        case 'payment.captured':
          console.log(`💰 Payment captured: ${req.body.payload.payment.entity.id}`);
          break;
        case 'payment.failed':
          console.warn(`❌ Payment failed: ${req.body.payload.payment.entity.id}`);
          break;
        case 'order.paid':
          console.log(`📦 Order paid: ${req.body.payload.order.entity.id}`);
          break;
      }

      res.json({ success: true, status: 'acknowledged' });
    } catch (err) {
      console.error('Webhook error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

export default paymentController;
