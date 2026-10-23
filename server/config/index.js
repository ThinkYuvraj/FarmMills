export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 8000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'farmers_mill_jwt_secure_key_2026_chakki_fresh_918237',
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
    currency: 'INR'
  }
};

export default config;
