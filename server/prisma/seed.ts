import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting Prisma seed...')

  // 1) Admin User
  const adminHashed = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@terravest.cm',
      password: adminHashed,
      name: 'System Administrator',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  })
  console.log('Created Admin User:', admin.id)

  // Helper to create decimals safely
  const d = (n: string) => new Prisma.Decimal(n)

  // 2) Companies (5)
  const cData = [
    { name: 'Africapital Finance', sector: 'Finance', valuation: '120000000', revenue: '15000000', employees: 120 },
    { name: 'Douala Logistics Hub', sector: 'Infrastructure', valuation: '98000000', revenue: '12000000', employees: 85 },
    { name: 'GreenPower Cameroon', sector: 'Energy', valuation: '150000000', revenue: '30000000', employees: 210 },
    { name: 'TechVentures Africa', sector: 'Technology', valuation: '200000000', revenue: '50000000', employees: 320 },
    { name: 'Yaoundé Medical Center', sector: 'Healthcare', valuation: '60000000', revenue: '9000000', employees: 180 },
  ]
  const companies = [] as any[]
  for (const row of cData) {
    const comp = await prisma.company.create({
      data: {
        name: row.name,
        sector: row.sector,
        valuation: d(row.valuation),
        revenue: d(row.revenue),
        employees: row.employees,
      },
    })
    companies.push(comp)
    console.log('Created Company:', comp.name)
  }

  // 3) Investor Users (3-5) and Investor records
  const investorInfos = [
    { first: 'Jean-Pierre', last: 'Moussa', email: 'investor@terravest.cm' },
    { first: 'Sarah', last: 'Johnson', email: 'sarah.j@email.com' },
    { first: 'Michael', last: 'Chen', email: 'm.chen@email.com' },
    { first: 'Amara', last: 'Okafor', email: 'amara.o@email.com' },
    { first: 'David', last: 'Kimani', email: 'd.kimani@email.com' },
  ]
  const investors: any[] = []
  const investorPassword = await bcrypt.hash('password123', 10)
  for (const info of investorInfos) {
    const user = await prisma.user.create({ data: {
      email: info.email,
      password: investorPassword,
      name: info.first + ' ' + info.last,
      role: 'INVESTOR',
      status: 'ACTIVE',
    }})
    const inv = await prisma.investor.create({ data: {
      userId: user.id,
      firstName: info.first,
      lastName: info.last,
      email: info.email,
      totalInvested: d('0'),
      netWorth: d('1000000'),
    }})
    investors.push({ user, investor: inv })
    console.log('Created Investor:', info.email)
  }

  // 4) Portfolio Holdings (8-10)
  const holdings = [
    { investorIndex: 0, companyIndex: 0, shares: '150.0', price: '1.25', status: 'ACTIVE' },
    { investorIndex: 0, companyIndex: 2, shares: '120.0', price: '2.50', status: 'ACTIVE' },
    { investorIndex: 1, companyIndex: 1, shares: '80.0', price: '1.75', status: 'ACTIVE' },
    { investorIndex: 2, companyIndex: 3, shares: '60.0', price: '3.20', status: 'EXITED' },
    { investorIndex: 3, companyIndex: 4, shares: '40.0', price: '1.10', status: 'ACTIVE' },
    { investorIndex: 4, companyIndex: 0, shares: '10.0', price: '1.20', status: 'ACTIVE' },
    { investorIndex: 0, companyIndex: 1, shares: '25.0', price: '1.60', status: 'ACTIVE' },
    { investorIndex: 1, companyIndex: 3, shares: '40.0', price: '2.20', status: 'ACTIVE' },
    { investorIndex: 2, companyIndex: 0, shares: '5.0', price: '1.00', status: 'ACTIVE' },
    { investorIndex: 4, companyIndex: 2, shares: '15.0', price: '2.40', status: 'EXITED' },
  ]
  for (const h of holdings) {
    const inv = investors[h.investorIndex]?.investor
    const comp = companies[h.companyIndex]
    if (!inv || !comp) continue
    await prisma.portfolioHolding.create({ data: {
      investorId: inv.id,
      companyId: comp.id,
      shares: d(h.shares),
      purchasePrice: d(h.price),
      status: h.status as any,
    }})
    console.log('Created PortfolioHolding for', comp.name, 'and investor', inv.id)
  }

  // 5) Documents (4-5) uploaded by admin
  const adminId = admin.id
  const docData = [
    { title: 'Q4 2024 Performance Report', fileType: 'PDF', url: 'https://example.com/q4-2024.pdf', companyIndex: null, investorIndex: null },
    { title: 'Annual Financial Statements 2024', fileType: 'XLSX', url: 'https://example.com/financials-2024.xlsx', companyIndex: null, investorIndex: null },
    { title: 'Portfolio Allocation Summary', fileType: 'PDF', url: 'https://example.com/portfolio-allocation.pdf', companyIndex: 1, investorIndex: null },
    { title: 'ESG Impact Report 2024', fileType: 'PDF', url: 'https://example.com/esg-2024.pdf', companyIndex: null, investorIndex: null },
  ]
  for (const dInfo of docData) {
    const created = await prisma.document.create({ data: {
      name: dInfo.title,
      fileType: dInfo.fileType,
      url: dInfo.url,
      uploadedById: adminId,
      companyId: dInfo.companyIndex != null ? companies[dInfo.companyIndex].id : null,
      investorId: dInfo.investorIndex != null ? investors[dInfo.investorIndex].investor.id : null,
    }})
    console.log('Created Document:', created.name)
  }

  // 6) Notifications (per investor) - 4-5 per investor (seeded as 4 per investor for practicality)
  for (let i = 0; i < investors.length; i++) {
    const userId = investors[i].user.id
    for (let n = 0; n < 4; n++) {
      await prisma.notification.create({ data: {
        type: (n % 3 === 0) ? 'INFO' : (n % 3 === 1) ? 'SUCCESS' : 'WARNING',
        title: `Notification ${n + 1} for Investor`,
        message: ' TerraVest has updated your investor profile.',
        userId: userId,
        read: n % 2 === 0,
      }})
    }
    console.log('Created 4 Notifications for investor', userId)
  }

  // 7) Messages (2-3 per investor) - welcome / updates
  const support = admin
  for (const inv of investors) {
    for (let m = 0; m < 2; m++) {
      await prisma.message.create({ data: {
        content: m === 0 ? 'Welcome to TerraVest! Please review your onboarding documents.' : 'Your quarterly performance notification is available in your portal.',
        senderId: support.id,
        recipientId: inv.user.id,
        read: m % 2 === 0,
      }})
    }
  }
  console.log('Messages seeded')

  // 8) Opportunities (2-3) linked to companies
  const opps = [
    { companyIndex: 0, title: 'Discounted Credit Facility', targetAmount: '5000000', minimumInvestment: '50000' },
    { companyIndex: 2, title: 'Green Energy Expansion', targetAmount: '15000000', minimumInvestment: '100000' },
  ]
  for (const o of opps) {
    const comp = companies[o.companyIndex]
    await prisma.opportunity.create({ data: {
      companyId: comp.id,
      title: o.title,
      targetAmount: d(o.targetAmount),
      minimumInvestment: d(o.minimumInvestment),
      status: 'OPEN',
    }})
    console.log('Created Opportunity for', comp.name)
  }

  // 9) Capital Calls (2-3 per investor)
  const calls = [
    { investorIndex: 0, amount: '100000', dueDate: new Date(), status: 'PENDING' },
    { investorIndex: 1, amount: '50000', dueDate: new Date(), status: 'PAID' },
  ]
  for (const c of calls) {
    const inv = investors[c.investorIndex].investor
    await prisma.capitalCall.create({ data: {
      investorId: inv.id,
      amount: d(c.amount),
      dueDate: c.dueDate,
      status: c.status as any,
    }})
    console.log('Created CapitalCall for investor', inv.id)
  }

  // 10) RefreshTokens - none seeded per requirements
  console.log('Seed data generation complete')
}

main()
  .catch((e) => {
    console.error('Seeding failed: ', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
