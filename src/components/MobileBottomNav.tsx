import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, Store, Sparkles, Truck, ShoppingBag } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    cartTotal,
    setIsCartDrawerOpen,
    setSelectedCategory
  } = useShop();

  // Hide on admin dashboard or checkout page to keep focused
  if (activePage === 'admin' || activePage === 'checkout') {
    return null;
  }

  const handleNav = (page: any, category?: string) => {
    if (category) {
      setSelectedCategory(category);
      setActivePage('shop');
    } else {
      setActivePage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className="mobile-bottom-bar"
      aria-label="Mobile Navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9990,
        background: 'rgba(251, 253, 245, 0.98)',
        backdropFilter: 'blur(16px)',
        borderTop: '1.5px solid #D3E0BC',
        boxShadow: '0 -4px 20px rgba(30, 43, 23, 0.08)',
        display: 'none', // Controlled by CSS media queries
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: '8px',
        paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
        paddingLeft: '12px',
        paddingRight: '12px'
      }}
    >
      {/* Home Tab */}
      <button
        onClick={() => handleNav('home')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: activePage === 'home' ? '#3F6B2C' : '#6A7D5F',
          padding: '4px 10px',
          borderRadius: '10px',
          background: 'none',
          border: 'none',
          position: 'relative'
        }}
      >
        <Home size={21} strokeWidth={activePage === 'home' ? 2.5 : 1.8} />
        <span style={{ fontSize: '11px', fontWeight: activePage === 'home' ? 700 : 500 }}>Home</span>
        {activePage === 'home' && (
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3F6B2C', marginTop: '1px' }} />
        )}
      </button>

      {/* Shop Tab */}
      <button
        onClick={() => handleNav('shop', 'All')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: activePage === 'shop' ? '#3F6B2C' : '#6A7D5F',
          padding: '4px 10px',
          borderRadius: '10px',
          background: 'none',
          border: 'none',
          position: 'relative'
        }}
      >
        <Store size={21} strokeWidth={activePage === 'shop' ? 2.5 : 1.8} />
        <span style={{ fontSize: '11px', fontWeight: activePage === 'shop' ? 700 : 500 }}>Shop</span>
        {activePage === 'shop' && (
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3F6B2C', marginTop: '1px' }} />
        )}
      </button>

      {/* Subscribe Tab */}
      <button
        onClick={() => handleNav('subscriptions')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: activePage === 'subscriptions' ? '#3F6B2C' : '#6A7D5F',
          padding: '4px 8px',
          borderRadius: '10px',
          background: 'none',
          border: 'none',
          position: 'relative'
        }}
      >
        <div style={{ position: 'relative' }}>
          <Sparkles size={21} strokeWidth={activePage === 'subscriptions' ? 2.5 : 1.8} />
          <span
            style={{
              position: 'absolute',
              top: '-6px',
              right: '-16px',
              background: '#3F6B2C',
              color: '#ffffff',
              fontSize: '8.5px',
              fontWeight: 800,
              padding: '1px 4px',
              borderRadius: '999px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            15%
          </span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: activePage === 'subscriptions' ? 700 : 500 }}>Subscribe</span>
        {activePage === 'subscriptions' && (
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3F6B2C', marginTop: '1px' }} />
        )}
      </button>

      {/* Track Order Tab */}
      <button
        onClick={() => handleNav('track-order')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: activePage === 'track-order' ? '#3F6B2C' : '#6A7D5F',
          padding: '4px 10px',
          borderRadius: '10px',
          background: 'none',
          border: 'none',
          position: 'relative'
        }}
      >
        <Truck size={21} strokeWidth={activePage === 'track-order' ? 2.5 : 1.8} />
        <span style={{ fontSize: '11px', fontWeight: activePage === 'track-order' ? 700 : 500 }}>Track</span>
        {activePage === 'track-order' && (
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3F6B2C', marginTop: '1px' }} />
        )}
      </button>

      {/* Cart Quick Drawer Tab */}
      <button
        onClick={() => setIsCartDrawerOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#3F6B2C',
          color: '#ffffff',
          padding: '7px 14px',
          borderRadius: '999px',
          border: 'none',
          boxShadow: '0 2px 10px rgba(63, 107, 44, 0.35)',
          marginLeft: '4px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <ShoppingBag size={17} strokeWidth={2.2} />
          {cartCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-7px',
                right: '-8px',
                background: '#D94436',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 800,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid #FBFDF5'
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
        <span style={{ fontSize: '12px', fontWeight: 700 }}>
          {cartTotal > 0 ? `₹${cartTotal}` : 'Cart'}
        </span>
      </button>
    </nav>
  );
};

export default MobileBottomNav;
