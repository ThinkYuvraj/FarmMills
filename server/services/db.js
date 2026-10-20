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
    return userData;
  }

  updateUser(id, updates) {
    const user = this.getUserById(id);
    if (!user) return null;
    Object.assign(user, updates);
    this.save();
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
}

export const db = new Database();
