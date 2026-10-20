import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ShieldCheck, Sparkles, Truck, Award, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedCategory, openLabReport } = useShop();

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
    <footer style={{ background: '#1E2B17', color: '#E1EBCB', marginTop: 'auto', borderTop: '4px solid #3F6B2C' }}>
      {/* Trust Badges Strip */}
      <div style={{ background: '#162011', borderBottom: '1px solid rgba(225, 235, 203, 0.1)', padding: '24px 0' }}>
        <div className="w" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(63, 107, 44, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7BC652', flex: 'none' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <b style={{ color: '#ffffff', fontSize: '15px', display: 'block' }}>Milled Fresh on Order</b>
              <p style={{ fontSize: '13px', color: '#B3C4A5', marginTop: '2px' }}>Slow stone chakki, zero warehouse staleness</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(63, 107, 44, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7BC652', flex: 'none' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <b style={{ color: '#ffffff', fontSize: '15px', display: 'block' }}>100% Pure &amp; Chemical Free</b>
              <p style={{ fontSize: '13px', color: '#B3C4A5', marginTop: '2px' }}>Zero preservatives, artificial dyes or fillers</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(63, 107, 44, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7BC652', flex: 'none' }}>
              <Award size={22} />
            </div>
            <div>
              <b style={{ color: '#ffffff', fontSize: '15px', display: 'block' }}>Direct Farmer Partner</b>
              <p style={{ fontSize: '13px', color: '#B3C4A5', marginTop: '2px' }}>Fair farm-gate prices &amp; certified soil batches</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(63, 107, 44, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7BC652', flex: 'none' }}>
              <Truck size={22} />
            </div>
            <div>
              <b style={{ color: '#ffffff', fontSize: '15px', display: 'block' }}>Free Fast Delivery</b>
              <p style={{ fontSize: '13px', color: '#B3C4A5', marginTop: '2px' }}>Orders above ₹499 delivered in airtight bags</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="w" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '40px', paddingTop: '56px', paddingBottom: '40px' }}>
        {/* Brand Col */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/images/farmers-mill-logo.png"
              alt="Farmers Mill"
              style={{
                height: '48px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)'
              }}
            />
          </div>
          <p style={{ marginTop: '16px', lineHeight: '1.7', fontSize: '14px', color: '#D2E0BC' }}>
            Honest grains, single-origin spices, wood-pressed oils and raw honey from farm to your kitchen table. Milled slowly on natural emery stone chakkis without artificial heat.
          </p>
          <div style={{ marginTop: '18px', display: 'flex', gap: '12px', fontSize: '12px', color: '#A9BF93' }}>
            <span>FSSAI Lic. No: <b>10822999000142</b></span>
          </div>
        </div>

        {/* Shop Col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
          <b style={{ color: '#ffffff', fontSize: '17px', marginBottom: '6px' }}>Shop Fresh</b>
          <a onClick={() => handleNav('shop', 'Fresh Atta')} style={{ color: '#D2E0BC' }}>🌾 Chakki Fresh Atta &amp; Sharbati</a>
          <a onClick={() => handleNav('shop', 'Besan & Flours')} style={{ color: '#D2E0BC' }}>🥣 Mota Besan &amp; Millet Flours</a>
          <a onClick={() => handleNav('shop', 'Spices')} style={{ color: '#D2E0BC' }}>🌶️ Stone Ground Turmeric &amp; Spices</a>
          <a onClick={() => handleNav('shop', 'Oils & Ghee')} style={{ color: '#D2E0BC' }}>🫒 Wood Pressed Mustard Oil &amp; A2 Ghee</a>
          <a onClick={() => handleNav('shop', 'Honey & Pickles')} style={{ color: '#D2E0BC' }}>🍯 Raw Honey &amp; Mango Pickle</a>
        </div>

        {/* Company Col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
          <b style={{ color: '#ffffff', fontSize: '17px', marginBottom: '6px' }}>Our Mission</b>
          <a onClick={() => handleNav('subscriptions')} style={{ color: '#E1EBCB', fontWeight: 600 }}>✨ Subscribe &amp; Save (15% OFF)</a>
          <a onClick={() => handleNav('story')} style={{ color: '#D2E0BC' }}>Our Story &amp; Origin</a>
          <a onClick={() => handleNav('story')} style={{ color: '#D2E0BC' }}>The Stone Chakki Difference</a>
          <a onClick={() => handleNav('track-order')} style={{ color: '#E1EBCB', fontWeight: 600 }}>🚚 Track Your Order Batch</a>
          <a onClick={() => openLabReport(PRODUCTS[5])} style={{ color: '#D2E0BC' }}>🔬 NABL Certified Lab Reports</a>
          <a onClick={() => handleNav('contact')} style={{ color: '#D2E0BC' }}>Shipping &amp; Delivery Policy</a>
          <a onClick={() => handleNav('contact')} style={{ color: '#D2E0BC' }}>Frequently Asked Questions</a>
        </div>

        {/* Reach Us Col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
          <b style={{ color: '#ffffff', fontSize: '17px', marginBottom: '6px' }}>Reach Our Mill</b>
          <p style={{ color: '#D2E0BC' }}><b>Email:</b> hello@farmersmill.in</p>
          <p style={{ color: '#D2E0BC' }}><b>Care &amp; WhatsApp:</b> +91 98110 54321</p>
          <p style={{ color: '#D2E0BC' }}><b>Chakki Unit:</b> Plot 48, Agro Flour &amp; Oil Mill Complex, Udyog Vihar Phase 4, Gurugram, NCR 122016</p>
          <p style={{ color: '#A9BF93', fontSize: '13px', marginTop: '4px' }}>Milling Hours: Mon - Sat: 7:00 AM - 6:00 PM</p>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{ borderTop: '1px solid rgba(225, 235, 203, 0.12)', padding: '20px 0', fontSize: '13px', color: '#9DB388' }}>
        <div className="w" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span>© 2026 Farmers Mill Pvt. Ltd. All rights reserved. Milled with care in India.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a onClick={() => handleNav('contact')}>Privacy Policy</a>
            <a onClick={() => handleNav('contact')}>Terms of Service</a>
            <a onClick={() => handleNav('contact')}>FSSAI Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
