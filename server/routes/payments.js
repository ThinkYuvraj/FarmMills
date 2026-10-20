import express from 'express';
import { paymentController } from '../controllers/paymentController.js';

const router = express.Router();

// GET /api/payments/razorpay/config - Public configuration (Key ID, mode)
router.get('/razorpay/config', paymentController.getConfig);

// POST /api/payments/razorpay/create-order - Authoritatively compute and create Razorpay order
router.post('/razorpay/create-order', paymentController.createRazorpayOrder);

// POST /api/payments/razorpay/verify-payment - Verify signature & finalize order
router.post('/razorpay/verify-payment', paymentController.verifyAndPlaceOrder);

// POST /api/payments/razorpay/webhook - Asynchronous webhook notifications from Razorpay
router.post('/razorpay/webhook', paymentController.handleWebhook);

export default router;
