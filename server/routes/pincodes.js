import express from 'express';
import { logisticsService } from '../services/logisticsService.js';

const router = express.Router();

// POST /api/pincodes/check - Lookup pincode serviceability & delivery schedule
router.post('/check', (req, res) => {
  try {
    const { pincode } = req.body;
    if (!pincode) {
      return res.status(400).json({ success: false, message: 'Please provide a 6-digit postal code.' });
    }

    const result = logisticsService.checkPincode(pincode);
    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/pincodes/schedule - Current milling batch & cutoff time
router.get('/schedule', (req, res) => {
  try {
    const schedule = logisticsService.calculateMillingCutoff();
    res.json({ success: true, data: schedule });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
