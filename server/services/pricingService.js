import { db } from './db.js';

export const pricingService = {
  /**
   * Authoritative cart calculation.
   * Client sends: items [{ productId, packSize, quantity }], couponCode?, pincode?
   * Server validates against DB and computes exact subtotal, discount, delivery fee, and grand total.
   */
  calculateCart({ items = [], couponCode = null, pincode = null, userId = null }) {
    const verifiedItems = [];
    let subtotal = 0;
    const errors = [];
    const warnings = [];

    // 1. Validate each line item against DB
    for (const item of items) {
      const product = db.getProductById(item.productId);
      if (!product) {
        errors.push(`Product with ID "${item.productId}" not found in catalog.`);
        continue;
      }

      const pack = product.packOptions.find((p) => p.size === item.packSize);
      if (!pack) {
        errors.push(`Pack size "${item.packSize}" does not exist for product "${product.name}".`);
        continue;
      }

      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);

      // Inventory check
      if (pack.stock !== undefined && pack.stock < qty) {
        warnings.push(`Only ${pack.stock} units of ${product.name} (${pack.size}) are remaining.`);
      }

      const lineTotal = pack.price * qty;
      subtotal += lineTotal;

      verifiedItems.push({
        productId: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        packSize: pack.size,
        unitPrice: pack.price,
        originalPrice: pack.originalPrice,
        quantity: qty,
        lineTotal
      });
    }

    // 2. Logistics & Delivery fee calculation
    const pincodeInfo = db.getPincodeInfo(pincode);
    const freeDeliveryThreshold = pincodeInfo?.minFree || 499;
    let baseDeliveryFee = pincodeInfo?.fee !== undefined ? pincodeInfo.fee : 49;
    
    // Check free delivery threshold
    let deliveryFee = subtotal === 0 ? 0 : subtotal >= freeDeliveryThreshold ? 0 : baseDeliveryFee;
    let freeDeliveryRemaining = Math.max(0, freeDeliveryThreshold - subtotal);

    // 3. Coupon validation & calculation
    let discount = 0;
    let appliedCoupon = null;
    let couponError = null;

    if (couponCode) {
      const coupon = db.getCouponByCode(couponCode);
      if (!coupon) {
        couponError = `Invalid or expired coupon code "${couponCode}".`;
      } else if (subtotal < coupon.minOrderAmount) {
        couponError = `Add ₹${coupon.minOrderAmount - subtotal} more to apply coupon "${coupon.code}". (Min. cart: ₹${coupon.minOrderAmount})`;
      } else {
        // Calculate discount based on coupon type
        if (coupon.type === 'percentage') {
          const rawDiscount = Math.round((subtotal * coupon.value) / 100);
          discount = coupon.maxDiscount ? Math.min(rawDiscount, coupon.maxDiscount) : rawDiscount;
        } else if (coupon.type === 'flat') {
          discount = Math.min(coupon.value, subtotal);
        } else if (coupon.type === 'free_shipping') {
          discount = deliveryFee;
          deliveryFee = 0;
        } else if (coupon.type === 'category_percentage') {
          // Calculate only on matching category items
          const categorySubtotal = verifiedItems
            .filter((item) => item.category === coupon.category)
            .reduce((sum, item) => sum + item.lineTotal, 0);

          if (categorySubtotal === 0) {
            couponError = `Coupon "${coupon.code}" only applies to items in the "${coupon.category}" category.`;
          } else {
            const rawDiscount = Math.round((categorySubtotal * coupon.value) / 100);
            discount = coupon.maxDiscount ? Math.min(rawDiscount, coupon.maxDiscount) : rawDiscount;
          }
        }

        if (!couponError) {
          appliedCoupon = {
            code: coupon.code,
            description: coupon.description,
            type: coupon.type,
            discountAmount: discount
          };
        }
      }
    }

    const total = Math.max(0, subtotal + deliveryFee - discount);

    return {
      success: errors.length === 0,
      errors,
      warnings,
      items: verifiedItems,
      itemCount: verifiedItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      deliveryFee,
      freeDeliveryThreshold,
      freeDeliveryRemaining,
      discount,
      appliedCoupon,
      couponError,
      total,
      currency: 'INR',
      pincodeService: pincodeInfo
    };
  }
};
