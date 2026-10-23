import express from 'express';
import { db } from '../services/db.js';
import { sqlDb } from '../services/sqlDb.js';
import { INITIAL_DATA } from '../data/initialData.js';

export const databaseRouter = express.Router();

/**
 * GET /api/database/status
 * Returns live status of Hostinger SQL connection and data counts
 */
databaseRouter.get('/status', async (req, res) => {
  try {
    const status = db.getStatus();
    
    // If pool exists, test live connection status
    let livePing = false;
    let pingLatencyMs = null;
    if (sqlDb.pool) {
      const start = Date.now();
      livePing = await sqlDb.testConnection();
      pingLatencyMs = Date.now() - start;
    }

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      database: {
        ...status.sql,
        livePing,
        pingLatencyMs: livePing ? `${pingLatencyMs}ms` : null
      },
      localStorage: status.localStorage,
      guidance: status.sql.connected
        ? 'Connected to Hostinger SQL database. All orders, patrons, and reviews are synced to your remote SQL database.'
        : 'Running in safe local fallback. Configure DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME in .env to connect to your Hostinger MySQL database.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/database/test
 * Re-tests the connection to Hostinger MySQL
 */
databaseRouter.post('/test', async (req, res) => {
  try {
    sqlDb.initPool();
    const isConnected = await sqlDb.testConnection();
    res.json({
      success: isConnected,
      message: isConnected
        ? 'Hostinger MySQL database connection successful!'
        : `Connection failed: ${sqlDb.connectionError || 'Could not reach Hostinger SQL server.'}`,
      status: sqlDb.getStatus()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/database/seed
 * Seeds initial store data (products, patrons, coupons, reviews) into Hostinger MySQL
 */
databaseRouter.post('/seed', async (req, res) => {
  try {
    if (!sqlDb.isConnected) {
      const canConnect = await sqlDb.testConnection();
      if (!canConnect) {
        return res.status(400).json({
          success: false,
          error: 'Cannot seed: Hostinger SQL database is not connected. Please verify your DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME in .env'
        });
      }
    }

    const stats = await sqlDb.seedInitialData(INITIAL_DATA);
    res.json({
      success: true,
      message: 'Successfully seeded initial data into Hostinger MySQL database!',
      stats
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default databaseRouter;
