import Razorpay from 'razorpay';
import { config } from './index.js';

let razorpayClient = null;
let configured = Boolean(config.razorpay.keyId && config.razorpay.keySecret);

export function initRazorpay(keyId, keySecret) {
  if (keyId && keySecret) {
    try {
      razorpayClient = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
      });
      configured = true;
      config.razorpay.keyId = keyId;
      config.razorpay.keySecret = keySecret;
      console.log('✅ Razorpay client initialized in ' + (keyId.startsWith('rzp_test_') ? 'TEST' : 'LIVE') + ' mode.');
      return { success: true, mode: keyId.startsWith('rzp_test_') ? 'test' : 'live' };
    } catch (err) {
      console.warn('⚠️ Razorpay initialization warning:', err.message);
      configured = false;
      return { success: false, error: err.message };
    }
  } else {
    razorpayClient = null;
    configured = false;
    return { success: true, mode: 'simulated' };
  }
}

if (config.razorpay.keyId && config.razorpay.keySecret) {
  initRazorpay(config.razorpay.keyId, config.razorpay.keySecret);
} else {
  console.log('ℹ️ Razorpay keys not detected in environment. Running in Test/Sandbox Simulator mode.');
}

export function getRazorpayInstance() {
  return razorpayClient;
}

export function isRazorpayConfigured() {
  return configured && razorpayClient !== null;
}

export { razorpayClient as razorpayInstance, configured as isConfigured };
export default razorpayClient;
