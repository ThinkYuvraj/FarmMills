import express from 'express';
import { db } from '../services/db.js';

const router = express.Router();

// GET /api/lab-reports/:productId - Get NABL report by product ID
router.get('/:productId', (req, res) => {
  try {
    const report = db.getLabReport(req.params.productId);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'No lab report on file for this product batch yet.'
      });
    }
    res.json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/lab-reports/batch/:batchNumber - Scan/search by batch QR code
router.get('/batch/:batchNumber', (req, res) => {
  try {
    const report = db.getLabReportByBatch(req.params.batchNumber);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: `Batch "${req.params.batchNumber}" not found in NABL database.`
      });
    }
    res.json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
