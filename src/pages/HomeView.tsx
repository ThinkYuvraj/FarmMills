import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { CategoryProductSection } from '../components/CategoryProductSection';
import { ProofSection } from '../components/ProofSection';
import { FacilitySection } from '../components/FacilitySection';
import { AppDownloadBanner } from '../components/AppDownloadBanner';
import { HeroProductCarousel } from '../components/HeroProductCarousel';
import { Testimonials } from '../components/Testimonials';
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  MapPin,
  Flame,
  Award,
  Thermometer,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  Store
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    setActivePage,
    setSelectedCategory,
    addToast,
    selectedOutlet,
    setIsOutletPickerOpen
  } = useShop();

  const [emailSub, setEmailSub] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      addToast('Thank you! You are subscribed to fresh milling batch notifications.', 'success');
      setEmailSub('');
    }
  };

  return (
    <div style={{ paddingBottom: '60px', overflowX: 'hidden', width: '100%' }}>
      {/* Factory Outlet Location Sharing Strip */}
      <section className="w" style={{ paddingTop: '16px' }}>
        <div
          onClick={() => setIsOutletPickerOpen(true)}
          className="clay-inset"
          style={{
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            cursor: 'pointer',
            flexWrap: 'wrap',
            transition: 'all 0.2s ease'
          }}
          title="Click to change your milling outlet location"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                background: '#3F6B2C',
                color: '#ffffff',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Store size={12} /> FACTORY OUTLET
            </span>
            <span style={{ fontSize: '13px', color: '#1E2B17', fontWeight: 600 }}>
              📍 I’m sharing you the location for now:{' '}
              <strong style={{ color: '#2E5220' }}>{selectedOutlet.name}</strong> ({selectedOutlet.landmark})
            </span>
            <span
              style={{
                background: '#E1EBCB',
                color: '#3F6B2C',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700
              }}
            >
              Milling Active Today
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3F6B2C', fontSize: '12.5px', fontWeight: 700 }}>
            <span>Change Outlet</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section
        className="w"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(24px, 4vw, 48px)',
          alignItems: 'center',
          paddingTop: 'clamp(20px, 3vw, 40px)',
          paddingBottom: '24px'
        }}
      >
        <div>
          <span className="clay-badge" style={{ marginBottom: '16px' }}>
            <Sparkles size={14} /> FRESHLY MILLED · FARM SOURCED
          </span>

          <h1
            style={{
              fontSize: 'clamp(34px, 5vw, 56px)',
              lineHeight: 1.1,
              marginTop: '12px',
              color: '#1E2B17'
            }}
          >
            From the farmer’s field to your family’s table.
          </h1>

          <p
            className="subheading"
            style={{
              marginTop: '16px',
              maxWidth: '520px',
              color: '#435538'
            }}
          >
            Stone-ground chakki attas, pure cold spices, coarse pulses, and wood-pressed oils — milled with care and delivered fresh to your door.
          </p>

          <div style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
            <button
              className="clay-btn-primary"
              style={{ padding: '14px 28px', fontSize: '15px' }}
              onClick={() => {
                setSelectedCategory('All');
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Shop fresh harvest</span>
              <ArrowRight size={18} />
            </button>

            <button
              className="clay-btn-secondary"
              style={{ padding: '14px 26px', fontSize: '15px' }}
              onClick={() => {
                setActivePage('story');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              How we mill
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              marginTop: '28px',
              fontSize: '13px',
              color: '#5C6E52',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} color="#3F6B2C" />
              <span>Zero Preservatives</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} color="#3F6B2C" />
              <span>100% Whole Grain</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} color="#3F6B2C" />
              <span>Milled on Order</span>
            </div>
          </div>
        </div>

        {/* Hero Product Carousel */}
        <div>
          <HeroProductCarousel />
        </div>
      </section>

      {/* 4 Value Pillars Strip */}
      <section className="w" style={{ marginTop: '36px' }}>
        <div
          className="clay-card-static"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '24px',
            padding: '28px'
          }}
        >
          <div>
            <b style={{ fontSize: '16px', color: '#1E2B17', display: 'block' }}>Same-day fresh</b>
            <p style={{ fontSize: '13.5px', color: '#5C6E52', marginTop: '6px', lineHeight: 1.5 }}>
              Milled on order so you get the natural essential wheat oils, distinct aroma and authentic sweet flavour.
            </p>
          </div>
          <div>
            <b style={{ fontSize: '16px', color: '#1E2B17', display: 'block' }}>Zero additives</b>
            <p style={{ fontSize: '13.5px', color: '#5C6E52', marginTop: '6px', lineHeight: 1.5 }}>
              Pure grain from clean fields. No preservatives, bleaching agents, anti-caking chemicals, or maida blends.
            </p>
          </div>
          <div>
            <b style={{ fontSize: '16px', color: '#1E2B17', display: 'block' }}>Slow stone milling</b>
            <p style={{ fontSize: '13.5px', color: '#5C6E52', marginTop: '6px', lineHeight: 1.5 }}>
              Natural emery stone chakki running at low RPM keeps friction heat below 35°C to protect delicate vitamins.
            </p>
          </div>
          <div>
            <b style={{ fontSize: '16px', color: '#1E2B17', display: 'block' }}>Traceable to the farm</b>
            <p style={{ fontSize: '13.5px', color: '#5C6E52', marginTop: '6px', lineHeight: 1.5 }}>
              Direct partnerships with smallholder farmers across Sehore, Bikaner, and Ramganj Mandi.
            </p>
          </div>
        </div>
      </section>

      {/* Unified Category & Product Type Section */}
      <CategoryProductSection initialCategory="Fresh Atta" showExploreAllButton={true} />

      {/* FIXED: The Stone Milling Difference (Comparative Story) */}
      <section className="w" style={{ marginTop: '80px' }}>
        <div
          className="clay-card-static"
          style={{
            background: 'linear-gradient(135deg, #1E2B17 0%, #293D1F 100%)',
            borderRadius: '32px',
            color: '#FBFDF5',
            padding: 'clamp(28px, 4.5vw, 56px)',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{ maxWidth: '680px' }}>
            <span
              style={{
                background: 'rgba(225, 235, 203, 0.2)',
                color: '#E1EBCB',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em'
              }}
            >
              ANCIENT WISDOM · MODERN TRANSPARENCY
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', color: '#ffffff', marginTop: '14px', lineHeight: 1.15 }}>
              Why stone-ground chakki flour beats industrial roller mills.
            </h2>
            <p style={{ fontSize: '15.5px', color: '#D2E0BC', marginTop: '12px', lineHeight: 1.7 }}>
              Factory mills use fast steel rollers that generate friction temperatures over 85°C. This extreme heat scorches delicate B-vitamins, burns vital germ oils, and dries out the bran. Here is how Farmers Mill natural stone chakkis differ:
            </p>
          </div>

          {/* Comparative Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '24px',
              marginTop: '36px'
            }}
          >
            {/* Farmers Mill Column */}
            <div
              className="clay-card"
              style={{
                background: 'rgba(63, 107, 44, 0.55)',
                border: '1.5px solid #7BC652',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7BC652', fontWeight: 700, fontSize: '18px' }}>
                  <ShieldCheck size={24} />
                  <span>Farmers Mill Stone Chakki</span>
                </div>
                <span
                  style={{
                    background: '#7BC652',
                    color: '#1E2B17',
                    fontWeight: 800,
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '999px'
                  }}
                >
                  &lt; 35°C COLD
                </span>
              </div>

              <ul style={{ paddingLeft: '18px', fontSize: '14px', lineHeight: 1.85, color: '#F2F6E6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  <b>Low-RPM Stone Pulverization:</b> Friction temperature stays below 35°C, ensuring zero vitamin destruction.
                </li>
                <li>
                  <b>100% Whole Grain Retained:</b> Retains the aleurone layer, rich wheat germ oils, and natural dietary fiber.
                </li>
                <li>
                  <b>Soft Rotis for 12+ Hours:</b> Natural moisture absorption creates fluffy, tender rotis that don't dry out.
                </li>
                <li>
                  <b>Zero Preservatives or Bleach:</b> Zero benzoyl peroxide, zero maida blending, and zero artificial shelf extenders.
                </li>
                <li>
                  <b>Milled on Order with Date:</b> Dispatched within 24 hours of stone milling with batch date stamped on pack.
                </li>
              </ul>
            </div>

            {/* Industrial Factory Column */}
            <div
              className="clay-card"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1.5px solid rgba(255, 138, 128, 0.4)',
                borderRadius: '24px',
                padding: '28px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF8A80', fontWeight: 700, fontSize: '18px' }}>
                  <Flame size={24} />
                  <span>Commercial Factory Mills</span>
                </div>
                <span
                  style={{
                    background: 'rgba(255, 138, 128, 0.2)',
                    color: '#FF8A80',
                    fontWeight: 800,
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '999px'
                  }}
                >
                  &gt; 85°C HEAT
                </span>
              </div>

              <ul style={{ paddingLeft: '18px', fontSize: '14px', lineHeight: 1.85, color: '#C8D8BE', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  <b>High Friction Scorching:</b> Steel rollers exceed 85°C–90°C, burning away volatile nutrients and natural sweetness.
                </li>
                <li>
                  <b>Germ &amp; Bran Stripped:</b> Vital nutritious germ oils removed to prolong warehouse shelf-life up to 6 months.
                </li>
                <li>
                  <b>Rubber-like Rotis:</b> Rotis turn stiff, chewy, or rubbery within 2 hours of cooking.
                </li>
                <li>
                  <b>Chemical Bleaching:</b> Frequently treated with chemical bleaches and anti-caking agents for stark white color.
                </li>
                <li>
                  <b>Stale Warehouse Storage:</b> Packet flours sit in distribution hubs for months before reaching supermarket shelves.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Direct From the Mill Facility Section */}
      <FacilitySection />

      {/* See the Proof Lab Transparency Section */}
      <ProofSection />

      {/* Download the App Promotional Banner */}
      <AppDownloadBanner />

      {/* Dynamic Testimonials Grid */}
      <Testimonials />

      {/* Newsletter Batch Notification */}
      <section className="w" style={{ marginTop: '80px' }}>
        <div
          className="clay-card-static"
          style={{
            background: 'linear-gradient(135deg, #E1EBCB 0%, #D4E3BA 100%)',
            padding: 'clamp(28px, 4vw, 44px)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#3F6B2C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              marginBottom: '14px'
            }}
          >
            <Sparkles size={24} />
          </div>
          <h2 style={{ fontSize: 'clamp(22px, 3.2vw, 30px)', color: '#1E2B17' }}>
            Get Fresh Batch Milling Notifications
          </h2>
          <p className="subheading" style={{ maxWidth: '540px', marginTop: '8px', color: '#3A4D30' }}>
            Never run out of pure chakki atta or cold-pressed mustard oil. Subscribe for seasonal harvest alerts, pickle drops, and subscriber-only discounts.
          </p>

          <form
            onSubmit={handleSubscribe}
            style={{
              display: 'flex',
              gap: '10px',
              maxWidth: '460px',
              width: '100%',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              value={emailSub}
              onChange={(e) => setEmailSub(e.target.value)}
              required
              className="input-field"
              style={{ flex: 1, minWidth: '220px', background: '#ffffff' }}
            />
            <button type="submit" className="clay-btn-primary" style={{ padding: '12px 24px' }}>
              Subscribe
            </button>
          </form>
          <span style={{ fontSize: '12px', color: '#5C6E52', marginTop: '10px' }}>
            No spam, ever. Unsubscribe anytime with 1 click.
          </span>
        </div>
      </section>
    </div>
  );
};
