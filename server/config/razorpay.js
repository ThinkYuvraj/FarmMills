import Razorpay from 'razorpay';
import { config } from './index.js';

let razorpayInstance = null;
const isConfigured = Boolean(config.razorpay.keyId && config.razorpay.keySecret);

if (isConfigured) {
  try {
    razorpayInstance = new Razorpay({
      key_id: config.razorpay.keyId,
      key_secret: config.razorpay.keySecret
    });
    console.log('✅ Razorpay client initialized in ' + (config.razorpay.keyId.startsWith('rzp_test_') ? 'TEST' : 'LIVE') + ' mode.');
  } catch (err) {
    console.warn('⚠️ Razorpay initialization warning:', err.message);
  }
} else {
  console.log('ℹ️ Razorpay keys not detected in environment. Running in Test/Sandbox Simulator mode.');
}

export { razorpayInstance, isConfigured };
export default razorpayInstance;
