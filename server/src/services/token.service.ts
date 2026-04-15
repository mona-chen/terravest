import { PrismaClient } from '@prisma/client';
import { signAccessToken, signRefreshToken, verifyRefreshToken as verifyRefreshTokenJwt } from '../utils/jwt';
import { hashPassword, verifyPassword } from '../utils/password';

const prisma = new PrismaClient();

export interface UserData {
  id: string;
  email: string;
  name: string | null;
  role: 'ADMIN' | 'INVESTOR';
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export async function generateTokens(userId: string, email: string, role: 'ADMIN' | 'INVESTOR'): Promise<Tokens> {
  const jti = crypto.randomUUID();
  
  const accessToken = signAccessToken({ userId, email, role, jti });
  const refreshToken = signRefreshToken({ userId, email, role, jti });
  
  const tokenHash = await hashPassword(refreshToken);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  
  await prisma.refreshToken.create({
    data: {
      token: tokenHash,
      userId,
      expiresAt,
    },
  });
  
  return { accessToken, refreshToken };
}

export async function verifyRefreshToken(token: string): Promise<UserData | null> {
  const payload = verifyRefreshTokenJwt(token);
  if (!payload) return null;
  
  const storedTokens = await prisma.refreshToken.findMany({
    where: { userId: payload.userId },
    include: { user: true },
  });
  
  const now = new Date();
  
  for (const stored of storedTokens) {
    if (stored.expiresAt < now) {
      await prisma.refreshToken.delete({ where: { id: stored.id } });
      continue;
    }
    
    const isValid = await verifyPassword(token, stored.token);
    if (isValid) {
      return {
        id: stored.user.id,
        email: stored.user.email,
        name: stored.user.name,
        role: stored.user.role as 'ADMIN' | 'INVESTOR',
      };
    }
  }
  
  return null;
}

export async function revokeRefreshToken(token: string): Promise<void> {
  const payload = verifyRefreshTokenJwt(token);
  if (!payload) return;
  
  const storedTokens = await prisma.refreshToken.findMany({
    where: { userId: payload.userId },
  });
  
  for (const stored of storedTokens) {
    const isMatch = await verifyPassword(token, stored.token);
    if (isMatch) {
      await prisma.refreshToken.delete({ where: { id: stored.id } });
      return;
    }
  }
}

export async function revokeAllUserTokens(userId: string): Promise<void> {
  await prisma.refreshToken.deleteMany({
    where: { userId },
  });
}
