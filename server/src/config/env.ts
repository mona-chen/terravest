import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().optional(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_ISSUER: z.string().optional(),
  JWT_AUDIENCE: z.string().optional(),
  JWT_ACCESS_EXPIRY: z.string().optional(),
  JWT_REFRESH_EXPIRY: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
});

const parse = envSchema.safeParse(process.env);

if (!parse.success) {
  throw new Error(`Environment validation failed: ${JSON.stringify(parse.error.issues)}`);
}

const config = {
  port: parse.data.PORT ? parseInt(parse.data.PORT, 10) : 3001,
  databaseUrl: parse.data.DATABASE_URL,
  jwtSecret: parse.data.JWT_SECRET,
  jwtRefreshSecret: parse.data.JWT_REFRESH_SECRET,
  jwtIssuer: parse.data.JWT_ISSUER ?? 'terravest',
  jwtAudience: parse.data.JWT_AUDIENCE ?? 'terravest-api',
  jwtAccessExpiry: parse.data.JWT_ACCESS_EXPIRY ?? '15m',
  jwtRefreshExpiry: parse.data.JWT_REFRESH_EXPIRY ?? '7d',
  nodeEnv: parse.data.NODE_ENV ?? 'development',
};

export default config;
export { envSchema };
