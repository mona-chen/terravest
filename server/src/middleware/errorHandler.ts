import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err?.status ?? 500;
  const message = err?.message ?? 'Internal Server Error';
  const response: any = { error: message, code: status };
  if (process.env.NODE_ENV === 'development') {
    response.stack = err?.stack;
  }
  res.status(status).json(response);
};
