import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function mapCompany(comp: any) {
  return {
    ...comp,
    metrics: {
      revenueGrowth: Number(comp.metricsRevenueGrowth),
      profitMargin: Number(comp.metricsProfitMargin),
      customerCount: comp.metricsCustomerCount,
      marketShare: Number(comp.metricsMarketShare),
    },
  };
}

function mapDocument(doc: any) {
  return {
    ...doc,
    type: doc.fileType as 'PDF' | 'EXCEL' | 'DOC' | 'IMAGE',
  };
}

function mapPortfolioHolding(h: any) {
  const shares = Number(h.shares);
  const purchasePrice = Number(h.purchasePrice);
  const currentPrice = Number(h.currentPrice);
  const value = shares * currentPrice;
  const cost = shares * purchasePrice;
  const change = value - cost;
  const changePercent = cost > 0 ? (change / cost) * 100 : 0;
  return {
    ...h,
    company: mapCompany(h.company),
    shares,
    purchasePrice,
    currentPrice,
    value,
    change,
    changePercent,
  };
}

export async function getDashboard(req: Request, res: Response) {
  const userId = req.user?.userId;

  const investor = await prisma.investor.findUnique({
    where: { userId },
    include: {
      portfolioHoldings: {
        include: { company: true },
      },
    },
  });

  if (!investor) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Investor not found' },
    });
  }

  const holdings = investor.portfolioHoldings.map(mapPortfolioHolding);
  const totalValue = holdings.reduce((sum: number, h: { value: number }) => sum + h.value, 0);
  const totalInvested = holdings.reduce((sum: number, h: { shares: number; purchasePrice: number }) => sum + h.shares * h.purchasePrice, 0);
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
      companyCount: holdings.length,
      unreadNotifications,
    },
  });
}

export async function getProfile(req: Request, res: Response) {
  const userId = req.user?.userId;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { investors: true },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'User not found' },
    });
  }

  const inv = user.investors[0];
  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        investor: inv ? {
          ...inv,
          totalInvested: Number(inv.totalInvested),
          currentValue: 0,
          totalReturn: 0,
        } : null,
      },
    },
  });
}

export async function updateProfile(req: Request, res: Response) {
  const userId = req.user?.userId;
  const { name, phone, company, avatar } = req.body;

  const user = await prisma.user.update({
    where: { id: userId },
    data: { name },
    include: { investors: true },
  });

  if (user.investors[0]) {
    await prisma.investor.update({
      where: { id: user.investors[0].id },
      data: { phone, company, avatar },
    });
  }

  const updatedUser = await prisma.user.findUnique({
    where: { id: userId },
    include: { investors: true },
  });

  const inv = updatedUser!.investors[0];
  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: updatedUser!.id,
        email: updatedUser!.email,
        name: updatedUser!.name,
        role: updatedUser!.role,
        status: updatedUser!.status,
        investor: inv ? {
          ...inv,
          totalInvested: Number(inv.totalInvested),
          currentValue: 0,
          totalReturn: 0,
        } : null,
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
        include: { company: true },
      },
    },
  });

  if (!investor) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Investor not found' },
    });
  }

  return res.status(200).json({
    success: true,
    data: investor.portfolioHoldings.map(mapPortfolioHolding),
  });
}

export async function getCompanies(req: Request, res: Response) {
  const companies = await prisma.company.findMany();
  return res.status(200).json({
    success: true,
    data: companies.map(mapCompany),
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
    orderBy: { createdAt: 'desc' },
  });

  return res.status(200).json({
    success: true,
    data: documents.map(mapDocument),
  });
}

export async function getNotifications(req: Request, res: Response) {
  const userId = req.user?.userId;
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
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
  return res.status(200).json({ success: true });
}

export async function getMessages(req: Request, res: Response) {
  const userId = req.user?.userId;
  const messages = await prisma.message.findMany({
    where: { recipientId: userId },
    include: {
      sender: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return res.status(200).json({
    success: true,
    data: messages,
  });
}

export async function sendMessage(req: Request, res: Response) {
  const userId = req.user?.userId;
  const { subject, content } = req.body;

  if (!userId) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
    });
  }

  const message = await prisma.message.create({
    data: {
      senderId: userId,
      recipientId: userId,
      subject,
      content,
    },
    include: {
      sender: { select: { id: true, name: true, email: true } },
    },
  });

  return res.status(201).json({ success: true, data: message });
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
      company: mapCompany(o.company),
      targetAmount: Number(o.targetAmount),
      raisedAmount: Number(o.raisedAmount),
      minInvestment: Number(o.minimumInvestment),
      maxInvestment: o.maxInvestment ? Number(o.maxInvestment) : undefined,
    })),
  });
}

