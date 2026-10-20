import express from 'express';
import cors from 'cors';

import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import couponsRouter from './routes/coupons.js';
import pincodesRouter from './routes/pincodes.js';
import ordersRouter from './routes/orders.js';
import subscriptionsRouter from './routes/subscriptions.js';
import labReportsRouter from './routes/labReports.js';
import reviewsRouter from './routes/reviews.js';

export const app = express();

app.use(cors());
app.use(express.json());

// API Root & Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Farmers Mill Organic Fresh Milling Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/coupons', couponsRouter);
app.use('/api/pincodes', pincodesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/lab-reports', labReportsRouter);
app.use('/api/reviews', reviewsRouter);

// 404 handler for unmatched API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint "${req.originalUrl}" not found.`
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Server Unhandled Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

export default app;
