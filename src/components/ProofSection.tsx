import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ShieldCheck, Calendar, Sparkles, FileText, ArrowRight } from 'lucide-react';

export const ProofSection: React.FC = () => {
  const { openLabReport } = useShop();

  return (
    <section className="w" style={{ marginTop: '90px' }}>
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <span style={{ color: '#3F6B2C', fontWeight: 700, letterSpacing: '0.08em', fontSize: '13px' }}>
          LAB TESTED TRANSPARENCY
        </span>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginTop: '8px' }}>
          See the Proof. Taste the Freshness.
        </h2>
        <p style={{ fontSize: '16px', color: '#5C6E52', marginTop: '10px' }}>
          We don't ask you to blindly trust our claims. We test every single grain batch at government-accredited NABL labs and print real results.
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
        {/* Card 1: 230+ Pesticides */}
        <div
          className="card hoverable"
          onClick={() => openLabReport(PRODUCTS[5])}
          style={{ padding: '28px', background: '#ffffff', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#E1EBCB', color: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
            <ShieldCheck size={28} />
          </div>
          <span style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 700 }}>NABL CERTIFIED</span>
          <b style={{ fontSize: '20px', color: '#1E2B17', marginTop: '4px', display: 'block' }}>230+ Pesticides Tested</b>
          <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '8px', lineHeight: 1.6, flex: 1 }}>
            Screened for organophosphates, synthetic pyrethroids, and carbamates. 100% free of harmful farming chemicals.
          </p>
          <span style={{ color: '#3F6B2C', fontWeight: 700, fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '16px' }}>
            Inspect Lab Certificate <ArrowRight size={14} />
          </span>
        </div>

        {/* Card 2: Fresh Dates */}
        <div
          className="card hoverable"
          style={{ padding: '28px', background: '#ffffff', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#E1EBCB', color: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
            <Calendar size={28} />
          </div>
          <span style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 700 }}>MILLING DATE PROOF</span>
          <b style={{ fontSize: '20px', color: '#1E2B17', marginTop: '4px', display: 'block' }}>Fresh Batch Date Stamped</b>
          <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '8px', lineHeight: 1.6, flex: 1 }}>
            Never warehouse-stored. Every single pack of flour or cold-pressed oil carries the precise date &amp; hour of stone grinding.
          </p>
          <span style={{ color: '#3F6B2C', fontWeight: 700, fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '16px' }}>
            Learn How We Mill <ArrowRight size={14} />
          </span>
        </div>

        {/* Card 3: Small Batches */}
        <div
          className="card hoverable"
          style={{ padding: '28px', background: '#ffffff', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#E1EBCB', color: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
            <Sparkles size={28} />
          </div>
          <span style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 700 }}>COLD STONE CHAKKI</span>
          <b style={{ fontSize: '20px', color: '#1E2B17', marginTop: '4px', display: 'block' }}>Under 35°C Low RPM</b>
          <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '8px', lineHeight: 1.6, flex: 1 }}>
            Natural emery stones revolve at low speeds so natural wheat germ oils and vitamins never burn or oxidize during milling.
          </p>
          <span style={{ color: '#3F6B2C', fontWeight: 700, fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '16px' }}>
            Explore Milling Difference <ArrowRight size={14} />
          </span>
        </div>

        {/* Card 4: NMR Honey & Curcumin */}
        <div
          className="card hoverable"
          onClick={() => openLabReport(PRODUCTS[3])}
          style={{ padding: '28px', background: '#ffffff', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#E1EBCB', color: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
            <FileText size={28} />
          </div>
          <span style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 700 }}>NMR TESTED PURE</span>
          <b style={{ fontSize: '20px', color: '#1E2B17', marginTop: '4px', display: 'block' }}>Zero Sugar Syrup</b>
          <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '8px', lineHeight: 1.6, flex: 1 }}>
            Our wild flora raw honey is Nuclear Magnetic Resonance (NMR) tested to guarantee zero inverted sugar or rice syrup adulteration.
          </p>
          <span style={{ color: '#3F6B2C', fontWeight: 700, fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '16px' }}>
            View Honey NMR Report <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </section>
  );
};
