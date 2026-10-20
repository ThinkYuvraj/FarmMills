import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Truck, CreditCard, QrCode, Banknote, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { cart, cartSubtotal, deliveryFee, discount, cartTotal, user, placeOrder, setActivePage } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address fields
  const [fullName, setFullName] = useState(user?.name || 'Priya Sharma');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [address, setAddress] = useState(user?.addresses?.[0]?.address || 'Flat 402, Green Glen Palms, Bellandur');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState(user?.addresses?.[0]?.pincode || '560103');

  // Delivery slot
  const [slot, setSlot] = useState('Morning Fresh Batch (7:00 AM - 11:00 AM)');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('priyasharma@oksbi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');

  if (cart.length === 0) {
    return (
      <div className="w" style={{ paddingTop: '80px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px' }}>Your cart is empty</h2>
        <p style={{ marginTop: '10px', color: '#5C6E52' }}>Please add products to your cart before proceeding to checkout.</p>
        <button className="btn p" onClick={() => setActivePage('shop')} style={{ marginTop: '20px' }}>
          Browse Fresh Products
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPayment =
      paymentMethod === 'upi'
        ? `UPI (${upiId})`
        : paymentMethod === 'card'
        ? `Card (${cardNumber})`
        : 'Cash on Delivery (COD)';

    placeOrder(
      {
        fullName,
        phone,
        address,
        city,
        state,
        pincode
      },
      formattedPayment,
      slot
    );
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      <section className="w" style={{ paddingTop: '40px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '14px', color: '#5C6E52', display: 'flex', gap: '6px' }}>
          <a onClick={() => setActivePage('home')} style={{ color: '#3F6B2C' }}>Home</a>
          <span>/</span>
          <a onClick={() => setActivePage('cart')} style={{ color: '#3F6B2C' }}>Cart</a>
          <span>/</span>
          <b style={{ color: '#1E2B17' }}>Checkout</b>
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 46px)', marginTop: '10px' }}>Checkout</h1>

        {/* 3 Step Pill Indicator */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '18px' }}>
          <button
            onClick={() => setStep(1)}
            className={`btn sm ${step === 1 ? 'p' : 'g'}`}
            style={{ padding: '8px 18px', fontSize: '14px' }}
          >
            1 Shipping Address
          </button>
          <button
            onClick={() => setStep(2)}
            className={`btn sm ${step === 2 ? 'p' : 'g'}`}
            style={{ padding: '8px 18px', fontSize: '14px' }}
          >
            2 Delivery Slot
          </button>
          <button
            onClick={() => setStep(3)}
            className={`btn sm ${step === 3 ? 'p' : 'g'}`}
            style={{ padding: '8px 18px', fontSize: '14px' }}
          >
            3 Payment &amp; Review
          </button>
        </div>

        {/* Main Checkout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginTop: '32px',
            alignItems: 'start'
          }}
        >
          {/* Form Step Column */}
          <div className="card" style={{ padding: '32px', background: '#ffffff' }}>
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>1. Delivery Address</h3>
                <p style={{ fontSize: '14px', color: '#5C6E52', marginBottom: '24px' }}>
                  Where should we send your freshly ground grains and spices?
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Mobile Phone Number *
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Complete Street Address (Flat / House No, Building, Landmark) *
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="input-field"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        City *
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        State *
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Pincode *
                      </label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                        maxLength={6}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn p"
                    onClick={() => setStep(2)}
                    style={{ marginTop: '12px', alignSelf: 'flex-start', padding: '12px 28px' }}
                  >
                    <span>Proceed to Delivery Slot</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>2. Preferred Delivery Slot</h3>
                <p style={{ fontSize: '14px', color: '#5C6E52', marginBottom: '24px' }}>
                  Our chakkis mill every morning at dawn. Choose when you want the delivery executive at your door.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    {
                      id: 'Morning Fresh Batch (7:00 AM - 11:00 AM)',
                      title: 'Morning Chakki Slot (7:00 AM - 11:00 AM)',
                      desc: 'Milled dawn hours, delivered warm and fresh for breakfast/lunch rotis.'
                    },
                    {
                      id: 'Evening Doorstep (4:00 PM - 8:00 PM)',
                      title: 'Evening Doorstep (4:00 PM - 8:00 PM)',
                      desc: 'Convenient after-work delivery. Guaranteed airtight safety seal.'
                    },
                    {
                      id: 'Standard Next Day (Anytime 9 AM - 6 PM)',
                      title: 'Standard Next Day (Anytime 9 AM - 6 PM)',
                      desc: 'Delivered anytime with real-time SMS tracking updates.'
                    }
                  ].map((s) => (
                    <label
                      key={s.id}
                      onClick={() => setSlot(s.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '14px',
                        padding: '16px',
                        borderRadius: '16px',
                        border: slot === s.id ? '2px solid #3F6B2C' : '1px solid #D3E0BC',
                        background: slot === s.id ? '#F2F6E6' : '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="delivery-slot"
                        checked={slot === s.id}
                        onChange={() => setSlot(s.id)}
                        style={{ marginTop: '4px', accentColor: '#3F6B2C' }}
                      />
                      <div>
                        <b style={{ color: '#1E2B17', fontSize: '15px' }}>{s.title}</b>
                        <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '4px' }}>{s.desc}</p>
                      </div>
                    </label>
                  ))}

                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button type="button" className="btn g" onClick={() => setStep(1)}>
                      Back to Address
                    </button>
                    <button type="button" className="btn p" onClick={() => setStep(3)}>
                      <span>Proceed to Payment</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>3. Payment &amp; Confirmation</h3>
                <p style={{ fontSize: '14px', color: '#5C6E52', marginBottom: '24px' }}>
                  Select your preferred secure payment method.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Payment Options */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`btn sm ${paymentMethod === 'upi' ? 'p' : 'g'}`}
                      style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}
                    >
                      <QrCode size={22} />
                      <span>Instant UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`btn sm ${paymentMethod === 'card' ? 'p' : 'g'}`}
                      style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}
                    >
                      <CreditCard size={22} />
                      <span>Card / NetBanking</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`btn sm ${paymentMethod === 'cod' ? 'p' : 'g'}`}
                      style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}
                    >
                      <Banknote size={22} />
                      <span>Cash on Delivery</span>
                    </button>
                  </div>

                  {/* Payment Details Container */}
                  {paymentMethod === 'upi' && (
                    <div className="card" style={{ padding: '20px', background: '#F2F6E6', textAlign: 'center' }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#1E2B17' }}>Scan &amp; Pay via any UPI App</p>
                      <div style={{ width: '140px', height: '140px', background: '#ffffff', borderRadius: '12px', border: '1px solid #D3E0BC', margin: '14px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <QrCode size={110} color="#3F6B2C" />
                      </div>
                      <p style={{ fontSize: '12px', color: '#5C6E52' }}>
                        Supports Google Pay, PhonePe, Paytm, BHIM &amp; Cred
                      </p>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Or enter UPI ID (e.g. name@upi)"
                        className="input-field"
                        style={{ marginTop: '12px', textAlign: 'center' }}
                      />
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="card" style={{ padding: '20px', background: '#F2F6E6', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600 }}>Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="input-field"
                          style={{ marginTop: '4px' }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600 }}>Expiry (MM/YY)</label>
                          <input type="text" defaultValue="08/29" className="input-field" style={{ marginTop: '4px' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600 }}>CVV</label>
                          <input type="password" defaultValue="892" maxLength={4} className="input-field" style={{ marginTop: '4px' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="card" style={{ padding: '16px', background: '#F2F6E6' }}>
                      <p style={{ fontSize: '14px', color: '#1E2B17', lineHeight: 1.5 }}>
                        💵 <b>Cash on Delivery:</b> Pay ₹{cartTotal} in cash or via UPI QR to the delivery executive when the fresh package arrives.
                      </p>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button type="button" className="btn g" onClick={() => setStep(2)}>
                      Back to Slots
                    </button>
                    <button
                      type="button"
                      className="btn p lg"
                      onClick={handlePlaceOrder}
                      style={{ flex: 1 }}
                    >
                      <span>Place Order (₹{cartTotal})</span>
                      <CheckCircle2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Order Summary Column */}
          <aside className="card" style={{ padding: '28px', background: '#FBFDF5', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '22px', color: '#1E2B17', marginBottom: '16px' }}>Order Items ({cart.length})</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderBottom: '1px solid #D3E0BC', paddingBottom: '16px' }}>
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedPack.size}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div className="ph" style={{ width: '48px', height: '48px', borderRadius: '10px', flex: 'none', overflow: 'hidden' }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <b style={{ fontSize: '14px', color: '#1E2B17', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.product.name}
                    </b>
                    <span style={{ fontSize: '12px', color: '#5C6E52' }}>
                      {item.selectedPack.size} × {item.quantity}
                    </span>
                  </div>
                  <b style={{ fontSize: '15px' }}>₹{item.selectedPack.price * item.quantity}</b>
                </div>
              ))}
            </div>

            {/* Selected Address Preview */}
            <div style={{ padding: '12px 0', borderBottom: '1px solid #D3E0BC', fontSize: '13px' }}>
              <span style={{ color: '#5C6E52', display: 'block' }}>Delivery Address:</span>
              <b style={{ color: '#1E2B17', display: 'block', marginTop: '2px' }}>{fullName} ({phone})</b>
              <span style={{ color: '#435538' }}>{address}, {city}, {state} - {pincode}</span>
            </div>

            {/* Financial summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#5C6E52' }}>Subtotal</span>
                <b>₹{cartSubtotal}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#5C6E52' }}>Delivery</span>
                <b>{deliveryFee === 0 ? <span style={{ color: '#2E7D32' }}>FREE</span> : `₹${deliveryFee}`}</b>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2E7D32' }}>
                  <span>Discount</span>
                  <b>−₹{discount}</b>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #D3E0BC', paddingTop: '10px', fontSize: '19px', fontWeight: 700, color: '#1E2B17' }}>
                <span>Total Amount</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '12px', color: '#5C6E52' }}>
              <ShieldCheck size={18} color="#3F6B2C" />
              <span>100% Satisfaction Guarantee. Free replacements if quality does not wow you.</span>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
