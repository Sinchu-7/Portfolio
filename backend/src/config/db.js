const mongoose = require('mongoose');

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn('MongoDB URI not configured. Database persistence is disabled in this environment.');
    return { connected: false };
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('MongoDB connected successfully.');
    return { connected: true };
  } catch (error) {
    console.warn('MongoDB connection failed. Continuing without a live database connection:', error.message);
    return { connected: false };
  }
}

module.exports = { connectDatabase };
