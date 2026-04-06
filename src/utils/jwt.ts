import jwt from 'jsonwebtoken';
import { JWT_ISSUER, JWT_AUDIENCE } from '../config/constants';
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../config/env';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'ADMIN' | 'INVESTOR';
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
  jti?: string;
}

// Helper to generate a random JWT ID
function generateJti(): string {
  try {
    // Node 14+ provides crypto.randomUUID
    const crypto = require('crypto');
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    // fallthrough
  }
  // Fallback
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function signAccessToken(payload: { userId: string; email: string; role: 'ADMIN' | 'INVESTOR' }): string {
  const jti = generateJti();
  const token = jwt.sign(
    {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      jti,
    },
    JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '15m',
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      jwtid: jti as string,
    } as jwt.SignOptions
  );
  return token;
}

export function signRefreshToken(payload: { userId: string; email: string; role: 'ADMIN' | 'INVESTOR' }): string {
  const jti = generateJti();
  const token = jwt.sign(
    {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      jti,
    },
    JWT_REFRESH_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '7d',
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      jwtid: jti as string,
  } as jwt.SignOptions
  );
  return token;
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }) as TokenPayload;
    return payload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET, {
      algorithms: ['HS256'],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }) as TokenPayload;
    return payload;
  } catch {
    return null;
  }
}

// Decode without verification
export function decodeToken(token: string): TokenPayload | null {
  const decoded = jwt.decode(token) as TokenPayload | null;
  return decoded ?? null;
}
