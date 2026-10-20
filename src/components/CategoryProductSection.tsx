import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Flame, CheckCircle, SlidersHorizontal } from 'lucide-react';

interface CategoryProductSectionProps {
  initialCategory?: string;
  showExploreAllButton?: boolean;
}

export const CategoryProductSection: React.FC<CategoryProductSectionProps> = ({
  initialCategory = 'Fresh Atta',
  showExploreAllButton = true
}) => {
  const { products, setActivePage, setSelectedCategory, openLabReport } = useShop();
  const [selectedType, setSelectedType] = useState<string>(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');

  // Specific milling metadata per product type
  const categoryHighlights: Record<string, {
    subtitle: string;
    description: string;
    millingTag: string;
    processBadge: string;
    benefits: string[];
  }> = {
    'Fresh Atta': {
      subtitle: 'CHAKKI FRESH ATTA · SHARBATI WHEAT',
      description: 'Milled to order on traditional natural emery stone mills. We grind 100% of the whole grain at low RPM (< 38°C) so the vital wheat germ, bran fiber, and vitamin E remain intact.',
      millingTag: 'Cold Stone Ground (< 38°C)',
      processBadge: '100% Whole Grain · Zero Maida',
      benefits: ['Rotis stay soft for 12+ hours', '100% Bran & Germ Intact', 'Milled within 24 hours of delivery']
    },
    'Besan & Flours': {
      subtitle: 'COARSE MOTA BESAN · SPROUTED MILLETS',
      description: 'Artisanal coarse-ground gram flour and sprouted native grains. Made from unpolished desi chana to give that authentic grainy "danedar" texture for laddoos, pakoras, and fluffiest dhoklas.',
      millingTag: 'Granite Chakki Coarse Ground',
      processBadge: 'High Plant Protein · Low Gluten',
      benefits: ['Danedar crumb texture', 'Zero pea flour adulteration', '10x Calcium in Sprouted Ragi']
    },
    'Spices': {
      subtitle: 'SLOW STONE-GROUND · HIGH NATURAL VOLATILE OILS',
      description: 'We slow-crush whole, sun-cured spices from single-origin farms without high-friction industrial heat. The volatile aromatic oils and active curcumin remain completely intact.',
      millingTag: 'Low-RPM Stone Pulverized (< 35°C)',
      processBadge: '3.82% Active Curcumin · Zero Dye',
      benefits: ['Intense natural color & aroma', 'Zero artificial yellow/red dyes', 'NABL Lab Certified 0 Pesticides']
    },
    'Oils & Ghee': {
      subtitle: 'TRADITIONAL WOODPRESSED (KACHI GHANI) & A2 GHEE',
      description: 'Cold-extracted in artisanal wooden Kolhu (Vaagai wood) at room temperature. Unrefined, unfiltered, and packed with natural antioxidants and sharp mustard pungency.',
      millingTag: 'Wooden Kolhu Cold Pressed',
      processBadge: 'Unrefined & Pure · Zero Solvents',
      benefits: ['Natural Sinigrin pungency intact', 'Zero chemical solvents or argemone', 'Rich in natural Omega-3 & 6']
    },
    'Honey & Pickles': {
      subtitle: 'RAW FOREST HONEY · HOME MADE HEIRLOOM PICKLES',
      description: 'Single-source raw apiary honey filtered only through cotton mesh, paired with small-batch pickles cured in earthen Martaban jars with our cold woodpressed mustard oil.',
      millingTag: 'Unheated & Naturally Cured',
      processBadge: 'Zero Preservatives · NMR Tested',
      benefits: ['Raw unpasteurized with live enzymes', 'Sun-cured in woodpressed mustard oil', 'Zero added sugar or corn syrup']
    },
    'All': {
      subtitle: 'COMPLETE FRESH HARVEST CATALOG',
      description: 'Everything stone-milled, cold-pressed, and handcrafted in small batches. Transparent origins and NABL accredited purity.',
      millingTag: 'Farm to Family Table',
      processBadge: '100% Honest Ingredients',
      benefits: ['Same-day stone milling', '230+ Pesticide residues tested', 'Milling date stamped on every pack']
    }
  };

  // Sub-categories available for current product type
  const subCategories = React.useMemo(() => {
    if (selectedType === 'All') return ['All'];
    const prods = products.filter((p) => p.category === selectedType);
    const subs = Array.from(new Set(prods.map((p) => p.subCategory).filter(Boolean)));
    return ['All', ...subs];
  }, [products, selectedType]);

  // Filter products by selected product type and subcategory
  const displayedProducts = React.useMemo(() => {
    return products.filter((p) => {
      const matchType = selectedType === 'All' || p.category === selectedType;
      const matchSub = selectedSubCategory === 'All' || p.subCategory === selectedSubCategory;
      return matchType && matchSub;
    });
  }, [products, selectedType, selectedSubCategory]);

  const activeHighlight = categoryHighlights[selectedType] || categoryHighlights['All'];

  const handleTypeSelect = (catName: string) => {
    setSelectedType(catName);
    setSelectedSubCategory('All');
  };

  return (
    <section className="w" style={{ marginTop: '72px' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#3F6B2C',
              fontWeight: 700,
              letterSpacing: '0.08em',
              fontSize: '13px'
            }}
          >
            <Sparkles size={14} /> CHOOSE BY PRODUCT TYPE
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4.2vw, 42px)', marginTop: '6px', color: '#1E2B17' }}>
            What would you like freshly milled today?
          </h2>
          <p style={{ fontSize: '16px', color: '#5C6E52', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
            Select a product category below to explore honest, stone-milled harvests with zero preservatives and same-day dispatch.
          </p>
        </div>

        {showExploreAllButton && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn g"
            style={{ fontWeight: 700, padding: '10px 20px', fontSize: '14px' }}
          >
            <span>View full catalog</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Product Type Selector Visual Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '32px'
        }}
      >
        {CATEGORIES.filter((c) => c.name !== 'All').map((cat) => {
          const isSelected = selectedType === cat.name;
          const count = products.filter((p) => p.category === cat.name).length;

          return (
            <div
              key={cat.name}
              onClick={() => handleTypeSelect(cat.name)}
              className="card hoverable"
              style={{
                padding: '16px',
                cursor: 'pointer',
                textAlign: 'center',
                position: 'relative',
                transition: 'all 0.25s ease',
                background: isSelected ? '#F2F6E6' : '#FBFDF5',
                borderColor: isSelected ? '#3F6B2C' : '#D3E0BC',
                borderWidth: isSelected ? '2px' : '1px',
                boxShadow: isSelected ? '0 8px 24px rgba(63, 107, 44, 0.16)' : 'var(--shadow-sm)',
                transform: isSelected ? 'translateY(-3px)' : 'none'
              }}
            >
              {/* Active Selection Indicator Badge */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#3F6B2C',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    zIndex: 2
                  }}
                >
                  <CheckCircle size={14} />
                </div>
              )}

              {/* Category Image Thumbnail */}
              <div
                className="ph"
                style={{
                  aspectRatio: '1/1',
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#E1EBCB'
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
              </div>

              {/* Title & Metadata */}
              <b
                style={{
                  display: 'block',
                  marginTop: '12px',
                  fontSize: '17px',
                  color: isSelected ? '#3F6B2C' : '#1E2B17',
                  fontWeight: 700
                }}
              >
                {cat.name}
              </b>

              <p style={{ fontSize: '12.5px', color: '#5C6E52', marginTop: '4px', lineHeight: 1.4 }}>
                {cat.desc}
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '10px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: isSelected ? '#3F6B2C' : '#5C6E52'
                }}
              >
                <span>{count} products</span>
                <span>·</span>
                <span>{isSelected ? 'Selected' : 'Choose →'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Category Feature & Milling Process Banner */}
      <div
        className="card"
        style={{
          marginTop: '28px',
          padding: '24px 28px',
          background: 'linear-gradient(135deg, #FBFDF5 0%, #F2F6E6 100%)',
          borderColor: '#B8CC98',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span
                style={{
                  background: '#3F6B2C',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  letterSpacing: '0.04em'
                }}
              >
                {activeHighlight.millingTag}
              </span>
              <span
                style={{
                  background: '#E1EBCB',
                  color: '#3F6B2C',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '999px'
                }}
              >
                {activeHighlight.processBadge}
              </span>
            </div>

            <h3 style={{ fontSize: '24px', color: '#1E2B17', marginTop: '10px' }}>
              {selectedType} — Farm Fresh & Cold-Milled
            </h3>

            <p style={{ fontSize: '15px', color: '#435538', marginTop: '6px', maxWidth: '820px', lineHeight: 1.6 }}>
              {activeHighlight.description}
            </p>
          </div>

          <button
            onClick={() => {
              const matchedProduct = displayedProducts[0];
              if (matchedProduct) openLabReport(matchedProduct);
            }}
            className="btn g sm"
            style={{ fontSize: '13px', background: '#ffffff', whiteSpace: 'nowrap' }}
          >
            <ShieldCheck size={16} />
            <span>View NABL Lab Report</span>
          </button>
        </div>

        {/* 3 Value bullets */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            paddingTop: '12px',
            borderTop: '1px solid #D3E0BC',
            fontSize: '13.5px',
            color: '#1E2B17',
            fontWeight: 600
          }}
        >
          {activeHighlight.benefits.map((benefit, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={15} color="#3F6B2C" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-Category Filter Tabs (if more than 1) */}
      {subCategories.length > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginTop: '24px'
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#5C6E52', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <SlidersHorizontal size={14} /> Sub-types:
          </span>
          {subCategories.map((sub) => {
            const isSubActive = selectedSubCategory === sub;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`btn sm ${isSubActive ? 'p' : 'g'}`}
                style={{
                  padding: '6px 16px',
                  fontSize: '13px',
                  borderRadius: '999px',
                  fontWeight: isSubActive ? 700 : 500
                }}
              >
                {sub === 'All' ? `All ${selectedType}` : sub}
              </button>
            );
          })}
        </div>
      )}

      {/* Products Grid for the Selected Category */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '28px'
        }}
      >
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {displayedProducts.length === 0 && (
        <div
          className="card"
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            marginTop: '24px',
            background: '#ffffff'
          }}
        >
          <p style={{ fontSize: '16px', color: '#5C6E52' }}>
            No products found matching the selected sub-category.
          </p>
          <button
            onClick={() => setSelectedSubCategory('All')}
            className="btn g sm"
            style={{ marginTop: '14px' }}
          >
            Show all {selectedType}
          </button>
        </div>
      )}
    </section>
  );
};
