const express = require('express');
const mongoose = require('mongoose');
const ContactMessage = require('../models/ContactMessage');
const { contactValidationRules, validateContact } = require('../validators/contactValidator');
const { sanitizeInput } = require('../middleware/security');
const { sendContactEmail } = require('../utils/emailService');

const router = express.Router();

router.post('/', contactValidationRules, validateContact, sanitizeInput, async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (mongoose.connection.readyState === 1) {
      await ContactMessage.create({ name, email, subject, message });
    }

    try {
      await sendContactEmail({ name, email, subject, message });
    } catch (emailError) {
      console.warn('Optional email notification is unavailable:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully.',
      database: mongoose.connection.readyState === 1 ? 'stored' : 'skipped',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
