import request from 'supertest';
import app from '../../src/app';

describe('Health routes integration', () => {
  it('GET /api/health should return 200 and health payload', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('timestamp');
  });
});
