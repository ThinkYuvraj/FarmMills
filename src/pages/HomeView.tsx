import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES, MOCK_REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryProductSection } from '../components/CategoryProductSection';
import { ProofSection } from '../components/ProofSection';
import { FacilitySection } from '../components/FacilitySection';
import { AppDownloadBanner } from '../components/AppDownloadBanner';
import { Sparkles, ArrowRight, CheckCircle, ShieldCheck, Heart, Award, Star, Truck, Flame } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setActivePage, setSelectedCategory, addToast } = useShop();
  const [emailSub, setEmailSub] = useState('');

  const featuredProducts = PRODUCTS.slice(0, 6);

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      addToast('Thank you! You are subscribed to fresh milling batch notifications.', 'success');
      setEmailSub('');
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section
        className="w"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          paddingTop: '56px',
          paddingBottom: '24px'
        }}
      >
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#E1EBCB',
              color: '#3F6B2C',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.08em',
              padding: '8px 16px',
              borderRadius: '999px'
            }}
          >
            <Sparkles size={15} /> FRESHLY MILLED · FARM SOURCED
          </span>

          <h1
            style={{
              fontSize: 'clamp(38px, 5.5vw, 62px)',
              lineHeight: 1.05,
              marginTop: '22px',
              color: '#1E2B17'
            }}
          >
            From the farmer’s field to your family’s table.
          </h1>

          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              lineHeight: 1.6,
              marginTop: '22px',
              maxWidth: '520px',
              color: '#435538'
            }}
          >
            Stone-ground chakki attas, pure cold spices, coarse pulses, and wood-pressed oils — milled with care and delivered fresh to your door.
          </p>

          <div style={{ display: 'flex', gap: '14px', marginTop: '32px', flexWrap: 'wrap' }}>
            <button
              className="btn p lg"
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
              className="btn g lg"
              onClick={() => {
                setActivePage('story');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              How we mill
            </button>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '32px', fontSize: '13px', color: '#5C6E52' }}>
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

        {/* Hero Visual Banner */}
        <div
          style={{
            position: 'relative',
            borderRadius: '32px',
            background: '#3F6B2C',
            minHeight: '440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div
            className="ph"
            style={{
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '1/1',
              width: '100%',
              height: '100%'
            }}
          >
            <img
              src="/images/c7702f34-2d4c-4994-9757-ac0571c00f78.jpeg"
              alt="Farmers Mill stone ground chakki fresh atta"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Floating Freshness Stamp */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              bottom: '20px',
              right: '20px',
              background: 'rgba(251, 253, 245, 0.94)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
              padding: '16px 20px',
              border: '1px solid #D3E0BC',
              boxShadow: '0 8px 24px rgba(30,43,23,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <b style={{ color: '#1E2B17', fontSize: '15px', display: 'block' }}>Milled in small batches</b>
              <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '2px' }}>
                No additives. Exact date of milling printed on every single pack.
              </p>
            </div>
            <span
              style={{
                background: '#E1EBCB',
                color: '#3F6B2C',
                padding: '6px 12px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '12px',
                whiteSpace: 'nowrap'
              }}
            >
              Batch #892 Fresh
            </span>
          </div>
        </div>
      </section>

      {/* 4 Value Pillars Strip */}
      <section className="w" style={{ marginTop: '48px' }}>
        <div
          className="card"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div>
            <b style={{ fontSize: '17px', color: '#1E2B17', display: 'block' }}>Same-day fresh</b>
            <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '6px', lineHeight: 1.5 }}>
              Milled on order so you get the natural essential wheat oils, distinct aroma and authentic sweet flavour.
            </p>
          </div>
          <div>
            <b style={{ fontSize: '17px', color: '#1E2B17', display: 'block' }}>Zero additives</b>
            <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '6px', lineHeight: 1.5 }}>
              Pure grain from clean fields. No preservatives, bleaching agents, anti-caking chemicals, or maida blends.
            </p>
          </div>
          <div>
            <b style={{ fontSize: '17px', color: '#1E2B17', display: 'block' }}>Slow stone milling</b>
            <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '6px', lineHeight: 1.5 }}>
              Natural emery stone chakki running at low RPM keeps friction heat below 35°C to protect delicate vitamins.
            </p>
          </div>
          <div>
            <b style={{ fontSize: '17px', color: '#1E2B17', display: 'block' }}>Traceable to the farm</b>
            <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '6px', lineHeight: 1.5 }}>
              Direct partnerships with smallholder farmers across Sehore, Bikaner, and Ramganj Mandi.
            </p>
          </div>
        </div>
      </section>

      {/* Unified Category & Product Type Section */}
      <CategoryProductSection initialCategory="Fresh Atta" showExploreAllButton={true} />

      {/* The Stone Milling Difference (Comparative Story) */}
      <section className="w" style={{ marginTop: '96px' }}>
        <div
          style={{
            background: '#1E2B17',
            borderRadius: '28px',
            color: '#FBFDF5',
            padding: 'clamp(32px, 5vw, 64px)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span style={{ background: 'rgba(225, 235, 203, 0.2)', color: '#E1EBCB', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' }}>
              ANCIENT WISDOM · MODERN TRANSPARENCY
            </span>
            <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 44px)', color: '#ffffff', marginTop: '16px', lineHeight: 1.15 }}>
              Why stone-ground chakki flour beats industrial roller mills.
            </h2>
            <p style={{ fontSize: '16px', color: '#D2E0BC', marginTop: '16px', lineHeight: 1.7 }}>
              Commercial mass-market mills use high-speed steel rollers that generate friction temperatures over 85°C. This extreme heat damages vital B-vitamins, burns aromatic germ oils, and dries out the bran.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginTop: '40px'
            }}
          >
            <div
              style={{
                background: 'rgba(63, 107, 44, 0.4)',
                border: '1.5px solid #3F6B2C',
                borderRadius: '20px',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#7BC652', fontWeight: 700, fontSize: '16px' }}>
                <CheckCircle size={20} />
                <span>Farmers Mill Natural Stone Chakki</span>
              </div>
              <ul style={{ marginTop: '16px', paddingLeft: '20px', fontSize: '14px', lineHeight: 1.8, color: '#F2F6E6' }}>
                <li>Low RPM rotation keeps temperatures below 35°C</li>
                <li>Retains 100% of germ oil, endosperm and dietary bran</li>
                <li>High natural moisture absorption: softer rotis for 12+ hours</li>
                <li>Zero chemical preservatives, benzoyl peroxide or maida</li>
                <li>Milled fresh on order with milling date stamped</li>
              </ul>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FF8A80', fontWeight: 700, fontSize: '16px' }}>
                <Flame size={20} />
                <span>Typical Factory Roller Mills</span>
              </div>
              <ul style={{ marginTop: '16px', paddingLeft: '20px', fontSize: '14px', lineHeight: 1.8, color: '#B3C4A5' }}>
                <li>High friction heats up to 90°C, destroying nutrients</li>
                <li>Germ and bran stripped away to extend shelf life</li>
                <li>Rotis turn rubbery or dry quickly within 2 hours</li>
                <li>Often stored in warehouses for 3 to 6 months</li>
                <li>Pesticide residues and chemical bleaching common</li>
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

      {/* Customer Reviews Section */}
      <section className="w" style={{ marginTop: '90px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <span style={{ color: '#3F6B2C', fontWeight: 700, letterSpacing: '0.08em', fontSize: '13px' }}>
            VERIFIED PATRON VOICES
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', marginTop: '8px' }}>
            Loved by families who care about pure food.
          </h2>
          <p style={{ fontSize: '16px', color: '#5C6E52', marginTop: '10px' }}>
            Over 12,000 kitchens across India trust Farmers Mill for their daily rotis, pure haldi, and cold-pressed oils.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginTop: '36px'
          }}
        >
          {MOCK_REVIEWS.map((rev) => (
            <div key={rev.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#D4A346" stroke="#D4A346" />
                ))}
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#1E2B17', fontStyle: 'italic', flex: 1 }}>
                "{rev.comment}"
              </p>
              <div style={{ borderTop: '1px solid #D3E0BC', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <b style={{ fontSize: '14px', color: '#1E2B17', display: 'block' }}>{rev.author}</b>
                  <span style={{ fontSize: '12px', color: '#5C6E52' }}>{rev.location} · {rev.date}</span>
                </div>
                <span className="badge" style={{ fontSize: '11px', padding: '3px 8px' }}>
                  ✓ Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Batch Notification */}
      <section className="w" style={{ marginTop: '90px' }}>
        <div
          className="card"
          style={{
            background: '#E1EBCB',
            borderColor: '#B8CC98',
            padding: 'clamp(32px, 5vw, 48px)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '16px' }}>
            <Sparkles size={24} />
          </div>
          <h3 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', color: '#1E2B17' }}>
            Get Fresh Batch Milling Notifications
          </h3>
          <p style={{ fontSize: '15px', color: '#435538', maxWidth: '540px', marginTop: '10px', lineHeight: 1.6 }}>
            Never run out of pure chakki atta or cold-pressed mustard oil. Subscribe for seasonal harvest alerts, pickle drops, and subscriber-only 15% discounts.
          </p>

          <form
            onSubmit={handleSubscribe}
            style={{
              display: 'flex',
              gap: '10px',
              maxWidth: '460px',
              width: '100%',
              marginTop: '24px',
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
              style={{ flex: 1, minWidth: '220px' }}
            />
            <button type="submit" className="btn p" style={{ padding: '12px 24px' }}>
              Subscribe
            </button>
          </form>
          <span style={{ fontSize: '12px', color: '#5C6E52', marginTop: '12px' }}>
            No spam, ever. Unsubscribe anytime with 1 click.
          </span>
        </div>
      </section>
    </div>
  );
};
