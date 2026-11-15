import { describe, expect, it } from 'vitest';
import request from 'supertest';
const { app } = require('../src/server');

describe('404 Resource Not Found', () => {
  it('returns 404 for unknown GET endpoints', async () => {
    const response = await request(app).get('/api/does-not-exist');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'Requested resource not found.',
    });
  });

  it('returns 404 for unknown POST endpoints', async () => {
    const response = await request(app).post('/api/unknown');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });
});
