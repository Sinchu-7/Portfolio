const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const env = require('./config/env');
const { connectDatabase } = require('./config/db');
const ContactMessage = require('./models/ContactMessage');
const { contactValidationRules, validateContact } = require('./validators/contactValidator');
const { sanitizeInput } = require('./middleware/security');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { sendContactEmail } = require('./utils/emailService');

const app = express();
const port = env.port;
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  env.clientUrl,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS policy does not allow this origin.'));
    },
    credentials: true,
    methods: ['GET', 'POST'],
  }),
);

app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please wait a few minutes before submitting another message.',
  },
});

app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.status(200).json({
    success: true,
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    environment: env.nodeEnv,
    nodeVersion: process.version,
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
    },
    database: mongoose.connection.readyState === 1 ? 'connected' : 'not_connected',
    message: 'Portfolio API is running.',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/contact', contactValidationRules, validateContact, sanitizeInput, async (req, res, next) => {
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

app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  await connectDatabase();
  return app.listen(port, () => {
    console.log(`Portfolio backend listening on port ${port}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
