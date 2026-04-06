import { Request, Response } from 'express';
import { getHealth } from '../services/health.service';

export const healthController = (req: Request, res: Response) => {
  res.json(getHealth());
};
