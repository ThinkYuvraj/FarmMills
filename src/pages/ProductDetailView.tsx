import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, MOCK_REVIEWS } from '../data/products';
import { PackOption, Review } from '../types';
import { Star, ShieldCheck, MapPin, Truck, Check, Plus, ArrowLeft, Heart, Sparkles, AlertCircle } from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const { selectedProduct, addToCart, setActivePage, addToast, openLabReport } = useShop();

  const [selectedPack, setSelectedPack] = useState<PackOption>(selectedProduct.packOptions[0]);
  const [activeImage, setActiveImage] = useState<string>(selectedProduct.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'origin' | 'nutrition' | 'reviews'>('desc');

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [customReviews, setCustomReviews] = useState<Review[]>([]);

  // Update image when product changes
  React.useEffect(() => {
    setSelectedPack(selectedProduct.packOptions[0]);
    setActiveImage(selectedProduct.image);
    setQuantity(1);
    setPincodeResult(null);
  }, [selectedProduct]);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeResult(`✓ Delivery available to ${pincode}: Next-day morning delivery for freshly stone-milled batch.`);
    } else {
      setPincodeResult('Please enter a valid 6-digit Indian postal pincode.');
    }
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedPack, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedPack, quantity);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewComment.trim()) {
      const review: Review = {
        id: `rev-${Date.now()}`,
        author: newReviewAuthor,
        location: 'Verified Buyer',
        rating: newReviewRating,
        date: 'Just now',
        comment: newReviewComment,
        verified: true
      };
      setCustomReviews([review, ...customReviews]);
      setNewReviewAuthor('');
      setNewReviewComment('');
      setShowReviewForm(false);
      addToast('Thank you! Your verified review has been published.', 'success');
    }
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.isBestseller)
  ).slice(0, 4);

  const allReviews = [...customReviews, ...MOCK_REVIEWS];

  return (
    <div style={{ paddingBottom: '80px' }}>
      <section className="w" style={{ paddingTop: '32px' }}>
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#5C6E52', flexWrap: 'wrap' }}>
          <button onClick={() => setActivePage('home')} style={{ color: '#3F6B2C', fontWeight: 500 }}>
            Home
          </button>
          <span>/</span>
          <button onClick={() => setActivePage('shop')} style={{ color: '#3F6B2C', fontWeight: 500 }}>
            {selectedProduct.category}
          </button>
          <span>/</span>
          <span style={{ color: '#1E2B17', fontWeight: 600 }}>{selectedProduct.name}</span>
        </div>

        {/* Back Button */}
        <div style={{ marginTop: '16px' }}>
          <button
            onClick={() => setActivePage('shop')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              color: '#3F6B2C',
              fontWeight: 700
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to all products</span>
          </button>
        </div>

        {/* Product Hero Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            marginTop: '24px',
            alignItems: 'start'
          }}
        >
          {/* Gallery View */}
          <div>
            <div
              className="ph"
              style={{
                aspectRatio: '1/1',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                background: '#E1EBCB',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <img
                src={activeImage}
                alt={selectedProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                {selectedProduct.isBestseller && (
                  <span className="badge badge-gold">★ Bestseller</span>
                )}
                <span className="badge" style={{ background: '#3F6B2C', color: '#fff' }}>
                  Same-Day Milled
                </span>
              </div>
            </div>

            {/* Thumbnail selector */}
            {selectedProduct.galleryImages.length > 1 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '12px',
                  marginTop: '16px'
                }}
              >
                {selectedProduct.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className="ph"
                    style={{
                      aspectRatio: '1/1',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      border: activeImage === img ? '2.5px solid #3F6B2C' : '1.5px solid #D3E0BC',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span style={{ color: '#3F6B2C', fontWeight: 700, letterSpacing: '0.08em', fontSize: '13px', textTransform: 'uppercase' }}>
                {selectedProduct.subCategory} · FARM DIRECT
              </span>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, marginTop: '6px' }}>
                {selectedProduct.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#D4A346' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#D4A346" stroke="#D4A346" />
                  ))}
                </div>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#1E2B17' }}>
                  {selectedProduct.rating}
                </span>
                <span style={{ fontSize: '14px', color: '#5C6E52' }}>
                  · {selectedProduct.reviewCount} verified ratings
                </span>
              </div>
            </div>

            {/* Price section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <b style={{ fontSize: '34px', color: '#1E2B17', fontWeight: 700 }}>
                ₹{selectedPack.price}
              </b>
              {selectedPack.originalPrice && (
                <span style={{ fontSize: '20px', textDecoration: 'line-through', color: '#7E9171' }}>
                  ₹{selectedPack.originalPrice}
                </span>
              )}
              <span className="badge" style={{ background: '#E1EBCB', color: '#3F6B2C' }}>
                Taxes Included
              </span>
            </div>

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#435538' }}>
              {selectedProduct.shortDesc}
            </p>

            {/* Pack Size Selector */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <b style={{ fontSize: '14px', color: '#1E2B17' }}>Choose Pack Size:</b>
                <span style={{ fontSize: '13px', color: '#3F6B2C', fontWeight: 600 }}>Selected: {selectedPack.size}</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {selectedProduct.packOptions.map((pack) => {
                  const active = pack.size === selectedPack.size;
                  return (
                    <button
                      key={pack.size}
                      onClick={() => setSelectedPack(pack)}
                      className={`btn ${active ? 'p' : 'g'}`}
                      style={{
                        padding: '10px 20px',
                        fontSize: '14px',
                        borderWidth: '2px',
                        borderRadius: '12px'
                      }}
                    >
                      <span>{pack.size}</span>
                      <span style={{ opacity: 0.85, fontSize: '12px', marginLeft: '4px' }}>
                        (₹{pack.price})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subscribe & Save 15% Banner Card */}
            <div
              className="card"
              style={{
                background: '#FEF8EE',
                borderColor: '#E8D0B0',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <b style={{ color: '#2C1A0E', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="#B01C15" />
                  <span>Subscribe &amp; Save 15%</span>
                </b>
                <p style={{ fontSize: '12px', color: '#5C5C5C', marginTop: '2px' }}>
                  Get routine fresh batches at <b>₹{Math.round(selectedPack.price * 0.85)}</b> with Free Priority Delivery.
                </p>
              </div>
              <button
                type="button"
                className="btn sm"
                onClick={() => {
                  setActivePage('subscriptions');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: '#B01C15', color: '#ffffff', padding: '8px 16px', fontSize: '12px' }}
              >
                Set Up Routine
              </button>
            </div>

            {/* View NABL Lab Report Trigger */}
            <div>
              <button
                type="button"
                onClick={() => openLabReport(selectedProduct)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#EDF3DF',
                  border: '1.5px solid #3F6B2C',
                  color: '#2E5020',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700
                }}
              >
                <ShieldCheck size={16} color="#3F6B2C" />
                <span>🔬 View NABL Certified Lab Test Report (230+ Pesticides Passed)</span>
              </button>
            </div>

            {/* Quantity Stepper & Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginTop: '10px' }}>
              <div className="quantity-stepper" style={{ padding: '4px 6px' }}>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} style={{ padding: '8px 16px', fontSize: '18px' }}>
                  −
                </button>
                <span style={{ padding: '0 16px', fontSize: '17px' }}>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} style={{ padding: '8px 16px', fontSize: '18px' }}>
                  +
                </button>
              </div>

              <button
                className="btn p lg"
                onClick={handleAddToCart}
                style={{ flex: 1, minWidth: '180px' }}
              >
                <Plus size={18} />
                <span>Add to Cart (₹{selectedPack.price * quantity})</span>
              </button>

              <button
                className="btn g lg"
                onClick={handleBuyNow}
                style={{ minWidth: '130px' }}
              >
                Buy Now
              </button>
            </div>

            {/* Pincode Delivery Checker */}
            <div className="card" style={{ padding: '18px', background: '#ffffff', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Truck size={18} color="#3F6B2C" />
                <b style={{ fontSize: '14px', color: '#1E2B17' }}>Check Delivery Pincode:</b>
              </div>

              <form onSubmit={handlePincodeCheck} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Enter 6-digit postal pincode (e.g. 110001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  className="input-field"
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn g sm" style={{ padding: '10px 20px' }}>
                  Check
                </button>
              </form>

              {pincodeResult && (
                <p style={{ fontSize: '13px', marginTop: '10px', color: pincodeResult.startsWith('✓') ? '#2E7D32' : '#D94436', fontWeight: 600 }}>
                  {pincodeResult}
                </p>
              )}
            </div>

            {/* 3 Quick Benefit Pillars */}
            <div
              className="card"
              style={{
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
                textAlign: 'center',
                background: '#E1EBCB',
                borderColor: '#C5D8A4'
              }}
            >
              <div>
                <b style={{ color: '#2E5020', fontSize: '13px', display: 'block' }}>🌾 Made to Order</b>
                <span style={{ fontSize: '12px', color: '#445D31' }}>Milled on order date</span>
              </div>
              <div>
                <b style={{ color: '#2E5020', fontSize: '13px', display: 'block' }}>🧪 Zero Chemicals</b>
                <span style={{ fontSize: '12px', color: '#445D31' }}>100% natural, no additives</span>
              </div>
              <div>
                <b style={{ color: '#2E5020', fontSize: '13px', display: 'block' }}>📍 Farm Traceable</b>
                <span style={{ fontSize: '12px', color: '#445D31' }}>Single origin harvest</span>
              </div>
            </div>
          </div>
        </div>

        {/* Informational Tabs Section */}
        <div style={{ marginTop: '64px' }}>
          <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #D3E0BC', overflowX: 'auto', paddingBottom: '2px' }}>
            {[
              { id: 'desc', label: 'Detailed Description' },
              { id: 'ingredients', label: 'Ingredients & Purity' },
              { id: 'origin', label: 'Farm Origin & Chakki' },
              { id: 'nutrition', label: 'Nutrition Facts' },
              { id: 'reviews', label: `Customer Reviews (${allReviews.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '12px 20px',
                  fontSize: '15px',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? '#3F6B2C' : '#5C6E52',
                  borderBottom: activeTab === tab.id ? '3px solid #3F6B2C' : '3px solid transparent',
                  background: 'none',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '28px' }}>
            {activeTab === 'desc' && (
              <div className="card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '24px', color: '#1E2B17', marginBottom: '14px' }}>The Artisanal Story</h3>
                <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#3A4B30' }}>
                  {selectedProduct.fullDesc}
                </p>
                <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  <div style={{ background: '#F2F6E6', padding: '16px', borderRadius: '14px' }}>
                    <b>Storage Tips</b>
                    <p style={{ fontSize: '14px', marginTop: '4px', color: '#5C6E52' }}>{selectedProduct.storageTips}</p>
                  </div>
                  <div style={{ background: '#F2F6E6', padding: '16px', borderRadius: '14px' }}>
                    <b>Shelf Life</b>
                    <p style={{ fontSize: '14px', marginTop: '4px', color: '#5C6E52' }}>{selectedProduct.shelfLife}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '24px', color: '#1E2B17', marginBottom: '14px' }}>100% Honest Ingredients</h3>
                <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#3A4B30' }}>
                  {selectedProduct.ingredients}
                </p>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {selectedProduct.badges.map((b, i) => (
                    <span key={i} className="badge" style={{ padding: '8px 16px', fontSize: '13px' }}>
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'origin' && (
              <div className="card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '24px', color: '#1E2B17', marginBottom: '14px' }}>Where &amp; How It Was Milled</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3F6B2C' }}>
                      <MapPin size={20} />
                      <b>Farm Origin Region</b>
                    </div>
                    <p style={{ fontSize: '15px', color: '#3A4B30', marginTop: '8px', lineHeight: 1.6 }}>
                      {selectedProduct.farmOrigin}
                    </p>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3F6B2C' }}>
                      <Sparkles size={20} />
                      <b>Milling Technique</b>
                    </div>
                    <p style={{ fontSize: '15px', color: '#3A4B30', marginTop: '8px', lineHeight: 1.6 }}>
                      {selectedProduct.millingProcess}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '24px', color: '#1E2B17', marginBottom: '14px' }}>Nutritional Facts</h3>
                <div style={{ maxWidth: '480px', border: '1px solid #D3E0BC', borderRadius: '14px', overflow: 'hidden' }}>
                  {selectedProduct.nutrition.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '12px 18px',
                        background: idx % 2 === 0 ? '#ffffff' : '#F9FBF3',
                        borderBottom: idx < selectedProduct.nutrition.length - 1 ? '1px solid #E1EBCB' : 'none',
                        fontSize: '14px'
                      }}
                    >
                      <span style={{ color: '#5C6E52' }}>{item.label}</span>
                      <b style={{ color: '#1E2B17' }}>{item.value}</b>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '24px', color: '#1E2B17' }}>Verified Patron Reviews</h3>
                    <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '4px' }}>
                      Overall rating: <b>{selectedProduct.rating} / 5.0</b> based on {allReviews.length} feedbacks.
                    </p>
                  </div>
                  <button className="btn p sm" onClick={() => setShowReviewForm(!showReviewForm)}>
                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                  </button>
                </div>

                {showReviewForm && (
                  <form onSubmit={handleAddReview} className="card" style={{ padding: '20px', background: '#F2F6E6', marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '17px', marginBottom: '12px' }}>Share your experience with this fresh harvest</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        required
                        className="input-field"
                      />
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="input-field"
                      >
                        <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                        <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                        <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                      </select>
                    </div>
                    <textarea
                      placeholder="Tell us about the aroma, texture, rotis, or pickling flavour..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      required
                      className="input-field"
                      style={{ marginTop: '12px', minHeight: '80px', fontFamily: 'inherit' }}
                    />
                    <button type="submit" className="btn p sm" style={{ marginTop: '12px' }}>
                      Submit Review
                    </button>
                  </form>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {allReviews.map((rev) => (
                    <div key={rev.id} style={{ borderBottom: '1px solid #E1EBCB', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <b style={{ fontSize: '15px', color: '#1E2B17' }}>{rev.author}</b>
                          <span style={{ fontSize: '12px', color: '#7E9171', marginLeft: '8px' }}>
                            {rev.location} · {rev.date}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '2px', color: '#D4A346' }}>
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="#D4A346" stroke="#D4A346" />
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: '14px', color: '#3A4B30', marginTop: '8px', lineHeight: 1.6 }}>
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like Section */}
        <section style={{ marginTop: '80px' }}>
          <h2 style={{ fontSize: '34px', marginBottom: '24px' }}>You May Also Like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '24px' }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};
