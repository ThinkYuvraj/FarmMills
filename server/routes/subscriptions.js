import express from 'express';
import { subscriptionService } from '../services/subscriptionService.js';

const router = express.Router();

// GET /api/subscriptions - List all recurring subscriptions
router.get('/', (req, res) => {
  try {
    const subs = subscriptionService.getAllSubscriptions();
    res.json({ success: true, count: subs.length, data: subs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/subscriptions - Create routine milling subscription
router.post('/', (req, res) => {
  try {
    const { productId, packSize, frequency, deliverySlot, address } = req.body;
    if (!productId || !packSize) {
      return res.status(400).json({ success: false, message: 'Product ID and pack size are required.' });
    }

    const sub = subscriptionService.createSubscription({
      productId,
      packSize,
      frequency,
      deliverySlot,
      address
    });

    res.status(201).json({
      success: true,
      message: `Subscribed to ${sub.productName} with 15% discount!`,
      data: sub
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PATCH /api/subscriptions/:id - Modify subscription (e.g. pause, frequency)
router.patch('/:id', (req, res) => {
  try {
    const updated = subscriptionService.updateSubscription(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/subscriptions/:id - Cancel subscription
router.delete('/:id', (req, res) => {
  try {
    const success = subscriptionService.cancelSubscription(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }
    res.json({ success: true, message: 'Subscription cancelled successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
