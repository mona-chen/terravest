import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateTokens, revokeRefreshToken, verifyRefreshToken } from '../services/token.service';
import { verifyPassword } from '../utils/password';

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  const { email, password, name, phone, company } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      error: {
        code: 'CONFLICT',
        message: 'Email already registered',
      },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: 'INVESTOR',
      status: 'ACTIVE',
      investors: {
        create: {
          email: email.toLowerCase(),
          phone,
          company,
        },
      },
    },
    include: {
      investors: true,
    },
  });

  const tokens = await generateTokens(user.id, user.email, user.role as 'ADMIN' | 'INVESTOR');

  return res.status(201).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        investor: user.investors[0] ?? null,
      },
      ...tokens,
    },
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: {
      investors: true,
    },
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      },
    });
  }

  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      },
    });
  }

  const investor = user.investors[0];
  if (investor) {
    await prisma.investor.update({
      where: { id: investor.id },
      data: { lastLoginAt: new Date() },
    });
  }

  const tokens = await generateTokens(user.id, user.email, user.role as 'ADMIN' | 'INVESTOR');

  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        investor: investor ?? null,
      },
      ...tokens,
    },
  });
}

export async function getMe(req: Request, res: Response) {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Not authenticated',
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      investors: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'User not found',
      },
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        investor: user.investors[0] ?? null,
      },
    },
  });
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Refresh token required',
      },
    });
  }

  const user = await verifyRefreshToken(refreshToken);

  if (!user) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired refresh token',
      },
    });
  }

  await revokeRefreshToken(refreshToken);
  const tokens = await generateTokens(user.id, user.email, user.role);

  return res.status(200).json({
    success: true,
    data: tokens,
  });
}

export async function logout(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (refreshToken) {
    await revokeRefreshToken(refreshToken);
  }

  return res.status(200).json({
    success: true,
    data: {
      message: 'Logged out successfully',
    },
  });
}

export async function changePassword(req: Request, res: Response) {
  const userId = req.user?.userId;
  const { currentPassword, newPassword } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'User not found' },
    });
  }

  const isValid = await verifyPassword(currentPassword, user.password);

  if (!isValid) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Current password is incorrect' },
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return res.status(200).json({
    success: true,
    data: { message: 'Password changed successfully' },
  });
}
