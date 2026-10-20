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
  RazorpayVerificationPayload
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
  async getReviews(productId: string): Promise<Review[]> {
    const res = await fetch(`${API_BASE}/reviews/${productId}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data;
  },

  async submitReview(payload: {
    productId: string;
    author: string;
    rating: number;
    title: string;
    comment: string;
    city?: string;
  }) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
  }
};
