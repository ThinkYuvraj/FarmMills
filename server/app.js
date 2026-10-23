import express from 'express';
import cors from 'cors';
import compression from 'compression';

import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import couponsRouter from './routes/coupons.js';
import pincodesRouter from './routes/pincodes.js';
import ordersRouter from './routes/orders.js';
import subscriptionsRouter from './routes/subscriptions.js';
import labReportsRouter from './routes/labReports.js';
import reviewsRouter from './routes/reviews.js';
import paymentsRouter from './routes/payments.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import databaseRouter from './routes/database.js';
import locationRouter from './routes/location.js';

export const app = express();

// High-concurrency gzip compression (reduces payload by 75-80% for 10,000+ client throughput)
app.use(compression({
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// Performance and caching headers for high concurrency
app.use((req, res, next) => {
  // Add performance timing header
  const start = process.hrtime();
  res.on('finish', () => {
    const diff = process.hrtime(start);
    const timeMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    // Log slow requests (>500ms) under heavy load
    if (Number(timeMs) > 500) {
      console.warn(`[WARN] Slow endpoint: ${req.method} ${req.originalUrl} - ${timeMs}ms`);
    }
  });

  // Enable HTTP Keep-Alive
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Keep-Alive', 'timeout=65');

  // Cache static and catalog queries to reduce event-loop contention under 10k clients
  if (req.method === 'GET' && (req.path.startsWith('/api/products') || req.path.startsWith('/api/pincodes/schedule') || req.path.startsWith('/api/location'))) {
    res.setHeader('Cache-Control', 'public, max-age=15, stale-while-revalidate=30');
  }

  next();
});

// API Root & Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Farmers Mill Organic Fresh Milling Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// High-concurrency Performance & Metrics endpoint for load balancers / monitoring
app.get('/api/health/perf', (req, res) => {
  const memory = process.memoryUsage();
  res.json({
    status: 'healthy',
    concurrencyTarget: '10000+ clients',
    nodeVersion: process.version,
    pid: process.pid,
    uptimeSeconds: Math.floor(process.uptime()),
    memory: {
      rssMb: Math.round(memory.rss / 1024 / 1024),
      heapTotalMb: Math.round(memory.heapTotal / 1024 / 1024),
      heapUsedMb: Math.round(memory.heapUsed / 1024 / 1024)
    },
    activeConnectionsNotice: 'Optimized via keep-alive connection pooling, PM2 cluster scaling, and GZIP compression'
  });
});

// Mount Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/coupons', couponsRouter);
app.use('/api/pincodes', pincodesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/auth', authRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/lab-reports', labReportsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/database', databaseRouter);
app.use('/api/location', locationRouter);

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
