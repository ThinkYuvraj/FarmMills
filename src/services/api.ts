import { Product, Order, SubscriptionItem, LabReport, Review, CartItem, PackOption } from '../types';

const API_BASE = '/api';

export const api = {
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
  }
};
