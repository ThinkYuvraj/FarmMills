import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  ThermometerSnowflake,
  Check,
  Plus,
  Eye,
  FileCheck,
  Award
} from 'lucide-react';
import heroArtisanImg from '../assets/images/farmersmill_hero_artisan_1792740115566.jpg';

interface StapleItem {
  id: string;
  name: string;
  shortLabel: string;
  badge: string;
  spec: string;
}

const FEATURED_STAPLES: StapleItem[] = [
  {
    id: 'fm-atta-chakki',
    name: 'Chakki Fresh Whole Wheat Atta',
    shortLabel: '🌾 Chakki Fresh Atta',
    badge: 'Same-Day Milled',
    spec: '100% Bran & Germ · 0% Maida'
  },
  {
    id: 'fm-atta-sharbati',
    name: 'MP Sehore Sharbati Wheat Flour',
    shortLabel: '✨ MP Sharbati Gold',
    badge: 'Rain-Fed Harvest',
    spec: 'Velvety Soft Rotis · Naturally Sweet'
  },
  {
    id: 'fm-oil-mustard',
    name: 'Wood Pressed Mustard Oil (Kolhu)',
    shortLabel: '🫒 Wood-Pressed Mustard Oil',
    badge: 'Kachi Ghani < 35°C',
    spec: 'Unrefined First Press · High Pungency'
  },
  {
    id: 'fm-ghee-a2',
    name: 'A2 Desi Gir Cow Ghee (Bilona)',
    shortLabel: '🍯 A2 Bilona Cow Ghee',
    badge: 'Vedic Churned',
    spec: 'Granular Danedar · Pure Cultured Makkhan'
  }
];

