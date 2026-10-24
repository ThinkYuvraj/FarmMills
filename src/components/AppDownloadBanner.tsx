import React from 'react';
import { useShop } from '../context/ShopContext';
import { Smartphone, Sparkles, Gift } from 'lucide-react';

export const AppDownloadBanner: React.FC = () => {
  const { addToast } = useShop();

  const handleAppClick = (platform: string) => {
    addToast(`Farmers Mill for ${platform} will launch soon! Use web app anytime.`, 'info');
  };

  return (
    <section className="w" style={{ marginTop: '56px' }}>
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #FBF4E7 0%, #F5EADB 100%)',
          border: '1.5px solid #E3D1B9',
          borderRadius: '18px',
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px 20px',
          boxShadow: '0 4px 16px rgba(60, 40, 15, 0.05)'
        }}
      >
        {/* Left Side: Icon & Copy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 320px', minWidth: '240px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#3F6B2C',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(63, 107, 44, 0.22)',
              flexShrink: 0
            }}
          >
            <Smartphone size={22} />
          </div>

          <div>
            <h3 style={{ fontSize: '18px', color: '#2C1A0E', margin: 0, fontWeight: 700, lineHeight: 1.25 }}>
              Download the Farmers Mill App
            </h3>
            <div style={{ display: 'flex', gap: '10px', marginTop: '3px', flexWrap: 'wrap', fontSize: '12.5px', color: '#4A331E' }}>
              <span>
                🌾 <b style={{ color: '#9E2A1C' }}>100 Mill Coins</b> on Sign Up
              </span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>
                ✨ <b style={{ color: '#9E2A1C' }}>Flat 15% OFF</b> above ₹2499
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Store Badges Aligned to the Right */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginLeft: 'auto' }}>
          <button
            onClick={() => handleAppClick('Android')}
            className="btn"
            style={{
              background: '#1E2B17',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: '9px',
              fontSize: '12.5px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}
            title="Download on Google Play Store"
          >
            <span>📱 Google Play</span>
          </button>

          <button
            onClick={() => handleAppClick('iOS')}
            className="btn"
            style={{
              background: '#1E2B17',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: '9px',
              fontSize: '12.5px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}
            title="Download on Apple App Store"
          >
            <span>🍎 App Store</span>
          </button>
        </div>
      </div>
    </section>
  );
};
