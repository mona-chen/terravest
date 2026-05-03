import request from 'supertest';
import app from '../../src/app';
import { mockFindUnique, mockCreate } from '../../__mocks__/@prisma/client';

jest.mock('@prisma/client');

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn().mockResolvedValue('$2a$10$hashedpassword'),
}));

jest.mock('../../src/services/token.service', () => ({
  generateTokens: jest.fn().mockResolvedValue({
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  }),
  revokeRefreshToken: jest.fn().mockResolvedValue(undefined),
  verifyRefreshToken: jest.fn().mockResolvedValue(null),
}));

import bcrypt from 'bcryptjs';

describe('Auth Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      mockFindUnique.mockResolvedValue(null);
      mockCreate.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'INVESTOR',
        status: 'ACTIVE',
        investors: [{ id: 'inv-1' }],
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.refreshToken).toBeDefined();
    });

    it('should reject duplicate email', async () => {
      mockFindUnique.mockResolvedValue({
        id: 'user-2',
        email: 'duplicate@example.com',
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'password123',
          name: 'Test User',
        });

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      mockFindUnique.mockResolvedValue({
        id: 'user-3',
        email: 'login@example.com',
        password: '$2a$10$hashedpassword',
        role: 'INVESTOR',
        status: 'ACTIVE',
        investors: [{ id: 'inv-3' }],
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.accessToken).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      mockFindUnique.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
