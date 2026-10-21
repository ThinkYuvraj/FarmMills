import express from 'express';
import { db } from '../services/db.js';
import { razorpayService } from '../services/razorpayService.js';

const router = express.Router();

// GET /api/admin/stats - Comprehensive operational metrics
router.get('/stats', (req, res) => {
  try {
    const orders = db.getOrders();
    const products = db.getProducts();
    const subscriptions = db.getSubscriptions();
    const razorpayConfig = razorpayService.getPublicConfig();

    const totalRevenue = orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const paidOrders = orders.filter((o) => o.paymentStatus === 'PAID');
    const onlineRevenue = paidOrders
      .filter((o) => (o.paymentMethod || '').toLowerCase().includes('razorpay') || (o.paymentMethod || '').toLowerCase().includes('online'))
      .reduce((sum, o) => sum + (o.total || 0), 0);
    const codRevenue = orders
      .filter((o) => (o.paymentMethod || '').toLowerCase().includes('cod') || (o.paymentMethod || '').toLowerCase().includes('cash'))
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const orderStatusCounts = {
      total: orders.length,
      placed: orders.filter((o) => o.status.includes('Placed') || o.status.includes('Confirmed')).length,
      milling: orders.filter((o) => o.status.includes('Milled') || o.status.includes('Milling') || o.status.includes('Chakki')).length,
      dispatched: orders.filter((o) => o.status.includes('Dispatched') || o.status.includes('Packed')).length,
      delivered: orders.filter((o) => o.status.includes('Delivered')).length,
      cancelled: orders.filter((o) => o.status.includes('Cancelled')).length
    };

    // Calculate total inventory and identify low stock items (< 25 units)
    let totalStockUnits = 0;
    const lowStockItems = [];

    products.forEach((prod) => {
      prod.packOptions.forEach((opt) => {
        const stock = opt.stock ?? 50;
        totalStockUnits += stock;
        if (stock <= 25) {
          lowStockItems.push({
            productId: prod.id,
            productName: prod.name,
            packSize: opt.size,
            currentStock: stock,
            price: opt.price
          });
        }
      });
    });

    res.json({
      success: true,
      data: {
        totalRevenue,
        onlineRevenue,
        codRevenue,
        totalOrders: orders.length,
        orderStatusCounts,
        activeSubscriptionsCount: subscriptions.filter((s) => s.status === 'ACTIVE').length,
        totalStockUnits,
        lowStockItems,
        razorpayConfig,
        millingChakkis: [
          { id: 'Chakki #1 (Sharbati Whole Grain)', rpm: 280, temperature: '36.2°C', status: 'Running', load: '82%', miller: 'Master Ram Singh' },
          { id: 'Chakki #2 (Danedar Mota Besan)', rpm: 260, temperature: '34.8°C', status: 'Running', load: '68%', miller: 'Kishore Pal' },
          { id: 'Chakki #3 (Cold-Pressed Wood Kolhu)', rpm: 18, temperature: '31.4°C', status: 'Active', load: '75%', miller: 'Devendra Yadav' },
          { id: 'Chakki #4 (Sprouted Millets & Spices)', rpm: 240, temperature: '33.1°C', status: 'Standby', load: '20%', miller: 'Shyam Lal' }
        ]
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/admin/orders/:id/status - Update order tracking status
router.patch('/orders/:id/status', (req, res) => {
  try {
    const { status, note } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    const updated = db.updateOrderStatus(req.params.id, status, note);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/admin/orders/:id/payment - Update payment status
router.patch('/orders/:id/payment', (req, res) => {
  try {
    const { paymentStatus, paymentId } = req.body;
    if (!paymentStatus) {
      return res.status(400).json({ success: false, message: 'Payment status is required' });
    }
    const updated = db.updatePaymentStatus(req.params.id, paymentStatus, paymentId);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/admin/products/:id/stock - Set stock count for a pack size
router.patch('/products/:id/stock', (req, res) => {
  try {
    const { packSize, stock } = req.body;
    if (!packSize || stock === undefined) {
      return res.status(400).json({ success: false, message: 'packSize and stock are required' });
    }
    const success = db.setProductStock(req.params.id, packSize, stock);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Product or pack option not found' });
    }
    const updatedProduct = db.getProductById(req.params.id);
    res.json({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/admin/subscriptions/:id/status - Update subscription state
router.patch('/subscriptions/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    const updated = db.updateSubscription(req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
