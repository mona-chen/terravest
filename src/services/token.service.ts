import bcrypt from 'bcrypt';
import { TokenPayload, signAccessToken as signAccessTokenFn, signRefreshToken as signRefreshTokenFn, verifyRefreshToken as verifyRefreshTokenFn, decodeToken as decodeTokenFn } from '../utils/jwt';
import { RefreshTokenModel } from '../models/RefreshToken';
import { JWT_AUDIENCE } from '../config/constants';

// Local User type for return value
type UserReturn = { id: string; email: string; role: 'ADMIN' | 'INVESTOR' };

export class TokenService {
  // Generate access + refresh tokens and persist refresh token hash
  async generateTokens(userId: string, email: string, role: 'ADMIN' | 'INVESTOR') {
    const accessToken = signAccessTokenFn({ userId, email, role });
    const refreshToken = signRefreshTokenFn({ userId, email, role });

    // Decode to extract jti from refresh token payload
    const payload = decodeTokenFn(refreshToken) as TokenPayload | null;
    const jti = payload?.jti ?? '';
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const tokenHash = await bcrypt.hash(refreshToken, 12);
    await RefreshTokenModel.create({ userId, tokenHash, expiresAt, jti });

    return { accessToken, refreshToken };
  }

  // Persist a provided refresh token (e.g., on login)
  async saveRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void> {
    const payload = decodeTokenFn(token) as TokenPayload | null;
    const jti = payload?.jti ?? '';
    const tokenHash = await bcrypt.hash(token, 12);
    await RefreshTokenModel.create({ userId, tokenHash, expiresAt, jti });
  }

  // Validate refresh token against DB and return user info if valid
  async verifyRefreshToken(token: string): Promise<UserReturn | null> {
    const payload = verifyRefreshTokenFn(token) as TokenPayload | null;
    if (!payload) return null;

    // Cleanup expired tokens for this user
    const now = new Date();
    const tokens = await RefreshTokenModel.findAll({ userId: payload.userId } as any);
    for (const rec of tokens) {
      if (rec.expiresAt <= now) {
        await RefreshTokenModel.deleteOne({ userId: rec.userId, tokenHash: rec.tokenHash } as any);
      }
    }

    // Try to find a matching hash for the provided token
    const userRecords = await RefreshTokenModel.findAll({ userId: payload.userId } as any);
    for (const rec of userRecords) {
      const match = await bcrypt.compare(token, rec.tokenHash);
      if (match) {
        // Token is valid and not expired (expires checked above)
        return { id: payload.userId, email: payload.email, role: payload.role };
      }
    }
    return null;
  }

  // Revoke a specific refresh token
  async revokeRefreshToken(token: string): Promise<void> {
    const payload = verifyRefreshTokenFn(token) as TokenPayload | null;
    if (!payload) return;
    const userId = payload.userId;
    const records = await RefreshTokenModel.findAll({ userId } as any);
    for (const rec of records) {
      const match = await bcrypt.compare(token, rec.tokenHash);
      if (match) {
        await RefreshTokenModel.deleteOne({ userId, tokenHash: rec.tokenHash } as any);
        break;
      }
    }
  }

  // Revoke all tokens for a user
  async revokeAllUserTokens(userId: string): Promise<void> {
    await RefreshTokenModel.deleteMany({ userId } as any);
  }
}

// Re-export a default instance for convenience
export const tokenService = new TokenService();
