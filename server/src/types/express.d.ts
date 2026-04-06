import 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      id?: string;
      user?: { id: string; email?: string };
    }
  }
}
