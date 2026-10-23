import {
  Product,
  Order,
  SubscriptionItem,
  LabReport,
  Review,
  CartItem,
  PackOption,
  RazorpayConfig,
  RazorpayOrderResponse,
  RazorpayVerificationPayload,
  AdminStats
} from '../types';

const API_BASE = '/api';

export const api = {
  // --- Razorpay Payments ---
  async getRazorpayConfig(): Promise<RazorpayConfig> {
    const res = await fetch(`${API_BASE}/payments/razorpay/config`);
    if (!res.ok) throw new Error('Failed to load Razorpay configuration');
    const json = await res.json();
    return json.data;
  },

  async createRazorpayOrder(payload: {
    items: { productId: string; packSize: string; quantity: number }[];
    couponCode?: string | null;
    pincode?: string | null;
    customerName?: string;
    customerPhone?: string;
  }): Promise<RazorpayOrderResponse> {
    const res = await fetch(`${API_BASE}/payments/razorpay/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to initiate Razorpay transaction');
    return json.data;
  },

  async verifyRazorpayPayment(payload: RazorpayVerificationPayload): Promise<Order> {
    const res = await fetch(`${API_BASE}/payments/razorpay/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to verify payment with Razorpay');
    return json.data;
  },

  async saveRazorpayCredentials(payload: { keyId: string; keySecret: string; webhookSecret?: string }) {
    const res = await fetch(`${API_BASE}/payments/razorpay/save-credentials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to save Razorpay credentials');
    return json;
  },

  async testRazorpayConnection() {
    const res = await fetch(`${API_BASE}/payments/razorpay/test-connection`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to test Razorpay connection');
    return json.data;
  },
  // --- Products ---
  async getProducts(params?: { category?: string; search?: string; sort?: string }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'All') query.set('category', params.category);
    if (params?.search) query.set('search', params.search);
    if (params?.sort) query.set('sort', params.sort);

    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const json = await res.json();
    return json.data;
  },

  async getProduct(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product details');
    const json = await res.json();
    return json.data;
  },

  // --- Cart Authoritative Pricing ---
  async validateCart(payload: {
    items: { productId: string; packSize: string; quantity: number }[];
    couponCode?: string | null;
    pincode?: string | null;
  }) {
    const res = await fetch(`${API_BASE}/cart/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Cart validation failed');
    return res.json();
  },

  // --- Coupons ---
  async validateCoupon(code: string, items?: { productId: string; packSize: string; quantity: number }[]) {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, items })
    });
    const json = await res.json();
    if (!res.ok) {
      return { success: false, message: json.message || 'Invalid coupon' };
    }
    return json;
  },

  // --- Pincodes & Logistics ---
  async checkPincode(pincode: string) {
    const res = await fetch(`${API_BASE}/pincodes/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pincode })
    });
    const json = await res.json();
    if (!res.ok) {
      return { serviceable: false, message: json.message || 'Error checking postal code' };
    }
    return json.data;
  },

  async getMillingSchedule() {
    const res = await fetch(`${API_BASE}/pincodes/schedule`);
    if (!res.ok) throw new Error('Failed to fetch milling schedule');
    const json = await res.json();
    return json.data;
  },

  async detectLocation() {
    try {
      const res = await fetch(`${API_BASE}/location/detect`);
      if (!res.ok) throw new Error('Location detection failed');
      const json = await res.json();
      return json.data;
    } catch (e) {
      return {
        latitude: 28.7058,
        longitude: 77.4265,
        city: 'Ghaziabad',
        state: 'Uttar Pradesh',
        locality: 'MCC Signature Heights, Rajnagar Extension',
        pincode: '201017',
        primaryHubId: 'outlet-mcc-rajnagar'
      };
    }
  },

  // --- Orders ---
  async createOrder(payload: {
    items: { productId: string; packSize: string; quantity: number }[];
    shippingAddress: {
      fullName: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    };
    paymentMethod: string;
    deliverySlot: string;
    couponCode?: string | null;
  }): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to place order');
    }
    return json.data;
  },

  async getOrders(): Promise<Order[]> {
    const res = await fetch(`${API_BASE}/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    const json = await res.json();
    return json.data;
  },

  async getOrder(id: string): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders/${id}`);
    if (!res.ok) throw new Error('Failed to fetch order');
    const json = await res.json();
    return json.data;
  },

  // --- Subscriptions ---
  async getSubscriptions(): Promise<SubscriptionItem[]> {
    const res = await fetch(`${API_BASE}/subscriptions`);
    if (!res.ok) throw new Error('Failed to fetch subscriptions');
    const json = await res.json();
    return json.data;
  },

  async createSubscription(payload: {
    productId: string;
    packSize: string;
    frequency: 'Weekly' | 'Every 2 Weeks' | 'Monthly';
    deliverySlot?: string;
    address?: string;
  }) {
    const res = await fetch(`${API_BASE}/subscriptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to create subscription');
    }
    return json.data;
  },

  async cancelSubscription(id: string) {
    const res = await fetch(`${API_BASE}/subscriptions/${id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to cancel subscription');
    }
    return json;
  },

  // --- Lab Reports ---
  async getLabReport(productId: string): Promise<LabReport | null> {
    const res = await fetch(`${API_BASE}/lab-reports/${productId}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  },

  async getLabReportByBatch(batchNumber: string): Promise<LabReport | null> {
    const res = await fetch(`${API_BASE}/lab-reports/batch/${batchNumber}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  },

  // --- Reviews ---
  async getAllReviews(params?: { category?: string; minRating?: number; limit?: number }): Promise<Review[]> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'All') query.set('category', params.category);
    if (params?.minRating) query.set('minRating', params.minRating.toString());
    if (params?.limit) query.set('limit', params.limit.toString());
    try {
      const res = await fetch(`${API_BASE}/reviews?${query.toString()}`);
      if (!res.ok) return [];
      const json = await res.json();
      return json.data || [];
    } catch (e) {
      return [];
    }
  },

  async getReviews(productId: string): Promise<Review[]> {
    try {
      const res = await fetch(`${API_BASE}/reviews/${productId}`);
      if (!res.ok) return [];
      const json = await res.json();
      return json.data || [];
    } catch (e) {
      return [];
    }
  },

  async submitReview(payload: {
    productId: string;
    author: string;
    rating: number;
    title: string;
    comment: string;
    city?: string;
  }): Promise<Review> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('farmers_mill_token') : null;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to submit review');
    return json.data;
  },

  // --- Authentication (Email, Google, Apple, Passkeys) ---
  async signup(payload: { name: string; email: string; password: string; phone?: string }) {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Signup failed');
    return json.data;
  },

  async login(payload: { email: string; password: string }) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Login failed');
    return json.data;
  },

  async loginWithGoogle(payload: { email: string; name?: string; avatar?: string; googleId?: string }) {
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Google login failed');
    return json.data;
  },

  async loginWithApple(payload: { email?: string; name?: string; appleUserId?: string }) {
    const res = await fetch(`${API_BASE}/auth/apple`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Apple login failed');
    return json.data;
  },

  async getPasskeyRegisterChallenge(userId: string) {
    const res = await fetch(`${API_BASE}/auth/passkey/register-challenge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create passkey challenge');
    return json.data;
  },

  async verifyPasskeyRegister(payload: { challengeId: string; credentialId?: string; deviceName?: string }) {
    const res = await fetch(`${API_BASE}/auth/passkey/register-verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Passkey verification failed');
    return json.data;
  },

  async getPasskeyLoginChallenge(email?: string) {
    const res = await fetch(`${API_BASE}/auth/passkey/login-challenge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create passkey login challenge');
    return json.data;
  },

  async verifyPasskeyLogin(payload: { challengeId: string; credentialId?: string; email?: string }) {
    const res = await fetch(`${API_BASE}/auth/passkey/login-verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Passkey login failed');
    return json.data;
  },

  async logout(token?: string) {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
  },

  // --- Admin Console Operations ---
  async getAdminStats(): Promise<AdminStats> {
    const res = await fetch(`${API_BASE}/admin/stats`);
    if (!res.ok) throw new Error('Failed to load admin metrics');
    const json = await res.json();
    return json.data;
  },

  async updateAdminOrderStatus(orderId: string, status: string, note?: string): Promise<Order> {
    const res = await fetch(`${API_BASE}/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update order status');
    return json.data;
  },

  async updateAdminPaymentStatus(orderId: string, paymentStatus: string, paymentId?: string): Promise<Order> {
    const res = await fetch(`${API_BASE}/admin/orders/${orderId}/payment`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentStatus, paymentId })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update payment status');
    return json.data;
  },

  async updateAdminProductStock(productId: string, packSize: string, stock: number): Promise<Product> {
    const res = await fetch(`${API_BASE}/admin/products/${productId}/stock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ packSize, stock })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update stock');
    return json.data;
  },

  async updateAdminSubscriptionStatus(id: string, status: string): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/subscriptions/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update subscription status');
    return json.data;
  }
};
