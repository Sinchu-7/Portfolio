const express = require('express');
const mongoose = require('mongoose');
const env = require('../config/env');

const router = express.Router();

router.get('/', (req, res) => {
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

module.exports = router;
