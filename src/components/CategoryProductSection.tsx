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

  // Helper to match category gracefully across all product types
  const isProductInCategory = (p: Product, cat: string) => {
    if (!cat || cat === 'All') return true;
    if (p.category === cat) return true;

    const lowerCat = cat.toLowerCase();
    const pCat = (p.category || '').toLowerCase();
    const pSub = (p.subCategory || '').toLowerCase();
    const pName = (p.name || '').toLowerCase();

    if (lowerCat.includes('atta') || lowerCat.includes('wheat')) {
      return pCat.includes('atta') || pSub.includes('atta') || pName.includes('atta') || pName.includes('wheat') || (pCat.includes('flour') && !pCat.includes('besan'));
    }

    if (lowerCat.includes('besan') || lowerCat.includes('flour')) {
      return pCat.includes('besan') || pSub.includes('besan') || pName.includes('besan') || pSub.includes('ragi') || pSub.includes('jowar') || pCat.includes('flours');
    }

    if (lowerCat.includes('spice')) {
      return pCat.includes('spice') || pSub.includes('turmeric') || pSub.includes('coriander') || pSub.includes('chilli') || pName.includes('haldi') || pName.includes('dhaniya') || pName.includes('mirch');
    }

    if (lowerCat.includes('oil') || lowerCat.includes('ghee')) {
      return pCat.includes('oil') || pCat.includes('ghee') || pSub.includes('oil') || pSub.includes('ghee') || pName.includes('oil') || pName.includes('ghee') || pName.includes('kolhu') || pName.includes('kachi ghani');
    }

    if (lowerCat.includes('honey') || lowerCat.includes('pickle')) {
      return pCat.includes('honey') || pCat.includes('pickle') || pSub.includes('honey') || pSub.includes('pickle') || pName.includes('honey') || pName.includes('pickle') || pName.includes('mango');
    }

    return false;
  };

  const CATEGORY_TABS = [
    { id: 'Fresh Atta', label: 'Chakki Fresh Atta', icon: '🌾' },
    { id: 'Besan & Flours', label: 'Besan & Millets', icon: '🥣' },
    { id: 'Spices', label: 'Stone Ground Spices', icon: '🌶️' },
    { id: 'Oils & Ghee', label: 'Wood-Pressed Oils & Ghee', icon: '🫒' },
    { id: 'Honey & Pickles', label: 'Raw Honey & Pickles', icon: '🍯' },
    { id: 'All', label: 'All Fresh Harvest', icon: '🌿' }
  ];

  // Sub-categories available for current product type
  const subCategories = React.useMemo(() => {
    if (selectedType === 'All') return ['All'];
    const prods = products.filter((p) => isProductInCategory(p, selectedType));
    const subs = Array.from(new Set(prods.map((p) => p.subCategory).filter(Boolean)));
    return ['All', ...subs];
  }, [products, selectedType]);

  // Filter products by selected product type and subcategory
  const displayedProducts = React.useMemo(() => {
    const list = products.filter((p) => {
      const matchType = isProductInCategory(p, selectedType);
      const matchSub = selectedSubCategory === 'All' || p.subCategory === selectedSubCategory;
      return matchType && matchSub;
    });

    // If subcategory filter left zero products, gracefully fallback to category products
    if (list.length === 0) {
      return products.filter((p) => isProductInCategory(p, selectedType));
    }
    return list;
  }, [products, selectedType, selectedSubCategory]);

  const activeHighlight = categoryHighlights[selectedType] || categoryHighlights['All'];

  const handleTypeSelect = (catName: string) => {
    setSelectedType(catName);
    setSelectedSubCategory('All');
  };

  return (
    <section className="w" style={{ marginTop: '64px' }}>
      {/* Section Header - Zero Pill Above Heading */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', margin: 0, color: '#1E2B17', fontWeight: 800 }}>
            What would you like freshly milled today?
          </h2>
          <p className="subheading" style={{ marginTop: '8px', maxWidth: '640px' }}>
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
            className="clay-btn-secondary"
            style={{ fontWeight: 700, padding: '10px 20px', fontSize: '14px' }}
          >
            <span>View full catalog</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Sleek Horizontal Category Pill Tabs (Exact Design Match) */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginTop: '22px',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {CATEGORY_TABS.map((tab) => {
          const isSelected = selectedType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTypeSelect(tab.id)}
              style={{
                background: isSelected ? '#1E2B17' : 'rgba(235, 243, 222, 0.75)',
                color: isSelected ? '#ffffff' : '#2D4421',
                border: isSelected ? '1px solid #1E2B17' : '1px solid #CBD9B6',
                borderRadius: '999px',
                padding: '8px 18px',
                fontSize: '13.5px',
                fontWeight: isSelected ? 700 : 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                transition: 'all 0.18s ease',
                boxShadow: isSelected ? '0 3px 10px rgba(30, 43, 23, 0.25)' : 'none'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Category Feature & Milling Process Banner */}
      <div
        className="clay-card-static"
        style={{
          marginTop: '28px',
          padding: '24px 28px',
          background: 'linear-gradient(135deg, #FBFDF5 0%, #F2F6E6 100%)',
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
              <span style={{ fontSize: '12.5px', color: '#5C6E52', fontWeight: 600 }}>
                · {activeHighlight.processBadge}
              </span>
            </div>

            <h3 style={{ fontSize: '22px', color: '#1E2B17', marginTop: '10px' }}>
              {selectedType} — Farm Fresh &amp; Cold-Milled
            </h3>

            <p style={{ fontSize: '14.5px', color: '#435538', marginTop: '6px', maxWidth: '820px', lineHeight: 1.6 }}>
              {activeHighlight.description}
            </p>
          </div>

          <button
            onClick={() => {
              const matchedProduct = displayedProducts[0];
              if (matchedProduct) openLabReport(matchedProduct);
            }}
            className="clay-btn-secondary"
            style={{ fontSize: '13px', padding: '8px 16px', whiteSpace: 'nowrap' }}
          >
            <ShieldCheck size={16} color="#3F6B2C" />
            <span>NABL Certified Lab Report</span>
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
            fontSize: '13px',
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
                className={isSubActive ? 'clay-btn-primary' : 'clay-btn-secondary'}
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
    </section>
  );
};
