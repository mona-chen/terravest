import { Router, Request, Response, NextFunction } from 'express';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/ping', auth as any, (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'admin route reachable', user: (req as any).user?.id ?? null });
});

export default router;
