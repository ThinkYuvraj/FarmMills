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
  deliverySlot?: string;
  estimatedDelivery: string;
  trackingEvents?: OrderTrackingEvent[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
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
  | 'subscriptions';
