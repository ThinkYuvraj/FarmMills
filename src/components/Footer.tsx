import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ShieldCheck, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedCategory, openLabReport, setIsOutletPickerOpen } = useShop();

  const handleNav = (page: any, category?: string) => {
    if (category) {
      setSelectedCategory(category);
      setActivePage('shop');
    } else {
      setActivePage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-root" style={{ background: '#1E2B17', color: '#E1EBCB', marginTop: 'auto', borderTop: '4px solid #3F6B2C' }}>
      {/* Main Links Grid - Compact 4-column layout */}
      <div
        className="w"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: '24px',
          paddingTop: '28px',
          paddingBottom: '22px'
        }}
      >
        {/* Brand Column */}
        <div>
          <div
            onClick={() => handleNav('home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#FBFDF5',
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1.5px solid #D3E0BC',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}
            title="Farmers Mill - Return to Home"
          >
            <img
              src="/images/farmers-mill-logo.png"
              alt="Farmers Mill Official Logo"
              style={{
                height: '36px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          <p style={{ marginTop: '14px', lineHeight: '1.6', fontSize: '13.5px', color: '#D2E0BC' }}>
            Operated by Wholesome Harvest Company. Stone-ground whole wheat attas, single-origin spices, wood-pressed oils, and raw honey milled fresh to order below 38°C.
          </p>

          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#A9BF93' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#7BC652' }} />
            <span>FSSAI Lic. No: <strong style={{ color: '#E1EBCB' }}>10822999000142</strong></span>
          </div>
        </div>

        {/* Shop Harvest Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
          <b style={{ color: '#ffffff', fontSize: '15px', marginBottom: '4px' }}>Fresh Harvest</b>
          <a onClick={() => handleNav('shop', 'Fresh Atta')} style={{ color: '#D2E0BC' }}>🌾 Chakki Fresh Atta &amp; Sharbati</a>
          <a onClick={() => handleNav('shop', 'Besan & Flours')} style={{ color: '#D2E0BC' }}>🥣 Danedar Mota Besan &amp; Ragi</a>
          <a onClick={() => handleNav('shop', 'Spices')} style={{ color: '#D2E0BC' }}>🌶️ Stone Ground Turmeric &amp; Spices</a>
          <a onClick={() => handleNav('shop', 'Oils & Ghee')} style={{ color: '#D2E0BC' }}>🫒 Woodpressed Mustard Oil &amp; A2 Ghee</a>
          <a onClick={() => handleNav('shop', 'Honey & Pickles')} style={{ color: '#D2E0BC' }}>🍯 Raw Honey &amp; Mango Pickle</a>
        </div>

        {/* Customer Care & Policies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
          <b style={{ color: '#ffffff', fontSize: '15px', marginBottom: '4px' }}>Policies &amp; Orders</b>
          <a onClick={() => handleNav('terms')} style={{ color: '#E1EBCB', fontWeight: 600 }}>📄 Terms &amp; Conditions</a>
          <a onClick={() => handleNav('shipping')} style={{ color: '#E1EBCB', fontWeight: 600 }}>🚚 Shipping &amp; Returns (7-Day)</a>
          <a onClick={() => handleNav('track-order')} style={{ color: '#D2E0BC' }}>📦 Track Order Batch</a>
          <a onClick={() => handleNav('subscriptions')} style={{ color: '#D2E0BC' }}>✨ Monthly Grain Subscriptions</a>
          <a onClick={() => openLabReport(PRODUCTS[5])} style={{ color: '#D2E0BC' }}>🔬 NABL Certified Lab Reports</a>
          <a onClick={() => handleNav('story')} style={{ color: '#D2E0BC' }}>🌱 About Wholesome Harvest</a>
        </div>

        {/* Reach Our Mill */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
          <b style={{ color: '#ffffff', fontSize: '15px', marginBottom: '4px' }}>Mill Outlets &amp; Support</b>
          <p style={{ color: '#D2E0BC', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
            <MapPin size={15} color="#7BC652" style={{ flexShrink: 0, marginTop: '3px' }} />
            <span><b>Primary Mill Hub:</b> Plot 48, Udyog Vihar Ph 4, Gurugram</span>
          </p>
          <p style={{ color: '#D2E0BC', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
            <MapPin size={15} color="#7BC652" style={{ flexShrink: 0, marginTop: '3px' }} />
            <span><b>Noida Mill Outlet:</b> Sector 62, Electronic City, Noida</span>
          </p>
          <p style={{ color: '#D2E0BC', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Phone size={14} color="#7BC652" />
            <a href="tel:+918826313986" style={{ color: '#ffffff', fontWeight: 700 }}>+91-8826313986</a>
          </p>
          <p style={{ color: '#D2E0BC', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Mail size={14} color="#7BC652" />
            <a href="mailto:support@farmersmill.in" style={{ color: '#D2E0BC' }}>support@farmersmill.in</a>
          </p>
          <p style={{ color: '#A9BF93', fontSize: '12px', marginTop: '2px' }}>
            Milling Hours: Mon - Sat: 7:00 AM - 8:30 PM
          </p>
        </div>
      </div>

      {/* Payment Methods Section - Compact & Clean */}
      <div
        style={{
          background: '#162011',
          borderTop: '1px solid rgba(225, 235, 203, 0.08)',
          borderBottom: '1px solid rgba(225, 235, 203, 0.08)',
          padding: '12px 0'
        }}
      >
        <div className="w" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#A9BF93', letterSpacing: '0.04em', marginBottom: '10px' }}>
            Accepted Secure Payment Gateways &amp; Methods
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            {/* Mastercard */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '6px',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '32px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }}
              title="Mastercard"
            >
              <svg width="36" height="22" viewBox="0 0 36 22">
                <circle cx="13" cy="11" r="8" fill="#EB001B" />
                <circle cx="23" cy="11" r="8" fill="#F79E1B" fillOpacity="0.85" />
              </svg>
            </div>

            {/* American Express */}
            <div
              style={{
                background: '#006FCF',
                borderRadius: '6px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '32px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }}
              title="American Express"
            >
              <span style={{ color: '#ffffff', fontWeight: 900, fontSize: '11px', letterSpacing: '0.5px' }}>
                AMERICAN EXPRESS
              </span>
            </div>

            {/* UnionPay */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '6px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '32px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }}
              title="UnionPay"
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ background: '#E21836', color: '#fff', fontSize: '9px', fontWeight: 800, padding: '2px 4px', borderRadius: '3px 0 0 3px' }}>Union</span>
                <span style={{ background: '#004B87', color: '#fff', fontSize: '9px', fontWeight: 800, padding: '2px 4px', borderRadius: '0 3px 3px 0' }}>Pay</span>
              </div>
            </div>

            {/* JCB */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '6px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '32px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }}
              title="JCB"
            >
              <span style={{ color: '#0E4EAD', fontWeight: 900, fontSize: '12px', letterSpacing: '1px' }}>
                JCB
              </span>
            </div>

            {/* Discover */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '6px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '32px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }}
              title="Discover"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1px', fontWeight: 900, fontSize: '11px', color: '#1E2B17' }}>
                <span>DISC</span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6000', display: 'inline-block' }} />
                <span>VER</span>
              </div>
            </div>

            {/* VISA */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '6px',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '32px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }}
              title="VISA"
            >
              <span style={{ color: '#1A1F71', fontWeight: 900, fontSize: '14px', fontStyle: 'italic', letterSpacing: '1px' }}>
                VISA
              </span>
            </div>

            {/* PayPal */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '6px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '32px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }}
              title="PayPal"
            >
              <span style={{ color: '#003087', fontWeight: 900, fontSize: '12px' }}>
                Pay<span style={{ color: '#0079C1' }}>Pal</span>
              </span>
            </div>

            {/* Diners Club */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '6px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '32px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }}
              title="Diners Club International"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #004B87', display: 'inline-block' }} />
                <span style={{ color: '#004B87', fontWeight: 800, fontSize: '9px', lineHeight: 1 }}>Diners Club</span>
              </div>
            </div>

            {/* UPI & NetBanking Badge */}
            <div
              style={{
                background: '#E1EBCB',
                borderRadius: '6px',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '32px'
              }}
              title="UPI (GPay / PhonePe / Paytm / BHIM) & Net Banking"
            >
              <span style={{ color: '#2E5220', fontWeight: 800, fontSize: '11px' }}>
                ⚡ UPI &amp; NetBanking
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Attribution Bar - Clean, Compact & Simple */}
      <div style={{ padding: '16px 0', fontSize: '12.5px', color: '#A0B58C', borderTop: '1px solid rgba(225, 235, 203, 0.08)' }}>
        <div className="w" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>© 2026 Farmers Mill. A product from <strong style={{ color: '#E1EBCB' }}>MarketinGlu</strong></span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>
              Created by{' '}
              <a
                href="https://github.com/ThinkYuvraj"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#9FE870', fontWeight: 700, textDecoration: 'underline' }}
              >
                Github/ThinkYuvraj
              </a>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a onClick={() => handleNav('terms')} style={{ color: '#C8D8BE', transition: 'color 0.15s ease' }}>Terms &amp; Conditions</a>
            <a onClick={() => handleNav('shipping')} style={{ color: '#C8D8BE', transition: 'color 0.15s ease' }}>Shipping &amp; Returns</a>
            <a onClick={() => handleNav('story')} style={{ color: '#C8D8BE', transition: 'color 0.15s ease' }}>FSSAI Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
