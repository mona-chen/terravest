import process from 'process';
import { JWT_ACCESS_EXPIRY, JWT_REFRESH_EXPIRY } from './constants';

// Enforce required secrets with minimum length (32 chars)
function requireSecret(name: string, value?: string): string {
  if (!value || value.length < 32) {
    throw new Error(`Environment variable ${name} must be set and be at least 32 characters long.`);
  }
  return value;
}

export const JWT_SECRET: string = requireSecret('JWT_SECRET', process.env.JWT_SECRET);
export const JWT_REFRESH_SECRET: string = requireSecret('JWT_REFRESH_SECRET', process.env.JWT_REFRESH_SECRET);

export { JWT_ACCESS_EXPIRY, JWT_REFRESH_EXPIRY };
