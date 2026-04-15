import 'express-serve-static-core';

declare module 'express-serve-static-core' {
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
