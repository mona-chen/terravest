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
    include: { portfolioHoldings: true },
  });

  const totalAUM = investors.reduce((sum: number, inv: any) => 
    sum + inv.portfolioHoldings.reduce((hSum: number, h: any) => hSum + Number(h.currentPrice) * Number(h.shares), 0), 0
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
    include: { investors: true },
    orderBy: { createdAt: 'desc' },
  });

  return res.status(200).json({
    success: true,
    data: users.map((u: any) => ({
      ...u,
      investors: u.investors.map((inv: any) => ({
        ...inv,
        totalInvested: Number(inv.totalInvested),
        netWorth: Number(inv.netWorth),
      })),
    })),
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
            include: { company: true },
          },
        },
      },
    },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'User not found' },
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      ...user,
      investors: user.investors.map((inv: any) => ({
        ...inv,
        totalInvested: Number(inv.totalInvested),
        netWorth: Number(inv.netWorth),
        portfolioHoldings: inv.portfolioHoldings.map((h: any) => ({
          ...h,
          shares: Number(h.shares),
          purchasePrice: Number(h.purchasePrice),
          currentPrice: Number(h.currentPrice),
        })),
      })),
    },
  });
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { name, status, role } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: { name, status, role },
    include: { investors: true },
  });

  return res.status(200).json({
    success: true,
    data: user,
  });
}

export async function getCompanies(req: Request, res: Response) {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return res.status(200).json({
    success: true,
    data: companies.map((c: any) => ({
      ...c,
      valuation: Number(c.valuation),
      revenue: Number(c.revenue),
      metricsRevenueGrowth: Number(c.metricsRevenueGrowth),
      metricsProfitMargin: Number(c.metricsProfitMargin),
      metricsMarketShare: Number(c.metricsMarketShare),
    })),
  });
}

export async function createCompany(req: Request, res: Response) {
  const company = await prisma.company.create({ data: req.body });
  return res.status(201).json({ success: true, data: company });
}

export async function updateCompany(req: Request, res: Response) {
  const { id } = req.params;
  const company = await prisma.company.update({
    where: { id },
    data: req.body,
  });
  return res.status(200).json({ success: true, data: company });
}

export async function deleteCompany(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.company.delete({ where: { id } });
  return res.status(204).send();
}

export async function getDocuments(req: Request, res: Response) {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return res.status(200).json({
    success: true,
    data: documents,
  });
}

export async function createDocument(req: Request, res: Response) {
  const userId = req.user?.userId;
  const document = await prisma.document.create({
    data: { ...req.body, uploadedById: userId },
  });
  return res.status(201).json({ success: true, data: document });
}

export async function deleteDocument(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.document.delete({ where: { id } });
  return res.status(204).send();
}

export async function getPortfolios(req: Request, res: Response) {
  const investors = await prisma.investor.findMany({
    include: {
      user: true,
      portfolioHoldings: {
        include: { company: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return res.status(200).json({
    success: true,
    data: investors.map((inv: any) => {
      const holdings = inv.portfolioHoldings.map((h: any) => ({
        ...h,
        shares: Number(h.shares),
        purchasePrice: Number(h.purchasePrice),
        currentPrice: Number(h.currentPrice),
        value: Number(h.shares) * Number(h.currentPrice),
        company: {
          ...h.company,
          valuation: Number(h.company.valuation),
          revenue: Number(h.company.revenue),
        },
      }));
      const totalValue = holdings.reduce((sum: number, h: any) => sum + h.value, 0);
      const status = holdings.length === 0
        ? 'PENDING'
        : holdings.some((h: any) => h.status === 'ACTIVE')
          ? 'ACTIVE'
          : holdings.some((h: any) => h.status === 'PENDING')
            ? 'PENDING'
            : 'EXITED';
      return {
        id: inv.id,
        userId: inv.userId,
        email: inv.email,
        name: inv.user?.name || `${inv.firstName} ${inv.lastName}`,
        totalInvested: Number(inv.totalInvested),
        totalValue,
        holdingsCount: holdings.length,
        status,
        holdings,
      };
    }),
  });
}

export async function getOpportunities(req: Request, res: Response) {
  const opportunities = await prisma.opportunity.findMany({
    include: { company: true },
    orderBy: { createdAt: 'desc' },
  });

  return res.status(200).json({
    success: true,
    data: opportunities.map((o: any) => ({
      ...o,
      company: {
        ...o.company,
        valuation: Number(o.company.valuation),
        revenue: Number(o.company.revenue),
      },
      targetAmount: Number(o.targetAmount),
      raisedAmount: Number(o.raisedAmount),
      minimumInvestment: Number(o.minimumInvestment),
      maxInvestment: o.maxInvestment ? Number(o.maxInvestment) : null,
    })),
  });
}

export async function getAnalytics(req: Request, res: Response) {
  const [
    usersByRole,
    companiesBySector,
    holdings,
    recentInvestors,
  ] = await Promise.all([
    prisma.user.groupBy({ by: ['role'], _count: { id: true } }),
    prisma.company.groupBy({ by: ['sector'], _count: { id: true } }),
    prisma.portfolioHolding.findMany(),
    prisma.investor.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
  ]);

  const totalAUM = holdings.reduce(
    (sum: number, h: any) => sum + Number(h.currentPrice) * Number(h.shares),
    0
  );

  return res.status(200).json({
    success: true,
    data: {
      usersByRole,
      companiesBySector,
      totalAUM,
      recentInvestors: recentInvestors.map((inv: any) => ({
        ...inv,
        totalInvested: Number(inv.totalInvested),
      })),
    },
  });
}
