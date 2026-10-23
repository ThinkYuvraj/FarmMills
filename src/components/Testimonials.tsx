import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Review, Product } from '../types';
import { useShop } from '../context/ShopContext';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageSquarePlus,
  X,
  Filter,
  ThumbsUp,
  Award,
  Loader2
} from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { products, openProductDetail, addToast } = useShop();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);

  // Form state for new review
  const [author, setAuthor] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || 'fm-atta-chakki');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const data = await api.getAllReviews();
      if (data && data.length > 0) {
        setReviews(data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      addToast('Please enter your name and review details.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const newReview = await api.submitReview({
        productId: selectedProductId,
        author: author.trim(),
        city: city.trim() || 'Verified Patron',
        rating,
        title: title.trim() || 'Stoneground Purity',
        comment: comment.trim()
      });

      setReviews((prev) => [newReview, ...prev]);
      addToast('Thank you! Your verified review has been published.', 'success');
      setIsWriteModalOpen(false);
      setAuthor('');
      setCity('');
      setTitle('');
      setComment('');
      setRating(5);
    } catch (err: any) {
      addToast(err.message || 'Failed to submit review.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === '5 Stars') return r.rating === 5;
    if (selectedFilter === 'Atta') return r.category?.includes('Atta') || r.productName?.includes('Atta');
    if (selectedFilter === 'Oils') return r.category?.includes('Oil') || r.productName?.includes('Oil');
    if (selectedFilter === 'Spices') return r.category?.includes('Spice') || r.productName?.includes('Turmeric') || r.productName?.includes('Chilli');
    if (selectedFilter === 'Honey & Pickles') return r.category?.includes('Honey') || r.productName?.includes('Pickle') || r.productName?.includes('Honey');
    return true;
  });

  return (
    <section className="w" style={{ marginTop: '90px' }}>
      {/* Header & Stats Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <span className="clay-badge" style={{ marginBottom: '10px' }}>
            <Sparkles size={13} /> VERIFIED MILL REVIEWS &amp; PATRON VOICES
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4.2vw, 42px)', color: '#1E2B17', marginTop: '6px' }}>
            Loved by families who care about pure food.
          </h2>
          <p className="subheading" style={{ marginTop: '8px', maxWidth: '680px' }}>
            Over 12,000 kitchens across India trust Farmers Mill for unheated stone-ground chakki attas, pure spices, and wood-pressed oils.
          </p>
        </div>

        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="clay-btn-primary"
          style={{ padding: '12px 22px', fontSize: '14px' }}
        >
          <MessageSquarePlus size={16} />
          <span>Share Your Experience</span>
        </button>
      </div>

      {/* Trust Metrics Pill Strip */}
      <div
        className="clay-card-static"
        style={{
          marginTop: '28px',
          padding: '18px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#E1EBCB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3F6B2C'
            }}
          >
            <Star size={22} fill="#3F6B2C" />
          </div>
          <div>
            <b style={{ fontSize: '20px', color: '#1E2B17', display: 'block' }}>4.94 / 5.0</b>
            <span style={{ fontSize: '13px', color: '#5C6E52' }}>Overall Customer Rating</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#E1EBCB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3F6B2C'
            }}
          >
            <CheckCircle2 size={22} />
          </div>
          <div>
            <b style={{ fontSize: '20px', color: '#1E2B17', display: 'block' }}>100% Verified</b>
            <span style={{ fontSize: '13px', color: '#5C6E52' }}>Real Indian Kitchens</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#E1EBCB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3F6B2C'
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <b style={{ fontSize: '20px', color: '#1E2B17', display: 'block' }}>NABL Certified</b>
            <span style={{ fontSize: '13px', color: '#5C6E52' }}>0 Chemical Pesticides</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginTop: '28px'
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#5C6E52', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '6px' }}>
          <Filter size={14} /> Filter:
        </span>
        {['All', '5 Stars', 'Atta', 'Oils', 'Spices', 'Honey & Pickles'].map((filter) => {
          const isActive = selectedFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={isActive ? 'clay-btn-primary' : 'clay-btn-secondary'}
              style={{
                padding: '6px 16px',
                fontSize: '13px',
                borderRadius: '999px',
                fontWeight: isActive ? 700 : 500
              }}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Reviews Grid */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#3F6B2C', margin: '0 auto' }} />
          <p style={{ marginTop: '12px', color: '#5C6E52', fontSize: '14px' }}>Loading verified customer reviews...</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '24px',
            marginTop: '28px'
          }}
        >
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="clay-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                borderRadius: '24px'
              }}
            >
              {/* Rating and Verified Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#D4A346" stroke="#D4A346" />
                  ))}
                </div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#E1EBCB',
                    color: '#2E5220',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '999px'
                  }}
                >
                  <CheckCircle2 size={12} /> Verified Purchase
                </span>
              </div>

              {/* Review Title & Content */}
              <div>
                {rev.title && (
                  <b style={{ fontSize: '15.5px', color: '#1E2B17', display: 'block', lineHeight: 1.35, marginBottom: '6px' }}>
                    "{rev.title}"
                  </b>
                )}
                <p className="body-text" style={{ fontSize: '14px', color: '#3E5033', fontStyle: 'italic', lineHeight: 1.6 }}>
                  "{rev.comment}"
                </p>
              </div>

              {/* Product Attribution Pill (which product this review is for) */}
              {rev.productName && (
                <div
                  className="clay-inset"
                  onClick={() => {
                    const found = products.find((p) => p.id === rev.productId || p.name === rev.productName);
                    if (found) openProductDetail(found);
                  }}
                  style={{
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    marginTop: 'auto'
                  }}
                  title="View this product"
                >
                  {rev.productImage && (
                    <img
                      src={rev.productImage}
                      alt={rev.productName}
                      style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: '11px', color: '#5C6E52', display: 'block' }}>Verified order for:</span>
                    <b style={{ fontSize: '12.5px', color: '#1E2B17' }}>{rev.productName}</b>
                  </div>
                </div>
              )}

              {/* Author & City footer */}
              <div
                style={{
                  borderTop: '1px solid rgba(211, 224, 188, 0.6)',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '13px'
                }}
              >
                <div>
                  <b style={{ color: '#1E2B17', display: 'block' }}>{rev.author}</b>
                  <span style={{ fontSize: '12px', color: '#7E9171' }}>
                    {rev.city || rev.location || 'Verified Buyer'} · {rev.date}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#5C6E52', fontSize: '12px' }}>
                  <ThumbsUp size={13} color="#3F6B2C" />
                  <span>Helpful</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="modal-overlay" onClick={() => setIsWriteModalOpen(false)}>
          <div
            className="modal-content clay-card-static"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '520px',
              padding: '32px',
              borderRadius: '28px',
              background: '#ffffff',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '22px', color: '#1E2B17' }}>Share Your Experience</h3>
                <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '2px' }}>
                  Help Indian families discover stone-ground purity &amp; real food.
                </p>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#EDF3DF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1E2B17'
                }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                  Select Harvested Product *
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="input-field"
                  style={{ background: '#ffffff' }}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                  Your Rating *
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      style={{ cursor: 'pointer', padding: '4px' }}
                    >
                      <Star
                        size={24}
                        fill={star <= rating ? '#D4A346' : 'none'}
                        stroke="#D4A346"
                      />
                    </button>
                  ))}
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1E2B17', marginLeft: '6px' }}>
                    {rating} out of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shalini Roy"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bengaluru / Ghaziabad / Delhi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                  Review Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Incredibly soft rotis and nutty aroma!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                  Your Honest Review *
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell others how Farmers Mill stoneground atta or woodpressed oil changed your daily meals..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  className="input-field"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="clay-btn-primary"
                style={{ width: '100%', padding: '14px', marginTop: '6px' }}
              >
                {isSubmitting ? 'Publishing Review...' : 'Submit Verified Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
