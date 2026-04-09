import express from 'express';
import helmet from 'helmet';
import corsMiddleware from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { authLimiter, generalLimiter } from './middleware/rateLimit';
import { healthRouter } from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import portalRoutes from './routes/portal.routes';
import adminRoutes from './routes/admin.routes';
import { requestIdMiddleware } from './middleware/requestId';

const app = express();

app.use(helmet());
app.use(requestIdMiddleware);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

app.use(healthRouter);
app.use('/api/auth', authLimiter as any, authRoutes);
app.use('/api/portal', generalLimiter as any, portalRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

export default app;
