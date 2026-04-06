import express from 'express';
import helmet from 'helmet';
import corsMiddleware from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { authLimiter, generalLimiter } from './middleware/rateLimit';
import { healthRouter } from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import portalRoutes from './routes/portal.routes';
import adminRoutes from './routes/admin.routes';

const app = express();
const app = express();

// Basic security and parsing
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

app.use(healthRouter);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/portal', generalLimiter, portalRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

export default app;
