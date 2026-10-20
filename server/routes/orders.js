import express from 'express';
import { orderService } from '../services/orderService.js';

const router = express.Router();

// GET /api/orders - List all orders
router.get('/', (req, res) => {
  try {
    const orders = orderService.getAllOrders();
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/orders/:id - Get specific order with live tracking
router.get('/:id', (req, res) => {
  try {
    const order = orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/orders - Create a new verified order
router.post('/', (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, deliverySlot, couponCode } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item.' });
    }

    const newOrder = orderService.createOrder({
      items,
      shippingAddress,
      paymentMethod,
      deliverySlot,
      couponCode
    });

    res.status(201).json({
      success: true,
      message: `Order #${newOrder.id} placed successfully!`,
      data: newOrder
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PATCH /api/orders/:id/status - Update order tracking status
router.patch('/:id/status', (req, res) => {
  try {
    const { status, note } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updated = orderService.updateStatus(req.params.id, status, note);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
