import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, Plus, Check, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { PackOption } from '../types';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, openProductDetail } = useShop();

  const [selectedPack, setSelectedPack] = useState<PackOption | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  // Synchronize when a new quickViewProduct is opened
  useEffect(() => {
    if (quickViewProduct && quickViewProduct.packOptions && quickViewProduct.packOptions.length > 0) {
      setSelectedPack(quickViewProduct.packOptions[0]);
      setQuantity(1);
      setAdded(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentPack = selectedPack || quickViewProduct.packOptions[0];

  const handleAdd = () => {
    if (currentPack) {
      addToCart(quickViewProduct, currentPack, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 900);
    }
  };

  const handleViewFull = () => {
    const prod = quickViewProduct;
    setQuickViewProduct(null);
    openProductDetail(prod);
  };

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div
        className="modal-content clay-card-static"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '820px',
          width: '95%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '0',
          borderRadius: '28px',
          background: '#FBFDF5',
          border: '1.5px solid #D3E0BC',
          position: 'relative'
        }}
      >
        {/* Mobile Sheet Drag Indicator Bar */}
        <div className="mobile-sheet-pill" style={{ display: 'none', justifyContent: 'center', paddingTop: '12px', paddingBottom: '4px' }}>
          <div style={{ width: '44px', height: '5px', borderRadius: '999px', background: '#CBD9B6' }} />
        </div>

        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(251, 253, 245, 0.95)',
            border: '1px solid #D3E0BC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1E2B17',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {/* Product Image Frame */}
          <div
            className="quickview-img-frame"
            style={{
              background: '#E1EBCB',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {quickViewProduct.badges && quickViewProduct.badges.length > 0 && (
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: 'rgba(30, 43, 23, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#E1EBCB',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '999px'
                  }}
                >
                  <Sparkles size={11} style={{ display: 'inline', marginRight: '4px' }} />
                  {quickViewProduct.badges[0]}
                </span>
              </div>
            )}
          </div>

          {/* Details Column with comfortable padding and scrollability */}
          <div
            style={{
              padding: 'clamp(20px, 3vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              justifyContent: 'center'
            }}
          >
            <div>
              <span style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {quickViewProduct.category}
              </span>
              <h2 style={{ fontSize: '24px', marginTop: '4px', lineHeight: 1.2, color: '#1E2B17' }}>
                {quickViewProduct.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '13px' }}>
                <Star size={15} fill="#D4A346" stroke="#D4A346" />
                <b>{quickViewProduct.rating}</b>
                <span style={{ color: '#5C6E52' }}>({quickViewProduct.reviewCount} customer reviews)</span>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: '#5C6E52', lineHeight: 1.6 }}>
              {quickViewProduct.shortDesc}
            </p>

            {/* Pack Size Pills */}
            <div>
              <b style={{ fontSize: '13px', display: 'block', marginBottom: '8px', color: '#1E2B17' }}>Select Pack Size:</b>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {quickViewProduct.packOptions.map((pack) => (
                  <button
                    key={pack.size}
                    onClick={() => setSelectedPack(pack)}
                    className={pack.size === currentPack?.size ? 'clay-btn-primary' : 'clay-btn-secondary'}
                    style={{ padding: '6px 14px', fontSize: '13px', borderRadius: '999px' }}
                  >
                    {pack.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Quantity & Add */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <b style={{ fontSize: '26px', color: '#1E2B17' }}>₹{currentPack?.price}</b>
              {currentPack?.originalPrice && (
                <span style={{ fontSize: '16px', textDecoration: 'line-through', color: '#7E9171' }}>
                  ₹{currentPack.originalPrice}
                </span>
              )}
            </div>

            {/* Action Row - Fixed overflow issue */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '4px' }}>
              <div className="quantity-stepper clay-inset" style={{ height: '44px' }}>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 700 }}>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase">+</button>
              </div>

              <button
                className="clay-btn-primary"
                onClick={handleAdd}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  height: '44px',
                  background: added ? '#2E7D32' : undefined
                }}
              >
                {added ? <Check size={18} /> : <Plus size={18} />}
                <span>{added ? 'Added to Cart!' : 'Add to cart'}</span>
              </button>
            </div>

            <button
              onClick={handleViewFull}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: '#3F6B2C',
                fontWeight: 700,
                marginTop: '6px'
              }}
            >
              <span>View full product details, lab reports &amp; recipes</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
