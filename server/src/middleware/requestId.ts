import { Request, Response, NextFunction } from 'express';

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const headerId = req.headers['x-request-id'] as string | undefined;
  const id = headerId && headerId.length > 0
    ? headerId
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
  (req as any).id = id;
  res.setHeader('X-Request-Id', id);
  next();
};
