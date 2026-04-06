import cors from 'cors';
import { Express } from 'express';

const allowedOrigins = ['http://localhost:5173'];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware as unknown as Express.RequestHandler;
