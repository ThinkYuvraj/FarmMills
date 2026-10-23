export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 8000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'farmers_mill_jwt_secure_key_2026_chakki_fresh_918237',
  database: {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || '',
    port: Number(process.env.DB_PORT) || 3306,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 50,
    queueLimit: Number(process.env.DB_QUEUE_LIMIT) || 1000,
    connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT) || 15000,
    idleTimeout: Number(process.env.DB_IDLE_TIMEOUT) || 60000
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
    currency: 'INR'
  }
};

export default config;
