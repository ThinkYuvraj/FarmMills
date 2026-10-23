import express from 'express';
import { db } from '../services/db.js';

const router = express.Router();

// GET /api/reviews - Get all customer reviews (with optional filters)
router.get('/', (req, res) => {
  try {
    const { category, minRating, limit } = req.query;
    let reviews = db.data.reviews || [];

    // Enrich each review with product info
    const enriched = reviews.map((r) => {
      const prod = db.getProductById(r.productId);
      return {
        ...r,
        productName: prod?.name || 'Farmers Mill Harvest',
        productImage: prod?.image || '/images/c7702f34-2d4c-4994-9757-ac0571c00f78.jpeg',
        category: prod?.category || 'Chakki Milling',
        verified: true
      };
    });

    let filtered = enriched;
    if (category && category !== 'All') {
      filtered = filtered.filter(
        (r) => r.category?.toLowerCase() === category.toLowerCase() || r.productId === category
      );
    }
    if (minRating) {
      const min = Number(minRating);
      filtered = filtered.filter((r) => r.rating >= min);
    }
    if (limit) {
      filtered = filtered.slice(0, Number(limit));
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/reviews/:productId - Get verified reviews for product
router.get('/:productId', (req, res) => {
  try {
    const reviews = db.getReviewsByProductId(req.params.productId);
    const prod = db.getProductById(req.params.productId);
    const enriched = reviews.map((r) => ({
      ...r,
      productName: prod?.name || 'Farmers Mill Harvest',
      productImage: prod?.image || '/images/c7702f34-2d4c-4994-9757-ac0571c00f78.jpeg',
      category: prod?.category || 'Chakki Milling'
    }));
    res.json({ success: true, count: enriched.length, data: enriched });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/reviews - Submit a new review
router.post('/', (req, res) => {
  try {
    const { productId, author, rating, title, comment, city } = req.body;
    if (!productId || !author || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Product ID, author name, rating (1-5), and review comment are required.'
      });
    }

    const cleanRating = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));
    const newReview = db.addReview({
      id: `rev-${Date.now()}`,
      productId,
      author: author.trim(),
      rating: cleanRating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      verified: true,
      city: city?.trim() || 'Verified Buyer',
      title: title?.trim() || 'Verified Experience',
      comment: comment.trim()
    });

    const prod = db.getProductById(productId);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your verified review has been published.',
      data: {
        ...newReview,
        productName: prod?.name || 'Farmers Mill Harvest',
        productImage: prod?.image || '/images/c7702f34-2d4c-4994-9757-ac0571c00f78.jpeg',
        category: prod?.category || 'Chakki Milling'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
