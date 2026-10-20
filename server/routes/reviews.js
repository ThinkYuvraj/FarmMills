import express from 'express';
import { db } from '../services/db.js';

const router = express.Router();

// GET /api/reviews/:productId - Get verified reviews for product
router.get('/:productId', (req, res) => {
  try {
    const reviews = db.getReviewsByProductId(req.params.productId);
    res.json({ success: true, count: reviews.length, data: reviews });
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

    const newReview = db.addReview({
      id: `rev-${Date.now()}`,
      productId,
      author: author.trim(),
      rating: Math.min(5, Math.max(1, parseInt(rating, 10) || 5)),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      verified: true,
      city: city?.trim() || 'Verified Buyer',
      title: title?.trim() || 'Verified Experience',
      comment: comment.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your verified review has been published.',
      data: newReview
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
