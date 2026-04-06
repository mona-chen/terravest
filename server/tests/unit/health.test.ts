import request from 'supertest';
import app from '../../../../server/src/server';

describe('Health check (unit)', () => {
  it('GET /api/health should return 200 with ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});
