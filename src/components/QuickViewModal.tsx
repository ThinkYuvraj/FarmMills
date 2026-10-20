import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, Plus, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { PackOption } from '../types';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, openProductDetail } = useShop();

  if (!quickViewProduct) return null;

  const [selectedPack, setSelectedPack] = useState<PackOption>(quickViewProduct.packOptions[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedPack, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  };

  const handleViewFull = () => {
    const prod = quickViewProduct;
    setQuickViewProduct(null);
    openProductDetail(prod);
  };

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px', padding: '0', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
          <button
            onClick={() => setQuickViewProduct(null)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#FBFDF5',
              border: '1px solid #D3E0BC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {/* Product Image Frame */}
          <div className="ph" style={{ minHeight: '340px', background: '#E1EBCB' }}>
            <img src={quickViewProduct.image} alt={quickViewProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Details */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 700, letterSpacing: '0.05em' }}>
                {quickViewProduct.category}
              </span>
              <h2 style={{ fontSize: '26px', marginTop: '4px', lineHeight: 1.2 }}>
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
              <b style={{ fontSize: '13px', display: 'block', marginBottom: '6px' }}>Select Pack Size:</b>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {quickViewProduct.packOptions.map((pack) => (
                  <button
                    key={pack.size}
                    onClick={() => setSelectedPack(pack)}
                    className={`btn sm ${pack.size === selectedPack.size ? 'p' : 'g'}`}
                    style={{ padding: '6px 14px', fontSize: '13px' }}
                  >
                    {pack.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Quantity & Add */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <b style={{ fontSize: '26px', color: '#1E2B17' }}>₹{selectedPack.price}</b>
              {selectedPack.originalPrice && (
                <span style={{ fontSize: '16px', textDecoration: 'line-through', color: '#7E9171' }}>
                  ₹{selectedPack.originalPrice}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className="quantity-stepper">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>

              <button
                className="btn p"
                onClick={handleAdd}
                style={{ flex: 1, padding: '12px 18px', background: added ? '#2E7D32' : undefined }}
              >
                {added ? <Check size={18} /> : <Plus size={18} />}
                <span>{added ? 'Added!' : 'Add to cart'}</span>
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
                marginTop: '4px'
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
