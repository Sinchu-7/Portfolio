function requestTimer(req, res, next) {
  const start = Date.now();
  const originalSend = res.send;

  res.send = function (...args) {
    if (!res.headersSent) {
      const durationMs = Date.now() - start;
      res.setHeader('X-Response-Time', `${durationMs}ms`);
    }
    return originalSend.apply(this, args);
  };

  next();
}

module.exports = { requestTimer };
