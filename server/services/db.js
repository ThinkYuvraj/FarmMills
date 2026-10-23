import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_DATA } from '../data/initialData.js';
import { sqlDb } from './sqlDb.js';

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

    if (!this.data.users) {
      this.data.users = [
        {
          id: 'usr_priya_sharma',
          name: 'Priya Sharma',
          email: 'priya.sharma@example.com',
          phone: '+91 98765 43210',
          authProvider: 'password',
          googleConnected: false,
          appleConnected: false,
          passkeys: [],
          memberSince: 'Oct 2026',
          addresses: [
            {
              id: 'addr-1',
              tag: 'Home',
              address: 'Flat 402, Green Glen Palms, Bellandur',
              city: 'Bengaluru',
              pincode: '560103',
              isDefault: true
            }
          ]
        }
      ];
    }
    if (!this.data.sessions) this.data.sessions = {};
    if (!this.data.passkeys) this.data.passkeys = [];
    if (!this.data.challenges) this.data.challenges = {};
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

  setProductStock(productId, packSize, newStock) {
    const prod = this.getProductById(productId);
    if (!prod) return false;
    const pack = prod.packOptions.find((p) => p.size === packSize);
    if (!pack) return false;
    pack.stock = Math.max(0, Number(newStock));
    this.save();
    return true;
  }

  updatePaymentStatus(orderId, paymentStatus, paymentId) {
    const order = this.getOrderById(orderId);
    if (!order) return null;
    order.paymentStatus = paymentStatus;
    if (paymentId) order.razorpayPaymentId = paymentId;
    if (!order.trackingEvents) order.trackingEvents = [];
    order.trackingEvents.push({
      status: `Payment ${paymentStatus}`,
      time: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      note: `Payment status updated to ${paymentStatus}${paymentId ? ` (Ref: ${paymentId})` : ''}`
    });
    this.save();
    return order;
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
    if (!id) return null;
    const clean = id.toString().trim().toUpperCase();
    const digitsOnly = clean.replace(/\D/g, '');
    return this.data.orders.find((o) => {
      const oId = (o.id || '').toUpperCase();
      if (oId === clean) return true;
      if (oId === `FM-${clean}`) return true;
      if (clean === `FM-${oId}`) return true;
      if (digitsOnly && digitsOnly.length >= 4 && oId.replace(/\D/g, '') === digitsOnly) return true;
      return false;
    });
  }

  createOrder(orderData) {
    this.data.orders.unshift(orderData);
    this.save();
    this.syncOrderToSql(orderData);
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
    this.syncOrderStatusToSql(orderId, newStatus, null, null);
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
    this.syncSubscriptionToSql(subData);
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
    this.syncReviewToSql(reviewData);
    return reviewData;
  }

  // --- Auth, Users & Passkeys ---
  getUsers() {
    return this.data.users || [];
  }

  getUserByEmail(email) {
    if (!email) return null;
    const clean = email.trim().toLowerCase();
    return (this.data.users || []).find((u) => u.email.toLowerCase() === clean);
  }

  getUserById(id) {
    if (!id) return null;
    return (this.data.users || []).find((u) => u.id === id);
  }

  createUser(userData) {
    if (!this.data.users) this.data.users = [];
    this.data.users.push(userData);
    this.save();
    this.syncUserToSql(userData);
    return userData;
  }

  updateUser(id, updates) {
    const user = this.getUserById(id);
    if (!user) return null;
    Object.assign(user, updates);
    this.save();
    this.syncUserToSql(user);
    return user;
  }

  // Passkey credentials
  savePasskey(passkeyRecord) {
    if (!this.data.passkeys) this.data.passkeys = [];
    this.data.passkeys.push(passkeyRecord);
    this.save();
    return passkeyRecord;
  }

  getPasskeysByUserId(userId) {
    return (this.data.passkeys || []).filter((p) => p.userId === userId);
  }

  getPasskeyById(credentialId) {
    return (this.data.passkeys || []).find((p) => p.id === credentialId);
  }

  // Challenges for WebAuthn / Passkeys
  saveChallenge(challengeId, data) {
    if (!this.data.challenges) this.data.challenges = {};
    this.data.challenges[challengeId] = {
      ...data,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes validity
    };
  }

  getChallenge(challengeId) {
    if (!this.data.challenges || !this.data.challenges[challengeId]) return null;
    const item = this.data.challenges[challengeId];
    if (Date.now() > item.expiresAt) {
      delete this.data.challenges[challengeId];
      return null;
    }
    return item;
  }

  deleteChallenge(challengeId) {
    if (this.data.challenges) {
      delete this.data.challenges[challengeId];
    }
  }

  // Sessions
  saveSession(token, user) {
    if (!this.data.sessions) this.data.sessions = {};
    this.data.sessions[token] = {
      userId: user.id,
      user,
      createdAt: new Date().toISOString()
    };
    return this.data.sessions[token];
  }

  getSession(token) {
    if (!this.data.sessions || !this.data.sessions[token]) return null;
    return this.data.sessions[token];
  }

  deleteSession(token) {
    if (this.data.sessions && this.data.sessions[token]) {
      delete this.data.sessions[token];
      return true;
    }
    return false;
  }

  // --- Hostinger SQL Synchronization (Non-blocking background sync) ---
  async syncOrderToSql(order) {
    if (!sqlDb.isConnected || !sqlDb.pool) return;
    try {
      await sqlDb.pool.query(
        `INSERT INTO orders (
          id, user_id, customer_name, customer_email, customer_phone,
          items, subtotal, discount, delivery_fee, total, status,
          payment_method, payment_status, razorpay_order_id, razorpay_payment_id,
          outlet_id, outlet_name, shipping_address, tracking_events
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          status=VALUES(status), payment_status=VALUES(payment_status),
          tracking_events=VALUES(tracking_events)`,
        [
          order.id,
          order.userId || null,
          order.customerName || order.customer?.name || 'Customer',
          order.customerEmail || order.customer?.email || '',
          order.customerPhone || order.customer?.phone || '',
          JSON.stringify(order.items || []),
          order.subtotal || 0,
          order.discount || 0,
          order.deliveryFee || 0,
          order.total || 0,
          order.status || 'Confirmed',
          order.paymentMethod || 'cod',
          order.paymentStatus || 'Pending',
          order.razorpayOrderId || null,
          order.razorpayPaymentId || null,
          order.outletId || 'outlet-mcc-rajnagar',
          order.outletName || 'MCC Signature Heights, Rajnagar Extension',
          JSON.stringify(order.shippingAddress || {}),
          JSON.stringify(order.trackingEvents || [])
        ]
      );
    } catch (err) {
      console.warn('⚠️ [Hostinger SQL] Failed to sync order to database:', err.message);
    }
  }

  async syncOrderStatusToSql(orderId, status, paymentStatus, paymentId) {
    if (!sqlDb.isConnected || !sqlDb.pool) return;
    try {
      const order = this.getOrderById(orderId);
      const trackingEvents = order?.trackingEvents ? JSON.stringify(order.trackingEvents) : null;
      await sqlDb.pool.query(
        `UPDATE orders SET status = ?, payment_status = COALESCE(?, payment_status),
         razorpay_payment_id = COALESCE(?, razorpay_payment_id),
         tracking_events = COALESCE(?, tracking_events)
         WHERE id = ?`,
        [status, paymentStatus || null, paymentId || null, trackingEvents, orderId]
      );
    } catch (err) {
      console.warn('⚠️ [Hostinger SQL] Failed to update order status in SQL:', err.message);
    }
  }

  async syncUserToSql(user) {
    if (!sqlDb.isConnected || !sqlDb.pool) return;
    try {
      await sqlDb.pool.query(
        `INSERT INTO users (
          id, name, email, password_hash, phone, auth_provider,
          google_connected, apple_connected, member_since, addresses
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name=VALUES(name), phone=VALUES(phone), addresses=VALUES(addresses),
          password_hash=COALESCE(VALUES(password_hash), password_hash)`,
        [
          user.id,
          user.name,
          user.email,
          user.passwordHash || null,
          user.phone || '',
          user.authProvider || 'password',
          user.googleConnected ? 1 : 0,
          user.appleConnected ? 1 : 0,
          user.memberSince || 'Oct 2026',
          JSON.stringify(user.addresses || [])
        ]
      );
    } catch (err) {
      console.warn('⚠️ [Hostinger SQL] Failed to sync user to database:', err.message);
    }
  }

  async syncReviewToSql(review) {
    if (!sqlDb.isConnected || !sqlDb.pool) return;
    try {
      await sqlDb.pool.query(
        `INSERT INTO reviews (id, product_id, user_name, rating, comment, verified)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE rating=VALUES(rating), comment=VALUES(comment)`,
        [
          review.id,
          review.productId,
          review.userName || review.user || 'Patron',
          review.rating || 5,
          review.comment || '',
          review.verified ? 1 : 0
        ]
      );
    } catch (err) {
      console.warn('⚠️ [Hostinger SQL] Failed to sync review to database:', err.message);
    }
  }

  async syncSubscriptionToSql(sub) {
    if (!sqlDb.isConnected || !sqlDb.pool) return;
    try {
      await sqlDb.pool.query(
        `INSERT INTO subscriptions (
          id, user_id, customer_name, customer_email, customer_phone,
          product_id, product_name, pack_size, frequency, interval_days,
          price, discount_pct, next_delivery_date, status, delivery_address
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          status=VALUES(status), next_delivery_date=VALUES(next_delivery_date)`,
        [
          sub.id,
          sub.userId || null,
          sub.customerName || sub.customer?.name || 'Patron',
          sub.customerEmail || sub.customer?.email || '',
          sub.customerPhone || sub.customer?.phone || '',
          sub.productId,
          sub.productName,
          sub.packSize,
          sub.frequency,
          sub.intervalDays || 30,
          sub.price,
          sub.discountPct || 15,
          sub.nextDeliveryDate || '',
          sub.status || 'active',
          JSON.stringify(sub.deliveryAddress || {})
        ]
      );
    } catch (err) {
      console.warn('⚠️ [Hostinger SQL] Failed to sync subscription to database:', err.message);
    }
  }

  getStatus() {
    return {
      sql: sqlDb.getStatus(),
      localStorage: {
        productsCount: this.data.products?.length || 0,
        ordersCount: this.data.orders?.length || 0,
        usersCount: this.data.users?.length || 0,
        reviewsCount: this.data.reviews?.length || 0,
        subscriptionsCount: this.data.subscriptions?.length || 0,
        couponsCount: this.data.coupons?.length || 0
      }
    };
  }
}

export const db = new Database();
export default db;
