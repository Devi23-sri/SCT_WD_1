const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Subscriber = require('../models/Subscriber');

// POST /api/subscribe
router.post('/', [
  body('email').trim().isEmail().withMessage('Valid email required').normalizeEmail(),
  body('source').optional().isIn(['hero', 'footer', 'popup', 'other']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const { email, source = 'other' } = req.body;

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (!existing.active) {
        existing.active = true;
        await existing.save();
        return res.json({ success: true, message: 'Welcome back! You\'re resubscribed.' });
      }
      return res.status(409).json({ success: false, message: 'You\'re already subscribed!' });
    }

    await Subscriber.create({ email, source, ipAddress: req.ip });
    res.status(201).json({ success: true, message: 'You\'re subscribed! Welcome aboard.' });
  } catch (err) {
    console.error('Subscribe error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/subscribe (admin)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const subscribers = await Subscriber.find({ active: true })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Subscriber.countDocuments({ active: true });
    res.json({ success: true, subscribers, total });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
