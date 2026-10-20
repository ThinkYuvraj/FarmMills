import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, User, Search, Menu, X, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
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

  const handleNavClick = (page: any, category?: string) => {
    if (category) {
      setSelectedCategory(category);
      setActivePage('shop');
    } else {
      setActivePage(page);
    }
    setMobileMenuOpen(false);
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

  return (
    <>
      {/* Top Announcement Bar */}
      <div style={{ background: '#1E2B17', color: '#E1EBCB', fontSize: '13px', padding: '6px 16px', textAlign: 'center', fontWeight: 500 }}>
        <span>🌿 Fresh Chakki Milling Every Morning · Free Delivery on orders over ₹499 · Use code <b>FARMERS10</b> for 10% OFF</span>
      </div>

      {/* Main Header */}
      <header style={{ background: '#FBFDF5', borderBottom: '1px solid #D3E0BC', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(30,43,23,0.03)' }}>
        <div className="w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', paddingTop: '12px', paddingBottom: '12px' }}>
          
          {/* Official Logo */}
          <a
            onClick={() => handleNavClick('home')}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
          >
            <img
              src="/images/farmers-mill-logo.png"
              alt="Farmers Mill"
              style={{ height: '46px', width: 'auto', objectFit: 'contain' }}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none', gap: '22px', flexWrap: 'wrap', fontWeight: 500, fontSize: '15px', alignItems: 'center' }} className="desktop-nav">
            <a
              onClick={() => handleNavClick('subscriptions')}
              style={{ color: activePage === 'subscriptions' ? '#3F6B2C' : '#B01C15', fontWeight: 700 }}
            >
              ✨ Subscribe &amp; Save
            </a>
            <a
              onClick={() => handleNavClick('shop', 'Fresh Atta')}
              style={{ color: activePage === 'shop' ? '#3F6B2C' : '#1E2B17', fontWeight: 600 }}
            >
              Fresh Atta
            </a>
            <a
              onClick={() => handleNavClick('shop', 'Besan & Flours')}
              style={{ color: '#1E2B17' }}
            >
              Besan &amp; Flours
            </a>
            <a
              onClick={() => handleNavClick('shop', 'Spices')}
              style={{ color: '#1E2B17' }}
            >
              Spices
            </a>
            <a
              onClick={() => handleNavClick('shop', 'Oils & Ghee')}
              style={{ color: '#1E2B17' }}
            >
              Oils &amp; Ghee
            </a>
            <a
              onClick={() => handleNavClick('shop', 'Honey & Pickles')}
              style={{ color: '#1E2B17' }}
            >
              Honey &amp; Pickles
            </a>
            <a
              onClick={() => handleNavClick('story')}
              style={{ color: activePage === 'story' ? '#3F6B2C' : '#1E2B17' }}
            >
              Our Story
            </a>
            <a
              onClick={() => handleNavClick('contact')}
              style={{ color: activePage === 'contact' ? '#3F6B2C' : '#1E2B17' }}
            >
              Contact
            </a>
          </nav>

          {/* Search bar & Actions */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Desktop Search Input */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'none', position: 'relative' }} className="desktop-search">
              <input
                type="text"
                placeholder="Search stoneground atta, spices, oils..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '9px 14px 9px 36px',
                  borderRadius: '999px',
                  border: '1.5px solid #D3E0BC',
                  background: '#ffffff',
                  fontSize: '13px',
                  width: '240px',
                  outline: 'none'
                }}
              />
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '11px', color: '#5C6E52' }} />
            </form>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="mobile-search-btn"
              style={{ padding: '8px', color: '#1E2B17' }}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* User Account Button */}
            {user ? (
              <button
                className="btn g sm"
                onClick={() => handleNavClick('account')}
                style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <User size={16} />
                <span className="user-name-text">{user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                className="btn g sm"
                onClick={() => setIsAuthModalOpen(true)}
                style={{ padding: '8px 16px' }}
              >
                Sign in
              </button>
            )}

            {/* Cart Button */}
            <button
              className="btn p sm"
              onClick={() => setIsCartDrawerOpen(true)}
              style={{ padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}
              aria-label="View cart"
            >
              <ShoppingBag size={17} />
              <span>Cart ({cartCount})</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{ padding: '6px', color: '#1E2B17', display: 'block' }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search dropdown */}
        {showSearchInput && (
          <div style={{ padding: '10px 20px 14px', borderTop: '1px solid #D3E0BC', background: '#FBFDF5' }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Search whole wheat, haldi, besan, honey..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #3F6B2C',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn p sm" style={{ padding: '10px 18px' }}>
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div style={{ padding: '16px 24px 24px', background: '#FBFDF5', borderTop: '1px solid #D3E0BC', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#3F6B2C', letterSpacing: '0.05em' }}>CATEGORIES</div>
            <a onClick={() => handleNavClick('subscriptions')} style={{ fontSize: '16px', fontWeight: 700, color: '#B01C15' }}>✨ Subscribe &amp; Save (15% OFF)</a>
            <a onClick={() => handleNavClick('shop', 'Fresh Atta')} style={{ fontSize: '16px', fontWeight: 500 }}>🌾 Fresh Atta</a>
            <a onClick={() => handleNavClick('shop', 'Besan & Flours')} style={{ fontSize: '16px', fontWeight: 500 }}>🥣 Besan &amp; Flours</a>
            <a onClick={() => handleNavClick('shop', 'Spices')} style={{ fontSize: '16px', fontWeight: 500 }}>🌶️ Spices</a>
            <a onClick={() => handleNavClick('shop', 'Oils & Ghee')} style={{ fontSize: '16px', fontWeight: 500 }}>🫒 Oils &amp; Ghee</a>
            <a onClick={() => handleNavClick('shop', 'Honey & Pickles')} style={{ fontSize: '16px', fontWeight: 500 }}>🍯 Honey &amp; Pickles</a>
            <div style={{ height: '1px', background: '#D3E0BC', margin: '4px 0' }} />
            <a onClick={() => handleNavClick('shop')} style={{ fontSize: '16px', fontWeight: 600, color: '#3F6B2C' }}>Browse All Products →</a>
            <a onClick={() => handleNavClick('story')} style={{ fontSize: '16px', fontWeight: 500 }}>Our Story &amp; Milling Process</a>
            <a onClick={() => handleNavClick('contact')} style={{ fontSize: '16px', fontWeight: 500 }}>Contact &amp; Support</a>
            {user ? (
              <a onClick={() => handleNavClick('account')} style={{ fontSize: '16px', fontWeight: 600 }}>My Orders &amp; Profile</a>
            ) : (
              <button className="btn p" onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }} style={{ marginTop: '8px' }}>
                Sign in to your account
              </button>
            )}
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .desktop-search { display: block !important; }
          .mobile-menu-btn { display: none !important; }
          .mobile-search-btn { display: none !important; }
        }
        @media (max-width: 991px) {
          .desktop-nav { display: none !important; }
          .desktop-search { display: none !important; }
          .user-name-text { display: none; }
        }
      `}</style>
    </>
  );
};
