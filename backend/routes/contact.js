const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// ── Validation rules ──────────────────────────────────
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email required').normalizeEmail(),
  body('subject').optional().trim().isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
];

// ── POST /api/contact ─────────────────────────────────
router.post('/', contactValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    // Optional email notification (won't crash if not configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT) || 587,
          secure: false,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });

        await transporter.sendMail({
          from: `"Nexus Contact" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
          subject: `New Contact: ${subject || 'General Inquiry'}`,
          html: `
            <h2>New contact form submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <small>Submitted at ${new Date().toISOString()}</small>
          `,
        });
      } catch (mailErr) {
        console.warn('Email notification failed (non-fatal):', mailErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Your message has been received. We\'ll be in touch soon!',
      id: contact._id,
    });
  } catch (err) {
    console.error('Contact route error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ── GET /api/contact  (admin list — basic) ────────────
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = status ? { status } : {};
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Contact.countDocuments(filter);
    res.json({ success: true, contacts, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ── PATCH /api/contact/:id/status ────────────────────
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'read', 'replied', 'archived'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