export const HeroSection: React.FC = () => {
  const {
    products,
    setActivePage,
    setSelectedCategory,
    openProductDetail,
    setQuickViewProduct,
    addToCart,
    openLabReport,
    selectedOutlet,
    setIsOutletPickerOpen
  } = useShop();

  const [activeStapleId, setActiveStapleId] = useState<string>('fm-atta-chakki');
  const [selectedPackIdx, setSelectedPackIdx] = useState<number>(0);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // Find active featured product from catalog
  const activeProduct = React.useMemo(() => {
    return products.find((p) => p.id === activeStapleId) || products[0];
  }, [products, activeStapleId]);

  // Keep pack index valid when staple switches
  const currentPack = activeProduct?.packOptions[selectedPackIdx] || activeProduct?.packOptions[0];

  const handleSelectStaple = (id: string) => {
    setActiveStapleId(id);
    setSelectedPackIdx(0);
  };

  const handleQuickAdd = () => {
    if (!activeProduct || !currentPack) return;
    addToCart(activeProduct, currentPack, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <section className="w" style={{ paddingTop: 'clamp(14px, 2.5vw, 28px)', paddingBottom: '20px' }}>
      {/* Editorial Top Status & Hub Tracker - Slim & Tablet Optimized */}
      <div className="hero-live-bar">
        <div className="hero-live-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '12px', lineHeight: 1.3 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(123, 198, 82, 0.18)',
                border: '1px solid rgba(159, 232, 112, 0.3)',
                color: '#9FE870',
                padding: '2px 8px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '10.5px',
                letterSpacing: '0.04em',
                flexShrink: 0
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#7BC652',
                  boxShadow: '0 0 6px #7BC652'
                }}
              />
              LIVE MILLING RUN
            </span>

            <span style={{ color: '#D6E2CB' }}>
              Batch <strong style={{ color: '#ffffff' }}>#FM-2026-88</strong> grinding at{' '}
              <strong style={{ color: '#ffffff' }}>{selectedOutlet.name}</strong>
            </span>
          </div>

          <div
            style={{
              fontSize: '11px',
              color: '#A8BDA0',
              lineHeight: 1.25,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              paddingLeft: '2px'
            }}
          >
            <Clock size={11} color="#9FE870" style={{ flexShrink: 0 }} />
            <span>
              Orders placed in next <strong style={{ color: '#ffffff' }}>2h 15m</strong> dispatched for same-day evening delivery
            </span>
          </div>
        </div>

        {/* Outlet Button: Bottom Right Corner on Tablet View, Right-Aligned on Desktop */}
        <div className="hero-live-btn-anchor">
          <button
            onClick={() => setIsOutletPickerOpen(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(159, 232, 112, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
            }}
            title="Change your local stone mill hub"
          >
            <MapPin size={12} color="#9FE870" />
            <span>Outlet: <strong style={{ color: '#9FE870' }}>{selectedOutlet.city}</strong></span>
          </button>
        </div>
      </div>

      {/* Main Hero Split Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: 'clamp(24px, 3.5vw, 44px)',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Editorial Copy & Value Anchor */}
        <div>
          {/* Zero-Pill Compliant Editorial Kicker */}
          <p
            style={{
              fontSize: '12.5px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#3F6B2C',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px'
            }}
          >
            <span>Slow Stoneground</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>100% Whole Grain &amp; Wood-Pressed</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Milled On Order</span>
          </p>

          <h1
            style={{
              fontSize: 'clamp(32px, 4.4vw, 54px)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              color: '#1E2B17',
              margin: '0 0 16px 0',
              fontWeight: 800
            }}
          >
            The pure taste of Indian harvest, stoneground fresh for your family.
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              lineHeight: 1.6,
              color: '#4A5B40',
              maxWidth: '560px',
              margin: '0 0 24px 0'
            }}
          >
            Industrial steel roller mills heat grain to 90°C and strip away nutritious bran and wheat germ to extend supermarket shelf life. At Farmers Mill, cold natural emery chakki stones turn under 40 RPM, keeping friction heat below 35°C so every roti is fragrant, naturally sweet, and rich in live nutrients.
          </p>

          {/* Interactive Staple Switcher Bar */}
          <div style={{ marginBottom: '24px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#5C6E52',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              Select today&apos;s fresh milling staple:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {FEATURED_STAPLES.map((staple) => {
                const isSelected = staple.id === activeStapleId;
                return (
                  <button
                    key={staple.id}
                    onClick={() => handleSelectStaple(staple.id)}
                    style={{
                      background: isSelected ? '#1E2B17' : 'rgba(235, 243, 222, 0.7)',
                      color: isSelected ? '#FBFDF5' : '#2D4421',
                      border: isSelected ? '1px solid #1E2B17' : '1px solid #CBD9B6',
                      borderRadius: '999px',
                      padding: '7px 14px',
                      fontSize: '12.5px',
                      fontWeight: isSelected ? 700 : 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.18s ease',
                      boxShadow: isSelected ? '0 3px 10px rgba(30, 43, 23, 0.25)' : 'none'
                    }}
                  >
                    <span>{staple.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              className="clay-btn-primary"
              style={{ padding: '14px 28px', fontSize: '15px' }}
              onClick={() => {
                setSelectedCategory('All');
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Explore All Fresh Milling</span>
              <ArrowRight size={18} />
            </button>

            <button
              className="clay-btn-secondary"
              style={{ padding: '14px 22px', fontSize: '14px' }}
              onClick={() => {
                if (activeProduct) {
                  openLabReport(activeProduct);
                }
              }}
              title="Inspect NABL certified purity certificate"
            >
              <FileCheck size={16} color="#3F6B2C" />
              <span>View Purity Certificate</span>
            </button>
          </div>

          {/* Genuine Trust Markers Row */}
          <div
            style={{
              display: 'flex',
              gap: '18px',
              alignItems: 'center',
              marginTop: '26px',
              fontSize: '12.5px',
              color: '#55684B',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#3F6B2C" />
              <span>0% Maida &amp; Chemicals</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ThermometerSnowflake size={16} color="#3F6B2C" />
              <span>Cold Chakki &lt; 35°C</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="#3F6B2C" />
              <span>Milled On Order</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Showcase + Live Product Commerce Card */}
        <div style={{ position: 'relative' }}>
          {/* Main Visual Stage */}
          <div
            className="clay-card-static"
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              background: '#1A2415',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid rgba(63, 107, 44, 0.25)'
            }}
          >
            {/* Cinematic Artisanal Image */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
              <img
                src={heroArtisanImg}
                alt="Farmers Mill traditional stone chakki, golden flour stream, and pure cold pressed oils"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* Gradient Overlay for Legibility */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20, 29, 15, 0.92) 0%, rgba(20, 29, 15, 0.25) 45%, rgba(0,0,0,0.1) 100%)'
                }}
              />

              {/* Quality Seal Stamp Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'rgba(251, 253, 245, 0.95)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                <Award size={14} color="#3F6B2C" />
                <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#1E2B17', letterSpacing: '0.04em' }}>
                  NABL ACCREDITED · 100% PURE
                </span>
              </div>

              {/* Quick View Button */}
              {activeProduct && (
                <button
                  onClick={() => setQuickViewProduct(activeProduct)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(251, 253, 245, 0.95)',
                    border: '1px solid #D3E0BC',
                    color: '#1E2B17',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    cursor: 'pointer'
                  }}
                  title="Quick preview product specifications"
                >
                  <Eye size={17} />
                </button>
              )}

              {/* Floating Live Milling Metric Tag on Image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div style={{ color: '#FBFDF5' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#B3C4A5', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Active Grinding Batch
                  </span>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                    {activeProduct?.name || 'Chakki Fresh Atta'}
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(63, 107, 44, 0.85)',
                    color: '#FBFDF5',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  {FEATURED_STAPLES.find((s) => s.id === activeStapleId)?.badge || 'Fresh Harvest'}
                </div>
              </div>
            </div>

            {/* Live Interactive Product Detail Tray */}
            {activeProduct && (
              <div
                style={{
                  padding: '16px 20px',
                  background: 'rgba(251, 253, 245, 0.98)',
                  borderTop: '1px solid #DCE6CE'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                  <div>
                    <h3
                      onClick={() => openProductDetail(activeProduct)}
                      style={{
                        fontSize: '17px',
                        color: '#1E2B17',
                        margin: 0,
                        fontWeight: 800,
                        cursor: 'pointer',
                        lineHeight: 1.25
                      }}
                    >
                      {activeProduct.name}
                    </h3>
                    <p style={{ fontSize: '12.5px', color: '#55684B', margin: '3px 0 0 0' }}>
                      {activeProduct.tagline || activeProduct.shortDesc}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#1E2B17' }}>
                      ₹{currentPack?.price}
                    </div>
                    {currentPack?.originalPrice && (
                      <span style={{ fontSize: '11.5px', color: '#88987E', textDecoration: 'line-through' }}>
                        ₹{currentPack.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pack Selection Chips */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11.5px', color: '#687A5E', fontWeight: 600 }}>Pack size:</span>
                  {activeProduct.packOptions.map((pack, idx) => {
                    const isSelected = idx === selectedPackIdx;
                    return (
                      <button
                        key={pack.size}
                        onClick={() => setSelectedPackIdx(idx)}
                        style={{
                          background: isSelected ? '#3F6B2C' : '#EEF5E4',
                          color: isSelected ? '#ffffff' : '#2D4421',
                          border: isSelected ? '1px solid #3F6B2C' : '1px solid #D1DFC0',
                          borderRadius: '8px',
                          padding: '4px 10px',
                          fontSize: '11.5px',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {pack.size} · ₹{pack.price}
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Action Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => openProductDetail(activeProduct)}
                    className="clay-btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '12.5px' }}
                  >
                    View Details &amp; Origin
                  </button>

                  <button
                    onClick={handleQuickAdd}
                    className="clay-btn-primary"
                    style={{
                      padding: '8px 20px',
                      fontSize: '13px',
                      background: justAdded ? '#2E7D32' : undefined
                    }}
                  >
                    {justAdded ? (
                      <>
                        <Check size={15} /> Added to Cart
                      </>
                    ) : (
                      <>
                        <Plus size={15} /> Add Fresh Pack ({currentPack?.size})
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Value Pillars Strip */}
      <div
        className="clay-card-static"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: '20px',
          padding: '24px 28px',
          marginTop: '32px'
        }}
      >
        <div>
          <b style={{ fontSize: '15px', color: '#1E2B17', display: 'block' }}>Same-Day Fresh Milled</b>
          <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '5px', lineHeight: 1.5 }}>
            Never ground months in advance. Milled on order so you get the natural essential wheat oils, distinct aroma and authentic sweet flavour.
          </p>
        </div>
        <div>
          <b style={{ fontSize: '15px', color: '#1E2B17', display: 'block' }}>Zero Additives or Bleach</b>
          <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '5px', lineHeight: 1.5 }}>
            Pure grain from clean fields. No preservatives, bleaching agents, anti-caking chemicals, or maida blends.
          </p>
        </div>
        <div>
          <b style={{ fontSize: '15px', color: '#1E2B17', display: 'block' }}>Slow Stone Milling &lt; 40 RPM</b>
          <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '5px', lineHeight: 1.5 }}>
            Natural emery stone chakki running at low RPM keeps friction heat below 35°C to protect delicate vitamins B &amp; E.
          </p>
        </div>
        <div>
          <b style={{ fontSize: '15px', color: '#1E2B17', display: 'block' }}>100% Traceable to the Farm</b>
          <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '5px', lineHeight: 1.5 }}>
            Direct partnerships with smallholder farmers across Sehore, Bikaner, and Ramganj Mandi.
          </p>
        </div>
      </div>
    </section>
  );
};
