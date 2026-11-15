import { describe, expect, it } from 'vitest';
import request from 'supertest';
const { app } = require('../src/server');

describe('Health Check Endpoint', () => {
  it('returns system health status and uptime metrics', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.status).toBe('ok');
    expect(typeof response.body.uptime).toBe('number');
    expect(response.body.environment).toBeDefined();
    expect(response.body.nodeVersion).toBeDefined();
    expect(response.body.memory).toHaveProperty('rss');
    expect(response.body.memory).toHaveProperty('heapUsed');
  });

  it('includes the X-Response-Time performance header', async () => {
    const response = await request(app).get('/api/health');

    expect(response.headers['x-response-time']).toBeDefined();
    expect(response.headers['x-response-time']).toMatch(/ms$/);
  });
});
