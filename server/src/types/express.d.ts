import 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      id?: string;
      user?: {
        userId: string;
        email: string;
        role: 'ADMIN' | 'INVESTOR';
        jti: string;
      };
    }
  }
}
