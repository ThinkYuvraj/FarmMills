export interface PackOption {
  size: string;
  price: number;
  originalPrice?: number;
  stock?: number;
}

export interface NutritionFact {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  productId?: string;
  productName?: string;
  productImage?: string;
  category?: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  location?: string;
  city?: string;
  title?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  subCategory: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  ingredients: string;
  storageTips: string;
  shelfLife: string;
  farmOrigin: string;
  millingProcess: string;
  badges: string[];
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  packOptions: PackOption[];
  nutrition: NutritionFact[];
  featured?: boolean;
  isBestseller?: boolean;
  batchCode?: string;
}

export interface CartItem {
  product: Product;
  selectedPack: PackOption;
  quantity: number;
}

export interface OrderItem {
  id: string;
  name: string;
  packSize: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderTrackingEvent {
  status: string;
  time: string;
  note?: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  appliedCoupon?: string | null;
  total: number;
  status: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  paymentStatus?: 'PAID' | 'PENDING' | 'FAILED' | string;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  razorpaySignature?: string | null;
  deliverySlot?: string;
  estimatedDelivery: string;
  trackingEvents?: OrderTrackingEvent[];
}

export interface RazorpayConfig {
  isConfigured: boolean;
  keyId: string;
  currency: string;
  isTestMode: boolean;
}

export interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  amountInRupees: number;
  currency: string;
  keyId: string;
  receipt: string;
  isSimulated: boolean;
  pricing: {
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
  };
}

export interface RazorpayVerificationPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  items: { productId: string; packSize: string; quantity: number }[];
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  deliverySlot?: string;
  couponCode?: string | null;
}

export interface PasskeyCredential {
  id: string;
  name: string;
  createdAt: string;
  lastUsedAt?: string;
  deviceType?: string;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  authProvider?: 'password' | 'google' | 'apple' | 'passkey';
  googleConnected?: boolean;
  appleConnected?: boolean;
  passkeys?: PasskeyCredential[];
  memberSince?: string;
  addresses: Array<{
    id: string;
    tag: string;
    address: string;
    city: string;
    pincode: string;
    isDefault?: boolean;
  }>;
}

export interface LabTestParameter {
  name: string;
  standard: string;
  result: string;
  status: 'Pass' | 'Safe';
}

export interface LabReport {
  id: string;
  productId: string;
  productName: string;
  batchNumber: string;
  testDate: string;
  labName: string;
  nablAccreditation: string;
  parameters: LabTestParameter[];
}

export interface SubscriptionItem {
  id: string;
  product: Product;
  selectedPack: PackOption;
  frequency: 'Weekly' | 'Every 2 Weeks' | 'Monthly' | string;
  nextDeliveryDate: string;
  discountPercent: number;
  status?: string;
  deliverySlot?: string;
  deliveryAddress?: string;
  productId?: string;
  productName?: string;
  productImage?: string;
  packSize?: string;
  originalPrice?: number;
  discountedPrice?: number;
}

export interface PincodeInfo {
  serviceable: boolean;
  pincode: string;
  city?: string;
  state?: string;
  zone?: string;
  expressAvailable?: boolean;
  morningSlotAvailable?: boolean;
  baseDeliveryFee?: number;
  freeShippingThreshold?: number;
  message?: string;
  millingSchedule?: {
    isBeforeCutoff: boolean;
    cutoffTime: string;
    millingBatchTime: string;
    nextMilledDate: string;
    estimatedDelivery: string;
    bannerText: string;
  };
}

export interface AdminStats {
  totalRevenue: number;
  onlineRevenue: number;
  codRevenue: number;
  totalOrders: number;
  orderStatusCounts: {
    total: number;
    placed: number;
    milling: number;
    dispatched: number;
    delivered: number;
    cancelled: number;
  };
  activeSubscriptionsCount: number;
  totalStockUnits: number;
  lowStockItems: {
    productId: string;
    productName: string;
    packSize: string;
    currentStock: number;
    price: number;
  }[];
  razorpayConfig: RazorpayConfig;
  millingChakkis: {
    id: string;
    rpm: number;
    temperature: string;
    status: string;
    load: string;
    miller: string;
  }[];
}

export type ActivePage = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'order-success' 
  | 'story' 
  | 'account' 
  | 'contact' 
  | 'subscriptions'
  | 'track-order'
  | 'wishlist'
  | 'terms'
  | 'shipping'
  | 'admin';
