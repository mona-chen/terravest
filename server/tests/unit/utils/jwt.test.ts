import jwt from 'jsonwebtoken';
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken, decodeToken } from '../../src/utils/jwt';

describe('JWT Utils', () => {
  const mockPayload = {
    userId: 'user-123',
    email: 'test@test.com',
    role: 'INVESTOR' as const,
    jti: 'jti-123',
  };

  describe('signAccessToken', () => {
    it('should create a valid access token', () => {
      const token = signAccessToken(mockPayload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      
      const decoded = jwt.decode(token) as any;
      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.role).toBe(mockPayload.role);
    });
  });

  describe('signRefreshToken', () => {
    it('should create a valid refresh token', () => {
      const token = signRefreshToken(mockPayload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  });

  describe('verifyAccessToken', () => {
    it('should return payload for valid token', () => {
      const token = signAccessToken(mockPayload);
      const payload = verifyAccessToken(token);
      
      expect(payload).toBeDefined();
      expect(payload?.userId).toBe(mockPayload.userId);
    });

    it('should return null for invalid token', () => {
      const payload = verifyAccessToken('invalid-token');
      expect(payload).toBeNull();
    });
  });

  describe('verifyRefreshToken', () => {
    it('should return payload for valid token', () => {
      const token = signRefreshToken(mockPayload);
      const payload = verifyRefreshToken(token);
      
      expect(payload).toBeDefined();
      expect(payload?.userId).toBe(mockPayload.userId);
    });

    it('should return null for invalid token', () => {
      const payload = verifyRefreshToken('invalid-token');
      expect(payload).toBeNull();
    });
  });
});
