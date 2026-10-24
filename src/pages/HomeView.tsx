import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { CategoryProductSection } from '../components/CategoryProductSection';
import { ProofSection } from '../components/ProofSection';
import { FacilitySection } from '../components/FacilitySection';
import { AppDownloadBanner } from '../components/AppDownloadBanner';
import { HeroSection } from '../components/HeroSection';
import { Testimonials } from '../components/Testimonials';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Thermometer,
  ShieldCheck,
  ChevronRight,
  CheckCircle,
  MapPin,
  Clock
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    setActivePage,
    setSelectedCategory,
    setIsOutletPickerOpen,
    addToast
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
      {/* Modern High-Impact Artisanal Hero Section */}
      <HeroSection />

      {/* Unified Category & Product Type Section */}
      <CategoryProductSection initialCategory="Fresh Atta" showExploreAllButton={true} />

      {/* About Farmers Mill: Company Story & Direct Farm Heritage */}
      <section className="w" style={{ marginTop: '90px' }}>
        <div
          className="clay-card-static"
          style={{
            padding: 'clamp(32px, 5vw, 56px)',
            background: 'linear-gradient(135deg, #FBFDF5 0%, #F4F8EB 100%)',
            border: '1.5px solid #D3E0BC'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '48px', alignItems: 'center' }}>
            {/* Left: Narrative and Values */}
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#1E2B17', lineHeight: 1.15, margin: 0, fontWeight: 800 }}>
                About Farmers Mill
              </h2>
              <p style={{ fontSize: '18px', color: '#3F6B2C', fontWeight: 600, marginTop: '8px' }}>
                Born in the fields, stone-milled with honest Indian tradition.
              </p>
              <p style={{ fontSize: '15.5px', color: '#435538', lineHeight: 1.7, marginTop: '16px' }}>
                We founded Farmers Mill on one uncompromising belief: your family should never have to eat 4-month-old flour that was crushed under 90°C high-speed factory rollers with the wheat germ and bran stripped away.
              </p>
              <p style={{ fontSize: '15px', color: '#5C6E52', lineHeight: 1.65, marginTop: '12px' }}>
                Across our live artisanal milling hubs in Gurugram, Noida, and Bengaluru, we mill whole grains slowly on natural emery stones below 38°C and cold-press oils in traditional wooden Marachekku Kolhu expellers. Every batch is milled strictly on order and dispatched within 24 hours.
              </p>

              {/* 4 Pillars Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginTop: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={18} color="#3F6B2C" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <b style={{ fontSize: '13.5px', color: '#1E2B17', display: 'block' }}>Direct From Farmers</b>
                    <span style={{ fontSize: '12px', color: '#5C6E52' }}>Fair price, single-origin MP &amp; Rajasthan harvest</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={18} color="#3F6B2C" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <b style={{ fontSize: '13.5px', color: '#1E2B17', display: 'block' }}>100% Whole Grain</b>
                    <span style={{ fontSize: '12px', color: '#5C6E52' }}>Zero maida, zero bleaching chemicals</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={18} color="#3F6B2C" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <b style={{ fontSize: '13.5px', color: '#1E2B17', display: 'block' }}>Cold Stone Milled (&lt;38°C)</b>
                    <span style={{ fontSize: '12px', color: '#5C6E52' }}>Intact natural germ oils &amp; aroma</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={18} color="#3F6B2C" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <b style={{ fontSize: '13.5px', color: '#1E2B17', display: 'block' }}>24-Hr Freshness Window</b>
                    <span style={{ fontSize: '12px', color: '#5C6E52' }}>Milled on order, delivered fresh</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '30px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    setActivePage('story');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="clay-btn-primary"
                  style={{ padding: '12px 22px', fontSize: '14px', fontWeight: 700 }}
                >
                  <span>Our Complete Story</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setActivePage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="clay-btn-secondary"
                  style={{ padding: '12px 20px', fontSize: '14px', fontWeight: 700 }}
                >
                  <span>Explore All Products</span>
                </button>
              </div>
            </div>

            {/* Right: Company Stats & Outlets Overview Card */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                border: '1px solid #D3E0BC',
                padding: '28px',
                boxShadow: '0 8px 24px rgba(30, 43, 23, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <div style={{ borderBottom: '1px solid #EDF3DF', paddingBottom: '16px' }}>
                <span style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  The Live Mill Network
                </span>
                <h3 style={{ fontSize: '20px', color: '#1E2B17', marginTop: '4px' }}>
                  Freshness You Can Trace to the Grain
                </h3>
              </div>

              {/* 3 Metric Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ background: '#F8FAF2', padding: '16px', borderRadius: '16px', border: '1px solid #E1EBCB' }}>
                  <b style={{ fontSize: '26px', color: '#1E2B17', display: 'block', lineHeight: 1 }}>18,400+</b>
                  <span style={{ fontSize: '12px', color: '#5C6E52', marginTop: '4px', display: 'block' }}>Families nourished with pure stoneground harvest</span>
                </div>

                <div style={{ background: '#F8FAF2', padding: '16px', borderRadius: '16px', border: '1px solid #E1EBCB' }}>
                  <b style={{ fontSize: '26px', color: '#3F6B2C', display: 'block', lineHeight: 1 }}>3 Hubs</b>
                  <span style={{ fontSize: '12px', color: '#5C6E52', marginTop: '4px', display: 'block' }}>Live milling outlets in Gurugram, Noida &amp; Bengaluru</span>
                </div>

                <div style={{ background: '#F8FAF2', padding: '16px', borderRadius: '16px', border: '1px solid #E1EBCB' }}>
                  <b style={{ fontSize: '26px', color: '#1E2B17', display: 'block', lineHeight: 1 }}>230+</b>
                  <span style={{ fontSize: '12px', color: '#5C6E52', marginTop: '4px', display: 'block' }}>Pesticides tested zero via NABL certified labs</span>
                </div>

                <div style={{ background: '#F8FAF2', padding: '16px', borderRadius: '16px', border: '1px solid #E1EBCB' }}>
                  <b style={{ fontSize: '26px', color: '#3F6B2C', display: 'block', lineHeight: 1 }}>&lt; 24h</b>
                  <span style={{ fontSize: '12px', color: '#5C6E52', marginTop: '4px', display: 'block' }}>From stone grinding directly to your home doorstep</span>
                </div>
              </div>

              {/* Outlets Mini-Bar */}
              <div
                onClick={() => setIsOutletPickerOpen(true)}
                style={{
                  padding: '14px 16px',
                  background: 'linear-gradient(135deg, #E1EBCB 0%, #D4E3BA 100%)',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={18} color="#3F6B2C" />
                  <div>
                    <b style={{ fontSize: '13px', color: '#1E2B17', display: 'block' }}>Explore Live Mill Outlets</b>
                    <span style={{ fontSize: '11.5px', color: '#435538' }}>Pick your nearest chakki hub for direct dispatch</span>
                  </div>
                </div>
                <ArrowRight size={16} color="#1E2B17" />
              </div>
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
