import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, CheckCircle2, MapPin, Heart, ShieldCheck, Mail, Phone, Send, ChevronDown } from 'lucide-react';

export const OurStoryView: React.FC = () => {
  const { addToast } = useShop();

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
      <section className="w" style={{ paddingTop: '56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#3F6B2C', fontWeight: 700, letterSpacing: '0.08em', fontSize: '13px' }}>
              OUR ROOTS &amp; MISSION
            </span>
            <h1 style={{ fontSize: 'clamp(34px, 4.5vw, 54px)', lineHeight: 1.08, marginTop: '12px' }}>
              Born in the fields, milled with respect.
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.7, marginTop: '20px', color: '#435538' }}>
              Farmers Mill was founded with a singular conviction: our daily food should not be stripped of its soul in massive industrial factories.
            </p>
            <p style={{ fontSize: '16px', lineHeight: 1.7, marginTop: '14px', color: '#5C6E52' }}>
              For generations, Indian households bought whole grains from local mandis and visited the neighborhood stone chakki. The flour was aromatic, warm, wholesome, and alive. Mass packaging replaced that sacred ritual with chemically bleached, germ-extracted packets sitting on supermarket shelves for half a year. We returned to the roots to restore pure, fresh food to your table.
            </p>
          </div>

          <div
            className="ph"
            style={{
              aspectRatio: '4/3',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <img src="/images/f8dc54fe-056f-4b37-961a-f230dd340160.jpeg" alt="Farmers Mill fields and harvest" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* 4 Pillars of Farmers Mill */}
      <section className="w" style={{ marginTop: '80px' }}>
        <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '36px' }}>Our Four Golden Purity Standards</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div className="card" style={{ padding: '28px', background: '#ffffff' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E1EBCB', color: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Sparkles size={24} />
            </div>
            <b style={{ fontSize: '18px', color: '#1E2B17', display: 'block' }}>1. Zero Warehouse Aging</b>
            <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '8px', lineHeight: 1.6 }}>
              We mill after you order. Grains remain in climate-controlled whole seed storage until ground, preventing oxidation.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', background: '#ffffff' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E1EBCB', color: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <ShieldCheck size={24} />
            </div>
            <b style={{ fontSize: '18px', color: '#1E2B17', display: 'block' }}>2. Retaining the Whole Grain</b>
            <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '8px', lineHeight: 1.6 }}>
              We never sift out the germ or bran. You receive 100% of the fiber, potassium, vitamin E, and natural wheat lipids.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', background: '#ffffff' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E1EBCB', color: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Heart size={24} />
            </div>
            <b style={{ fontSize: '18px', color: '#1E2B17', display: 'block' }}>3. Fair Direct Farmer Gate</b>
            <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '8px', lineHeight: 1.6 }}>
              We pay our farmer partners 20-30% above MSP for rain-fed, natural cultivation methods and organic field stewardship.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', background: '#ffffff' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E1EBCB', color: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <MapPin size={24} />
            </div>
            <b style={{ fontSize: '18px', color: '#1E2B17', display: 'block' }}>4. Single-Origin Traceability</b>
            <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '8px', lineHeight: 1.6 }}>
              Every batch has a verifiable geographical trail: Sehore for Sharbati, Erode for Curcumin Haldi, Bharatpur for Mustard.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Accordion */}
      <section className="w" style={{ marginTop: '90px' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 36px' }}>
          <span style={{ color: '#3F6B2C', fontWeight: 700, letterSpacing: '0.08em', fontSize: '13px' }}>
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 style={{ fontSize: '36px', marginTop: '8px' }}>Got Questions? We Have Honest Answers.</h2>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  background: '#ffffff',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
              >
                <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <b style={{ fontSize: '16px', color: '#1E2B17' }}>{faq.q}</b>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.25s ease',
                      flex: 'none',
                      color: '#3F6B2C'
                    }}
                  />
                </div>
                {isOpen && (
                  <div style={{ padding: '0 24px 20px', color: '#5C6E52', fontSize: '15px', lineHeight: 1.7, borderTop: '1px solid #F2F6E6', paddingTop: '14px' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w" style={{ marginTop: '90px' }}>
        <div
          className="card"
          style={{
            padding: 'clamp(32px, 5vw, 48px)',
            background: '#FBFDF5',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}
        >
          <div>
            <span style={{ color: '#3F6B2C', fontWeight: 700, letterSpacing: '0.08em', fontSize: '13px' }}>
              GET IN TOUCH
            </span>
            <h2 style={{ fontSize: '34px', marginTop: '6px' }}>Speak with Our Milling Master</h2>
            <p style={{ fontSize: '15px', color: '#5C6E52', marginTop: '12px', lineHeight: 1.6 }}>
              Have a bulk grain query, special coarseness request for your rotis, or want to stock Farmers Mill in your organic community? Drop us a note.
            </p>

            <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={18} color="#3F6B2C" />
                <span>hello@farmersmill.in</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={18} color="#3F6B2C" />
                <span>+91 98110 54321 / +91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={18} color="#3F6B2C" />
                <span>Plot 48, Agro Flour &amp; Oil Mill Complex, Udyog Vihar Phase 4, Gurugram, NCR</span>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Your Name *</label>
              <input
                type="text"
                placeholder="Rohan Mehra"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Email Address *</label>
                <input
                  type="email"
                  placeholder="rohan@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765..."
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>How can we help? *</label>
              <textarea
                placeholder="Ask about grain origin, custom coarseness, corporate gifting, or wholesale delivery..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
                className="input-field"
                style={{ minHeight: '110px', fontFamily: 'inherit' }}
              />
            </div>

            <button type="submit" className="btn p" style={{ padding: '14px', marginTop: '6px' }}>
              <Send size={16} />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
