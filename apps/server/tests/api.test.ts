import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';

describe('Backend API Endpoints', () => {
  it('GET /api/health should return status ok', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.message).toContain('Bouldering API');
  });

  it('POST /api/users should fail if email or name is missing', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Incomplete User' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email and name are required');
  });
});