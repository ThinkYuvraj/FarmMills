import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { Check, Sparkles, Printer, ArrowRight, Package, Clock, ShieldCheck, ShoppingBag } from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { latestOrder, orders, setActivePage, openTrackOrder } = useShop();

  const order = latestOrder || orders[0];

  useEffect(() => {
    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3F6B2C', '#7BC652', '#D4A346', '#E1EBCB']
      });
    } catch (e) {}
  }, []);

  if (!order) {
    return (
      <div className="w" style={{ paddingTop: '80px', textAlign: 'center' }}>
        <h2>No active order found</h2>
        <button className="btn p" onClick={() => setActivePage('home')} style={{ marginTop: '20px' }}>
          Go to Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      <section className="w" style={{ paddingTop: '56px', maxWidth: '840px' }}>
        {/* Success Header */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: '#3F6B2C',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(63, 107, 44, 0.3)'
            }}
          >
            <Check size={44} color="#ffffff" strokeWidth={3} />
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#E1EBCB',
              color: '#3F6B2C',
              fontWeight: 700,
              fontSize: '13px',
              padding: '6px 14px',
              borderRadius: '999px',
              marginTop: '20px'
            }}
          >
            <Sparkles size={14} /> ORDER CONFIRMED &amp; QUEUED FOR CHAKKI MILLING
          </span>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginTop: '12px' }}>
            Thank you for choosing pure food!
          </h1>
          <p style={{ fontSize: '17px', color: '#5C6E52', marginTop: '10px', maxWidth: '560px', margin: '10px auto 0' }}>
            Your order <b>#{order.id}</b> is registered. Our traditional emery stone chakki will grind your batch with care.
          </p>
        </div>

        {/* Live Milling Timeline Card */}
        <div className="card" style={{ marginTop: '36px', padding: '28px', background: '#FBFDF5' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} color="#3F6B2C" />
            <span>Live Milling &amp; Dispatch Status</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
            <div style={{ borderLeft: '4px solid #3F6B2C', paddingLeft: '12px' }}>
              <span style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 700 }}>STEP 1 · DONE</span>
              <b style={{ display: 'block', fontSize: '15px', marginTop: '2px' }}>Order Placed</b>
              <p style={{ fontSize: '12px', color: '#5C6E52', marginTop: '2px' }}>Grains assigned from batch</p>
            </div>

            <div style={{ borderLeft: '4px solid #3F6B2C', paddingLeft: '12px', background: '#F2F6E6', padding: '8px 12px', borderRadius: '0 8px 8px 0' }}>
              <span style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 700 }}>STEP 2 · IN PROGRESS</span>
              <b style={{ display: 'block', fontSize: '15px', marginTop: '2px' }}>Stone Chakki Milling</b>
              <p style={{ fontSize: '12px', color: '#5C6E52', marginTop: '2px' }}>Slow low-heat grinding</p>
            </div>

            <div style={{ borderLeft: '4px solid #D3E0BC', paddingLeft: '12px' }}>
              <span style={{ fontSize: '12px', color: '#8E9F84', fontWeight: 700 }}>STEP 3 · UPCOMING</span>
              <b style={{ display: 'block', fontSize: '15px', marginTop: '2px', color: '#5C6E52' }}>Airtight Sealing</b>
              <p style={{ fontSize: '12px', color: '#8E9F84', marginTop: '2px' }}>Freshness date stamped</p>
            </div>

            <div style={{ borderLeft: '4px solid #D3E0BC', paddingLeft: '12px' }}>
              <span style={{ fontSize: '12px', color: '#8E9F84', fontWeight: 700 }}>STEP 4 · DELIVERY</span>
              <b style={{ display: 'block', fontSize: '15px', marginTop: '2px', color: '#5C6E52' }}>Doorstep Delivery</b>
              <p style={{ fontSize: '12px', color: '#8E9F84', marginTop: '2px' }}>{order.estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Detailed Receipt Card */}
        <div className="card" style={{ marginTop: '28px', padding: '32px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #D3E0BC', paddingBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <b style={{ fontSize: '18px', color: '#1E2B17' }}>Receipt &amp; Summary</b>
              <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '2px' }}>Date: {order.date} · Payment: {order.paymentMethod}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {order.paymentStatus === 'PAID' && (
                <span style={{ fontSize: '12px', background: '#E1EBCB', color: '#2E5220', padding: '4px 10px', borderRadius: '999px', fontWeight: 700 }}>
                  ✓ PAID &amp; VERIFIED
                </span>
              )}
              <button
                onClick={handlePrint}
                className="btn g sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer size={15} />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>

          {/* Razorpay Transaction Details banner if paid via Razorpay */}
          {order.razorpayPaymentId && (
            <div style={{ background: '#F2F6E6', border: '1px solid #D3E0BC', borderRadius: '12px', padding: '12px 16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '13px' }}>
              <div>
                <span style={{ color: '#5C6E52' }}>Razorpay Payment ID: </span>
                <code style={{ background: '#ffffff', padding: '2px 8px', borderRadius: '6px', border: '1px solid #D3E0BC', fontWeight: 600, color: '#1E2B17' }}>
                  {order.razorpayPaymentId}
                </code>
              </div>
              {order.razorpayOrderId && (
                <div>
                  <span style={{ color: '#5C6E52' }}>Order Ref: </span>
                  <code style={{ background: '#ffffff', padding: '2px 8px', borderRadius: '6px', border: '1px solid #D3E0BC', color: '#1E2B17' }}>
                    {order.razorpayOrderId}
                  </code>
                </div>
              )}
              <span style={{ color: '#2E7D32', fontWeight: 600 }}>100% Secure via Razorpay</span>
            </div>
          )}

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '20px 0' }}>
            {order.items.map((it, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="ph" style={{ width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', flex: 'none' }}>
                    <img src={it.image} alt={it.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <b style={{ fontSize: '15px', color: '#1E2B17' }}>{it.name}</b>
                    <span style={{ fontSize: '13px', color: '#5C6E52', display: 'block' }}>
                      {it.packSize} · Qty: {it.quantity}
                    </span>
                  </div>
                </div>
                <b style={{ fontSize: '16px' }}>₹{it.price * it.quantity}</b>
              </div>
            ))}
          </div>

          {/* Shipping details */}
          <div style={{ borderTop: '1px solid #D3E0BC', paddingTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', fontSize: '14px' }}>
            <div>
              <span style={{ color: '#5C6E52', display: 'block' }}>Deliver To:</span>
              <b style={{ color: '#1E2B17', display: 'block', marginTop: '2px' }}>{order.shippingAddress.fullName}</b>
              <p style={{ color: '#435538', marginTop: '2px' }}>
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <span style={{ color: '#5C6E52', fontSize: '13px' }}>Phone: {order.shippingAddress.phone}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'right' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#5C6E52' }}>Subtotal:</span>
                <b>₹{order.subtotal}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#5C6E52' }}>Delivery Fee:</span>
                <b>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</b>
              </div>
              {order.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2E7D32' }}>
                  <span>Discount:</span>
                  <b>−₹{order.discount}</b>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #D3E0BC', paddingTop: '8px', fontSize: '18px', fontWeight: 700, color: '#1E2B17' }}>
                <span>Paid Total:</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '36px', flexWrap: 'wrap' }}>
          <button
            className="btn p lg"
            onClick={() => openTrackOrder(order.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>Track This Milling Batch Live</span>
            <ArrowRight size={18} />
          </button>

          <button
            className="btn g lg"
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>Continue Shopping</span>
          </button>

          <button
            className="btn g lg"
            onClick={() => {
              setActivePage('account');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            View in My Orders
          </button>
        </div>
      </section>
    </div>
  );
};
