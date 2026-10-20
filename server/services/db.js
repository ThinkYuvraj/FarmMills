import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_DATA } from '../data/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storePath = path.join(__dirname, '../data/store.json');

class Database {
  constructor() {
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(storePath)) {
        this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
        this.save();
      } else {
        const raw = fs.readFileSync(storePath, 'utf-8');
        this.data = JSON.parse(raw);
      }
    } catch (err) {
      console.error('Error reading store.json, falling back to INITIAL_DATA:', err);
      this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(storePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database store:', err);
    }
  }

  // --- Products ---
  getProducts() {
    return this.data.products;
  }

  getProductById(id) {
    return this.data.products.find((p) => p.id === id || p.slug === id);
  }

  updateProductStock(productId, packSize, quantityDeducted) {
    const prod = this.getProductById(productId);
    if (!prod) return false;
    const pack = prod.packOptions.find((p) => p.size === packSize);
    if (!pack) return false;
    if (pack.stock !== undefined) {
      pack.stock = Math.max(0, pack.stock - quantityDeducted);
    }
    this.save();
    return true;
  }

  // --- Coupons ---
  getCoupons() {
    return this.data.coupons;
  }

  getCouponByCode(code) {
    if (!code) return null;
    return this.data.coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive
    );
  }

  // --- Pincodes ---
  getPincodeInfo(pincode) {
    if (!pincode) return this.data.pincodes['DEFAULT'];
    const clean = pincode.toString().trim();
    if (this.data.pincodes[clean]) {
      return { pincode: clean, ...this.data.pincodes[clean], isServiceable: true };
    }
    // Check if within valid 6-digit Indian pincode format
    if (/^\d{6}$/.test(clean)) {
      return { pincode: clean, ...this.data.pincodes['DEFAULT'], isServiceable: true, isDefaultFallback: true };
    }
    return { pincode: clean, isServiceable: false, error: 'Invalid 6-digit Indian Postal Code.' };
  }

  // --- Orders ---
  getOrders() {
    return this.data.orders;
  }

  getOrderById(id) {
    return this.data.orders.find((o) => o.id === id);
  }

  createOrder(orderData) {
    this.data.orders.unshift(orderData);
    this.save();
    return orderData;
  }

  updateOrderStatus(orderId, newStatus, note = '') {
    const order = this.getOrderById(orderId);
    if (!order) return null;
    order.status = newStatus;
    if (!order.trackingEvents) order.trackingEvents = [];
    order.trackingEvents.push({
      status: newStatus,
      time: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      note: note || `Order status updated to ${newStatus}`
    });
    this.save();
    return order;
  }

  // --- Subscriptions ---
  getSubscriptions() {
    return this.data.subscriptions;
  }

  getSubscriptionById(id) {
    return this.data.subscriptions.find((s) => s.id === id);
  }

  createSubscription(subData) {
    this.data.subscriptions.unshift(subData);
    this.save();
    return subData;
  }

  updateSubscription(id, updates) {
    const sub = this.getSubscriptionById(id);
    if (!sub) return null;
    Object.assign(sub, updates);
    this.save();
    return sub;
  }

  deleteSubscription(id) {
    const idx = this.data.subscriptions.findIndex((s) => s.id === id);
    if (idx === -1) return false;
    this.data.subscriptions.splice(idx, 1);
    this.save();
    return true;
  }

  // --- Lab Reports ---
  getLabReport(productId) {
    return this.data.labReports[productId] || null;
  }

  getLabReportByBatch(batchNumber) {
    if (!batchNumber) return null;
    const clean = batchNumber.trim().toUpperCase();
    for (const key of Object.keys(this.data.labReports)) {
      if (this.data.labReports[key].batchNumber.toUpperCase() === clean) {
        return this.data.labReports[key];
      }
    }
    return null;
  }

  // --- Reviews ---
  getReviewsByProductId(productId) {
    return this.data.reviews.filter((r) => r.productId === productId);
  }

  addReview(reviewData) {
    this.data.reviews.unshift(reviewData);
    // Update product rating & reviewCount
    const prod = this.getProductById(reviewData.productId);
    if (prod) {
      const allProductReviews = this.getReviewsByProductId(reviewData.productId);
      const totalScore = allProductReviews.reduce((sum, r) => sum + r.rating, 0);
      prod.reviewCount = allProductReviews.length;
      prod.rating = parseFloat((totalScore / allProductReviews.length).toFixed(2));
    }
    this.save();
    return reviewData;
  }
}

export const db = new Database();
