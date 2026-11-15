function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: 'Requested resource not found.',
  });
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error.';

  console.error('Unhandled API error:', message);

  return res.status(statusCode).json({
    success: false,
    message: 'Something went wrong while processing your request.',
    details: process.env.NODE_ENV === 'development' ? message : undefined,
  });
}

module.exports = { notFoundHandler, errorHandler };
