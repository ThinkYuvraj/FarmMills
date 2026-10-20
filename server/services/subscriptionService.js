import { db } from './db.js';

export const subscriptionService = {
  createSubscription({ productId, packSize, frequency, deliverySlot, address }) {
    const product = db.getProductById(productId);
    if (!product) {
      throw new Error(`Product "${productId}" not found.`);
    }

    const pack = product.packOptions.find((p) => p.size === packSize);
    if (!pack) {
      throw new Error(`Pack size "${packSize}" does not exist for this product.`);
    }

    // Flat 15% subscriber-only loyalty discount
    const discountPercent = 15;
    const discountedPrice = Math.round(pack.price * (1 - discountPercent / 100));

    // Calculate next delivery date based on frequency
    const nextDate = this.calculateNextDate(frequency);

    const newSub = {
      id: `sub-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      packSize: pack.size,
      originalPrice: pack.price,
      discountedPrice,
      discountPercent,
      frequency: frequency || 'Every 2 Weeks',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      nextDeliveryDate: nextDate,
      deliverySlot: deliverySlot || 'Morning (7:00 AM - 11:00 AM)',
      deliveryAddress: address || 'Default Home Address'
    };

    return db.createSubscription(newSub);
  },

  calculateNextDate(frequency) {
    const now = new Date();
    let daysToAdd = 14;
    if (frequency === 'Weekly') daysToAdd = 7;
    if (frequency === 'Monthly') daysToAdd = 30;

    now.setDate(now.getDate() + daysToAdd);
    return now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  },

  getAllSubscriptions() {
    return db.getSubscriptions();
  },

  cancelSubscription(id) {
    return db.deleteSubscription(id);
  },

  updateSubscription(id, updates) {
    return db.updateSubscription(id, updates);
  }
};
