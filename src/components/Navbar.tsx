import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, User, Search, Menu, X, ChevronDown, Sparkles, Truck, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    selectedCategory,
    setSelectedCategory,
    cartCount,
    setIsCartDrawerOpen,
    user,
    setIsAuthModalOpen,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: any, category?: string) => {
    if (category) {
      setSelectedCategory(category);
      setActivePage('shop');
    } else {
      setActivePage(page);
    }
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
    setShowSearchInput(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('shop');
      setShowSearchInput(false);
      setMobileMenuOpen(false);
    }
  };

  const isShopActive = activePage === 'shop';

  return (
    <>
      {/* Top Notification Bar */}
      <div
        style={{
          background: '#1E2B17',
          color: '#E1EBCB',
          fontSize: '12.5px',
          padding: '6px 16px',
          textAlign: 'center',
          fontWeight: 500,
          letterSpacing: '0.01em'
        }}
      >
        <span>
          🌾 Stoneground Fresh on Order &nbsp;·&nbsp; Free Delivery above ₹499 &nbsp;·&nbsp; Use code{' '}
          <strong style={{ color: '#FBFDF5', textDecoration: 'underline' }}>FARMERS10</strong> for 10% OFF
        </span>
      </div>

      {/* Main Header */}
      <header
        style={{
          background: '#FBFDF5',
          borderBottom: '1px solid #D3E0BC',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(30, 43, 23, 0.04)'
        }}
      >
        <div
          className="w"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingTop: '10px',
            paddingBottom: '10px'
          }}
        >
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              flexShrink: 0
            }}
            title="Farmers Mill Home"
          >
            <img
              src="/images/farmers-mill-logo.png"
              alt="Farmers Mill"
              style={{ height: '42px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>

          {/* Clean, Simplified Desktop Navigation */}
          <nav
            className="desktop-nav"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '24px',
              fontWeight: 500,
              fontSize: '15px'
            }}
          >
            {/* Shop with Dropdown */}
            <div
              ref={dropdownRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('shop', 'All')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: isShopActive ? '#3F6B2C' : '#1E2B17',
                  fontWeight: isShopActive ? 700 : 500,
                  padding: '6px 0',
                  fontSize: '15px'
                }}
              >
                <span>Shop</span>
                <ChevronDown
                  size={15}
                  style={{
                    transform: shopDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: isShopActive ? '#3F6B2C' : '#5C6E52'
                  }}
                />
              </button>

              {/* Clean Categories Popover Menu */}
              {shopDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '260px',
                    background: '#FBFDF5',
                    borderRadius: '14px',
                    border: '1px solid #D3E0BC',
                    boxShadow: '0 10px 28px rgba(30, 43, 23, 0.12)',
                    padding: '8px',
                    zIndex: 1100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    animation: 'fadeIn 0.15s ease'
                  }}
                >
                  <a
                    onClick={() => handleNavClick('shop', 'All')}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: selectedCategory === 'All' && isShopActive ? '#3F6B2C' : '#1E2B17',
                      background: selectedCategory === 'All' && isShopActive ? '#E1EBCB' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>All Products</span>
                    <ArrowRight size={14} style={{ color: '#5C6E52' }} />
                  </a>
                  <div style={{ height: '1px', background: '#D3E0BC', margin: '4px 0' }} />
                  {CATEGORIES.map((cat) => (
                    <a
                      key={cat.name}
                      onClick={() => handleNavClick('shop', cat.name)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '13.5px',
                        fontWeight: selectedCategory === cat.name && isShopActive ? 600 : 450,
                        color: selectedCategory === cat.name && isShopActive ? '#3F6B2C' : '#1E2B17',
                        background: selectedCategory === cat.name && isShopActive ? '#E1EBCB' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!(selectedCategory === cat.name && isShopActive)) {
                          e.currentTarget.style.background = '#EDF3DF';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!(selectedCategory === cat.name && isShopActive)) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <span style={{ fontSize: '15px' }}>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Subscribe & Save Link */}
            <a
              onClick={() => handleNavClick('subscriptions')}
              style={{
                color: activePage === 'subscriptions' ? '#3F6B2C' : '#1E2B17',
                fontWeight: activePage === 'subscriptions' ? 700 : 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Subscribe &amp; Save</span>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  background: '#3F6B2C',
                  color: '#ffffff',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                15% OFF
              </span>
            </a>

            {/* Our Story Link */}
            <a
              onClick={() => handleNavClick('story')}
              style={{
                color: activePage === 'story' ? '#3F6B2C' : '#1E2B17',
                fontWeight: activePage === 'story' ? 700 : 500
              }}
            >
              Our Story
            </a>

            {/* Track Order Link */}
            <a
              onClick={() => handleNavClick('track-order')}
              style={{
                color: activePage === 'track-order' ? '#3F6B2C' : '#1E2B17',
                fontWeight: activePage === 'track-order' ? 700 : 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Truck size={15} style={{ color: '#5C6E52' }} />
              <span>Track Order</span>
            </a>
          </nav>

          {/* Right Action Controls */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Desktop Quick Search */}
            <form onSubmit={handleSearchSubmit} className="desktop-search" style={{ display: 'none', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search atta, spices, oils..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '8px 12px 8px 34px',
                  borderRadius: '999px',
                  border: '1.5px solid #D3E0BC',
                  background: '#ffffff',
                  fontSize: '13px',
                  width: '190px',
                  outline: 'none',
                  transition: 'width 0.25s ease, border-color 0.2s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.width = '240px';
                  e.currentTarget.style.borderColor = '#3F6B2C';
                }}
                onBlur={(e) => {
                  if (!searchQuery) {
                    e.currentTarget.style.width = '190px';
                  }
                  e.currentTarget.style.borderColor = '#D3E0BC';
                }}
              />
              <Search
                size={14}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '10px',
                  color: '#5C6E52',
                  pointerEvents: 'none'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '8px',
                    color: '#8E9F84',
                    padding: '2px'
                  }}
                >
                  <X size={13} />
                </button>
              )}
            </form>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="mobile-search-btn"
              style={{
                padding: '8px',
                color: '#1E2B17',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>

            {/* User Account / Sign In */}
            {user ? (
              <button
                className="btn g sm"
                onClick={() => handleNavClick('account')}
                style={{
                  padding: '7px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13.5px'
                }}
                title={`Signed in as ${user.name}`}
              >
                <User size={15} />
                <span className="user-name-text">{user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                className="btn g sm"
                onClick={() => setIsAuthModalOpen(true)}
                style={{
                  padding: '7px 14px',
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <User size={15} />
                <span className="sign-in-text">Sign In</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              className="btn p sm"
              onClick={() => setIsCartDrawerOpen(true)}
              style={{
                padding: '7px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                fontSize: '13.5px'
              }}
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag size={16} />
              <span className="cart-label">Cart</span>
              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '999px',
                  marginLeft: '2px'
                }}
              >
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                padding: '8px',
                color: '#1E2B17',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown Bar */}
        {showSearchInput && (
          <div
            style={{
              padding: '10px 20px 14px',
              borderTop: '1px solid #D3E0BC',
              background: '#FBFDF5'
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  placeholder="Search whole wheat, spices, honey..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 36px',
                    borderRadius: '10px',
                    border: '1.5px solid #3F6B2C',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#ffffff'
                  }}
                />
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: '#5C6E52' }} />
              </div>
              <button type="submit" className="btn p sm" style={{ padding: '10px 16px' }}>
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Slide-down Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 20px 24px',
              background: '#FBFDF5',
              borderTop: '1px solid #D3E0BC',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto'
            }}
          >
            {/* Primary Mobile Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                onClick={() => handleNavClick('shop', 'All')}
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#3F6B2C',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>Browse All Products</span>
                <ArrowRight size={16} />
              </a>
              <a
                onClick={() => handleNavClick('subscriptions')}
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1E2B17',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>Subscribe &amp; Save</span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    background: '#3F6B2C',
                    color: '#ffffff',
                    padding: '2px 8px',
                    borderRadius: '999px'
                  }}
                >
                  15% OFF
                </span>
              </a>
              <a
                onClick={() => handleNavClick('story')}
                style={{ fontSize: '16px', fontWeight: 500, color: '#1E2B17' }}
              >
                Our Story &amp; Milling Process
              </a>
              <a
                onClick={() => handleNavClick('track-order')}
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#1E2B17',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Truck size={17} style={{ color: '#5C6E52' }} />
                <span>Track Order Shipment</span>
              </a>
            </div>

            <div style={{ height: '1px', background: '#D3E0BC', margin: '4px 0' }} />

            {/* Categories Section */}
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '11.5px',
                  color: '#5C6E52',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '10px'
                }}
              >
                Explore Categories
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleNavClick('shop', cat.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      background: '#EDF3DF',
                      borderRadius: '10px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: '#1E2B17',
                      textAlign: 'left'
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ height: '1px', background: '#D3E0BC', margin: '4px 0' }} />

            {/* Account / Support Footer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {user ? (
                <button
                  className="btn g sm"
                  onClick={() => handleNavClick('account')}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <User size={16} />
                  <span>My Profile &amp; Orders ({user.name.split(' ')[0]})</span>
                </button>
              ) : (
                <button
                  className="btn p sm"
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Sign In to Your Account
                </button>
              )}
              <a
                onClick={() => handleNavClick('contact')}
                style={{
                  fontSize: '13px',
                  color: '#5C6E52',
                  textAlign: 'center',
                  padding: '6px'
                }}
              >
                Need Help? Contact Support
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Responsive Visibility Styles */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-search { display: block !important; }
          .mobile-menu-btn { display: none !important; }
          .mobile-search-btn { display: none !important; }
        }
        @media (max-width: 859px) {
          .desktop-nav { display: none !important; }
          .desktop-search { display: none !important; }
          .user-name-text { display: none; }
          .sign-in-text { display: none; }
          .cart-label { display: none; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};
