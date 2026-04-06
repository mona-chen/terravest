import { PrismaClient } from '@prisma/client';

// Lightweight Portal service handling investor-related portal data
const prisma = new PrismaClient();

export default class PortalService {
  // Dashboard data for investor
  static async getDashboard(userId: string) {
    const holdings = await prisma.portfolio.findMany({
      where: { investorId: userId },
      include: { company: true },
    });

    const portfolioValue = holdings.reduce((acc, h) => {
      const price = Number(h.company?.price ?? 0);
      return acc + h.shares * price;
    }, 0);

    const totalInvested = holdings.reduce((acc, h) => acc + (h.invested ?? 0), 0);
    const totalReturn = holdings.reduce((acc, h) => {
      const price = Number(h.company?.price ?? 0);
      const current = h.shares * price;
      const invested = h.invested ?? 0;
      return acc + (current - invested);
    }, 0);

    const companyCount = holdings.length;
    const unreadNotifications = await prisma.notification.count({
      where: { investorId: userId, readAt: null },
    });

    const recentPerformance = await prisma.performance.findMany({
      where: { investorId: userId },
      orderBy: { date: 'desc' },
      take: 5,
    });

    return {
      portfolioValue,
      totalInvested,
      totalReturn,
      companyCount,
      unreadNotifications,
      recentPerformance,
    };
  }

