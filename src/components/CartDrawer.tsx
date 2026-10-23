import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
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
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    setActivePage
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));

  const handleProceedCheckout = () => {
    setIsCartDrawerOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="modal-overlay cart-drawer-overlay" onClick={() => setIsCartDrawerOpen(false)} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div
        className="modal-content cart-drawer-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          height: '100vh',
          maxHeight: '100vh',
          borderRadius: '24px 0 0 24px',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          background: '#FBFDF5'
        }}
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="mobile-sheet-pill" style={{ display: 'none', justifyContent: 'center', paddingTop: '10px' }}>
          <div style={{ width: '42px', height: '4px', borderRadius: '999px', background: '#D3E0BC' }} />
        </div>

        {/* Drawer Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #D3E0BC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="#3F6B2C" />
            <h3 style={{ fontSize: '20px' }}>Your Cart ({cartCount})</h3>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#E1EBCB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Close cart drawer"
          >
            <X size={18} color="#1E2B17" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div style={{ padding: '14px 24px', background: freeDeliveryRemaining === 0 ? '#E1EBCB' : '#F2F6E6', borderBottom: '1px solid #D3E0BC' }}>
          {freeDeliveryRemaining === 0 ? (
            <p style={{ fontSize: '13px', color: '#2E5020', fontWeight: 600 }}>
              🎉 <b>Congratulations!</b> You have unlocked FREE Express Delivery!
            </p>
          ) : (
            <div>
              <p style={{ fontSize: '13px', color: '#1E2B17' }}>
                Add <b>₹{freeDeliveryRemaining}</b> more for <b>FREE Delivery</b>!
              </p>
              <div style={{ height: '6px', background: '#D3E0BC', borderRadius: '999px', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: '#3F6B2C', transition: 'width 0.3s ease' }} />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#5C6E52' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E1EBCB', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag size={32} color="#3F6B2C" />
              </div>
              <h4 style={{ fontSize: '20px', color: '#1E2B17' }}>Your cart is empty</h4>
              <p style={{ fontSize: '14px', marginTop: '6px' }}>Freshly stone-ground grains and cold-pressed oils are waiting for you.</p>
              <button
                className="btn p"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setActivePage('shop');
                }}
                style={{ marginTop: '20px' }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedPack.size}`}
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  background: '#ffffff',
                  padding: '12px',
                  borderRadius: '16px',
                  border: '1px solid #D3E0BC'
                }}
              >
                <div className="ph" style={{ width: '74px', height: '74px', borderRadius: '12px', flex: 'none', overflow: 'hidden' }}>
                  <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <b style={{ fontSize: '14px', color: '#1E2B17', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.product.name}
                  </b>
                  <span style={{ fontSize: '12px', color: '#5C6E52', display: 'block', marginTop: '2px' }}>
                    Pack: <b>{item.selectedPack.size}</b> · ₹{item.selectedPack.price}
                  </span>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <div className="quantity-stepper" style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                      <button onClick={() => updateQuantity(item.product.id, item.selectedPack.size, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.selectedPack.size, 1)}>+</button>
                    </div>

                    <b style={{ fontSize: '15px', color: '#1E2B17' }}>
                      ₹{item.selectedPack.price * item.quantity}
                    </b>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedPack.size)}
                  style={{ color: '#8E9F84', padding: '6px' }}
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div style={{ padding: '18px 24px', borderTop: '1px solid #D3E0BC', background: '#FBFDF5', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  placeholder="Coupon (e.g. FARMERS10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 30px',
                    borderRadius: '8px',
                    border: '1px solid #B8CC98',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <Tag size={13} style={{ position: 'absolute', left: '10px', top: '11px', color: '#5C6E52' }} />
              </div>
              <button type="submit" className="btn g sm" style={{ padding: '8px 14px' }}>
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#E1EBCB', padding: '6px 12px', borderRadius: '8px', fontSize: '12px' }}>
                <span>Coupon <b>{appliedCoupon}</b> applied</span>
                <button onClick={removeCoupon} style={{ color: '#D94436', fontWeight: 700, fontSize: '11px' }}>
                  Remove
                </button>
              </div>
            )}

            {/* Price Breakdown */}
            <div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#5C6E52' }}>Items Subtotal</span>
                <b>₹{cartSubtotal}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#5C6E52' }}>Delivery Fee</span>
                <b>{deliveryFee === 0 ? <span style={{ color: '#2E7D32' }}>FREE</span> : `₹${deliveryFee}`}</b>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2E7D32' }}>
                  <span>Discount</span>
                  <b>−₹{discount}</b>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #D3E0BC', paddingTop: '8px', fontSize: '18px', fontWeight: 700, color: '#1E2B17' }}>
                <span>Total Amount</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <button className="btn p" onClick={handleProceedCheckout} style={{ width: '100%', padding: '14px' }}>
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
            <button className="btn g sm" onClick={handleViewCart} style={{ width: '100%', padding: '8px' }}>
              View Complete Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
