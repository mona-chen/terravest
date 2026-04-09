import jwt from 'jsonwebtoken';
import config from '../config/env';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'ADMIN' | 'INVESTOR';
  jti: string;
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

export function signAccessToken(payload: Omit<TokenPayload, 'iat' | 'exp' | 'iss' | 'aud'>): string {
  return jwt.sign(
    {
      ...payload,
      iss: config.jwtIssuer,
      aud: config.jwtAudience,
    },
    config.jwtSecret,
    {
      algorithm: 'HS256',
      expiresIn: config.jwtAccessExpiry as any,
    }
  );
}

export function signRefreshToken(payload: Omit<TokenPayload, 'iat' | 'exp' | 'iss' | 'aud'>): string {
  return jwt.sign(
    {
      ...payload,
      iss: config.jwtIssuer,
      aud: config.jwtAudience,
    },
    config.jwtRefreshSecret,
    {
      algorithm: 'HS256',
      expiresIn: config.jwtRefreshExpiry as any,
    }
  );
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, config.jwtSecret, {
      issuer: config.jwtIssuer,
      audience: config.jwtAudience,
    }) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, config.jwtRefreshSecret, {
      issuer: config.jwtIssuer,
      audience: config.jwtAudience,
    }) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}
