import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  Search,
  X,
  Sparkles,
  CheckCircle,
  SlidersHorizontal,
  ShieldCheck,
  ArrowRight,
  Filter,
  Grid3X3,
  Layers,
  ChevronRight
} from 'lucide-react';

// Specific milling and quality metadata for each category card
const CATEGORY_DETAILS: Record<string, {
  subtitle: string;
  badge: string;
  millingNote: string;
  description: string;
  origin: string;
  keyBenefits: string[];
}> = {
  'Fresh Atta': {
    subtitle: 'CHAKKI FRESH STONEGROUND · 100% WHOLE GRAIN',
    badge: 'Cold Stone Ground (< 38°C)',
    millingNote: 'Slowly milled on natural emery millstones to preserve delicate wheat germ oils, aleurone layer and natural dietary fiber.',
    description: 'We grind 100% of the grain with zero maida extraction and zero chemical bleaching. Pure Sharbati, Khapli, and ancient grains milled fresh within 24 hours of dispatch.',
    origin: 'Sehore & Vidisha Certified Sharbati Wheat Belts, Madhya Pradesh',
    keyBenefits: ['Rotis stay soft & pliable for 12+ hours', 'Bran & germ 100% intact', 'Milled fresh on order']
  },
  'Besan & Flours': {
    subtitle: 'COARSE DANEDAR BESAN · SPROUTED MILLETS',
    badge: 'Granite Chakki Coarse Ground',
    millingNote: 'Ground from unpolished Desi Chana without hull stripping for authentic granular texture and higher plant protein.',
    description: 'Artisanal coarse-ground gram flour that guarantees fluffy dhoklas, crispy pakoras, and authentic laddoos without sticking. Plus nutrient-dense sprouted ragi and whole jowar flours.',
    origin: 'Bikaner & Malwa Organic Gram Clusters, Rajasthan & MP',
    keyBenefits: ['Authentic danedar texture', 'Zero yellow pea adulteration', 'Naturally low-glycemic']
  },
  'Spices': {
    subtitle: 'SLOW CRUSHED · INTACT NATURAL ESSENTIAL OILS',
    badge: 'Low-RPM Stone Pulverized (< 35°C)',
    millingNote: 'Crushed without industrial high friction heat so volatile aromatic oils, curcumin, and natural phytonutrients remain intact.',
    description: 'Single-origin sun-cured spices sourced directly from farmer cooperatives. Stone-pulverized whole rhizomes and seeds with zero spent residue, zero synthetic food color, and zero fillers.',
    origin: 'Salem, Waigaon, Mathania & Ramganj Mandi Spice Farms',
    keyBenefits: ['3.82% active curcumin retention', 'Zero synthetic dyes or starch', 'NABL lab tested for 230+ pesticides']
  },
  'Oils & Ghee': {
    subtitle: 'TRADITIONAL WOODPRESSED (KACHI GHANI) & VEDIC A2 GHEE',
    badge: 'Wooden Kolhu Cold Pressed (Room Temp)',
    millingNote: 'Slowly crushed in artisan Vagai wood expellers at room temperature without chemicals or temperature spikes.',
    description: '100% unrefined, single-pressed, and filtered through natural cotton cloth. Naturally rich in pungent sinigrin, vitamin E, and natural antioxidants. Accompanied by pure Vedic Bilona A2 Desi Gir Cow Ghee.',
    origin: 'Organic Mustard & Groundnut Farms, Bharatpur & Saurashtra',
    keyBenefits: ['Natural sharpness & pungency intact', 'Zero chemical solvents or mineral oil', 'Traditional wooden Kolhu extraction']
  },
  'Honey & Pickles': {
    subtitle: 'RAW FOREST HONEY · SMALL-BATCH MARTABAN PICKLES',
    badge: 'Unpasteurized & Naturally Cured',
    millingNote: 'Heirloom family recipes cured under natural sunlight in earthen ceramic Martaban jars using cold woodpressed mustard oil.',
    description: 'Direct-from-hive raw multifloral honey filtered only through fine cloth with live pollen and active enzymes intact. Paired with grandma-style sun-cured pickles made with zero vinegar and zero preservatives.',
    origin: 'Sundarbans/Kashmir Apiaries & Handpicked Orchard Farms',
    keyBenefits: ['Raw honey with live pollen enzymes', 'Pickles aged in cold mustard oil', 'Zero synthetic vinegar or sodium benzoate']
  }
};

