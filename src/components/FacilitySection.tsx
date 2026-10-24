import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const FacilitySection: React.FC = () => {
  const { setActivePage } = useShop();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: '1. Grain Cleaning & Destoning',
      subtitle: 'Manual & Multi-Stage Aspirated Clean',
      image: '/images/440947c8-f4d1-4f2b-8826-28389b08aaae.jpeg',
      description: 'Before any wheat, gram, or coriander touches our mills, it passes through 3-tier gravity separators and air aspirators to remove dust, husk, and stray stones. We never wash with chemical solvents.'
    },
    {
      title: '2. Slow Granite Stone Chakki',
      subtitle: 'Low RPM Grinding Below 35°C',
      image: '/images/c7702f34-2d4c-4994-9757-ac0571c00f78.jpeg',
      description: 'Our traditional natural emery stone chakkis grind whole grains at low revolutions. This preserves delicate germ oils, complex fibres, and the natural wheaty fragrance without burning the proteins.'
    },
    {
      title: '3. Wooden Marachekku Kolhu',
      subtitle: 'True Kachi Ghani Cold Pressing',
      image: '/images/d2c37772-bb26-4dff-96f8-57fcb5a8510f.jpeg',
      description: 'Heavy wooden pestles slowly crush black mustard seeds at room temperature. The oil drips through natural cotton filter sheets without any chemical bleaching, refining, or high-temperature steam deodorization.'
    },
    {
      title: '4. Non-Toxic Airtight Packaging',
      subtitle: 'Date of Milling Stamped on Every Pack',
      image: '/images/598f000a-1790-4cd8-8fde-bdbc8aca96dd.jpeg',
      description: 'Flour is packed directly from the chakki spout into food-grade, moisture-barrier pouches. We print the exact hour and date of milling so you know your family is eating the freshest food in India.'
    }
  ];

  return (
    <section className="w" style={{ marginTop: '90px' }}>
      <div
        className="card"
        style={{
          padding: 'clamp(32px, 5vw, 56px)',
          background: '#FBFDF5',
          border: '1px solid #D3E0BC'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', marginTop: '0' }}>
              See our production facility in action.
            </h2>
            <p style={{ fontSize: '15px', color: '#5C6E52', marginTop: '6px', maxWidth: '580px' }}>
              From fresh stone milling to careful hand packaging, every step delivers food the way it was meant to be: honest, pure, and unadulterated.
            </p>
          </div>
          <button
            className="btn g sm"
            onClick={() => {
              setActivePage('story');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Read Our Full Milling Journey →
          </button>
        </div>

        {/* Step Selector Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px' }}>
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`btn sm ${activeStep === idx ? 'p' : 'g'}`}
              style={{
                borderRadius: '12px',
                padding: '10px 18px',
                fontSize: '13px',
                whiteSpace: 'nowrap'
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Active Step Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '36px',
            alignItems: 'center',
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #D3E0BC',
            padding: '24px',
            overflow: 'hidden'
          }}
        >
          <div
            className="ph"
            style={{
              aspectRatio: '16/10',
              borderRadius: '16px',
              overflow: 'hidden',
              minHeight: '260px'
            }}
          >
            <img src={steps[activeStep].image} alt={steps[activeStep].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div>
            <span className="badge" style={{ background: '#E1EBCB', color: '#3F6B2C' }}>
              {steps[activeStep].subtitle}
            </span>
            <h3 style={{ fontSize: '26px', marginTop: '12px', color: '#1E2B17' }}>
              {steps[activeStep].title}
            </h3>
            <p style={{ fontSize: '15px', color: '#435538', marginTop: '12px', lineHeight: 1.7 }}>
              {steps[activeStep].description}
            </p>

            <div style={{ marginTop: '20px', display: 'flex', gap: '16px', fontSize: '13px', color: '#2E5020', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#3F6B2C" />
                <span>Zero Heat Damage</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#3F6B2C" />
                <span>Human Touch Inspected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
