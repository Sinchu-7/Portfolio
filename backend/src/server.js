const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const env = require('./config/env');
const { connectDatabase } = require('./config/db');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { requestTimer } = require('./middleware/requestTimer');
const healthRoutes = require('./routes/healthRoutes');
const contactRoutes = require('./routes/contactRoutes');

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
app.use(requestTimer);
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

app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);

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
