const request = require('supertest');
const { app } = require('../src/server');

describe('Portfolio API', () => {
  it('responds to the health endpoint', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.status).toBe('ok');
  });

  it('accepts a valid contact submission', async () => {
    const response = await request(app).post('/api/contact').send({
      name: 'Sinchana',
      email: 'sinchhh09@gmail.com',
      subject: 'Project Collaboration',
      message: 'I would love to discuss a future engineering opportunity.',
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('rejects invalid email input', async () => {
    const response = await request(app).post('/api/contact').send({
      name: 'Test User',
      email: 'invalid-email',
      subject: 'Hello',
      message: 'This should fail validation.',
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
