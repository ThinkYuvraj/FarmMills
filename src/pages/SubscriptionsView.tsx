import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, Calendar, CheckCircle2, ShieldCheck, Truck, ArrowRight, Heart } from 'lucide-react';

export const SubscriptionsView: React.FC = () => {
  const { addSubscription, setActivePage, subscriptions, cancelSubscription, addToast } = useShop();

  const [frequencyMap, setFrequencyMap] = useState<Record<string, 'Weekly' | 'Every 2 Weeks' | 'Monthly'>>({
    'fm-atta-chakki': 'Every 2 Weeks',
    'fm-oil-mustard': 'Monthly',
    'fm-flour-mota-besan': 'Every 2 Weeks'
  });

  const subscriptionProducts = [
    {
      product: PRODUCTS[5], // Chakki Atta
      defaultPack: PRODUCTS[5].packOptions[1], // 5kg
      badge: 'Most Popular Routine',
      tagline: 'Freshly milled chakki atta delivered straight from dawn grinding.'
    },
    {
      product: PRODUCTS[8], // Wood Pressed Mustard Oil
      defaultPack: PRODUCTS[8].packOptions[1], // 1L
      badge: 'Monthly Kitchen Essential',
      tagline: 'Kachi ghani raw mustard oil extracted in wooden kolhus.'
    },
    {
      product: PRODUCTS[2], // Mota Besan
      defaultPack: PRODUCTS[2].packOptions[1], // 1kg
      badge: 'Pure Whole Pulse',
      tagline: 'Artisanal coarse gram flour for healthy laddoos, chilla & pakoras.'
    },
    {
      product: PRODUCTS[9], // A2 Ghee
      defaultPack: PRODUCTS[9].packOptions[0], // 500ml
      badge: 'Vedic Wellness',
      tagline: 'Granular bilona curd-churned golden Gir cow ghee.'
    }
  ];

  const handleSubscribeClick = (item: any) => {
    const freq = frequencyMap[item.product.id] || 'Every 2 Weeks';
    addSubscription(item.product, item.defaultPack, freq);
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      <section className="w" style={{ paddingTop: '40px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
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
              padding: '6px 14px',
              borderRadius: '999px'
            }}
          >
            <Sparkles size={14} /> REPEAT MILLING SUBSCRIPTIONS
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', marginTop: '12px' }}>
            Freshness On Auto-Pilot
          </h1>
          <p style={{ fontSize: '16px', color: '#5C6E52', marginTop: '10px', lineHeight: 1.6 }}>
            Never run out of pure stone-ground chakki flour or cold-pressed mustard oil. Subscribe to scheduled routine batches and enjoy <b>Flat 15% OFF</b> with <b>Guaranteed Free Delivery</b>.
          </p>
        </div>

        {/* 3 Subscription Benefits */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginTop: '36px'
          }}
        >
          <div className="card" style={{ padding: '24px', background: '#ffffff', display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E1EBCB', color: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <Sparkles size={24} />
            </div>
            <div>
              <b style={{ color: '#1E2B17', fontSize: '16px', display: 'block' }}>Flat 15% OFF Always</b>
              <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '2px' }}>Locked subscriber savings on all reorders</p>
            </div>
          </div>

          <div className="card" style={{ padding: '24px', background: '#ffffff', display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E1EBCB', color: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <Truck size={24} />
            </div>
            <div>
              <b style={{ color: '#1E2B17', fontSize: '16px', display: 'block' }}>Free Priority Delivery</b>
              <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '2px' }}>Dedicated dawn milling slot at zero delivery fee</p>
            </div>
          </div>

          <div className="card" style={{ padding: '24px', background: '#ffffff', display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E1EBCB', color: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <Calendar size={24} />
            </div>
            <div>
              <b style={{ color: '#1E2B17', fontSize: '16px', display: 'block' }}>Zero Lock-in Commitment</b>
              <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '2px' }}>Pause, modify dates, or cancel anytime</p>
            </div>
          </div>
        </div>

        {/* Subscription Plans Grid */}
        <div style={{ marginTop: '54px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Choose Your Routine Pantry Plan</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {subscriptionProducts.map((item) => {
              const currentFreq = frequencyMap[item.product.id] || 'Every 2 Weeks';
              const discountedPrice = Math.round(item.defaultPack.price * 0.85);

              return (
                <div
                  key={item.product.id}
                  className="card hoverable"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff',
                    position: 'relative'
                  }}
                >
                  <span className="badge" style={{ alignSelf: 'flex-start', marginBottom: '12px', fontSize: '11px' }}>
                    {item.badge}
                  </span>

                  <div className="ph" style={{ aspectRatio: '16/10', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px' }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <h3 style={{ fontSize: '20px', color: '#1E2B17' }}>{item.product.name}</h3>
                  <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '4px' }}>{item.tagline}</p>
                  <b style={{ fontSize: '13px', color: '#3F6B2C', display: 'block', marginTop: '8px' }}>
                    Default Pack: {item.defaultPack.size}
                  </b>

                  {/* Frequency Switcher */}
                  <div style={{ marginTop: '16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#5C6E52', display: 'block', marginBottom: '6px' }}>
                      Delivery Frequency:
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {(['Weekly', 'Every 2 Weeks', 'Monthly'] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFrequencyMap({ ...frequencyMap, [item.product.id]: f })}
                          className={`btn sm ${currentFreq === f ? 'p' : 'g'}`}
                          style={{ flex: 1, padding: '6px 8px', fontSize: '11px', borderRadius: '8px' }}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                      <b style={{ fontSize: '24px', color: '#1E2B17' }}>₹{discountedPrice}</b>
                      <span style={{ fontSize: '15px', textDecoration: 'line-through', color: '#7E9171' }}>
                        ₹{item.defaultPack.price}
                      </span>
                      <span style={{ color: '#2E7D32', fontSize: '12px', fontWeight: 700 }}>
                        Save 15%
                      </span>
                    </div>

                    <button
                      className="btn p"
                      onClick={() => handleSubscribeClick(item)}
                      style={{ width: '100%', padding: '12px' }}
                    >
                      Subscribe ({currentFreq})
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User Active Subscriptions Section */}
        {subscriptions.length > 0 && (
          <div style={{ marginTop: '64px' }}>
            <h3 style={{ fontSize: '26px', marginBottom: '18px' }}>Your Active Subscriptions ({subscriptions.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="card"
                  style={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    background: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div className="ph" style={{ width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden' }}>
                      <img src={sub.product.image} alt={sub.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <b style={{ fontSize: '16px', color: '#1E2B17', display: 'block' }}>{sub.product.name}</b>
                      <span style={{ fontSize: '13px', color: '#5C6E52' }}>
                        Pack: <b>{sub.selectedPack.size}</b> · Frequency: <b>{sub.frequency}</b> · Next: <span style={{ color: '#2E7D32', fontWeight: 600 }}>{sub.nextDeliveryDate}</span>
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <b style={{ fontSize: '18px', color: '#1E2B17' }}>
                      ₹{Math.round(sub.selectedPack.price * 0.85)} / delivery
                    </b>
                    <button
                      onClick={() => cancelSubscription(sub.id)}
                      className="btn g sm"
                      style={{ color: '#D94436', borderColor: '#D94436' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
