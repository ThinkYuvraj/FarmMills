import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, User, Search, Menu, X, ChevronDown, Sparkles, Truck, ArrowRight, Heart, MapPin } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    selectedCategory,
    setSelectedCategory,
    cartCount,
    setIsCartDrawerOpen,
    wishlistCount,
    setIsWishlistDrawerOpen,
    user,
    setIsAuthModalOpen,
    searchQuery,
    setSearchQuery,
    selectedOutlet,
    setIsOutletPickerOpen
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click and listen for admin shortcuts
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // Administrative access via hash or query param (#admin or ?admin=true)
    const checkAdminRoute = () => {
      if (
        window.location.hash === '#admin' ||
        window.location.search.includes('admin=true') ||
        window.location.search.includes('admin=1')
      ) {
        setActivePage('admin');
      }
    };
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);

    // Keyboard shortcut for internal store managers: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setActivePage(activePage === 'admin' ? 'home' : 'admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePage, setActivePage]);

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
    const query = searchQuery.trim();
    if (query.toLowerCase() === 'admin') {
      setActivePage('admin');
      setShowSearchInput(false);
      setMobileMenuOpen(false);
      setSearchQuery('');
      return;
    }
    if (query) {
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
          fontWeight: 500,
          letterSpacing: '0.01em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span>
            🌾 Stoneground Fresh on Order &nbsp;·&nbsp; Free Delivery above ₹499 &nbsp;·&nbsp; Use code{' '}
            <strong style={{ color: '#FBFDF5', textDecoration: 'underline' }}>FARMERS10</strong> for 10% OFF
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          {/* Mill Factory Outlet Pill */}
          <button
            onClick={() => setIsOutletPickerOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(225, 235, 203, 0.25)',
              padding: '3px 10px',
              borderRadius: '999px',
              color: '#FBFDF5',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
            title="Select Farmers Mill dispatch factory outlet"
          >
            <MapPin size={12} style={{ color: '#D4A346' }} />
            <span>Mill: <strong>{selectedOutlet.name.split(',')[0]}</strong></span>
            <span style={{ color: '#D4A346', textDecoration: 'underline', fontSize: '11px', marginLeft: '2px' }}>Change</span>
          </button>

          {/* Official Facebook Link */}
          <a
            href="https://www.facebook.com/people/Farmers-Mill/pfbid0HfPHVwMvfZU2c2kVGBPHrZm8PFYH3di4LERF5sUgZGW57fBUSogLL8uCdJVxvZVRl/?rdid=VrOoM7MokhWyFSNF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Li444CByG%2F"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: '#E1EBCB',
              fontSize: '11.5px',
              textDecoration: 'none'
            }}
            title="Follow Farmers Mill on Facebook"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="facebook-top-text">Facebook</span>
          </a>
        </div>
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
          <div style={{ display: 'flex', gap: 'clamp(6px, 1.5vw, 12px)', alignItems: 'center' }}>
            {/* Desktop Quick Search Input */}
            <form onSubmit={handleSearchSubmit} className="desktop-search" style={{ position: 'relative' }}>
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
                  width: '180px',
                  outline: 'none',
                  transition: 'width 0.25s ease, border-color 0.2s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.width = '230px';
                  e.currentTarget.style.borderColor = '#3F6B2C';
                }}
                onBlur={(e) => {
                  if (!searchQuery) {
                    e.currentTarget.style.width = '180px';
                  }
                  e.currentTarget.style.borderColor = '#D3E0BC';
                }}
              />
              <Search
                size={14}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '11px',
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
                    padding: '2px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <X size={13} />
                </button>
              )}
            </form>

            {/* Mobile / Quick Search Icon Toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="navbar-search-btn"
              style={{
                background: 'none',
                border: 'none',
                padding: '6px',
                color: '#1E2B17',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                transition: 'background 0.15s ease'
              }}
              title="Search store"
              aria-label="Toggle search input"
            >
              <Search size={21} strokeWidth={2.2} />
            </button>

            {/* Wishlist Heart Icon Button */}
            <button
              onClick={() => setIsWishlistDrawerOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                padding: '6px',
                color: wishlistCount > 0 ? '#D94436' : '#1E2B17',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                position: 'relative',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              title={`Wishlist (${wishlistCount} saved items)`}
              aria-label={`View wishlist with ${wishlistCount} items`}
            >
              <Heart
                size={21}
                strokeWidth={2.2}
                fill={wishlistCount > 0 ? '#D94436' : 'none'}
                color={wishlistCount > 0 ? '#D94436' : '#1E2B17'}
              />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '1px',
                    background: '#D94436',
                    color: '#ffffff',
                    fontSize: '9.5px',
                    fontWeight: 800,
                    minWidth: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Outline Pill Button (Exact Match to Screenshot) */}
            <button
              onClick={() => (user ? handleNavClick('account') : setIsAuthModalOpen(true))}
              className="navbar-user-pill"
              style={{
                border: '1.5px solid #3F6B2C',
                borderRadius: '999px',
                height: '38px',
                padding: user ? '0 14px' : '0 16px',
                background: 'transparent',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                color: '#3F6B2C',
                cursor: 'pointer',
                transition: 'background 0.15s ease, border-color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#EDF3DF')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              title={user ? `Signed in as ${user.name}` : 'Sign In / Account'}
              aria-label="User Account"
            >
              <User size={19} strokeWidth={2.1} />
              {user && (
                <span className="navbar-username" style={{ fontSize: '13px', fontWeight: 600 }}>
                  {user.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Cart Solid Green Pill Button with Dark Circular Badge (Exact Match to Screenshot) */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="navbar-cart-pill"
              style={{
                background: '#3F6B2C',
                color: '#ffffff',
                border: 'none',
                borderRadius: '999px',
                height: '38px',
                padding: '0 10px 0 14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(63, 107, 44, 0.22)',
                transition: 'background 0.15s ease, transform 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#345B24';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#3F6B2C';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              title={`Shopping cart with ${cartCount} items`}
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag size={18} strokeWidth={2.2} />
              <span
                style={{
                  background: 'rgba(0, 0, 0, 0.28)',
                  color: '#ffffff',
                  minWidth: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  padding: '0 4px',
                  lineHeight: 1
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
                background: 'none',
                border: 'none',
                padding: '6px',
                color: '#1E2B17',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={2.2} /> : <Menu size={24} strokeWidth={2.2} />}
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

            {/* Mobile Mill Outlet Selector Box */}
            <div
              onClick={() => {
                setIsOutletPickerOpen(true);
                setMobileMenuOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: '#EDF3DF',
                borderRadius: '12px',
                border: '1.5px solid #D3E0BC',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} style={{ color: '#3F6B2C' }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#5C6E52', textTransform: 'uppercase' }}>
                    Dispatch Mill Outlet
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E2B17' }}>
                    {selectedOutlet.name}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#3F6B2C', textDecoration: 'underline' }}>
                Change
              </span>
            </div>

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

              {/* Policies & External Links */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '6px' }}>
                <a
                  onClick={() => handleNavClick('terms')}
                  style={{ fontSize: '12px', color: '#5C6E52', textDecoration: 'underline' }}
                >
                  Terms &amp; Conditions
                </a>
                <span style={{ color: '#D3E0BC' }}>·</span>
                <a
                  onClick={() => handleNavClick('shipping')}
                  style={{ fontSize: '12px', color: '#5C6E52', textDecoration: 'underline' }}
                >
                  Shipping &amp; Returns
                </a>
                <span style={{ color: '#D3E0BC' }}>·</span>
                <a
                  href="https://www.facebook.com/people/Farmers-Mill/pfbid0HfPHVwMvfZU2c2kVGBPHrZm8PFYH3di4LERF5sUgZGW57fBUSogLL8uCdJVxvZVRl/?rdid=VrOoM7MokhWyFSNF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Li444CByG%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>Facebook</span>
                </a>
              </div>

              <a
                onClick={() => handleNavClick('contact')}
                style={{
                  fontSize: '12.5px',
                  color: '#5C6E52',
                  textAlign: 'center',
                  padding: '4px'
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
        @media (max-width: 480px) {
          .facebook-top-text { display: none; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};
