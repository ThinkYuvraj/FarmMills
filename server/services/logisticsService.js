import { db } from './db.js';

export const logisticsService = {
  /**
   * Check serviceable delivery address by pincode
   */
  checkPincode(pincode) {
    const info = db.getPincodeInfo(pincode);

    if (!info.isServiceable) {
      return {
        serviceable: false,
        pincode,
        message: info.error || 'Sorry, this pincode is currently outside our direct delivery zone.'
      };
    }

    const millingCutoff = this.calculateMillingCutoff();

    return {
      serviceable: true,
      pincode: info.pincode,
      city: info.city,
      state: info.state,
      zone: info.zone,
      expressAvailable: info.express,
      morningSlotAvailable: info.morningSlot,
      baseDeliveryFee: info.fee,
      freeShippingThreshold: info.minFree,
      millingSchedule: millingCutoff,
      deliverySlots: [
        { id: 'morning', label: 'Morning Fresh (7:00 AM - 11:00 AM)', available: info.morningSlot, recommended: true },
        { id: 'evening', label: 'Evening Slot (4:00 PM - 8:00 PM)', available: true, recommended: false }
      ]
    };
  },

  /**
   * Calculates the exact milling schedule and next delivery date based on 8:00 PM cutoff
   */
  calculateMillingCutoff() {
    const now = new Date();
    const currentHour = now.getHours();
    const cutoffHour = 20; // 8:00 PM

    const isBeforeCutoff = currentHour < cutoffHour;
    
    // Target date for next milling batch
    const targetMillingDate = new Date(now);
    if (!isBeforeCutoff) {
      targetMillingDate.setDate(targetMillingDate.getDate() + 2);
    } else {
      targetMillingDate.setDate(targetMillingDate.getDate() + 1);
    }

    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = targetMillingDate.toLocaleDateString('en-US', options);

    return {
      isBeforeCutoff,
      cutoffTime: '8:00 PM',
      millingBatchTime: '5:00 AM - 7:00 AM',
      nextMilledDate: formattedDate,
      estimatedDelivery: formattedDate + ' (7:00 AM - 11:00 AM)',
      bannerText: isBeforeCutoff
        ? `Order before 8:00 PM to get stone-milled tomorrow morning (${formattedDate})!`
        : `Orders placed now will be freshly stone-milled on ${formattedDate}.`
    };
  }
};
