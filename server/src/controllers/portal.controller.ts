import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getDashboard(req: Request, res: Response) {
  const userId = req.user?.userId;

  const investor = await prisma.investor.findUnique({
    where: { userId },
    include: {
      portfolioHoldings: {
        include: {
          company: true,
        },
      },
    },
  });

  if (!investor) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Investor not found',
      },
    });
  }

  const totalValue = investor.portfolioHoldings.reduce((sum, h) => sum + Number(h.value), 0);
  const totalInvested = investor.portfolioHoldings.reduce((sum, h) => sum + Number(h.purchasePrice) * h.shares, 0);
  const totalReturn = totalValue - totalInvested;

  const unreadNotifications = await prisma.notification.count({
    where: { userId, read: false },
  });

  return res.status(200).json({
    success: true,
    data: {
      portfolioValue: totalValue,
      totalInvested,
      totalReturn,
      totalReturnPercent: totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0,
      companyCount: investor.portfolioHoldings.length,
      unreadNotifications,
    },
  });
}

export async function getProfile(req: Request, res: Response) {
  const userId = req.user?.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      investor: true,
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
        investor: user.investor,
      },
    },
  });
}

export async function updateProfile(req: Request, res: Response) {
  const userId = req.user?.userId;
  const { name, phone, company, avatar } = req.body;

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      investor: {
        update: {
          phone,
          company,
          avatar,
        },
      },
    },
    include: {
      investor: true,
    },
  });

  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        investor: user.investor,
      },
    },
  });
}

export async function getPortfolio(req: Request, res: Response) {
  const userId = req.user?.userId;

  const investor = await prisma.investor.findUnique({
    where: { userId },
    include: {
      portfolioHoldings: {
        include: {
          company: true,
        },
      },
    },
  });

  if (!investor) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Investor not found',
      },
    });
  }

  return res.status(200).json({
    success: true,
    data: investor.portfolioHoldings,
  });
}

export async function getCompanies(req: Request, res: Response) {
  const companies = await prisma.company.findMany();

  return res.status(200).json({
    success: true,
    data: companies,
  });
}

export async function getDocuments(req: Request, res: Response) {
  const userId = req.user?.userId;

  const documents = await prisma.document.findMany({
    where: {
      OR: [
        { accessLevel: 'ALL' },
        { accessLevel: 'INVESTORS' },
        { investor: { userId } },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.status(200).json({
    success: true,
    data: documents,
  });
}

export async function getNotifications(req: Request, res: Response) {
  const userId = req.user?.userId;

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.status(200).json({
    success: true,
    data: notifications,
  });
}

export async function markNotificationRead(req: Request, res: Response) {
  const { id } = req.params;

  await prisma.notification.update({
    where: { id },
    data: { read: true },
  });

  return res.status(200).json({
    success: true,
  });
}

export async function getMessages(req: Request, res: Response) {
  const userId = req.user?.userId;

  const messages = await prisma.message.findMany({
    where: { recipientId: userId },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.status(200).json({
    success: true,
    data: messages,
  });
}

export async function sendMessage(req: Request, res: Response) {
  const userId = req.user?.userId;
  const { subject, content } = req.body;

  const message = await prisma.message.create({
    data: {
      senderId: userId,
      recipientId: userId,
      subject,
      content,
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return res.status(201).json({
    success: true,
    data: message,
  });
}
