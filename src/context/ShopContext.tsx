import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, PackOption, Order, UserProfile, ActivePage, SubscriptionItem, PincodeInfo, RazorpayConfig } from '../types';
import { PRODUCTS } from '../data/products';
import { api } from '../services/api';

interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ShopContextType {
  // Products
  products: Product[];
  isLoadingProducts: boolean;

  // Navigation
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedProduct: Product;
  openProductDetail: (product: Product) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  trackingOrderId: string;
  setTrackingOrderId: (id: string) => void;
  openTrackOrder: (orderId?: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, pack: PackOption, quantity?: number) => void;
  updateQuantity: (productId: string, packSize: string, delta: number) => void;
  removeFromCart: (productId: string, packSize: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  freeDeliveryRemaining: number;
  appliedCoupon: string | null;
  discount: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  cartTotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // User & Auth
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (name: string, emailOrPhone: string) => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  loginWithGoogle: (email?: string, name?: string, avatar?: string) => Promise<void>;
  loginWithApple: (email?: string, name?: string) => Promise<void>;
  loginWithPasskey: (email?: string) => Promise<void>;
  registerPasskey: (deviceName?: string) => Promise<void>;
  logout: () => Promise<void>;

  // Orders
  orders: Order[];
  latestOrder: Order | null;
  placeOrder: (
    shippingAddress: {
      fullName: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    },
    paymentMethod: string,
    slot: string
  ) => Promise<Order>;

  // Razorpay Payments
  razorpayConfig: RazorpayConfig | null;
  isProcessingPayment: boolean;
  processRazorpayPayment: (
    shippingAddress: {
      fullName: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    },
    slot: string
  ) => Promise<Order>;

  // Pincode & Logistics
  pincodeInfo: PincodeInfo | null;
  checkPincode: (pin: string) => Promise<PincodeInfo | null>;

  // Feedback
  toasts: ToastItem[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Lab Reports
  labReportProduct: Product | null;
  openLabReport: (product: Product) => void;
  closeLabReport: () => void;

  // Subscriptions
  subscriptions: SubscriptionItem[];
  addSubscription: (product: Product, pack: PackOption, frequency: 'Weekly' | 'Every 2 Weeks' | 'Monthly') => Promise<void>;
  cancelSubscription: (subId: string) => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const FREE_DELIVERY_THRESHOLD = 499;

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products catalog
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);

  // Navigation state
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string>('');

  const openTrackOrder = (orderId?: string) => {
    if (orderId) {
      setTrackingOrderId(orderId);
    }
    setActivePage('track-order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('farmers_mill_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { product: PRODUCTS[5], selectedPack: PRODUCTS[5].packOptions[1], quantity: 1 },
      { product: PRODUCTS[1], selectedPack: PRODUCTS[1].packOptions[1], quantity: 2 },
      { product: PRODUCTS[0], selectedPack: PRODUCTS[0].packOptions[0], quantity: 1 }
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('FARMERS10');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Pincode & Logistics state
  const [pincodeInfo, setPincodeInfo] = useState<PincodeInfo | null>({
    serviceable: true,
    pincode: '560103',
    city: 'Bengaluru (Bellandur)',
    state: 'Karnataka',
    zone: 'Zone A',
    expressAvailable: true,
    morningSlotAvailable: true,
    baseDeliveryFee: 0,
    freeShippingThreshold: 399
  });

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('farmers_mill_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      addresses: [
        {
          id: 'addr-1',
          tag: 'Home',
          address: 'Flat 402, Green Glen Palms, Bellandur',
          city: 'Bengaluru',
          pincode: '560103',
          isDefault: true
        },
        {
          id: 'addr-2',
          tag: 'Parents',
          address: 'B-12, Sector 14, Near Community Center',
          city: 'Noida',
          pincode: '201301'
        }
      ]
    };
  });

  // Orders history
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('farmers_mill_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'FM-73914',
        date: 'Oct 14, 2026',
        items: [
          {
            id: 'fm-atta-chakki',
            name: 'Chakki Fresh Atta',
            packSize: '5 kg',
            price: 280,
            quantity: 1,
            image: PRODUCTS[5].image
          },
          {
            id: 'fm-spice-turmeric',
            name: 'Turmeric (Haldi) Powder',
            packSize: '200 g',
            price: 160,
            quantity: 1,
            image: PRODUCTS[1].image
          }
        ],
        subtotal: 440,
        deliveryFee: 0,
        discount: 44,
        total: 396,
        status: 'Delivered',
        shippingAddress: {
          fullName: 'Priya Sharma',
          phone: '+91 98765 43210',
          address: 'Flat 402, Green Glen Palms, Bellandur',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560103'
        },
        paymentMethod: 'UPI (Google Pay)',
        estimatedDelivery: 'Oct 16, 2026'
      }
    ];
  });

  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [labReportProduct, setLabReportProduct] = useState<Product | null>(null);
  const [razorpayConfig, setRazorpayConfig] = useState<RazorpayConfig | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  useEffect(() => {
    api.getRazorpayConfig()
      .then((cfg) => setRazorpayConfig(cfg))
      .catch((err) => console.warn('Razorpay config load fallback:', err));
  }, []);
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(() => {
    try {
      const saved = localStorage.getItem('farmers_mill_subs');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'sub-1',
        productId: 'fm-atta-chakki',
        productName: 'Chakki Fresh Atta (100% MP Sharbati)',
        product: PRODUCTS[5],
        selectedPack: PRODUCTS[5].packOptions[1],
        packSize: '5 kg',
        frequency: 'Every 2 Weeks',
        nextDeliveryDate: 'Friday, Oct 24',
        discountPercent: 15
      }
    ];
  });

  // Load products from backend on start
  useEffect(() => {
    let isMounted = true;
    const fetchBackendProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const backendProducts = await api.getProducts();
        if (isMounted && backendProducts && backendProducts.length > 0) {
          setProducts(backendProducts);
        }
      } catch (err) {
        console.warn('Backend products fetch fallback to local:', err);
      } finally {
        if (isMounted) setIsLoadingProducts(false);
      }
    };
    fetchBackendProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('farmers_mill_cart', JSON.stringify(cart));
      if (user) localStorage.setItem('farmers_mill_user', JSON.stringify(user));
      localStorage.setItem('farmers_mill_orders', JSON.stringify(orders));
      localStorage.setItem('farmers_mill_subs', JSON.stringify(subscriptions));
    } catch (e) {}
  }, [cart, user, orders, subscriptions]);

  // Toast helper
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, pack: PackOption, quantity: number = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedPack.size === pack.size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedPack: pack, quantity }];
    });
    addToast(`Added ${quantity}x ${product.name} (${pack.size}) to cart!`, 'success');
  };

  const updateQuantity = (productId: string, packSize: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedPack.size === packSize) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, packSize: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedPack.size === packSize))
    );
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.selectedPack.price * item.quantity, 0);

  // Delivery fee logic
  const freeThreshold = pincodeInfo?.freeShippingThreshold || FREE_DELIVERY_THRESHOLD;
  const isFreeDelivery = cartSubtotal >= freeThreshold || appliedCoupon === 'FREESHIP';
  const deliveryFee = cartSubtotal === 0 ? 0 : isFreeDelivery ? 0 : (pincodeInfo?.baseDeliveryFee !== undefined ? pincodeInfo.baseDeliveryFee : 49);
  const freeDeliveryRemaining = Math.max(0, freeThreshold - cartSubtotal);

  // Discount computation
  let discount = 0;
  if (appliedCoupon === 'FARMERS10') {
    discount = Math.round(cartSubtotal * 0.1);
  } else if (appliedCoupon === 'WELCOME50') {
    discount = Math.min(50, cartSubtotal);
  } else if (appliedCoupon === 'PURE20' && cartSubtotal >= 1000) {
    discount = Math.round(cartSubtotal * 0.2);
  } else if (couponDiscount > 0) {
    discount = couponDiscount;
  }

  const cartTotal = Math.max(0, cartSubtotal + deliveryFee - discount);

  // Backend Coupon Validation
  const applyCoupon = async (code: string) => {
    const clean = code.trim().toUpperCase();
    try {
      const itemsPayload = cart.map((c) => ({
        productId: c.product.id,
        packSize: c.selectedPack.size,
        quantity: c.quantity
      }));

      const res = await api.validateCoupon(clean, itemsPayload);
      if (res.success) {
        setAppliedCoupon(clean);
        setCouponDiscount(res.discount || 0);
        addToast(res.message || `Coupon ${clean} applied!`, 'success');
        return { success: true, message: res.message || 'Coupon applied successfully!' };
      } else {
        addToast(res.message || 'Invalid coupon code', 'error');
        return { success: false, message: res.message || 'Invalid coupon code' };
      }
    } catch (e) {
      // Local fallback
      if (clean === 'FARMERS10' || clean === 'WELCOME50' || clean === 'FREESHIP' || clean === 'PURE20') {
        setAppliedCoupon(clean);
        addToast(`Coupon ${clean} applied!`, 'success');
        return { success: true, message: 'Coupon applied!' };
      }
      addToast('Invalid coupon code. Try FARMERS10, WELCOME50, or FREESHIP.', 'error');
      return { success: false, message: 'Invalid coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    addToast('Coupon removed', 'info');
  };

  // Check Pincode Logistics
  const checkPincode = async (pin: string): Promise<PincodeInfo | null> => {
    try {
      const data = await api.checkPincode(pin);
      if (data && data.serviceable) {
        setPincodeInfo(data);
        addToast(`Delivery available to ${data.city}! Morning slots active.`, 'success');
        return data;
      } else {
        addToast(data?.message || 'Pincode not currently serviceable.', 'error');
        return null;
      }
    } catch (e) {
      addToast('Unable to verify pincode at this moment.', 'info');
      return null;
    }
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLabReport = (product: Product) => {
    setLabReportProduct(product);
  };

  const closeLabReport = () => {
    setLabReportProduct(null);
  };

  // Subscriptions
  const addSubscription = async (product: Product, pack: PackOption, frequency: 'Weekly' | 'Every 2 Weeks' | 'Monthly') => {
    try {
      const serverSub = await api.createSubscription({
        productId: product.id,
        packSize: pack.size,
        frequency,
        address: user?.addresses[0]?.address
      });

      const newSub: SubscriptionItem = {
        ...serverSub,
        product,
        selectedPack: pack
      };

      setSubscriptions((prev) => [newSub, ...prev]);
      addToast(`Subscribed to ${product.name} (${pack.size}, ${frequency}) with flat 15% OFF!`, 'success');
    } catch (err) {
      // Fallback
      const newSub: SubscriptionItem = {
        id: `sub-${Date.now()}`,
        product,
        selectedPack: pack,
        frequency,
        nextDeliveryDate: 'Next Tuesday morning (7 AM - 11 AM)',
        discountPercent: 15
      };
      setSubscriptions((prev) => [newSub, ...prev]);
      addToast(`Subscribed to ${product.name} (${pack.size}) with 15% OFF!`, 'success');
    }
  };

  const cancelSubscription = async (subId: string) => {
    try {
      await api.cancelSubscription(subId);
    } catch (e) {}
    setSubscriptions((prev) => prev.filter((s) => s.id !== subId));
    addToast('Subscription cancelled.', 'info');
  };

  // Auth - Modern Multi-provider (Email/Password, Google, Apple, Passkey)
  const login = (name: string, emailOrPhone: string) => {
    setUser({
      name: name || 'Valued Patron',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'member@farmersmill.in',
      phone: !emailOrPhone.includes('@') ? emailOrPhone : '+91 98765 43210',
      authProvider: 'password',
      addresses: [
        {
          id: 'addr-default',
          tag: 'Home',
          address: '42, Anand Niketan, Near Grain Mandi',
          city: 'New Delhi',
          pincode: '110021',
          isDefault: true
        }
      ]
    });
    setIsAuthModalOpen(false);
    addToast(`Welcome back, ${name || 'Friend'}!`, 'success');
  };

  const signup = async (name: string, email: string, password: string, phone?: string) => {
    try {
      const data = await api.signup({ name, email, password, phone });
      setUser(data.user);
      if (data.token) localStorage.setItem('farmers_mill_token', data.token);
      setIsAuthModalOpen(false);
      addToast(`Account created! Welcome to Farmers Mill, ${data.user.name}.`, 'success');
    } catch (err: any) {
      addToast(err.message || 'Registration failed', 'error');
      throw err;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const data = await api.login({ email, password });
      setUser(data.user);
      if (data.token) localStorage.setItem('farmers_mill_token', data.token);
      setIsAuthModalOpen(false);
      addToast(`Welcome back, ${data.user.name}!`, 'success');
    } catch (err: any) {
      addToast(err.message || 'Invalid email or password', 'error');
      throw err;
    }
  };

  const loginWithGoogle = async (email?: string, name?: string, avatar?: string) => {
    try {
      const data = await api.loginWithGoogle({
        email: email || user?.email || 'priya.sharma@gmail.com',
        name: name || user?.name || 'Priya Sharma (Google)',
        avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        googleId: `gid_${Date.now()}`
      });
      setUser(data.user);
      if (data.token) localStorage.setItem('farmers_mill_token', data.token);
      setIsAuthModalOpen(false);
      addToast(`Signed in with Google as ${data.user.name}`, 'success');
    } catch (err: any) {
      addToast(err.message || 'Google sign in failed', 'error');
      throw err;
    }
  };

  const loginWithApple = async (email?: string, name?: string) => {
    try {
      const data = await api.loginWithApple({
        email: email || 'patron@privaterelay.appleid.com',
        name: name || 'Apple Patron',
        appleUserId: `apple_${Date.now()}`
      });
      setUser(data.user);
      if (data.token) localStorage.setItem('farmers_mill_token', data.token);
      setIsAuthModalOpen(false);
      addToast('Signed in with Apple ID', 'success');
    } catch (err: any) {
      addToast(err.message || 'Apple sign in failed', 'error');
      throw err;
    }
  };

  const loginWithPasskey = async (email?: string) => {
    try {
      const challengeData = await api.getPasskeyLoginChallenge(email || user?.email);
      let credentialId = `pk_bio_${Date.now()}`;
      
      const result = await api.verifyPasskeyLogin({
        challengeId: challengeData.challengeId,
        credentialId,
        email: email || user?.email
      });

      setUser(result.user);
      if (result.token) localStorage.setItem('farmers_mill_token', result.token);
      setIsAuthModalOpen(false);
      addToast(`Biometric Passkey verified! Welcome, ${result.user.name}.`, 'success');
    } catch (err: any) {
      addToast(err.message || 'Passkey authentication failed', 'error');
      throw err;
    }
  };

  const registerPasskey = async (deviceName?: string) => {
    if (!user) {
      addToast('Please sign in first to register a biometric passkey.', 'error');
      return;
    }
    try {
      const challengeData = await api.getPasskeyRegisterChallenge(user.id || 'usr_priya_sharma');
      const credId = `pk_${Date.now()}`;
      const result = await api.verifyPasskeyRegister({
        challengeId: challengeData.challengeId,
        credentialId: credId,
        deviceName: deviceName || 'Touch ID / Face ID Biometric'
      });
      setUser(result.user);
      addToast('Passkey registered! You can now use biometric fast login.', 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to register passkey', 'error');
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('farmers_mill_token');
      if (token) await api.logout(token);
    } catch (e) {}
    localStorage.removeItem('farmers_mill_token');
    setUser(null);
    addToast('You have signed out.', 'info');
  };

  // Place Order through Backend API
  const placeOrder = async (
    shippingAddress: {
      fullName: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    },
    paymentMethod: string,
    slot: string
  ): Promise<Order> => {
    try {
      const itemsPayload = cart.map((item) => ({
        productId: item.product.id,
        packSize: item.selectedPack.size,
        quantity: item.quantity
      }));

      // Call authoritative backend API
      const serverOrder = await api.createOrder({
        items: itemsPayload,
        shippingAddress,
        paymentMethod,
        deliverySlot: slot,
        couponCode: appliedCoupon
      });

      setOrders((prev) => [serverOrder, ...prev]);
      setLatestOrder(serverOrder);
      clearCart();
      setActivePage('order-success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      addToast(`Order ${serverOrder.id} placed! Fresh stone-milling scheduled.`, 'success');
      return serverOrder;
    } catch (err: any) {
      console.warn('Backend placeOrder fallback:', err);
      // Fallback order generation
      const orderId = `FM-${Math.floor(10000 + Math.random() * 90000)}`;
      const fallbackOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: cart.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          packSize: item.selectedPack.size,
          price: item.selectedPack.price,
          quantity: item.quantity,
          image: item.product.image
        })),
        subtotal: cartSubtotal,
        deliveryFee,
        discount,
        total: cartTotal,
        status: 'Milled on Chakki',
        shippingAddress,
        paymentMethod,
        estimatedDelivery: 'Tomorrow by ' + (slot.includes('Morning') ? '12:00 PM' : '7:00 PM'),
        trackingEvents: [
          { status: 'Order Placed & Confirmed', time: 'Just now', note: 'Queued for fresh milling.' },
          { status: 'Chakki Milling Scheduled', time: 'Tomorrow 5:00 AM', note: 'Cold-milling at 38°C.' }
        ]
      };

      setOrders((prev) => [fallbackOrder, ...prev]);
      setLatestOrder(fallbackOrder);
      clearCart();
      setActivePage('order-success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      addToast(`Order ${orderId} placed successfully!`, 'success');
      return fallbackOrder;
    }
  };

  // Robust Razorpay Payment Processor
  const processRazorpayPayment = async (
    shippingAddress: {
      fullName: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    },
    slot: string
  ): Promise<Order> => {
    setIsProcessingPayment(true);
    try {
      const itemsPayload = cart.map((item) => ({
        productId: item.product.id,
        packSize: item.selectedPack.size,
        quantity: item.quantity
      }));

      // 1. Authoritative Razorpay order creation on backend
      const rzpOrder = await api.createRazorpayOrder({
        items: itemsPayload,
        couponCode: appliedCoupon,
        pincode: shippingAddress.pincode,
        customerName: shippingAddress.fullName,
        customerPhone: shippingAddress.phone
      });

      return new Promise<Order>((resolve, reject) => {
        const hasRazorpaySdk = typeof (window as any).Razorpay !== 'undefined';

        const handleVerification = async (paymentResponse: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const confirmedOrder = await api.verifyRazorpayPayment({
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              items: itemsPayload,
              shippingAddress,
              deliverySlot: slot,
              couponCode: appliedCoupon
            });

            setOrders((prev) => [confirmedOrder, ...prev]);
            setLatestOrder(confirmedOrder);
            clearCart();
            setActivePage('order-success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            addToast(`Payment Verified! Order #${confirmedOrder.id} confirmed.`, 'success');
            setIsProcessingPayment(false);
            resolve(confirmedOrder);
          } catch (verifErr: any) {
            setIsProcessingPayment(false);
            addToast(verifErr.message || 'Signature verification failed', 'error');
            reject(verifErr);
          }
        };

        // If Razorpay SDK is loaded and real credentials are used
        if (hasRazorpaySdk && !rzpOrder.isSimulated) {
          const options = {
            key: rzpOrder.keyId,
            amount: rzpOrder.amount,
            currency: rzpOrder.currency || 'INR',
            name: 'Farmers Mill',
            description: `Fresh Stoneground Milling (${cart.length} items)`,
            image: '/images/farmers-mill-logo.png',
            order_id: rzpOrder.orderId,
            prefill: {
              name: shippingAddress.fullName,
              contact: shippingAddress.phone,
              email: user?.email || 'patron@farmersmill.in'
            },
            notes: {
              pincode: shippingAddress.pincode,
              slot
            },
            theme: {
              color: '#3F6B2C'
            },
            handler: function (response: any) {
              handleVerification(response);
            },
            modal: {
              ondismiss: function () {
                setIsProcessingPayment(false);
                addToast('Razorpay checkout window was dismissed.', 'info');
                reject(new Error('Checkout dismissed by user'));
              }
            }
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.on('payment.failed', function (resp: any) {
            setIsProcessingPayment(false);
            addToast(`Payment failed: ${resp.error?.description || 'Transaction declined'}`, 'error');
            reject(new Error(resp.error?.description || 'Transaction declined'));
          });
          rzp.open();
        } else {
          // Sandbox / Simulation flow for local testing before production live keys
          setTimeout(async () => {
            try {
              const simPaymentId = `pay_sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
              const simSignature = `sim_sig_${Date.now()}`;
              await handleVerification({
                razorpay_order_id: rzpOrder.orderId,
                razorpay_payment_id: simPaymentId,
                razorpay_signature: simSignature
              });
            } catch (e) {
              setIsProcessingPayment(false);
              reject(e);
            }
          }, 900);
        }
      });
    } catch (err: any) {
      setIsProcessingPayment(false);
      addToast(err.message || 'Failed to initiate Razorpay payment', 'error');
      throw err;
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        isLoadingProducts,
        activePage,
        setActivePage,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        openProductDetail,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        freeDeliveryThreshold: freeThreshold,
        freeDeliveryRemaining,
        appliedCoupon,
        discount,
        applyCoupon,
        removeCoupon,
        cartTotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        signup,
        loginWithEmail,
        loginWithGoogle,
        loginWithApple,
        loginWithPasskey,
        registerPasskey,
        logout,
        trackingOrderId,
        setTrackingOrderId,
        openTrackOrder,
        orders,
        latestOrder,
        placeOrder,
        razorpayConfig,
        isProcessingPayment,
        processRazorpayPayment,
        pincodeInfo,
        checkPincode,
        toasts,
        addToast,
        removeToast,
        labReportProduct,
        openLabReport,
        closeLabReport,
        subscriptions,
        addSubscription,
        cancelSubscription
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
