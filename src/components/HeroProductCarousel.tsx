import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { ChevronLeft, ChevronRight, Sparkles, Plus, Eye, Check } from 'lucide-react';

export const HeroProductCarousel: React.FC = () => {
  const { products, openProductDetail, setQuickViewProduct, addToCart } = useShop();

  // Selected hero featured products
  const carouselProducts: Product[] = React.useMemo(() => {
    return products.slice(0, 6);
  }, [products]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // Auto-advance carousel every 4.5 seconds
  useEffect(() => {
    if (isPaused || carouselProducts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, carouselProducts.length]);

  if (carouselProducts.length === 0) return null;

  const currentProduct = carouselProducts[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentProduct && currentProduct.packOptions.length > 0) {
      addToCart(currentProduct, currentProduct.packOptions[0], 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 900);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="clay-card-static"
      style={{
        position: 'relative',
        borderRadius: '32px',
        minHeight: '440px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        background: '#1E2B17',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Product Image Stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/11',
          overflow: 'hidden',
          background: '#162011'
        }}
      >
        <img
          key={currentProduct.id}
          src={currentProduct.image}
          alt={currentProduct.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.4s ease-in-out',
            animation: 'fadeIn 0.35s ease-out'
          }}
        />

        {/* Gradient Shadow Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(30, 43, 23, 0.85) 0%, rgba(30, 43, 23, 0.15) 50%, rgba(0,0,0,0.1) 100%)'
          }}
        />

        {/* Category Pill Tag */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 3 }}>
          <span
            style={{
              background: 'rgba(251, 253, 245, 0.95)',
              color: '#3F6B2C',
              padding: '6px 14px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={13} /> {currentProduct.category}
          </span>
        </div>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(currentProduct);
          }}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 3,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(251, 253, 245, 0.95)',
            border: '1px solid #D3E0BC',
            color: '#1E2B17',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            cursor: 'pointer'
          }}
          title="Quick preview product"
        >
          <Eye size={17} />
        </button>

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 4,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(251, 253, 245, 0.9)',
            border: 'none',
            color: '#1E2B17',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
            cursor: 'pointer'
          }}
          aria-label="Previous product"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 4,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(251, 253, 245, 0.9)',
            border: 'none',
            color: '#1E2B17',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
            cursor: 'pointer'
          }}
          aria-label="Next product"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Floating Bottom Card Details */}
      <div
        style={{
          padding: '18px 20px',
          background: 'rgba(251, 253, 245, 0.98)',
          borderRadius: '0 0 32px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
          <div>
            <b
              onClick={() => openProductDetail(currentProduct)}
              style={{
                fontSize: '18px',
                color: '#1E2B17',
                display: 'block',
                lineHeight: 1.25,
                cursor: 'pointer'
              }}
            >
              {currentProduct.name}
            </b>
            <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '3px' }}>
              {currentProduct.tagline || currentProduct.shortDesc}
            </p>
          </div>

          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <b style={{ fontSize: '20px', color: '#1E2B17', display: 'block' }}>
              ₹{currentProduct.packOptions[0]?.price}
            </b>
            <span style={{ fontSize: '11px', color: '#7E9171' }}>
              ({currentProduct.packOptions[0]?.size})
            </span>
          </div>
        </div>

        {/* Action button & indicator dots */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #D3E0BC' }}>
          {/* Dots Indicator */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {carouselProducts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: idx === currentIndex ? '20px' : '7px',
                  height: '7px',
                  borderRadius: '999px',
                  background: idx === currentIndex ? '#3F6B2C' : '#C2D4A8',
                  transition: 'all 0.25s ease',
                  padding: 0,
                  border: 'none',
                  cursor: 'pointer'
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => openProductDetail(currentProduct)}
              className="clay-btn-secondary"
              style={{ padding: '6px 14px', fontSize: '12.5px' }}
            >
              Details
            </button>
            <button
              onClick={handleQuickAdd}
              className="clay-btn-primary"
              style={{
                padding: '6px 16px',
                fontSize: '12.5px',
                background: justAdded ? '#2E7D32' : undefined
              }}
            >
              {justAdded ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                <>
                  <Plus size={14} /> Add to cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
