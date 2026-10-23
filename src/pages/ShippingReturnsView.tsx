import React from 'react';
import { useShop } from '../context/ShopContext';
import { Truck, RotateCcw, ArrowLeft, Phone, Mail, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const ShippingReturnsView: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <div className="w" style={{ padding: '40px 24px 80px', maxWidth: '960px', margin: '0 auto' }}>
      {/* Back button */}
      <button
        onClick={() => {
          setActivePage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="clay-btn-secondary"
        style={{ padding: '8px 18px', fontSize: '13px', marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
      >
        <ArrowLeft size={16} />
        <span>Return to Home</span>
      </button>

      {/* Header */}
      <div className="clay-card-static" style={{ padding: '36px', marginBottom: '32px', background: '#FBFDF5' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3F6B2C', fontWeight: 700, fontSize: '13px', marginBottom: '12px' }} className="clay-badge">
          <Truck size={15} /> SHIPPING &amp; RETURN POLICY · FARMERSMILL.IN
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#1E2B17', lineHeight: 1.15 }}>
          Shipping, Delivery &amp; Returns
        </h1>
        <p className="subheading" style={{ marginTop: '10px' }}>
          Milled fresh to order, packed in multi-wall food-safe kraft bags, and delivered directly to your doorstep.
        </p>
      </div>

      {/* Policy Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="clay-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3F6B2C', marginBottom: '12px' }}>
            <Truck size={22} />
            <h2 style={{ fontSize: '20px', color: '#1E2B17' }}>1. Shipping &amp; Dispatch Timeline</h2>
          </div>
          <p className="body-text" style={{ color: '#435538', lineHeight: 1.7 }}>
            To ensure zero warehouse staleness, your grains, whole spices, and cold oils are extracted and milled only after order confirmation.
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '12px', fontSize: '14.5px', color: '#435538', lineHeight: 1.8 }}>
            <li><b>Morning Milling Slot:</b> Orders placed before 10:00 PM are milled in the morning stone chakki run and dispatched the next day.</li>
            <li><b>Delhi NCR / Bengaluru Hub:</b> Same-day or next-day delivery (within 24–36 hours).</li>
            <li><b>Rest of India:</b> 2 to 4 business days via express air/surface courier in sealed protective bags.</li>
            <li><b>Free Shipping:</b> Free delivery applies automatically on orders exceeding ₹499 (or as per location threshold).</li>
          </ul>
        </div>

        <div className="clay-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3F6B2C', marginBottom: '12px' }}>
            <RotateCcw size={22} />
            <h2 style={{ fontSize: '20px', color: '#1E2B17' }}>2. 7-Day Return &amp; Exchange Window</h2>
          </div>
          <p className="body-text" style={{ color: '#435538', lineHeight: 1.7 }}>
            Because our products are perishable, natural food items crafted without synthetic preservatives, we cannot accept returns once packages are opened for change-of-mind reasons. However, we provide a <b>hassle-free 7-day replacement or refund guarantee</b> under the following scenarios:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' }}>
            <div className="clay-inset" style={{ padding: '16px' }}>
              <b style={{ color: '#1E2B17', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Damaged in Transit</b>
              <p style={{ fontSize: '13px', color: '#5C6E52', lineHeight: 1.5 }}>
                If your bag is torn, punctured, or oil bottle has leaked during transit.
              </p>
            </div>
            <div className="clay-inset" style={{ padding: '16px' }}>
              <b style={{ color: '#1E2B17', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Incorrect Item Delivered</b>
              <p style={{ fontSize: '13px', color: '#5C6E52', lineHeight: 1.5 }}>
                If the item, pack size, or variety delivered does not match your purchase invoice.
              </p>
            </div>
            <div className="clay-inset" style={{ padding: '16px' }}>
              <b style={{ color: '#1E2B17', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Quality Discrepancy</b>
              <p style={{ fontSize: '13px', color: '#5C6E52', lineHeight: 1.5 }}>
                Verified aroma or texture defect reported within 7 days of package delivery.
              </p>
            </div>
          </div>
        </div>

        <div className="clay-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3F6B2C', marginBottom: '12px' }}>
            <ShieldCheck size={22} />
            <h2 style={{ fontSize: '20px', color: '#1E2B17' }}>3. How to Request a Return or Refund</h2>
          </div>
          <p className="body-text" style={{ color: '#435538', lineHeight: 1.7 }}>
            To initiate an exchange or refund:
          </p>
          <ol style={{ paddingLeft: '20px', marginTop: '10px', fontSize: '14.5px', color: '#435538', lineHeight: 1.8 }}>
            <li>Take a clear photo of the delivered packaging, shipping label, and batch stamp.</li>
            <li>Send a message to our WhatsApp/Call care at <b>+91-8826313986</b> or email <b>support@farmersmill.in</b> with your Order ID (e.g. FM-84824).</li>
            <li>Our team will inspect and approve an immediate replacement dispatch or initiate a 100% refund to your original payment method (UPI / Cards / NetBanking) within 3–5 business days.</li>
          </ol>
        </div>

        {/* Support contact bar */}
        <div className="clay-inset" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <b style={{ color: '#1E2B17', fontSize: '15px', display: 'block' }}>Need help with an ongoing delivery?</b>
            <span style={{ fontSize: '13px', color: '#5C6E52' }}>We respond promptly within 30 minutes during milling hours.</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="tel:+918826313986" className="clay-btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <Phone size={14} /> +91-8826313986
            </a>
            <a href="mailto:support@farmersmill.in" className="clay-btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <Mail size={14} /> support@farmersmill.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
