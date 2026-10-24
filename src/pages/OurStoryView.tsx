import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, CheckCircle2, MapPin, Heart, ShieldCheck, Mail, Phone, Send, ChevronDown, Leaf, Users } from 'lucide-react';

export const OurStoryView: React.FC = () => {
  const { addToast, setActivePage } = useShop();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      addToast('Thank you for reaching out! Our milling team will contact you within 24 hours.', 'success');
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    }
  };

  const faqs = [
    {
      q: 'How is stone chakki milling better than modern factory roller mills?',
      a: 'Modern roller mills generate temperatures exceeding 85°C that roast away essential volatile oils, vitamin B complexes, and burn the natural sweet fragrance of the wheat germ. Our low-RPM emery stone chakkis stay under 35°C, ensuring that all 3 layers of the grain (bran, germ, endosperm) remain intact for unmatched softness and digestion.'
    },
    {
      q: 'When was my flour milled?',
      a: 'Every pack of Farmers Mill atta, besan, and spices carries the exact date and hour of milling printed on the freshness stamp. We never store pre-milled flour in bulk warehouses.'
    },
    {
      q: 'Do you add any preservatives, maida or bleaching chemicals?',
      a: 'Never. We take extreme pride in zero adulteration. There is zero benzoyl peroxide, zero potassium bromate, zero chalk powder, zero added colors, and zero artificial shelf-life chemicals in any of our products.'
    },
    {
      q: 'Why does your Raw Honey sometimes crystallize?',
      a: 'Crystallization is the supreme proof of pure, unfiltered, unheated raw honey! Commercial honey is heavily boiled and ultra-filtered to keep it liquid forever, which kills active enzymes. Raw honey naturally crystallizes depending on temperature and floral nectar ratios. Simply place the glass jar in warm water (below 45°C) to reliquefy naturally.'
    },
    {
      q: 'What is the shelf life of freshly milled whole wheat atta?',
      a: 'Because we don’t use chemical preservatives, our whole wheat atta is best enjoyed within 45 to 60 days of milling. Store in an airtight container away from humidity.'
    }
  ];

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Story Hero */}
      <section className="w" style={{ paddingTop: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 50px)', lineHeight: 1.1, color: '#1E2B17', marginTop: '4px' }}>
              Born in the fields, milled with respect.
            </h1>
            <p className="subheading" style={{ marginTop: '16px', lineHeight: 1.7, color: '#435538' }}>
              We started Farmers Mill with one unbending conviction: you shouldn’t have to settle for factory-packaged flours that were ground 4 months ago under 90°C steel rollers with their germ and fiber stripped away.
            </p>
            <p style={{ marginTop: '14px', lineHeight: 1.7, color: '#5C6E52', fontSize: '15px' }}>
              Operating live flour and oil chakkis in Gurugram, Noida, and Bengaluru, we bring back traditional stone-milling on emery stones and slow wooden marachekku kolhu pressing.
            </p>
          </div>

          <div
            className="clay-card-static"
            style={{
              overflow: 'hidden',
              borderRadius: '32px',
              aspectRatio: '4/3',
              minHeight: '320px',
              position: 'relative'
            }}
          >
            <img
              src="/images/c7702f34-2d4c-4994-9757-ac0571c00f78.jpeg"
              alt="Farmers Mill authentic stone grinding facility"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* 3 Pillars from farmersmill.in/about-us */}
      <section className="w" style={{ marginTop: '64px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '24px'
          }}
        >
          {/* Pillar 1 */}
          <div className="clay-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#E1EBCB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3F6B2C'
              }}
            >
              <Sparkles size={24} />
            </div>
            <h2 style={{ fontSize: '20px', color: '#1E2B17' }}>Delivering Freshness with Every Product</h2>
            <p className="body-text" style={{ color: '#435538', lineHeight: 1.7 }}>
              At FarmersMill, freshness is our priority. We source our ingredients directly from local farmers and process them in small batches to retain their natural goodness. Our commitment to quality ensures that every product you receive is fresh and packed with flavor.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="clay-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#E1EBCB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3F6B2C'
              }}
            >
              <Leaf size={24} />
            </div>
            <h2 style={{ fontSize: '20px', color: '#1E2B17' }}>We Commit to Sustainability</h2>
            <p className="body-text" style={{ color: '#435538', lineHeight: 1.7 }}>
              Sustainability is at the heart of what we do. From our eco-friendly packaging to our sustainable sourcing practices, we strive to reduce our environmental footprint while supporting local agriculture and conserving indigenous heirloom seeds.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="clay-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#E1EBCB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3F6B2C'
              }}
            >
              <Users size={24} />
            </div>
            <h2 style={{ fontSize: '20px', color: '#1E2B17' }}>Supporting Local Farmers and Communities</h2>
            <p className="body-text" style={{ color: '#435538', lineHeight: 1.7 }}>
              By choosing FarmersMill, you are not just buying food; you are supporting local farmers and their communities. We believe in creating a positive impact by fostering fair trade practices and helping small-scale farmers thrive.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="w" style={{ marginTop: '80px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: '#1E2B17' }}>
            Frequently Asked Questions
          </h2>
          <p className="subheading" style={{ marginTop: '8px' }}>
            Everything you need to know about our slow stone grinding and pure cold extraction.
          </p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="clay-card"
                style={{
                  padding: '20px 24px',
                  cursor: 'pointer'
                }}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <b style={{ fontSize: '16px', color: '#1E2B17' }}>{faq.q}</b>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: '#3F6B2C'
                    }}
                  />
                </div>
                {isOpen && (
                  <p style={{ marginTop: '12px', fontSize: '14.5px', color: '#435538', lineHeight: 1.7 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Us Form */}
      <section className="w" style={{ marginTop: '80px' }}>
        <div
          className="clay-card-static"
          style={{
            padding: 'clamp(28px, 4vw, 48px)',
            background: 'linear-gradient(135deg, #FBFDF5 0%, #F2F6E6 100%)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '40px' }}>
            <div>
              <h2 style={{ fontSize: '30px', color: '#1E2B17', marginTop: '4px' }}>Speak with Our Head Miller</h2>
              <p style={{ fontSize: '15px', color: '#435538', marginTop: '10px', lineHeight: 1.6 }}>
                Have questions about custom grain milling, wedding gifting, or wholesale delivery to your society? Drop us a line.
              </p>

              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#1E2B17' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={18} color="#3F6B2C" />
                  <span><b>Gurugram Udyog Vihar Mill Hub:</b> Plot 42, Phase 4, Udyog Vihar, Gurugram, Haryana 122015</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={18} color="#3F6B2C" />
                  <span><b>Direct Support:</b> +91-8826313986 / +91 98110 54321</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={18} color="#3F6B2C" />
                  <span><b>Email:</b> support@farmersmill.in / hello@farmersmill.in</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shalini Roy"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                  Message *
                </label>
                <textarea
                  rows={3}
                  placeholder="How can we help your kitchen table?"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <button type="submit" className="clay-btn-primary" style={{ padding: '12px 24px', alignSelf: 'flex-start' }}>
                <Send size={15} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