  // Investor profile
  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        investor: {
          select: {
            id: true,
            phone: true,
            company: true,
          },
        },
      },
    });

    // Basic portfolio summary for profile
    const holdings = await prisma.portfolio.findMany({
      where: { investorId: userId },
      include: { company: true },
    });
    const portfolioValue = holdings.reduce((acc, h) => acc + h.shares * Number(h.company?.price ?? 0), 0);
    return {
      user,
      portfolioSummary: {
        holdings: holdings.length,
        portfolioValue,
      },
    };
  }

  static async updateProfile(userId: string, payload: { name?: string; phone?: string; company?: string; avatar?: string }) {
    const { name, avatar, phone, company } = payload;
    if (name !== undefined) {
      await prisma.user.update({ where: { id: userId }, data: { name } });
    }
    // Update investor profile data
    if (phone !== undefined || company !== undefined || avatar !== undefined) {
      // Avatar stored on user for simplicity
      const data: any = {};
      if (phone !== undefined) data['investor'] = { update: { where: { id: (await prisma.investor.findFirst({ where: { userId } }))?.id ?? 0, data: { phone } } } };
      if (avatar !== undefined) data['avatar'] = avatar;
      // Simplified: directly update investor and user avatar if fields exist
      if (phone !== undefined) {
        await prisma.investor.update({ where: { userId }, data: { phone } }).catch(() => undefined);
      }
      if (avatar !== undefined) {
        await prisma.user.update({ where: { id: userId }, data: { avatar } }).catch(() => undefined);
      }
      if (company !== undefined) {
        await prisma.investor.update({ where: { userId }, data: { company } }).catch(() => undefined);
      }
    }
    return { ok: true };
  }

  // Portfolio for investor with optional filters
  static async getPortfolio(userId: string, filters?: { status?: string; sector?: string }) {
    const where: any = { investorId: userId };
    if (filters?.status) where.status = filters.status;
    if (filters?.sector) where.sector = filters.sector;
    const holdings = await prisma.portfolio.findMany({ where, include: { company: true } });
    return holdings.map((h) => ({
      ...h,
      company: h.company,
      value: h.shares * Number(h.company?.price ?? 0),
      change: Number(h.company?.price ?? 0) - Number(h.invested ?? 0) / (h.shares || 1),
      changePercent: ((Number(h.company?.price ?? 0) - (h.invested ?? 0)) / (h.invested ?? 1)) * 100,
    }));
  }

  static async getPortfolioDetail(userId: string, companyId: string) {
    const holding = await prisma.portfolio.findFirst({ where: { investorId: userId, companyId: companyId }, include: { company: true } });
    if (!holding) return null;
    return {
      ...holding,
      company: holding.company,
    };
  }

  static async getCompanies(filters?: { sector?: string; status?: string }) {
    const where: any = {};
    if (filters?.sector) where.sector = filters.sector;
    if (filters?.status) where.status = filters.status;
    const companies = await prisma.company.findMany({ where, include: { metrics: true } });
    return companies;
  }

  static async getCompany(id: string) {
    const company = await prisma.company.findUnique({ where: { id }, include: { metrics: true, documents: true } });
    return company;
  }

  static async getDocuments(userId: string, filters?: { category?: string; accessLevel?: string[] }) {
    const where: any = {};
    if (filters?.category) where.category = filters.category;
    const docsAccessible = await prisma.document.findMany({ where: { OR: [{ accessLevel: { in: ['ALL', 'INVESTORS'] } }, { investorId: userId }] } });
    // Merge with filters (simplified)
    const docs = docsAccessible.filter((d) => (filters?.category ? d.category === filters.category : true));
    return docs;
  }

  static async downloadDocument(userId: string, docId: string) {
    const doc = await prisma.document.findUnique({ where: { id: docId } });
    if (!doc) throw new Error('Document not found');
    // Access control: allow if ALL or INVESTORS or doc.owner matches investor
    const hasAccess = doc.accessLevel === 'ALL' || doc.accessLevel === 'INVESTORS';
    if (!hasAccess) {
      // check ownership
      if (doc.investorId !== userId) {
        throw new Error('Access denied');
      }
    }
    await prisma.document.update({ where: { id: docId }, data: { downloads: { increment: 1 } } as any });
    return { url: doc.fileUrl ?? '' };
  }

  static async getNotifications(userId: string, filters?: { read?: boolean }) {
    const where: any = { investorId: userId };
    if (filters?.read !== undefined) where.readAt = filters.read ? { not: null } : null;
    const nots = await prisma.notification.findMany({ where, orderBy: { createdAt: 'desc' } });
    return nots;
  }

  static async markNotificationRead(userId: string, id: string) {
    await prisma.notification.update({ where: { id }, data: { readAt: new Date() } });
    return { ok: true };
  }

  static async markAllNotificationsRead(userId: string) {
    await prisma.notification.updateMany({ where: { investorId: userId, readAt: null }, data: { readAt: new Date() } });
    return { ok: true };
  }

  static async getMessages(userId: string, filters?: { read?: boolean }) {
    const where: any = { toUserId: userId };
    if (filters?.read !== undefined) where.readAt = filters.read ? { not: null } : null;
    const msgs = await prisma.message.findMany({ where, orderBy: { createdAt: 'desc' } });
    return msgs;
  }

  static async sendMessage(userId: string, payload: { subject: string; content: string }) {
    const message = await prisma.message.create({ data: {
      subject: payload.subject,
      content: payload.content,
      fromUserId: userId,
      toAdmin: true,
      readAt: null,
    } });
    return message;
  }

  static async markMessageRead(userId: string, id: string) {
    await prisma.message.update({ where: { id }, data: { readAt: new Date() } });
    return { ok: true };
  }

  static async getOpportunities() {
    const ops = await prisma.opportunity.findMany({ where: { status: 'OPEN' }, include: { company: true } });
    return ops;
  }

  static async getCapitalCalls(userId: string) {
    const calls = await prisma.capitalCall.findMany({ where: { investorId: userId } });
    return calls;
  }

  static async getPerformance(userId: string, range: string) {
    const all = await prisma.performance.findMany({ where: { investorId: userId }, orderBy: { date: 'asc' } });
    // Simple range filter by date
    const now = new Date();
    let cutoff = new Date(0);
    if (range === '1M') cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    else if (range === '3M') cutoff = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    else if (range === '6M') cutoff = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
    else if (range === '1Y') cutoff = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    const data = range === 'ALL' ? all : all.filter((p) => new Date(p.date) >= cutoff);
    return data;
  }
}
