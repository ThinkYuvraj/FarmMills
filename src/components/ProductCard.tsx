import React, { useState, useEffect } from 'react';
import { Product, PackOption } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, Eye, Plus, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, openProductDetail, setQuickViewProduct } = useShop();

  const [selectedPack, setSelectedPack] = useState<PackOption>(product.packOptions[0] || { size: '1 kg', price: 100 });
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // Synchronize when product changes
  useEffect(() => {
    if (product.packOptions && product.packOptions.length > 0) {
      setSelectedPack(product.packOptions[0]);
      setQuantity(1);
    }
  }, [product]);

  const handlePackSelect = (e: React.MouseEvent, pack: PackOption) => {
    e.stopPropagation();
    setSelectedPack(pack);
  };

  const handleQuantity = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, selectedPack, quantity);
    setTimeout(() => {
      setIsAdding(false);
    }, 700);
  };

  const discountPercent = selectedPack?.originalPrice
    ? Math.round(((selectedPack.originalPrice - selectedPack.price) / selectedPack.originalPrice) * 100)
    : 0;

  return (
    <div
      className="clay-card"
      onClick={() => openProductDetail(product)}
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        height: '100%',
        borderRadius: '24px'
      }}
    >
      {/* Product Image Frame */}
      <div
        style={{
          aspectRatio: '4/3',
          position: 'relative',
          overflow: 'hidden',
          background: '#E1EBCB'
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
        />

        {/* Badges Overlay */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 2 }}>
          {product.isBestseller && (
            <span
              style={{
                background: '#FEF3D6',
                color: '#946808',
                fontWeight: 700,
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '999px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              ★ Bestseller
            </span>
          )}
          {discountPercent > 0 && (
            <span
              style={{
                background: '#3F6B2C',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '999px'
              }}
            >
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="clay-btn-secondary"
          aria-label="Quick view product"
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3
          }}
        >
          <Eye size={17} color="#1E2B17" />
        </button>
      </div>

      {/* Product Content Body */}
      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {product.subCategory || product.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#1E2B17' }}>
              <Star size={14} fill="#D4A346" stroke="#D4A346" />
              <span>{product.rating}</span>
              <span style={{ color: '#7E9171', fontWeight: 400 }}>({product.reviewCount})</span>
            </div>
          </div>

          <h3 style={{ fontSize: '18px', marginTop: '6px', lineHeight: 1.25, color: '#1E2B17' }}>
            {product.name}
          </h3>
          <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '4px', lineHeight: 1.45 }}>
            {product.tagline || product.shortDesc}
          </p>
        </div>

        {/* Pack Size Selector Pills */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#5C6E52' }}>Pack size</span>
            <span style={{ fontSize: '11px', color: '#3F6B2C', fontWeight: 700 }}>Slow Stoneground</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {product.packOptions.map((pack) => {
              const active = pack.size === selectedPack?.size;
              return (
                <button
                  key={pack.size}
                  onClick={(e) => handlePackSelect(e, pack)}
                  className={active ? 'clay-btn-primary' : 'clay-btn-secondary'}
                  style={{
                    padding: '5px 12px',
                    fontSize: '12px',
                    borderRadius: '8px'
                  }}
                >
                  {pack.size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price & Quantity & Add to Cart */}
        <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <b style={{ fontSize: '22px', color: '#1E2B17', fontWeight: 700 }}>
              ₹{selectedPack?.price}
            </b>
            {selectedPack?.originalPrice && (
              <span style={{ fontSize: '14px', textDecoration: 'line-through', color: '#7E9171' }}>
                ₹{selectedPack.originalPrice}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Stepper */}
            <div className="quantity-stepper clay-inset" onClick={(e) => e.stopPropagation()}>
              <button onClick={(e) => handleQuantity(e, -1)} aria-label="Decrease quantity">
                −
              </button>
              <span>{quantity}</span>
              <button onClick={(e) => handleQuantity(e, 1)} aria-label="Increase quantity">
                +
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className="clay-btn-primary"
              style={{
                flex: 1,
                padding: '10px 14px',
                fontSize: '13px',
                background: isAdding ? '#2E7D32' : undefined
              }}
            >
              {isAdding ? (
                <>
                  <Check size={16} /> Added
                </>
              ) : (
                <>
                  <Plus size={16} /> Add to cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
