import { Request, Response, NextFunction } from 'express';
import { requireAuth, requireRole, requireAdmin, requireInvestor } from '../../../src/middleware/auth';
import { verifyAccessToken } from '../../../src/utils/jwt';

jest.mock('../../../src/utils/jwt');

describe('Auth Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
    jest.clearAllMocks();
  });

  describe('requireAuth', () => {
    it('should call next with valid token', () => {
      const mockPayload = {
        userId: 'user-123',
        email: 'test@test.com',
        role: 'INVESTOR' as const,
        jti: 'jti-123',
      };
      (verifyAccessToken as jest.Mock).mockReturnValue(mockPayload);

      mockReq.headers = {
        authorization: 'Bearer valid-token',
      };

      requireAuth(mockReq as Request, mockRes as Response, nextFunction);

      expect(verifyAccessToken).toHaveBeenCalledWith('valid-token');
      expect(mockReq.user).toEqual(mockPayload);
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should return 401 without token', () => {
      requireAuth(mockReq as Request, mockRes as Response, nextFunction);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Access token required',
        },
      });
    });

    it('should return 401 with invalid token', () => {
      (verifyAccessToken as jest.Mock).mockReturnValue(null);

      mockReq.headers = {
        authorization: 'Bearer invalid-token',
      };

      requireAuth(mockReq as Request, mockRes as Response, nextFunction);

      expect(verifyAccessToken).toHaveBeenCalledWith('invalid-token');
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });
  });

  describe('requireRole', () => {
    it('should call next for allowed role', () => {
      mockReq.user = {
        userId: 'user-123',
        email: 'test@test.com',
        role: 'ADMIN',
        jti: 'jti-123',
      };

      const middleware = requireRole('ADMIN');
      middleware(mockReq as Request, mockRes as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
    });

    it('should return 403 for disallowed role', () => {
      mockReq.user = {
        userId: 'user-123',
        email: 'test@test.com',
        role: 'INVESTOR',
        jti: 'jti-123',
      };

      const middleware = requireRole('ADMIN');
      middleware(mockReq as Request, mockRes as Response, nextFunction);

      expect(mockRes.status).toHaveBeenCalledWith(403);
    });
  });
});
