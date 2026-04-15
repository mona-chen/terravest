import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getDashboard(req: Request, res: Response) {
  const [
    totalUsers,
    activeInvestors,
    totalCompanies,
    pendingNotifications,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.investor.count(),
    prisma.company.count(),
    prisma.notification.count({ where: { read: false } }),
  ]);

  const investors = await prisma.investor.findMany({
    include: {
      portfolioHoldings: true,
    },
  });

  const totalAUM = investors.reduce((sum: number, inv: any) => 
    sum + inv.portfolioHoldings.reduce((hSum: number, h: any) => hSum + Number(h.value), 0), 0
  );

  return res.status(200).json({
    success: true,
    data: {
      totalUsers,
      activeInvestors,
      totalAUM,
      totalCompanies,
      pendingNotifications,
    },
  });
}

export async function getUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany({
    include: {
      investors: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.status(200).json({
    success: true,
    data: users,
  });
}

export async function getUser(req: Request, res: Response) {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      investors: {
        include: {
          portfolioHoldings: {
            include: {
              company: true,
            },
          },
        },
      },
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
    data: user,
  });
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { name, status, role } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: {
      name,
      status,
      role,
    },
    include: {
      investors: true,
    },
  });

  return res.status(200).json({
    success: true,
    data: user,
  });
}

export async function getCompanies(req: Request, res: Response) {
  const companies = await prisma.company.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.status(200).json({
    success: true,
    data: companies,
  });
}

export async function createCompany(req: Request, res: Response) {
  const company = await prisma.company.create({
    data: req.body,
  });

  return res.status(201).json({
    success: true,
    data: company,
  });
}

export async function updateCompany(req: Request, res: Response) {
  const { id } = req.params;

  const company = await prisma.company.update({
    where: { id },
    data: req.body,
  });

  return res.status(200).json({
    success: true,
    data: company,
  });
}

export async function deleteCompany(req: Request, res: Response) {
  const { id } = req.params;

  await prisma.company.delete({
    where: { id },
  });

  return res.status(204).send();
}

export async function getDocuments(req: Request, res: Response) {
  const documents = await prisma.document.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.status(200).json({
    success: true,
    data: documents,
  });
}

export async function createDocument(req: Request, res: Response) {
  const userId = req.user?.userId;

  const document = await prisma.document.create({
    data: {
      ...req.body,
      uploadedById: userId,
    },
  });

  return res.status(201).json({
    success: true,
    data: document,
  });
}

export async function deleteDocument(req: Request, res: Response) {
  const { id } = req.params;

  await prisma.document.delete({
    where: { id },
  });

  return res.status(204).send();
}
