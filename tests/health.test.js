const request = require('supertest');
const app = require('../index');

describe('Health endpoint', () => {
  it('returns 200 and status ok', async () => {
    const response = await request(app).get('/healthz');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body).toHaveProperty('timestamp');
  });
});
