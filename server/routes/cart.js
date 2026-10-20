import express from 'express';
import { pricingService } from '../services/pricingService.js';

const router = express.Router();

/**
 * POST /api/cart/validate
 * Validates cart items, verifies prices & stock from database, calculates subtotal, discounts, and delivery fee
 */
router.post('/validate', (req, res) => {
  try {
    const { items, couponCode, pincode, userId } = req.body;
    const result = pricingService.calculateCart({
      items: items || [],
      couponCode: couponCode || null,
      pincode: pincode || null,
      userId: userId || null
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
