import app from './app.js';

const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌾 Farmers Mill Backend API Server running on http://0.0.0.0:${PORT}`);
  console.log(`📡 Health Check: http://0.0.0.0:${PORT}/api/health`);
  console.log(`📦 Products API: http://0.0.0.0:${PORT}/api/products`);
  console.log(`💳 Razorpay API: http://0.0.0.0:${PORT}/api/payments/razorpay/config`);
});
