function sanitizeInput(req, res, next) {
  const fields = ['name', 'email', 'subject', 'message'];

  for (const field of fields) {
    if (typeof req.body?.[field] === 'string') {
      req.body[field] = req.body[field].trim();
    }
  }

  if (typeof req.body?.message === 'string') {
    req.body.message = req.body.message.replace(/[<>]/g, '');
  }

  next();
}

module.exports = { sanitizeInput };
