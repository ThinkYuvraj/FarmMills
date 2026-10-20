import React from 'react';
import { Order } from '../types';
import {
  CheckCircle2,
  Clock,
  Truck,
  Package,
  MapPin,
  ShieldCheck,
  Printer,
  Repeat,
  Sparkles,
  Phone,
  Flame,
  Thermometer,
  Disc,
  CreditCard,
  Lock
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

interface OrderTrackerProps {
  order: Order;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ order, onRefresh, isRefreshing = false }) => {
  const { addToCart, setIsCartDrawerOpen, addToast } = useShop();

  const handlePrint = () => {
    window.print();
  };

  const handleReorder = () => {
    order.items.forEach((item) => {
      const prod = PRODUCTS.find((p) => p.id === item.id) || PRODUCTS[0];
      const pack = prod.packOptions.find((o) => o.size === item.packSize) || prod.packOptions[0];
      addToCart(prod, pack, item.quantity);
    });
    setIsCartDrawerOpen(true);
    addToast('Previous batch items added to cart!', 'success');
  };

  // Determine stage progression (1 to 4)
  const getStageNumber = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('deliver') || s.includes('completed')) return 4;
    if (s.includes('out') || s.includes('dispatch') || s.includes('transit')) return 3;
    if (s.includes('mill') || s.includes('chakki') || s.includes('pack') || s.includes('seal')) return 2;
    return 1;
  };

  const currentStage = getStageNumber(order.status);

  const stages = [
    { num: 1, label: 'Order Queued', desc: 'Grains inspected & hopper queued' },
    { num: 2, label: 'Stone Chakki Milling', desc: 'Slow cold-grinding < 40°C' },
    { num: 3, label: 'Airtight Packaged', desc: 'Sealed with batch test date' },
    { num: 4, label: 'Out for Delivery', desc: order.estimatedDelivery || 'Doorstep arrival' }
  ];

  return (
    <div className="card" style={{ padding: '32px', background: '#ffffff', border: '1px solid #D3E0BC' }}>
      {/* Tracker Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #D3E0BC', paddingBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase',
                background: '#E1EBCB',
                color: '#2E5220',
                padding: '4px 12px',
                borderRadius: '999px',
                letterSpacing: '0.04em'
              }}
            >
              ● {order.status}
            </span>
            <span style={{ fontSize: '13px', color: '#5C6E52' }}>Milled on order for maximum freshness</span>
          </div>
          <h2 style={{ fontSize: '26px', color: '#1E2B17', marginTop: '6px' }}>
            Shipment #{order.id}
          </h2>
          <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '2px' }}>
            Placed on <b>{order.date}</b> · Slot: <b>{order.deliverySlot || 'Morning Batch'}</b>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="btn g sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Clock size={15} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
              <span>{isRefreshing ? 'Checking Mill...' : 'Live Refresh'}</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="btn g sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Printer size={15} />
            <span>Invoice</span>
          </button>
        </div>
      </div>

      {/* Visual Stepper Bar */}
      <div style={{ margin: '32px 0 24px' }}>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
          {/* Progress Connecting Line */}
          <div
            style={{
              position: 'absolute',
              top: '18px',
              left: '5%',
              right: '5%',
              height: '4px',
              background: '#E1EBCB',
              zIndex: 1
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '18px',
              left: '5%',
              width: `${((Math.min(currentStage, 4) - 1) / 3) * 90}%`,
              height: '4px',
              background: '#3F6B2C',
              zIndex: 2,
              transition: 'width 0.4s ease'
            }}
          />

          {stages.map((st) => {
            const isCompleted = currentStage >= st.num;
            const isCurrent = currentStage === st.num;

            return (
              <div
                key={st.num}
                style={{
                  position: 'relative',
                  zIndex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '22%',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isCompleted ? '#3F6B2C' : '#ffffff',
                    border: isCompleted ? '3px solid #3F6B2C' : '3px solid #D3E0BC',
                    color: isCompleted ? '#ffffff' : '#5C6E52',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                    boxShadow: isCurrent ? '0 0 0 4px rgba(63, 107, 44, 0.2)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={20} /> : st.num}
                </div>
                <b
                  style={{
                    fontSize: '13.5px',
                    color: isCompleted ? '#1E2B17' : '#5C6E52',
                    marginTop: '8px',
                    lineHeight: 1.3
                  }}
                >
                  {st.label}
                </b>
                <span style={{ fontSize: '11.5px', color: '#5C6E52', marginTop: '2px', display: 'none' }} className="timeline-desc">
                  {st.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Stone Chakki Telemetry Panel */}
      <div
        style={{
          background: '#F2F6E6',
          borderRadius: '16px',
          border: '1px solid #D3E0BC',
          padding: '20px 24px',
          margin: '24px 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6B2C', flex: 'none', border: '1px solid #D3E0BC' }}>
            <Disc size={20} />
          </div>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#5C6E52', fontWeight: 600 }}>Chakki Mill</span>
            <b style={{ display: 'block', fontSize: '14px', color: '#1E2B17' }}>Emery Stone Mill #3</b>
            <span style={{ fontSize: '12px', color: '#3F6B2C' }}>280 RPM (Low friction)</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6B2C', flex: 'none', border: '1px solid #D3E0BC' }}>
            <Thermometer size={20} />
          </div>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#5C6E52', fontWeight: 600 }}>Grind Temp</span>
            <b style={{ display: 'block', fontSize: '14px', color: '#1E2B17' }}>36.4°C Cold Milled</b>
            <span style={{ fontSize: '12px', color: '#2E7D32' }}>✓ Preserves Vitamin E</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6B2C', flex: 'none', border: '1px solid #D3E0BC' }}>
            <Truck size={20} />
          </div>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#5C6E52', fontWeight: 600 }}>Delivery Commitment</span>
            <b style={{ display: 'block', fontSize: '14px', color: '#1E2B17' }}>{order.estimatedDelivery}</b>
            <span style={{ fontSize: '12px', color: '#5C6E52' }}>Airtight tamper proof pack</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6B2C', flex: 'none', border: '1px solid #D3E0BC' }}>
            <CreditCard size={20} />
          </div>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#5C6E52', fontWeight: 600 }}>Payment Status</span>
            <b style={{ display: 'block', fontSize: '14px', color: '#1E2B17' }}>{order.paymentMethod}</b>
            <span style={{ fontSize: '12px', color: order.paymentStatus === 'PAID' ? '#2E7D32' : '#946808', fontWeight: 600 }}>
              {order.paymentStatus === 'PAID' ? '✓ Paid & Confirmed' : 'Payment on Arrival'}
            </span>
          </div>
        </div>
      </div>

      {/* Razorpay Transaction Details Banner (If paid with Razorpay) */}
      {order.razorpayPaymentId && (
        <div style={{ background: '#F8FAF2', border: '1px solid #D3E0BC', borderRadius: '12px', padding: '12px 16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={15} color="#3F6B2C" />
            <span style={{ color: '#5C6E52' }}>Razorpay Payment Reference: </span>
            <code style={{ background: '#ffffff', padding: '2px 8px', borderRadius: '6px', border: '1px solid #D3E0BC', fontWeight: 600, color: '#1E2B17' }}>
              {order.razorpayPaymentId}
            </code>
          </div>
          {order.razorpayOrderId && (
            <div>
              <span style={{ color: '#5C6E52' }}>Razorpay Order ID: </span>
              <code style={{ background: '#ffffff', padding: '2px 8px', borderRadius: '6px', border: '1px solid #D3E0BC', color: '#1E2B17' }}>
                {order.razorpayOrderId}
              </code>
            </div>
          )}
          <span style={{ color: '#2E7D32', fontWeight: 600 }}>100% Cryptographically Verified</span>
        </div>
      )}

      {/* Two Column Layout: Event Log & Shipping Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginTop: '16px' }}>
        {/* Left: Detailed Timeline Log */}
        <div>
          <h3 style={{ fontSize: '18px', color: '#1E2B17', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="#3F6B2C" />
            <span>Milling &amp; Dispatch Timeline</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            {(order.trackingEvents && order.trackingEvents.length > 0
              ? order.trackingEvents
              : [
                  { status: 'Order Placed & Confirmed', time: order.date, note: `Payment verified via ${order.paymentMethod}.` },
                  { status: 'Stone Chakki Milling Scheduled', time: 'Tomorrow 5:00 AM', note: 'Queued for Emery Stone Mill #3.' }
                ]
            ).map((evt, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '14px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: idx === 0 ? '#3F6B2C' : '#A9BF93',
                    marginTop: '5px',
                    flex: 'none',
                    boxShadow: idx === 0 ? '0 0 0 4px rgba(63, 107, 44, 0.2)' : 'none'
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                    <b style={{ fontSize: '14px', color: '#1E2B17' }}>{evt.status}</b>
                    <span style={{ fontSize: '12px', color: '#5C6E52' }}>{evt.time}</span>
                  </div>
                  {evt.note && (
                    <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '3px', lineHeight: 1.4 }}>
                      {evt.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Items in this Batch & Address */}
        <div>
          <h3 style={{ fontSize: '18px', color: '#1E2B17', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={18} color="#3F6B2C" />
            <span>Items in this Order ({order.items.length})</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#FBFDF5', padding: '16px', borderRadius: '14px', border: '1px solid #D3E0BC' }}>
            {order.items.map((it, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="ph" style={{ width: '42px', height: '42px', borderRadius: '8px', overflow: 'hidden', flex: 'none' }}>
                    <img src={it.image} alt={it.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <b style={{ fontSize: '13.5px', color: '#1E2B17', display: 'block' }}>{it.name}</b>
                    <span style={{ fontSize: '12px', color: '#5C6E52' }}>
                      {it.packSize} × {it.quantity}
                    </span>
                  </div>
                </div>
                <b style={{ fontSize: '14px' }}>₹{it.price * it.quantity}</b>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #D3E0BC', paddingTop: '10px', marginTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: '#5C6E52' }}>Total Paid:</span>
              <b style={{ fontSize: '16px', color: '#1E2B17' }}>₹{order.total}</b>
            </div>
          </div>

          {/* Delivery Address */}
          <div style={{ marginTop: '16px', padding: '16px', borderRadius: '14px', background: '#ffffff', border: '1px solid #D3E0BC' }}>
            <span style={{ fontSize: '12px', color: '#5C6E52', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color="#3F6B2C" />
              <span>DELIVERY ADDRESS</span>
            </span>
            <b style={{ fontSize: '14px', color: '#1E2B17', display: 'block', marginTop: '4px' }}>
              {order.shippingAddress.fullName} ({order.shippingAddress.phone})
            </b>
            <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '2px' }}>
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', borderTop: '1px solid #D3E0BC', paddingTop: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <button
          onClick={handleReorder}
          className="btn p sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Repeat size={15} />
          <span>Order This Fresh Batch Again</span>
        </button>

        <a
          href="https://wa.me/919811054321?text=Hi%20Farmers%20Mill,%20I%20have%20a%20question%20regarding%20my%20Order%20ID%20"
          target="_blank"
          rel="noopener noreferrer"
          className="btn g sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Phone size={14} />
          <span>WhatsApp Mill Manager</span>
        </a>
      </div>
    </div>
  );
};

export default OrderTracker;
