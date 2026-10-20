import express from 'express';
import { db } from '../services/db.js';
import { pricingService } from '../services/pricingService.js';

const router = express.Router();

// GET /api/coupons - List all active coupons for display in the promo banner / drawer
router.get('/', (req, res) => {
  try {
    const coupons = db.getCoupons().filter((c) => c.isActive);
    res.json({
      success: true,
      data: coupons.map((c) => ({
        code: c.code,
        description: c.description,
        minOrderAmount: c.minOrderAmount,
        type: c.type
      }))
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/coupons/validate - Check code eligibility with current cart
router.post('/validate', (req, res) => {
  try {
    const { code, items, subtotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Please provide a coupon code.' });
    }

    const coupon = db.getCouponByCode(code);
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: `Coupon "${code}" is invalid or expired. Try FARMERS10, WELCOME50, or FREESHIP.`
      });
    }

    // If items are provided, calculate exact discount
    if (items && Array.isArray(items)) {
      const calculation = pricingService.calculateCart({ items, couponCode: code });
      if (calculation.couponError) {
        return res.status(400).json({
          success: false,
          message: calculation.couponError
        });
      }

      return res.json({
        success: true,
        coupon: calculation.appliedCoupon,
        discount: calculation.discount,
        message: `Coupon ${coupon.code} applied successfully!`
      });
    }

    // Fallback if only subtotal is provided
    const cartAmount = parseFloat(subtotal) || 0;
    if (cartAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Add ₹${coupon.minOrderAmount - cartAmount} more to use coupon ${coupon.code}. Minimum cart value is ₹${coupon.minOrderAmount}.`
      });
    }

    let estimatedDiscount = 0;
    if (coupon.type === 'percentage') {
      const raw = Math.round((cartAmount * coupon.value) / 100);
      estimatedDiscount = coupon.maxDiscount ? Math.min(raw, coupon.maxDiscount) : raw;
    } else if (coupon.type === 'flat') {
      estimatedDiscount = Math.min(coupon.value, cartAmount);
    } else if (coupon.type === 'free_shipping') {
      estimatedDiscount = 49;
    }

    res.json({
      success: true,
      coupon: {
        code: coupon.code,
        description: coupon.description,
        discountAmount: estimatedDiscount
      },
      message: `Coupon ${coupon.code} applied successfully!`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
