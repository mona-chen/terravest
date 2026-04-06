import jwt from 'jsonwebtoken';
import { config } from '../config/env';

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

/**
 * Sign an access token (15 minute expiry)
 */
export function signAccessToken(payload: Omit<TokenPayload, 'iat' | 'exp' | 'iss' | 'aud'>): string {
  return jwt.sign(
    {
      ...payload,
      iss: config.JWT_ISSUER,
      aud: config.JWT_AUDIENCE,
    },
    config.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: config.JWT_ACCESS_EXPIRY,
    }
  );
}

/**
 * Sign a refresh token (7 day expiry)
 */
export function signRefreshToken(payload: Omit<TokenPayload, 'iat' | 'exp' | 'iss' | 'aud'>): string {
  return jwt.sign(
    {
      ...payload,
      iss: config.JWT_ISSUER,
      aud: config.JWT_AUDIENCE,
    },
    config.JWT_REFRESH_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: config.JWT_REFRESH_EXPIRY,
    }
  );
}

/**
 * Verify an access token
 * Returns payload if valid, null if invalid or expired
 */
export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET, {
      issuer: config.JWT_ISSUER,
      audience: config.JWT_AUDIENCE,
    }) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Verify a refresh token
 * Returns payload if valid, null if invalid or expired
 */
export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, config.JWT_REFRESH_SECRET, {
      issuer: config.JWT_ISSUER,
      audience: config.JWT_AUDIENCE,
    }) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Decode a token without verification
 * Useful for debugging, but always verify for security
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}
