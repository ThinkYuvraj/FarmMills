import React from 'react';
import { useShop } from '../context/ShopContext';
import { Smartphone, Sparkles, Gift } from 'lucide-react';

export const AppDownloadBanner: React.FC = () => {
  const { addToast } = useShop();

  const handleAppClick = (platform: string) => {
    addToast(`Farmers Mill for ${platform} will launch soon! Use web app anytime.`, 'info');
  };

  return (
    <section className="w" style={{ marginTop: '72px' }}>
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #FDE5C7 0%, #FEF4E8 100%)',
          borderColor: '#E8D0B0',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          boxShadow: '0 4px 16px rgba(107, 79, 42, 0.08)'
        }}
      >
        {/* Left Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: '#3F6B2C',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(63, 107, 44, 0.25)',
              flex: 'none'
            }}
          >
            <Smartphone size={28} />
          </div>

          <div>
            <h3 style={{ fontSize: '22px', color: '#2C1A0E' }}>
              Download the Farmers Mill App
            </h3>
            <div style={{ display: 'flex', gap: '16px', marginTop: '4px', flexWrap: 'wrap', fontSize: '14px' }}>
              <span style={{ color: '#2C1A0E' }}>
                🌾 <b style={{ color: '#B01C15' }}>Get 100 Mill Coins</b> on Sign Up
              </span>
              <span style={{ color: '#2C1A0E' }}>
                ✨ <b style={{ color: '#B01C15' }}>Flat 15% OFF</b> on ₹2499 &amp; above
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Buttons */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleAppClick('Android')}
            className="btn"
            style={{
              background: '#1E2B17',
              color: '#ffffff',
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>📱 Google Play</span>
          </button>

          <button
            onClick={() => handleAppClick('iOS')}
            className="btn"
            style={{
              background: '#1E2B17',
              color: '#ffffff',
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>🍎 App Store</span>
          </button>
        </div>
      </div>
    </section>
  );
};