export const ShopView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setActivePage,
    openLabReport
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [bestsellerOnly, setBestsellerOnly] = useState<boolean>(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [viewLayout, setViewLayout] = useState<'category-focus' | 'all-sections'>('category-focus');

  const navbarRef = useRef<HTMLDivElement>(null);

  // Available sub-categories for the currently selected category
  const subCategories = useMemo(() => {
    if (selectedCategory === 'All') return ['All'];
    const prods = products.filter((p) => p.category === selectedCategory);
    const subs = Array.from(new Set(prods.map((p) => p.subCategory).filter(Boolean)));
    return ['All', ...subs];
  }, [products, selectedCategory]);

  // Reset subcategory filter when main category changes
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory('All');
    // Scroll smoothly to products area
    if (navbarRef.current) {
      navbarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Sub-category filter
        if (selectedSubCategory !== 'All' && p.subCategory !== selectedSubCategory) {
          return false;
        }
        // Bestseller filter
        if (bestsellerOnly && !p.isBestseller) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.shortDesc.toLowerCase().includes(q) || p.fullDesc.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q) || p.subCategory.toLowerCase().includes(q);
          const matchIng = p.ingredients.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchIng) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.packOptions[0].price - b.packOptions[0].price;
        if (sortBy === 'price-desc') return b.packOptions[0].price - a.packOptions[0].price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedSubCategory, bestsellerOnly, searchQuery, sortBy]);

  // Grouped products for "all-sections" view
  const categoryGroups = useMemo(() => {
    const primaryCategories = CATEGORIES.filter((c) => c.name !== 'All');
    return primaryCategories.map((cat) => {
      const items = products.filter((p) => p.category === cat.name);
      return {
        ...cat,
        items
      };
    });
  }, [products]);

  const activeCategoryDetail = CATEGORY_DETAILS[selectedCategory];

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Page Header & Breadcrumbs */}
      <section className="w" style={{ paddingTop: '36px', paddingBottom: '20px' }}>
        <div style={{ fontSize: '13.5px', color: '#5C6E52', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a
            onClick={() => setActivePage('home')}
            style={{ color: '#3F6B2C', fontWeight: 600, cursor: 'pointer' }}
          >
            Home
          </a>
          <ChevronRight size={14} color="#8E9F84" />
          <span
            onClick={() => handleCategorySelect('All')}
            style={{
              cursor: 'pointer',
              color: selectedCategory === 'All' ? '#1E2B17' : '#3F6B2C',
              fontWeight: selectedCategory === 'All' ? 700 : 500
            }}
          >
            Shop All
          </span>
          {selectedCategory !== 'All' && (
            <>
              <ChevronRight size={14} color="#8E9F84" />
              <b style={{ color: '#1E2B17' }}>{selectedCategory}</b>
            </>
          )}
        </div>

        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#E1EBCB',
                color: '#3F6B2C',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.08em',
                padding: '6px 14px',
                borderRadius: '999px',
                textTransform: 'uppercase'
              }}
            >
              <Sparkles size={14} /> 100% Traditional Stone &amp; Wood Milled
            </span>
            <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 46px)', marginTop: '8px', color: '#1E2B17' }}>
              Farmers Mill Marketplace
            </h1>
            <p style={{ fontSize: '16px', color: '#5C6E52', marginTop: '6px', maxWidth: '680px', lineHeight: 1.5 }}>
              Browse our freshly milled harvest by category below. Each batch is ground in small batches upon order to ensure maximum nutrient density and peak freshness.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#5C6E52', fontWeight: 600 }}>
              Showing {filteredProducts.length} items
            </span>
          </div>
        </div>
      </section>

      {/* CATEGORY NAVBAR (Sticky Category Navigation Bar) */}
      <div
        ref={navbarRef}
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 800,
          background: 'rgba(251, 253, 245, 0.96)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid #D3E0BC',
          borderBottom: '2px solid #D3E0BC',
          boxShadow: '0 4px 16px rgba(30, 43, 23, 0.05)',
          padding: '12px 0'
        }}
      >
        <div className="w">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            {/* Category Navigation Items List */}
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '4px',
                maxWidth: '100%',
                scrollbarWidth: 'none'
              }}
              aria-label="Categories"
            >
              {/* All Items Pill */}
              <button
                onClick={() => handleCategorySelect('All')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: selectedCategory === 'All' ? '1.5px solid #3F6B2C' : '1.5px solid #D3E0BC',
                  background: selectedCategory === 'All' ? '#3F6B2C' : '#ffffff',
                  color: selectedCategory === 'All' ? '#ffffff' : '#1E2B17',
                  boxShadow: selectedCategory === 'All' ? '0 2px 8px rgba(63, 107, 44, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>🌾</span>
                <span>All Harvest</span>
                <span
                  style={{
                    background: selectedCategory === 'All' ? '#E1EBCB' : '#EDF3DF',
                    color: '#3F6B2C',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '11.5px',
                    fontWeight: 700
                  }}
                >
                  {products.length}
                </span>
              </button>

              {/* Individual Category Buttons in Navbar */}
              {CATEGORIES.filter((c) => c.name !== 'All').map((cat) => {
                const isSelected = selectedCategory === cat.name;
                const count = products.filter((p) => p.category === cat.name).length;

                return (
                  <button
                    key={cat.name}
                    onClick={() => handleCategorySelect(cat.name)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '9px 18px',
                      borderRadius: '999px',
                      fontWeight: 700,
                      fontSize: '13.5px',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      border: isSelected ? '1.5px solid #3F6B2C' : '1.5px solid #D3E0BC',
                      background: isSelected ? '#3F6B2C' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#1E2B17',
                      boxShadow: isSelected ? '0 2px 8px rgba(63, 107, 44, 0.25)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                    <span
                      style={{
                        background: isSelected ? '#E1EBCB' : '#EDF3DF',
                        color: '#3F6B2C',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        fontSize: '11.5px',
                        fontWeight: 700
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Actions & Search on Category Navbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {/* Search Bar */}
              <div style={{ position: 'relative', width: '220px' }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '8px 12px 8px 32px',
                    borderRadius: '999px',
                    border: '1.5px solid #B8CC98',
                    background: '#ffffff',
                    fontSize: '13px',
                    width: '100%',
                    outline: 'none',
                    color: '#1E2B17'
                  }}
                />
                <Search size={14} style={{ position: 'absolute', left: '11px', top: '11px', color: '#7E9171' }} />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ position: 'absolute', right: '10px', top: '9px', color: '#5C6E52', border: 'none', background: 'transparent' }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Sorting Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '999px',
                  border: '1.5px solid #B8CC98',
                  background: '#ffffff',
                  fontSize: '13px',
                  color: '#1E2B17',
                  outline: 'none',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                <option value="featured">Featured Fresh</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Bestseller Toggle */}
              <button
                onClick={() => setBestsellerOnly(!bestsellerOnly)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: bestsellerOnly ? '1.5px solid #D4A346' : '1.5px solid #D3E0BC',
                  background: bestsellerOnly ? '#FEF3D6' : '#ffffff',
                  color: bestsellerOnly ? '#946808' : '#5C6E52',
                  transition: 'all 0.2s ease'
                }}
              >
                ★ Bestsellers
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w" style={{ marginTop: '32px' }}>
        {/* ============================================================== */}
        {/* CASE 1: SPECIFIC CATEGORY SELECTED                             */}
        {/* Shows Category Representation Card + Associated Products Grid */}
        {/* ============================================================== */}
        {selectedCategory !== 'All' && (
          <div>
            {/* The Associated Category Representation Card */}
            {activeCategoryDetail && (
              <div
                className="card"
                style={{
                  padding: '28px',
                  background: 'linear-gradient(135deg, #FBFDF5 0%, #F2F6E6 100%)',
                  borderColor: '#B8CC98',
                  marginBottom: '28px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          background: '#3F6B2C',
                          color: '#ffffff',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          padding: '4px 12px',
                          borderRadius: '999px',
                          letterSpacing: '0.04em'
                        }}
                      >
                        {activeCategoryDetail.badge}
                      </span>
                      <span
                        style={{
                          background: '#E1EBCB',
                          color: '#3F6B2C',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          padding: '4px 12px',
                          borderRadius: '999px'
                        }}
                      >
                        {activeCategoryDetail.subtitle}
                      </span>
                    </div>

                    <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 34px)', color: '#1E2B17', marginTop: '12px' }}>
                      {selectedCategory}
                    </h2>

                    <p style={{ fontSize: '15.5px', color: '#3A4D2E', marginTop: '8px', lineHeight: 1.6, maxWidth: '780px' }}>
                      {activeCategoryDetail.description}
                    </p>

                    <p style={{ fontSize: '13px', color: '#6A7D5F', marginTop: '8px', fontStyle: 'italic' }}>
                      📍 Farm Origin: {activeCategoryDetail.origin}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                      onClick={() => {
                        const matchedProduct = filteredProducts[0];
                        if (matchedProduct) openLabReport(matchedProduct);
                      }}
                      className="btn g sm"
                      style={{ background: '#ffffff', fontSize: '13px', whiteSpace: 'nowrap' }}
                    >
                      <ShieldCheck size={16} />
                      <span>View NABL Lab Test</span>
                    </button>

                    <button
                      onClick={() => handleCategorySelect('All')}
                      style={{
                        fontSize: '13px',
                        color: '#3F6B2C',
                        fontWeight: 700,
                        textAlign: 'right',
                        padding: '4px 8px',
                        cursor: 'pointer'
                      }}
                    >
                      ← Back to All Harvest
                    </button>
                  </div>
                </div>

                {/* 3 Value bullets */}
                <div
                  style={{
                    display: 'flex',
                    gap: '24px',
                    flexWrap: 'wrap',
                    paddingTop: '16px',
                    marginTop: '16px',
                    borderTop: '1px solid #D3E0BC',
                    fontSize: '13.5px',
                    color: '#1E2B17',
                    fontWeight: 600
                  }}
                >
                  {activeCategoryDetail.keyBenefits.map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={15} color="#3F6B2C" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Category Filter Tabs for this Category */}
            {subCategories.length > 1 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginBottom: '24px',
                  padding: '10px 16px',
                  background: '#FBFDF5',
                  borderRadius: '12px',
                  border: '1px solid #D3E0BC'
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
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        borderRadius: '999px',
                        fontWeight: isSubActive ? 700 : 500,
                        cursor: 'pointer',
                        border: isSubActive ? '1.5px solid #3F6B2C' : '1px solid #D3E0BC',
                        background: isSubActive ? '#3F6B2C' : '#ffffff',
                        color: isSubActive ? '#ffffff' : '#1E2B17',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {sub === 'All' ? `All ${selectedCategory}` : sub}
                    </button>
                  );
                })}
              </div>
            )}

            {/* ASSOCIATED PRODUCT CARDS GRID FOR THE SELECTED CATEGORY */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', color: '#1E2B17' }}>
                Products in {selectedCategory} ({filteredProducts.length})
              </h3>
              {(searchQuery || selectedSubCategory !== 'All' || bestsellerOnly) && (
                <button
                  onClick={() => {
                    setSelectedSubCategory('All');
                    setSearchQuery('');
                    setBestsellerOnly(false);
                  }}
                  style={{ fontSize: '13px', color: '#3F6B2C', fontWeight: 700, cursor: 'pointer' }}
                >
                  Reset filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="card" style={{ padding: '48px 24px', textAlign: 'center', background: '#ffffff' }}>
                <p style={{ fontSize: '16px', color: '#5C6E52' }}>
                  No products found matching your current filter in {selectedCategory}.
                </p>
                <button
                  onClick={() => {
                    setSelectedSubCategory('All');
                    setSearchQuery('');
                    setBestsellerOnly(false);
                  }}
                  className="btn g sm"
                  style={{ marginTop: '14px' }}
                >
                  Show all {selectedCategory}
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '24px'
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* CASE 2: "ALL HARVEST" SELECTED                                 */}
        {/* Shows Category Overview Cards + Section-by-Section Showcase     */}
        {/* ============================================================== */}
        {selectedCategory === 'All' && !searchQuery && (
          <div>
            {/* Visual Category Representation Cards Grid */}
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#3F6B2C', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Browse Categories
                </span>
                <h2 style={{ fontSize: '28px', color: '#1E2B17', marginTop: '4px' }}>
                  Explore by Harvest Category
                </h2>
              </div>

              {/* View Layout Toggle */}
              <div style={{ display: 'flex', gap: '6px', background: '#E1EBCB', padding: '4px', borderRadius: '999px' }}>
                <button
                  onClick={() => setViewLayout('category-focus')}
                  style={{
                    border: 'none',
                    background: viewLayout === 'category-focus' ? '#3F6B2C' : 'transparent',
                    color: viewLayout === 'category-focus' ? '#ffffff' : '#3F6B2C',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Grid3X3 size={14} /> Full Grid
                </button>
                <button
                  onClick={() => setViewLayout('all-sections')}
                  style={{
                    border: 'none',
                    background: viewLayout === 'all-sections' ? '#3F6B2C' : 'transparent',
                    color: viewLayout === 'all-sections' ? '#ffffff' : '#3F6B2C',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Layers size={14} /> By Category
                </button>
              </div>
            </div>

            {/* The 5 Associated Category Overview Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '18px',
                marginBottom: '40px'
              }}
            >
              {CATEGORIES.filter((c) => c.name !== 'All').map((cat) => {
                const count = products.filter((p) => p.category === cat.name).length;
                const detail = CATEGORY_DETAILS[cat.name];

                return (
                  <div
                    key={cat.name}
                    onClick={() => handleCategorySelect(cat.name)}
                    className="card hoverable"
                    style={{
                      padding: '16px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      background: '#FBFDF5',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div
                      className="ph"
                      style={{
                        aspectRatio: '4/3',
                        borderRadius: '14px',
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
                          transition: 'transform 0.3s ease'
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'rgba(30, 43, 23, 0.85)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '999px',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        {count} Products
                      </span>
                    </div>

                    <b style={{ display: 'block', marginTop: '12px', fontSize: '18px', color: '#1E2B17' }}>
                      {cat.name}
                    </b>

                    <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '4px', lineHeight: 1.4, flex: '1' }}>
                      {cat.desc}
                    </p>

                    <div
                      style={{
                        marginTop: '12px',
                        paddingTop: '10px',
                        borderTop: '1px solid #EDF3DF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        color: '#3F6B2C',
                        fontWeight: 700,
                        fontSize: '13px'
                      }}
                    >
                      <span>Explore {cat.name}</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ASSOCIATED SECTIONS BY CATEGORY */}
            {viewLayout === 'all-sections' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
                {categoryGroups.map((group) => {
                  if (group.items.length === 0) return null;
                  const detail = CATEGORY_DETAILS[group.name];

                  return (
                    <section key={group.name} id={group.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
                      {/* Category Header Card */}
                      <div
                        className="card"
                        style={{
                          padding: '20px 24px',
                          marginBottom: '20px',
                          background: '#FBFDF5',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '14px'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '20px' }}>{group.icon}</span>
                            <h3 style={{ fontSize: '24px', color: '#1E2B17' }}>
                              {group.name}
                            </h3>
                            <span
                              style={{
                                background: '#E1EBCB',
                                color: '#3F6B2C',
                                fontSize: '12px',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: '999px'
                              }}
                            >
                              {group.items.length} items
                            </span>
                          </div>
                          <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '4px' }}>
                            {group.desc} {detail ? `· ${detail.badge}` : ''}
                          </p>
                        </div>

                        <button
                          onClick={() => handleCategorySelect(group.name)}
                          className="btn g sm"
                          style={{ fontSize: '13px' }}
                        >
                          View all in {group.name} →
                        </button>
                      </div>

                      {/* Associated Product Cards for this Category Section */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                          gap: '24px'
                        }}
                      >
                        {group.items.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              /* Flat Grid View for All Items */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '22px', color: '#1E2B17' }}>
                    All Fresh Harvest Products ({filteredProducts.length})
                  </h3>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '24px'
                  }}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* When a search query is active in "All Harvest" */}
        {selectedCategory === 'All' && searchQuery && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', color: '#1E2B17' }}>
                Search results for "{searchQuery}" ({filteredProducts.length} items)
              </h3>
              <button
                onClick={() => setSearchQuery('')}
                style={{ fontSize: '13px', color: '#3F6B2C', fontWeight: 700, cursor: 'pointer' }}
              >
                Clear search
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="card" style={{ padding: '48px 24px', textAlign: 'center', background: '#ffffff' }}>
                <p style={{ fontSize: '16px', color: '#5C6E52' }}>
                  No products matched "{searchQuery}".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="btn p sm"
                  style={{ marginTop: '14px' }}
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '24px'
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
