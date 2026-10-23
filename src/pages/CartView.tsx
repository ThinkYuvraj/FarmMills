import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, ArrowLeft, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck } from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    deliveryFee,
    freeDeliveryThreshold,
    freeDeliveryRemaining,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartTotal,
    updateQuantity,
    removeFromCart,
    setActivePage
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="w" style={{ paddingTop: '60px', paddingBottom: '100px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#E1EBCB', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShoppingBag size={40} color="#3F6B2C" />
        </div>
        <h1 style={{ fontSize: '36px' }}>Your cart is empty</h1>
        <p style={{ fontSize: '16px', color: '#5C6E52', marginTop: '10px', maxWidth: '440px', margin: '10px auto 0' }}>
          Looks like you haven't added any fresh stoneground flour, pure spices, or oils yet.
        </p>
        <button
          className="btn p lg"
          onClick={() => setActivePage('shop')}
          style={{ marginTop: '28px' }}
        >
          Explore Fresh Mill Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      <section className="w" style={{ paddingTop: '40px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '14px', color: '#5C6E52', display: 'flex', gap: '6px', alignItems: 'center' }}>
          <a onClick={() => setActivePage('home')} style={{ color: '#3F6B2C' }}>Home</a>
          <span>/</span>
          <b style={{ color: '#1E2B17' }}>Cart</b>
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 46px)', marginTop: '10px' }}>
          Your cart <span style={{ fontSize: '20px', fontFamily: 'DM Sans, sans-serif', fontWeight: 400, color: '#5C6E52' }}>({cartCount} items)</span>
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(20px, 3.5vw, 32px)',
            marginTop: '24px',
            alignItems: 'start'
          }}
        >
          {/* Items List Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedPack.size}`}
                className="card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  background: '#ffffff'
                }}
              >
                <div
                  className="ph"
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '16px',
                    flex: 'none',
                    overflow: 'hidden'
                  }}
                >
                  <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ flex: 1, minWidth: '180px' }}>
                  <span style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 700, textTransform: 'uppercase' }}>
                    {item.product.category}
                  </span>
                  <h3 style={{ fontSize: '19px', marginTop: '2px', color: '#1E2B17' }}>
                    {item.product.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '4px' }}>
                    Pack size: <b>{item.selectedPack.size}</b>
                  </p>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedPack.size)}
                    style={{
                      fontSize: '13px',
                      color: '#D94436',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '10px'
                    }}
                  >
                    <Trash2 size={14} />
                    <span>Remove</span>
                  </button>
                </div>

                <div className="quantity-stepper">
                  <button onClick={() => updateQuantity(item.product.id, item.selectedPack.size, -1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.selectedPack.size, 1)}>+</button>
                </div>

                <b style={{ minWidth: '90px', textAlign: 'right', fontSize: '20px', color: '#1E2B17' }}>
                  ₹{item.selectedPack.price * item.quantity}
                </b>
              </div>
            ))}

            {/* Free Delivery Banner */}
            <div
              className="card"
              style={{
                padding: '20px',
                background: freeDeliveryRemaining === 0 ? '#E1EBCB' : '#EDF3DF',
                borderColor: '#B8CC98',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                fontSize: '15px'
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#3F6B2C', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <Truck size={20} />
              </div>
              <div>
                {freeDeliveryRemaining === 0 ? (
                  <b style={{ color: '#2E5020' }}>
                    You have unlocked FREE delivery for this order!
                  </b>
                ) : (
                  <span>
                    <b>Free delivery</b> on orders above ₹{freeDeliveryThreshold}. Add <b>₹{freeDeliveryRemaining}</b> more to qualify.
                  </span>
                )}
              </div>
            </div>

            {/* Back to Shop Link */}
            <div>
              <button
                onClick={() => setActivePage('shop')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#3F6B2C',
                  fontWeight: 700,
                  fontSize: '15px'
                }}
              >
                <ArrowLeft size={16} />
                <span>Continue shopping for more grains</span>
              </button>
            </div>
          </div>

          {/* Aside Order Summary Card */}
          <aside
            className="card"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              background: '#FBFDF5',
              boxShadow: 'var(--shadow-md)',
              position: 'sticky',
              top: '100px'
            }}
          >
            <h3 style={{ fontSize: '24px', color: '#1E2B17' }}>Order Summary</h3>

            {/* Mini Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid #D3E0BC', paddingBottom: '16px' }}>
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedPack.size}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="ph" style={{ width: '38px', height: '38px', borderRadius: '8px', flex: 'none', overflow: 'hidden' }}>
                      <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <b style={{ color: '#1E2B17' }}>{item.product.name}</b>
                      <span style={{ fontSize: '12px', color: '#5C6E52', display: 'block' }}>
                        {item.selectedPack.size} × {item.quantity}
                      </span>
                    </div>
                  </div>
                  <b>₹{item.selectedPack.price * item.quantity}</b>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  placeholder="Coupon code (e.g. FARMERS10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '32px', fontSize: '14px' }}
                />
                <Tag size={14} style={{ position: 'absolute', left: '10px', top: '15px', color: '#7E9171' }} />
              </div>
              <button type="submit" className="btn g sm" style={{ padding: '10px 18px' }}>
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#E1EBCB', padding: '8px 12px', borderRadius: '10px', fontSize: '13px' }}>
                <span>Coupon <b>{appliedCoupon}</b> applied</span>
                <button onClick={removeCoupon} style={{ color: '#D94436', fontWeight: 700, fontSize: '12px' }}>
                  Remove
                </button>
              </div>
            )}

            {/* Cost Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px' }}>
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
                  <span>Coupon Discount</span>
                  <b>−₹{discount}</b>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #D3E0BC', paddingTop: '12px', fontSize: '20px', fontWeight: 700, color: '#1E2B17' }}>
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <button
              className="btn p lg"
              onClick={() => {
                setActivePage('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ width: '100%', marginTop: '6px' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', color: '#5C6E52', marginTop: '6px' }}>
              <ShieldCheck size={16} color="#3F6B2C" />
              <span>Safe &amp; Encrypted SSL Checkout</span>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
