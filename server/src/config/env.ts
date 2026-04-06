import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().optional(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
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
  nodeEnv: parse.data.NODE_ENV ?? 'development',
};

export default config;
export { envSchema };
