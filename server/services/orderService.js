import { db } from './db.js';
import { pricingService } from './pricingService.js';
import { logisticsService } from './logisticsService.js';

export const orderService = {
  createOrder({ items, shippingAddress, paymentMethod, deliverySlot, couponCode }) {
    // 1. Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.address || !shippingAddress.pincode) {
      throw new Error('Please provide complete shipping details (Full Name, Address, and 6-digit Pincode).');
    }

    if (!shippingAddress.phone || shippingAddress.phone.replace(/\D/g, '').length < 10) {
      throw new Error('Please provide a valid 10-digit Indian mobile contact number.');
    }

    // 2. Validate pincode
    const pincodeCheck = logisticsService.checkPincode(shippingAddress.pincode);
    if (!pincodeCheck.serviceable) {
      throw new Error(`Pincode ${shippingAddress.pincode} is not serviceable: ${pincodeCheck.message}`);
    }

    // 3. Re-calculate authoritative pricing from scratch
    const pricing = pricingService.calculateCart({
      items,
      couponCode,
      pincode: shippingAddress.pincode
    });

    if (!pricing.success || pricing.items.length === 0) {
      throw new Error(pricing.errors.join(', ') || 'Your cart is empty or contains invalid items.');
    }

    // 4. Atomically deduct inventory
    for (const item of pricing.items) {
      db.updateProductStock(item.productId, item.packSize, item.quantity);
    }

    // 5. Generate unique Order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `FM-${randomNum}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const millingSchedule = logisticsService.calculateMillingCutoff();

    // 6. Build tracking timeline
    const trackingEvents = [
      {
        status: 'Order Placed & Payment Confirmed',
        time: `${formattedDate} ${formattedTime}`,
        note: `Order received via ${paymentMethod || 'Online'}. Grains queued in grain hopper.`
      },
      {
        status: 'Chakki Milling Scheduled',
        time: `${millingSchedule.nextMilledDate} 05:00 AM`,
        note: `Assigned to Stone Chakki Mill #3 (Master Miller Ram Singh). Cold-milling speed set to 280 RPM (< 40°C).`
      }
    ];

    const orderRecord = {
      id: orderId,
      date: formattedDate,
      createdAt: now.toISOString(),
      items: pricing.items.map((it) => ({
        id: it.productId,
        name: it.name,
        packSize: it.packSize,
        price: it.unitPrice,
        quantity: it.quantity,
        image: it.image
      })),
      subtotal: pricing.subtotal,
      deliveryFee: pricing.deliveryFee,
      discount: pricing.discount,
      appliedCoupon: pricing.appliedCoupon?.code || null,
      total: pricing.total,
      status: 'Milled on Chakki',
      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        phone: shippingAddress.phone.trim(),
        address: shippingAddress.address.trim(),
        city: shippingAddress.city?.trim() || pincodeCheck.city,
        state: shippingAddress.state?.trim() || pincodeCheck.state,
        pincode: shippingAddress.pincode.toString().trim()
      },
      paymentMethod: paymentMethod || 'UPI (Online)',
      deliverySlot: deliverySlot || 'Morning (7:00 AM - 11:00 AM)',
      estimatedDelivery: millingSchedule.estimatedDelivery,
      trackingEvents
    };

    return db.createOrder(orderRecord);
  },

  getAllOrders() {
    return db.getOrders();
  },

  getOrderById(id) {
    return db.getOrderById(id);
  },

  updateStatus(id, status, note) {
    return db.updateOrderStatus(id, status, note);
  }
};
