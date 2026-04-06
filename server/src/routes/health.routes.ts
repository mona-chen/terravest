import { Router, Response } from 'express';
import { healthController } from '../controllers/health.controller';

export const healthRouter = Router();
healthRouter.get('/api/health', healthController);

export default healthRouter;
