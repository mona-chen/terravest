import cors from 'cors';
import type { RequestHandler } from 'express';

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = [
  'http://localhost:5173',
  ...(process.env.ALLOWED_ORIGINS?.split(',') || []),
];

const corsOptions: cors.CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (mobile apps, curl, etc.) only in development
    if (!origin) {
      callback(null, !isProduction);
      return;
    }
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware as RequestHandler;
