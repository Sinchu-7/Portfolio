import { describe, expect, it, vi } from 'vitest';
const { notFoundHandler, errorHandler } = require('../src/middleware/errorHandler');

describe('Error Handler Middleware', () => {
  it('returns 404 with standard message for unmatched routes', () => {
    const req = {};
    const res = {
      statusCode: 200,
      jsonData: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.jsonData = data;
        return this;
      },
    };

    notFoundHandler(req, res);

    expect(res.statusCode).toBe(404);
    expect(res.jsonData).toEqual({
      success: false,
      message: 'Requested resource not found.',
    });
  });

  it('delegates to next when response headers have already been sent', () => {
    const error = new Error('Late failure');
    const req = {};
    const res = { headersSent: true };
    const next = vi.fn();

    errorHandler(error, req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it('formats server errors with 500 status code', () => {
    const error = new Error('Database timeout');
    const req = {};
    const res = {
      statusCode: 200,
      jsonData: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.jsonData = data;
        return this;
      },
    };
    const next = vi.fn();

    errorHandler(error, req, res, next);

    expect(res.statusCode).toBe(500);
    expect(res.jsonData.success).toBe(false);
    expect(res.jsonData.message).toBe('Something went wrong while processing your request.');
  });
});
