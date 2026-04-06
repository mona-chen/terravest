import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errs = (result as any).error as ZodError;
      return res.status(400).json({ errors: errs.flatten() });
    }
    req.body = result.data;
    next();
  };
};
