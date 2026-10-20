import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, X, Sparkles, CheckCircle, SlidersHorizontal, ShieldCheck } from 'lucide-react';

export const ShopView: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, setActivePage, openLabReport } = useShop();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [bestsellerOnly, setBestsellerOnly] = useState<boolean>(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'category-focus' | 'all-sections'>('category-focus');

  // Sub-categories for current category
  const subCategories = useMemo(() => {
    if (selectedCategory === 'All') return ['All'];
    const prods = products.filter((p) => p.category === selectedCategory);
    const subs = Array.from(new Set(prods.map((p) => p.subCategory).filter(Boolean)));
    return ['All', ...subs];
  }, [products, selectedCategory]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
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
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.packOptions[0].price - b.packOptions[0].price;
      if (sortBy === 'price-desc') return b.packOptions[0].price - a.packOptions[0].price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedSubCategory, bestsellerOnly, searchQuery, sortBy]);

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setSelectedSubCategory('All');
    if (catName !== 'All') {
      setViewMode('category-focus');
    }
  };

  // Grouped products by category for section-by-section view
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

  return (
    <div style={{ paddingBottom: '80px' }}>
      <section className="w" style={{ paddingTop: '40px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '14px', color: '#5C6E52', display: 'flex', gap: '6px', alignItems: 'center' }}>
          <a onClick={() => setActivePage('home')} style={{ color: '#3F6B2C', cursor: 'pointer' }}>Home</a>
          <span>/</span>
          <span
            onClick={() => handleCategorySelect('All')}
            style={{ cursor: 'pointer', color: selectedCategory === 'All' ? '#1E2B17' : '#3F6B2C', fontWeight: selectedCategory === 'All' ? 700 : 400 }}
          >
            Shop
          </span>
          {selectedCategory !== 'All' && (
            <>
              <span>/</span>
              <b style={{ color: '#1E2B17' }}>{selectedCategory}</b>
            </>
          )}
        </div>

        {/* Section Title */}
        <div style={{ marginTop: '14px' }}>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)' }}>
            Shop by Category
          </h1>
          <p style={{ fontSize: '16px', color: '#5C6E52', marginTop: '8px', maxWidth: '640px', lineHeight: 1.6 }}>
            Fresh from the mill to your kitchen. Pick a category, choose your pack size, and get honest whole-grain purity delivered to your doorstep.
          </p>
        </div>

        {/* Category Selection Visual Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '18px',
            marginTop: '32px'
          }}
        >
          {CATEGORIES.filter((c) => c.name !== 'All').map((cat) => {
            const isSelected = selectedCategory === cat.name;
            const count = products.filter((p) => p.category === cat.name).length;

            return (
              <div
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                className="card hoverable"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: isSelected ? '#F2F6E6' : '#FBFDF5',
                  borderColor: isSelected ? '#3F6B2C' : '#D3E0BC',
                  borderWidth: isSelected ? '2px' : '1px',
                  boxShadow: isSelected ? '0 8px 24px rgba(63, 107, 44, 0.16)' : 'var(--shadow-sm)',
                  position: 'relative'
                }}
              >
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
                      zIndex: 2
                    }}
                  >
                    <CheckCircle size={14} />
                  </div>
                )}

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
                      transform: isSelected ? 'scale(1.05)' : 'none',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </div>

                <b style={{ display: 'block', marginTop: '12px', fontSize: '18px', color: isSelected ? '#3F6B2C' : '#1E2B17' }}>
                  {cat.name}
                </b>
                <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '4px', lineHeight: 1.4 }}>
                  {cat.desc}
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '10px',
                    fontSize: '13px',
                    color: isSelected ? '#3F6B2C' : '#5C6E52',
                    fontWeight: 700
                  }}
                >
                  {count} products · {isSelected ? 'Active' : 'Browse →'}
                </span>
              </div>
            );
          })}
        </div>

        {/* View Mode & Filter Tabs Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            marginTop: '36px',
            paddingBottom: '12px',
            borderBottom: '1.5px solid #D3E0BC'
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => handleCategorySelect('All')}
              className={`btn sm ${selectedCategory === 'All' ? 'p' : 'g'}`}
              style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '999px' }}
            >
              🌾 All Categories ({products.length})
            </button>
            {CATEGORIES.filter((c) => c.name !== 'All').map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`btn sm ${isActive ? 'p' : 'g'}`}
                  style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '999px' }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle when viewing all categories */}
          {selectedCategory === 'All' && !searchQuery && (
            <div style={{ display: 'flex', gap: '6px', background: '#E1EBCB', padding: '4px', borderRadius: '999px' }}>
              <button
                onClick={() => setViewMode('category-focus')}
                style={{
                  border: 'none',
                  background: viewMode === 'category-focus' ? '#3F6B2C' : 'transparent',
                  color: viewMode === 'category-focus' ? '#ffffff' : '#3F6B2C',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('all-sections')}
                style={{
                  border: 'none',
                  background: viewMode === 'all-sections' ? '#3F6B2C' : 'transparent',
                  color: viewMode === 'all-sections' ? '#ffffff' : '#3F6B2C',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Sections by Type
              </button>
            </div>
          )}
        </div>

        {/* Sub-Category Pills Filter (when a category is active) */}
        {selectedCategory !== 'All' && subCategories.length > 1 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              marginTop: '18px'
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
                  {sub === 'All' ? `All ${selectedCategory}` : sub}
                </button>
              );
            })}
          </div>
        )}

        {/* Search, Filter & Sort Controls Bar */}
        <div
          className="card"
          style={{
            marginTop: '20px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            background: '#ffffff'
          }}
        >
          {/* Search Field */}
          <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '380px' }}>
            <input
              type="text"
              placeholder="Search by product name, ingredient, flour type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '38px', paddingRight: searchQuery ? '36px' : '14px' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '15px', color: '#7E9171' }} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '12px', top: '14px', color: '#5C6E52', border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Filters & Sorting */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setBestsellerOnly(!bestsellerOnly)}
              className={`btn sm ${bestsellerOnly ? 'p' : 'g'}`}
              style={{ padding: '8px 14px', fontSize: '13px' }}
            >
              ★ Bestsellers Only
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: '#5C6E52', fontWeight: 600 }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #B8CC98',
                  background: '#ffffff',
                  fontSize: '13px',
                  color: '#1E2B17',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="featured">Featured Fresh</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <p style={{ fontSize: '14px', color: '#5C6E52' }}>
            Showing <b>{filteredProducts.length}</b> fresh farm products
            {selectedCategory !== 'All' && <span> in <b>{selectedCategory}</b></span>}
            {selectedSubCategory !== 'All' && <span> ({selectedSubCategory})</span>}
            {searchQuery && <span> matching "<b>{searchQuery}</b>"</span>}
          </p>

          {(searchQuery || selectedCategory !== 'All' || selectedSubCategory !== 'All' || bestsellerOnly) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSubCategory('All');
                setSearchQuery('');
                setBestsellerOnly(false);
              }}
              style={{ fontSize: '13px', color: '#3F6B2C', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* PRODUCTS DISPLAY */}
        {filteredProducts.length === 0 ? (
          <div className="card" style={{ padding: '60px 20px', textAlign: 'center', marginTop: '30px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#E1EBCB', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={28} color="#3F6B2C" />
            </div>
            <h3 style={{ fontSize: '22px', color: '#1E2B17' }}>No products match your selection</h3>
            <p style={{ fontSize: '15px', color: '#5C6E52', marginTop: '6px' }}>
              Try clearing filters or choosing another category above.
            </p>
            <button
              className="btn p"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSubCategory('All');
                setBestsellerOnly(false);
              }}
              style={{ marginTop: '20px' }}
            >
              View All Products
            </button>
          </div>
        ) : selectedCategory === 'All' && viewMode === 'all-sections' && !searchQuery ? (
          /* SECTION-BY-SECTION VIEW (Matching original design board) */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', marginTop: '32px' }}>
            {categoryGroups.map((group) => {
              if (group.items.length === 0) return null;
              return (
                <section key={group.name} id={group.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #D3E0BC', paddingBottom: '14px' }}>
                    <div>
                      <p style={{ fontSize: '13px', color: '#3F6B2C', fontWeight: 700, letterSpacing: '0.06em' }}>
                        SHOP / {group.name.toUpperCase()}
                      </p>
                      <h2 style={{ fontSize: '32px', marginTop: '4px' }}>
                        {group.name}
                      </h2>
                      <p style={{ fontSize: '15px', color: '#5C6E52', marginTop: '4px' }}>
                        {group.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCategorySelect(group.name)}
                      className="btn g sm"
                      style={{ fontSize: '13px' }}
                    >
                      Focus on {group.name} →
                    </button>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '24px',
                      marginTop: '24px'
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
          /* SINGLE FILTERED GRID */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
              marginTop: '24px'
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