export async function getCapitalCalls(req: Request, res: Response) {
  const userId = req.user?.userId;
  const investor = await prisma.investor.findUnique({
    where: { userId },
    include: {
      capitalCalls: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!investor) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Investor not found' },
    });
  }

  return res.status(200).json({
    success: true,
    data: investor.capitalCalls.map((c: any) => ({
      ...c,
      amount: Number(c.amount),
    })),
  });
}

export async function getTaxDocuments(req: Request, res: Response) {
  const userId = req.user?.userId;
  const documents = await prisma.document.findMany({
    where: {
      AND: [
        {
          OR: [
            { category: { in: ['Tax', 'K-1', '1099', 'Statement'] } },
            { name: { contains: 'K-1', mode: 'insensitive' } },
            { name: { contains: '1099', mode: 'insensitive' } },
            { name: { contains: 'Tax', mode: 'insensitive' } },
          ],
        },
        {
          OR: [
            { accessLevel: 'ALL' },
            { accessLevel: 'INVESTORS' },
            { investor: { userId } },
          ],
        },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  return res.status(200).json({
    success: true,
    data: documents.map(mapDocument),
  });
}

export async function getCompliance(req: Request, res: Response) {
  const userId = req.user?.userId;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return res.status(200).json({
    success: true,
    data: {
      overall: 'in-progress',
      completed: 3,
      total: 6,
      lastUpdated: '2024-02-15',
      nextReview: '2024-08-15',
      requirements: [
        {
          id: 'kyc-1',
          category: 'identity',
          title: 'Government-Issued ID',
          description: "Valid passport, national ID, or driver's license",
          status: 'completed',
          documents: ['Passport or National ID', "Driver's License (alternative)"],
          uploadedFiles: ['passport_scan.pdf'],
        },
        {
          id: 'kyc-2',
          category: 'address',
          title: 'Proof of Address',
          description: 'Utility bill or bank statement from the last 3 months',
          status: 'completed',
          documents: ['Utility Bill', 'Bank Statement', 'Government Correspondence'],
          uploadedFiles: ['utility_bill_march.pdf'],
        },
        {
          id: 'kyc-3',
          category: 'financial',
          title: 'Source of Funds Declaration',
          description: 'Documentation proving the origin of your investment capital',
          status: 'pending',
          documents: ['Bank Statements (6 months)', 'Employment Letter', 'Business Ownership Docs'],
        },
        {
          id: 'kyc-4',
          category: 'accreditation',
          title: 'Accredited Investor Verification',
          description: 'Proof that you meet accredited investor criteria',
          status: 'required',
          documents: ['Net Worth Statement', 'Income Verification', 'Professional License'],
        },
        {
          id: 'kyc-5',
          category: 'financial',
          title: 'Tax Identification',
          description: 'Tax ID number and relevant tax documentation',
          status: 'completed',
          documents: ['Tax ID Certificate', 'Recent Tax Return'],
          uploadedFiles: ['tax_id_certificate.pdf'],
        },
        {
          id: 'kyc-6',
          category: 'address',
          title: 'Beneficial Ownership Declaration',
          description: 'If investing through an entity, declare beneficial owners',
          status: 'required',
          documents: ['Corporate Structure Chart', 'Shareholder Register'],
        },
      ],
      kycStatus: user?.status === 'ACTIVE' ? 'verified' : 'pending',
      accreditationStatus: 'pending',
    },
  });
}

export async function getReports(req: Request, res: Response) {
  const userId = req.user?.userId;
  const documents = await prisma.document.findMany({
    where: {
      OR: [
        { accessLevel: 'ALL' },
        { accessLevel: 'INVESTORS' },
        { investor: { userId } },
      ],
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  const reports = documents.map((d: any, i: number) => ({
    id: d.id,
    name: d.name,
    type: d.category || 'Report',
    date: new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: 'Available',
  }));

  return res.status(200).json({
    success: true,
    data: reports,
  });
}

export async function getSettings(req: Request, res: Response) {
  const userId = req.user?.userId;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { investors: true },
  });

  return res.status(200).json({
    success: true,
    data: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
      portfolioUpdates: true,
      documentAlerts: true,
      dividendNotifications: true,
      marketNews: false,
      twoFactorEnabled: false,
    },
  });
}

export async function updateSettings(req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    data: req.body,
  });
}
