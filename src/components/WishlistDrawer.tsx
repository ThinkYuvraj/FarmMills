import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    wishlistCount,
    removeFromWishlist,
    clearWishlist,
    addToCart,
    isWishlistDrawerOpen,
    setIsWishlistDrawerOpen,
    openProductDetail,
    setActivePage
  } = useShop();

  if (!isWishlistDrawerOpen) return null;

  const handleMoveToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultPack = product.packOptions[0];
    addToCart(product, defaultPack, 1);
    removeFromWishlist(product.id);
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      const defaultPack = product.packOptions[0];
      addToCart(product, defaultPack, 1);
    });
    clearWishlist();
    setIsWishlistDrawerOpen(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9995,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(30, 43, 23, 0.45)',
        backdropFilter: 'blur(4px)',
        animation: 'fmFadeIn 0.2s ease-out'
      }}
      onClick={() => setIsWishlistDrawerOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          height: '100%',
          background: '#FBFDF5',
          boxShadow: '-8px 0 32px rgba(30, 43, 23, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'fmSlideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid #D3E0BC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#ffffff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#FDE8E7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D94436'
              }}
            >
              <Heart size={20} fill="#D94436" stroke="#D94436" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E2B17', margin: 0, lineHeight: 1.2 }}>
                My Wishlist
              </h2>
              <span style={{ fontSize: '12px', color: '#5C6E52', fontWeight: 500 }}>
                {wishlistCount} {wishlistCount === 1 ? 'saved product' : 'saved products'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistDrawerOpen(false)}
            aria-label="Close wishlist drawer"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#EDF3DF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1E2B17',
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#D3E0BC')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#EDF3DF')}
          >
            <X size={19} />
          </button>
        </div>

        {/* Drawer Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {wishlist.length === 0 ? (
            <div
              style={{
                height: '100%',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '24px 12px'
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#EDF3DF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7E9171',
                  marginBottom: '16px'
                }}
              >
                <Heart size={38} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E2B17', marginBottom: '8px' }}>
                Your wishlist is empty
              </h3>
              <p style={{ fontSize: '13.5px', color: '#5C6E52', maxWidth: '280px', lineHeight: 1.5, marginBottom: '22px' }}>
                Tap the heart on any stoneground atta, wood-pressed oil, or native spice to save it here for later.
              </p>
              <button
                className="btn p"
                onClick={() => {
                  setIsWishlistDrawerOpen(false);
                  setActivePage('shop');
                }}
                style={{ padding: '10px 22px', fontSize: '14px', borderRadius: '999px' }}
              >
                Browse Fresh Products
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {wishlist.map((product) => {
                const defaultPack = product.packOptions[0];
                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      openProductDetail(product);
                      setIsWishlistDrawerOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      padding: '12px',
                      background: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #D3E0BC',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(30, 43, 23, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: '76px',
                        height: '76px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#E1EBCB',
                        flexShrink: 0
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#3F6B2C',
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em'
                            }}
                          >
                            {product.category}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromWishlist(product.id);
                            }}
                            title="Remove from wishlist"
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#A0B096',
                              padding: '2px',
                              cursor: 'pointer',
                              display: 'flex'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#D94436')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#A0B096')}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <h4
                          style={{
                            fontSize: '14.5px',
                            fontWeight: 700,
                            color: '#1E2B17',
                            margin: '2px 0 4px',
                            lineHeight: 1.3
                          }}
                        >
                          {product.name}
                        </h4>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                          <span style={{ fontSize: '15px', fontWeight: 700, color: '#1E2B17' }}>
                            ₹{defaultPack.price}
                          </span>
                          <span style={{ fontSize: '11.5px', color: '#6A7D5F' }}>
                            ({defaultPack.size})
                          </span>
                        </div>
                      </div>

                      {/* Move to Cart Button */}
                      <button
                        onClick={(e) => handleMoveToCart(product, e)}
                        className="btn p sm"
                        style={{
                          marginTop: '8px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          width: 'fit-content',
                          borderRadius: '8px'
                        }}
                      >
                        <ShoppingBag size={14} />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {wishlist.length > 0 && (
          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid #D3E0BC',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <button
              onClick={handleMoveAllToCart}
              className="btn p"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 700,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <ShoppingBag size={17} />
              <span>Move All to Cart ({wishlistCount} items)</span>
            </button>

            <button
              onClick={clearWishlist}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '12.5px',
                color: '#7E9171',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '4px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D94436')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#7E9171')}
            >
              Clear entire wishlist
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fmFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fmSlideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default WishlistDrawer;
