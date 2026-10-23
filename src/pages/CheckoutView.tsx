import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  Lock,
  Loader2,
  Info,
  MapPin,
  Clock,
  Sun,
  Sunset,
  Sparkles
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    discount,
    cartTotal,
    user,
    placeOrder,
    setActivePage,
    processRazorpayPayment,
    razorpayConfig,
    isProcessingPayment,
    selectedOutlet
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Address fields - defaulted intelligently to user's saved address or current milling outlet
  const [fullName, setFullName] = useState(user?.name || 'Priya Sharma');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [address, setAddress] = useState(
    user?.addresses?.[0]?.address ||
      (selectedOutlet ? `Near ${selectedOutlet.landmark}, ${selectedOutlet.address}` : 'Flat 402, Green Glen Palms')
  );
  const [city, setCity] = useState(
    user?.addresses?.[0]?.city ||
      (selectedOutlet ? selectedOutlet.city.replace(/ \(Delhi NCR\)/, '') : 'Ghaziabad')
  );
  const [state, setState] = useState(
    user?.addresses?.[0]?.state || selectedOutlet?.state || 'Uttar Pradesh'
  );
  const [pincode, setPincode] = useState(
    user?.addresses?.[0]?.pincode || selectedOutlet?.pincode || '201017'
  );

  // Delivery slot
  const [slot, setSlot] = useState('Morning Fresh Batch (7:00 AM - 11:00 AM)');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');

  if (cart.length === 0) {
    return (
      <div className="w" style={{ paddingTop: '80px', paddingBottom: '100px', textAlign: 'center' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#E1EBCB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: '#3F6B2C'
          }}
        >
          <Truck size={36} />
        </div>
        <h2 style={{ fontSize: '32px', color: '#1E2B17' }}>Your cart is empty</h2>
        <p style={{ marginTop: '10px', color: '#5C6E52', fontSize: '15px' }}>
          Please add fresh stoneground flours, pure spices, or oils to your cart before proceeding to checkout.
        </p>
        <button
          className="btn p"
          onClick={() => setActivePage('shop')}
          style={{ marginTop: '24px', padding: '14px 32px' }}
        >
          Browse Fresh Products
        </button>
      </div>
    );
  }

  const handleStep1Submit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !pincode.trim() || !city.trim()) {
      setValidationError('Please fill in all required shipping address fields.');
      return;
    }
    setValidationError(null);
    setStep(2);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const addressPayload = {
      fullName,
      phone,
      address,
      city,
      state,
      pincode
    };

    if (paymentMethod === 'razorpay') {
      try {
        await processRazorpayPayment(addressPayload, slot);
      } catch (err) {
        // Handled via shop context toasts
      }
    } else {
      placeOrder(addressPayload, 'Cash on Delivery (COD)', slot);
    }
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      <section className="w" style={{ paddingTop: '32px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '13.5px', color: '#5C6E52', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a onClick={() => setActivePage('home')} style={{ color: '#3F6B2C', fontWeight: 500 }}>
            Home
          </a>
          <span>/</span>
          <a onClick={() => setActivePage('cart')} style={{ color: '#3F6B2C', fontWeight: 500 }}>
            Cart
          </a>
          <span>/</span>
          <b style={{ color: '#1E2B17' }}>Checkout</b>
        </div>

        <div style={{ marginTop: '12px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#1E2B17', fontWeight: 700 }}>
            Secure Checkout
          </h1>
          <p style={{ color: '#5C6E52', fontSize: '15px', marginTop: '4px' }}>
            Stoneground fresh to your order · Direct farm-to-doorstep delivery
          </p>
        </div>

        {/* Modern Stepper Progress Bar */}
        <div
          className="card"
          style={{
            padding: '16px 24px',
            background: '#ffffff',
            border: '1px solid #D3E0BC',
            borderRadius: '16px',
            marginBottom: '28px',
            boxShadow: '0 2px 10px rgba(30, 43, 23, 0.04)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              gap: '8px'
            }}
          >
            {/* Step 1: Address */}
            <div
              onClick={() => setStep(1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                flex: 1,
                minWidth: '110px'
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: step > 1 ? '#2E7D32' : step === 1 ? '#3F6B2C' : '#EDF3DF',
                  color: step >= 1 ? '#ffffff' : '#5C6E52',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                  flexShrink: 0,
                  boxShadow: step === 1 ? '0 0 0 4px rgba(63, 107, 44, 0.18)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {step > 1 ? <Check size={18} strokeWidth={2.8} /> : '1'}
              </div>
              <div className="stepper-label">
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: step === 1 ? 700 : 500,
                    color: step === 1 ? '#1E2B17' : step > 1 ? '#2E7D32' : '#7A8C70',
                    display: 'block'
                  }}
                >
                  Shipping Address
                </span>
                <span style={{ fontSize: '11.5px', color: '#8E9F84' }}>Step 1</span>
              </div>
            </div>

            {/* Connecting Line 1 */}
            <div
              style={{
                height: '2px',
                flex: 1,
                maxWidth: '60px',
                background: step > 1 ? '#3F6B2C' : '#D3E0BC',
                transition: 'background 0.3s ease'
              }}
            />

            {/* Step 2: Slot */}
            <div
              onClick={() => {
                if (fullName.trim() && phone.trim() && address.trim()) setStep(2);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                flex: 1,
                minWidth: '110px',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: step > 2 ? '#2E7D32' : step === 2 ? '#3F6B2C' : '#EDF3DF',
                  color: step >= 2 ? '#ffffff' : '#5C6E52',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                  flexShrink: 0,
                  boxShadow: step === 2 ? '0 0 0 4px rgba(63, 107, 44, 0.18)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {step > 2 ? <Check size={18} strokeWidth={2.8} /> : '2'}
              </div>
              <div className="stepper-label">
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: step === 2 ? 700 : 500,
                    color: step === 2 ? '#1E2B17' : step > 2 ? '#2E7D32' : '#7A8C70',
                    display: 'block'
                  }}
                >
                  Delivery Slot
                </span>
                <span style={{ fontSize: '11.5px', color: '#8E9F84' }}>Step 2</span>
              </div>
            </div>

            {/* Connecting Line 2 */}
            <div
              style={{
                height: '2px',
                flex: 1,
                maxWidth: '60px',
                background: step > 2 ? '#3F6B2C' : '#D3E0BC',
                transition: 'background 0.3s ease'
              }}
            />

            {/* Step 3: Payment */}
            <div
              onClick={() => {
                if (fullName.trim() && phone.trim() && address.trim()) setStep(3);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                flex: 1,
                minWidth: '110px',
                justifyContent: 'flex-end'
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: step === 3 ? '#3F6B2C' : '#EDF3DF',
                  color: step === 3 ? '#ffffff' : '#5C6E52',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                  flexShrink: 0,
                  boxShadow: step === 3 ? '0 0 0 4px rgba(63, 107, 44, 0.18)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                3
              </div>
              <div className="stepper-label">
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: step === 3 ? 700 : 500,
                    color: step === 3 ? '#1E2B17' : '#7A8C70',
                    display: 'block'
                  }}
                >
                  Payment &amp; Review
                </span>
                <span style={{ fontSize: '11.5px', color: '#8E9F84' }}>Step 3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Checkout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(20px, 3.5vw, 32px)',
            alignItems: 'start'
          }}
        >
          {/* Main Card: Step Content Form */}
          <div
            className="card"
            style={{
              padding: 'clamp(20px, 3.5vw, 36px)',
              background: '#ffffff',
              border: '1.5px solid #D3E0BC',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(30, 43, 23, 0.05)'
            }}
          >
            {/* STEP 1: SHIPPING ADDRESS */}
            {step === 1 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: '#EDF3DF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3F6B2C'
                    }}
                  >
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '22px', color: '#1E2B17' }}>1. Delivery Address</h3>
                    <p style={{ fontSize: '13.5px', color: '#5C6E52' }}>
                      Where should our delivery partner bring your freshly milled package?
                    </p>
                  </div>
                </div>

                {validationError && (
                  <div
                    style={{
                      margin: '16px 0',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: '#FDF2F2',
                      border: '1px solid #F8B4B4',
                      color: '#9B1C1C',
                      fontSize: '13.5px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Info size={16} />
                    <span>{validationError}</span>
                  </div>
                )}

                <form onSubmit={handleStep1Submit} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '6px' }}>
                        Full Name <span style={{ color: '#D94436' }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (validationError) setValidationError(null);
                        }}
                        placeholder="e.g. Priya Sharma"
                        required
                        className="input-field"
                        style={{ height: '48px', borderRadius: '12px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '6px' }}>
                        Mobile Phone Number <span style={{ color: '#D94436' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (validationError) setValidationError(null);
                        }}
                        placeholder="e.g. +91 98765 43210"
                        required
                        className="input-field"
                        style={{ height: '48px', borderRadius: '12px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '6px' }}>
                      Complete Street Address <span style={{ color: '#D94436' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (validationError) setValidationError(null);
                      }}
                      placeholder="Flat / House No., Apartment Name, Street, Landmark"
                      required
                      className="input-field"
                      style={{ height: '48px', borderRadius: '12px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '6px' }}>
                        City <span style={{ color: '#D94436' }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="input-field"
                        style={{ height: '48px', borderRadius: '12px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '6px' }}>
                        State <span style={{ color: '#D94436' }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        className="input-field"
                        style={{ height: '48px', borderRadius: '12px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '6px' }}>
                        Pincode <span style={{ color: '#D94436' }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                        maxLength={6}
                        placeholder="6 digits"
                        className="input-field"
                        style={{ height: '48px', borderRadius: '12px' }}
                      />
                    </div>
                  </div>

                  {/* Step 1 Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '14px',
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid #EDF3DF'
                    }}
                  >
                    <button
                      type="submit"
                      className="btn p"
                      style={{
                        height: '48px',
                        padding: '0 28px',
                        fontSize: '15px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span>Continue to Delivery Slot</span>
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 2: DELIVERY SLOT */}
            {step === 2 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: '#EDF3DF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3F6B2C'
                    }}
                  >
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '22px', color: '#1E2B17' }}>2. Preferred Delivery Slot</h3>
                    <p style={{ fontSize: '13.5px', color: '#5C6E52' }}>
                      Milled at dawn to ensure peak flavor, live aroma, and complete nutrient retention.
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    {
                      id: 'Morning Fresh Batch (7:00 AM - 11:00 AM)',
                      title: 'Morning Chakki Slot (7:00 AM - 11:00 AM)',
                      badge: 'Recommended',
                      icon: <Sun size={20} color="#D4A346" />,
                      desc: 'Milled at dawn, delivered warm and fresh directly for your family’s breakfast and lunch rotis.'
                    },
                    {
                      id: 'Evening Doorstep (4:00 PM - 8:00 PM)',
                      title: 'Evening Doorstep (4:00 PM - 8:00 PM)',
                      badge: 'Popular',
                      icon: <Sunset size={20} color="#3F6B2C" />,
                      desc: 'Ideal after work hours. Packaged in multilayer airtight eco-pouches to lock in freshness.'
                    },
                    {
                      id: 'Standard Next Day (Anytime 9 AM - 6 PM)',
                      title: 'Standard Day Delivery (9:00 AM - 6:00 PM)',
                      badge: null,
                      icon: <Truck size={20} color="#5C6E52" />,
                      desc: 'Delivered throughout the day with real-time SMS tracking and courier updates.'
                    }
                  ].map((s) => {
                    const isSelected = slot === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSlot(s.id)}
                        className="card"
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '16px',
                          padding: '18px 20px',
                          borderRadius: '16px',
                          border: isSelected ? '2px solid #3F6B2C' : '1.5px solid #D3E0BC',
                          background: isSelected ? '#F2F6E6' : '#ffffff',
                          cursor: 'pointer',
                          boxShadow: isSelected ? '0 4px 16px rgba(63, 107, 44, 0.12)' : '0 1px 4px rgba(0,0,0,0.02)',
                          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      >
                        {/* Custom Radio Circle */}
                        <div
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            border: isSelected ? '6px solid #3F6B2C' : '2px solid #B8CC98',
                            background: '#ffffff',
                            marginTop: '2px',
                            flexShrink: 0,
                            transition: 'all 0.2s ease'
                          }}
                        />

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span>{s.icon}</span>
                              <b style={{ color: '#1E2B17', fontSize: '15.5px' }}>{s.title}</b>
                            </div>
                            {s.badge && (
                              <span
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  background: s.badge === 'Recommended' ? '#FEF3D6' : '#E1EBCB',
                                  color: s.badge === 'Recommended' ? '#946808' : '#2E5220',
                                  padding: '3px 8px',
                                  borderRadius: '999px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.04em'
                                }}
                              >
                                {s.badge}
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: '13.5px', color: '#5C6E52', marginTop: '6px', lineHeight: 1.5 }}>
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Step 2 Action Buttons with Matched Heights */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '14px',
                      marginTop: '20px',
                      paddingTop: '20px',
                      borderTop: '1px solid #EDF3DF',
                      flexWrap: 'wrap'
                    }}
                  >
                    <button
                      type="button"
                      className="btn g"
                      onClick={() => setStep(1)}
                      style={{
                        height: '48px',
                        padding: '0 22px',
                        fontSize: '14.5px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Address</span>
                    </button>

                    <button
                      type="button"
                      className="btn p"
                      onClick={() => setStep(3)}
                      style={{
                        height: '48px',
                        padding: '0 28px',
                        fontSize: '15px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT & REVIEW */}
            {step === 3 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: '#EDF3DF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#3F6B2C'
                      }}
                    >
                      <CreditCard size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '22px', color: '#1E2B17' }}>3. Secure Payment</h3>
                      <p style={{ fontSize: '13.5px', color: '#5C6E52' }}>
                        Select payment option to confirm your fresh milling order.
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      background: '#E1EBCB',
                      color: '#1E3415',
                      padding: '5px 12px',
                      borderRadius: '999px',
                      fontWeight: 600
                    }}
                  >
                    <Lock size={13} />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>

                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Razorpay Online Payment Card */}
                  <div
                    onClick={() => setPaymentMethod('razorpay')}
                    className="card"
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      border: paymentMethod === 'razorpay' ? '2px solid #3F6B2C' : '1.5px solid #D3E0BC',
                      background: paymentMethod === 'razorpay' ? '#F2F6E6' : '#ffffff',
                      cursor: 'pointer',
                      boxShadow: paymentMethod === 'razorpay' ? '0 4px 16px rgba(63, 107, 44, 0.12)' : '0 1px 4px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          border: paymentMethod === 'razorpay' ? '6px solid #3F6B2C' : '2px solid #B8CC98',
                          background: '#ffffff',
                          marginTop: '3px',
                          flexShrink: 0,
                          transition: 'all 0.2s ease'
                        }}
                      />

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <b style={{ fontSize: '16px', color: '#1E2B17', display: 'block' }}>
                              Razorpay Instant &amp; Secure Checkout
                            </b>
                            <span style={{ fontSize: '13px', color: '#5C6E52', display: 'block', marginTop: '2px' }}>
                              UPI (GPay / PhonePe / Paytm), Credit / Debit Cards, NetBanking &amp; Wallets
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              background: '#0B2545',
                              color: '#ffffff',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              letterSpacing: '0.04em'
                            }}
                          >
                            Official Razorpay
                          </span>
                        </div>

                        {/* Payment Method Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
                          <span
                            style={{
                              fontSize: '12px',
                              background: '#ffffff',
                              padding: '5px 10px',
                              borderRadius: '8px',
                              border: '1px solid #D3E0BC',
                              color: '#2E5220',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            ⚡ UPI (Google Pay, PhonePe, Paytm, Cred)
                          </span>
                          <span
                            style={{
                              fontSize: '12px',
                              background: '#ffffff',
                              padding: '5px 10px',
                              borderRadius: '8px',
                              border: '1px solid #D3E0BC',
                              color: '#1E2B17'
                            }}
                          >
                            💳 Visa, Mastercard, RuPay
                          </span>
                          <span
                            style={{
                              fontSize: '12px',
                              background: '#ffffff',
                              padding: '5px 10px',
                              borderRadius: '8px',
                              border: '1px solid #D3E0BC',
                              color: '#1E2B17'
                            }}
                          >
                            🏦 50+ Banks NetBanking
                          </span>
                        </div>

                        {razorpayConfig?.isTestMode && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: '#FEF3D6',
                              padding: '8px 12px',
                              borderRadius: '8px',
                              fontSize: '12.5px',
                              color: '#946808',
                              marginTop: '12px'
                            }}
                          >
                            <Info size={15} style={{ flexShrink: 0 }} />
                            <span>
                              <b>Test Sandbox Active:</b> Safe demo mode. Instant payment verification without real money deduction.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Cash on Delivery (COD) Card */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className="card"
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      border: paymentMethod === 'cod' ? '2px solid #3F6B2C' : '1.5px solid #D3E0BC',
                      background: paymentMethod === 'cod' ? '#F2F6E6' : '#ffffff',
                      cursor: 'pointer',
                      boxShadow: paymentMethod === 'cod' ? '0 4px 16px rgba(63, 107, 44, 0.12)' : '0 1px 4px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          border: paymentMethod === 'cod' ? '6px solid #3F6B2C' : '2px solid #B8CC98',
                          background: '#ffffff',
                          flexShrink: 0,
                          transition: 'all 0.2s ease'
                        }}
                      />

                      <div style={{ flex: 1 }}>
                        <b style={{ fontSize: '15.5px', color: '#1E2B17', display: 'block' }}>
                          Cash / UPI on Delivery (COD)
                        </b>
                        <span style={{ fontSize: '13px', color: '#5C6E52', display: 'block', marginTop: '2px' }}>
                          Pay with cash or scan delivery partner's UPI QR code upon doorstep arrival
                        </span>
                      </div>

                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: '#EDF3DF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#3F6B2C',
                          flexShrink: 0
                        }}
                      >
                        <Banknote size={22} />
                      </div>
                    </div>
                  </div>

                  {/* Security Assurance Banner */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: '#F8FAF2',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '1px solid #D3E0BC',
                      fontSize: '12.5px',
                      color: '#435538'
                    }}
                  >
                    <ShieldCheck size={22} color="#3F6B2C" style={{ flexShrink: 0 }} />
                    <span>
                      Order is authoritatively verified on the secure backend. Fresh milling queue begins automatically upon order confirmation.
                    </span>
                  </div>

                  {/* Step 3 Action Buttons with Matched Heights */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      marginTop: '20px',
                      paddingTop: '20px',
                      borderTop: '1px solid #EDF3DF',
                      flexWrap: 'wrap'
                    }}
                  >
                    <button
                      type="button"
                      className="btn g"
                      onClick={() => setStep(2)}
                      disabled={isProcessingPayment}
                      style={{
                        height: '50px',
                        padding: '0 24px',
                        fontSize: '14.5px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Slots</span>
                    </button>

                    <button
                      type="button"
                      className="btn p"
                      onClick={handlePlaceOrder}
                      disabled={isProcessingPayment}
                      style={{
                        flex: 1,
                        minWidth: '220px',
                        height: '50px',
                        padding: '0 28px',
                        fontSize: '16px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        boxShadow: '0 4px 14px rgba(63, 107, 44, 0.35)'
                      }}
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                          <span>Connecting to Razorpay...</span>
                        </>
                      ) : paymentMethod === 'razorpay' ? (
                        <>
                          <Lock size={17} />
                          <span>Pay with Razorpay · ₹{cartTotal}</span>
                          <ArrowRight size={17} />
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={19} />
                          <span>Confirm COD Order · ₹{cartTotal}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Order Summary Column */}
          <aside
            className="card"
            style={{
              padding: 'clamp(20px, 3vw, 28px)',
              background: '#FBFDF5',
              border: '1.5px solid #D3E0BC',
              borderRadius: '20px',
              position: 'sticky',
              top: '84px',
              boxShadow: '0 4px 20px rgba(30, 43, 23, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', color: '#1E2B17', fontWeight: 700 }}>
                Order Summary
              </h3>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  background: '#EDF3DF',
                  color: '#3F6B2C',
                  padding: '3px 10px',
                  borderRadius: '999px'
                }}
              >
                {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>

            {/* Cart Items List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                borderBottom: '1px solid #D3E0BC',
                paddingBottom: '16px',
                maxHeight: '260px',
                overflowY: 'auto',
                paddingRight: '4px'
              }}
            >
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedPack.size}`}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    padding: '6px 0'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      flexShrink: 0,
                      overflow: 'hidden',
                      background: '#ffffff',
                      border: '1px solid #D3E0BC'
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <b
                      style={{
                        fontSize: '13.5px',
                        color: '#1E2B17',
                        display: 'block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {item.product.name}
                    </b>
                    <span style={{ fontSize: '12px', color: '#5C6E52' }}>
                      {item.selectedPack.size} &times; {item.quantity}
                    </span>
                  </div>
                  <b style={{ fontSize: '14.5px', color: '#1E2B17', flexShrink: 0 }}>
                    ₹{item.selectedPack.price * item.quantity}
                  </b>
                </div>
              ))}
            </div>

            {/* Live Address & Slot Preview */}
            <div
              style={{
                padding: '14px 0',
                borderBottom: '1px solid #D3E0BC',
                fontSize: '12.5px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div>
                <span style={{ color: '#5C6E52', fontWeight: 600, display: 'block' }}>Delivery To:</span>
                <span style={{ color: '#1E2B17', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                  {fullName} ({phone})
                </span>
                <span style={{ color: '#435538', display: 'block', marginTop: '1px' }}>
                  {address}, {city}, {state} - {pincode}
                </span>
              </div>
              <div style={{ marginTop: '4px' }}>
                <span style={{ color: '#5C6E52', fontWeight: 600, display: 'block' }}>Selected Slot:</span>
                <span style={{ color: '#2E5220', fontWeight: 600 }}>{slot.split('(')[0]}</span>
              </div>
            </div>

            {/* Financial Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', marginTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#5C6E52' }}>Bag Subtotal</span>
                <b style={{ color: '#1E2B17' }}>₹{cartSubtotal}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#5C6E52' }}>Doorstep Delivery</span>
                <b>
                  {deliveryFee === 0 ? (
                    <span
                      style={{
                        color: '#2E7D32',
                        background: '#E1EBCB',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700
                      }}
                    >
                      FREE
                    </span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </b>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2E7D32' }}>
                  <span>Special Discount</span>
                  <b>−₹{discount}</b>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1.5px dashed #D3E0BC',
                  paddingTop: '12px',
                  marginTop: '4px'
                }}
              >
                <div>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1E2B17', display: 'block' }}>
                    Grand Total
                  </span>
                  <span style={{ fontSize: '11px', color: '#8E9F84' }}>Inclusive of all taxes</span>
                </div>
                <span style={{ fontSize: '22px', fontWeight: 800, color: '#1E2B17' }}>
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            {/* Trust Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '18px',
                padding: '12px',
                background: '#EDF3DF',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#2E5220'
              }}
            >
              <Sparkles size={18} style={{ flexShrink: 0 }} />
              <span>
                <strong>100% Freshness Guarantee.</strong> Milled only after order is booked.
              </span>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .stepper-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
