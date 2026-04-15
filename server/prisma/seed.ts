import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting Prisma seed...')

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

  const d = (n: string) => new Prisma.Decimal(n)

  const cData = [
    { name: 'Africapital Finance', sector: 'Finance', description: 'Leading financial services across Central Africa.', founded: '2010', headquarters: 'Douala, Cameroon', website: 'https://africapital.cm', logo: '', valuation: '120000000', revenue: '15000000', employees: 120, metricsRevenueGrowth: '12.5', metricsProfitMargin: '24.0', metricsCustomerCount: 8500, metricsMarketShare: '18.5' },
    { name: 'Douala Logistics Hub', sector: 'Infrastructure', description: 'Integrated logistics and warehousing platform.', founded: '2015', headquarters: 'Douala, Cameroon', website: 'https://dlh.cm', logo: '', valuation: '98000000', revenue: '12000000', employees: 85, metricsRevenueGrowth: '8.3', metricsProfitMargin: '19.5', metricsCustomerCount: 320, metricsMarketShare: '22.0' },
    { name: 'GreenPower Cameroon', sector: 'Energy', description: 'Renewable energy generation and distribution.', founded: '2012', headquarters: 'Yaoundé, Cameroon', website: 'https://greenpower.cm', logo: '', valuation: '150000000', revenue: '30000000', employees: 210, metricsRevenueGrowth: '15.2', metricsProfitMargin: '28.5', metricsCustomerCount: 12000, metricsMarketShare: '31.0' },
    { name: 'TechVentures Africa', sector: 'Technology', description: 'Venture builder for African tech startups.', founded: '2018', headquarters: 'Lagos, Nigeria', website: 'https://techventures.africa', logo: '', valuation: '200000000', revenue: '50000000', employees: 320, metricsRevenueGrowth: '35.6', metricsProfitMargin: '32.0', metricsCustomerCount: 450, metricsMarketShare: '8.5' },
    { name: 'Yaoundé Medical Center', sector: 'Healthcare', description: 'Private healthcare network with 4 hospitals.', founded: '2008', headquarters: 'Yaoundé, Cameroon', website: 'https://ymc.cm', logo: '', valuation: '60000000', revenue: '9000000', employees: 180, metricsRevenueGrowth: '6.8', metricsProfitMargin: '15.5', metricsCustomerCount: 5600, metricsMarketShare: '12.0' },
  ]
  const companies: any[] = []
  for (const row of cData) {
    const comp = await prisma.company.create({
      data: {
        name: row.name,
        description: row.description,
        sector: row.sector,
        founded: row.founded,
        headquarters: row.headquarters,
        website: row.website,
        logo: row.logo,
        valuation: d(row.valuation),
        revenue: d(row.revenue),
        employees: row.employees,
        metricsRevenueGrowth: d(row.metricsRevenueGrowth),
        metricsProfitMargin: d(row.metricsProfitMargin),
        metricsCustomerCount: row.metricsCustomerCount,
        metricsMarketShare: d(row.metricsMarketShare),
      },
    })
    companies.push(comp)
    console.log('Created Company:', comp.name)
  }

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

  const holdings = [
    { investorIndex: 0, companyIndex: 0, shares: '150.0', price: '1.25', current: '1.45', status: 'ACTIVE' },
    { investorIndex: 0, companyIndex: 2, shares: '120.0', price: '2.50', current: '2.80', status: 'ACTIVE' },
    { investorIndex: 1, companyIndex: 1, shares: '80.0', price: '1.75', current: '1.90', status: 'ACTIVE' },
    { investorIndex: 2, companyIndex: 3, shares: '60.0', price: '3.20', current: '4.10', status: 'EXITED' },
    { investorIndex: 3, companyIndex: 4, shares: '40.0', price: '1.10', current: '1.25', status: 'ACTIVE' },
    { investorIndex: 4, companyIndex: 0, shares: '10.0', price: '1.20', current: '1.45', status: 'ACTIVE' },
    { investorIndex: 0, companyIndex: 1, shares: '25.0', price: '1.60', current: '1.85', status: 'ACTIVE' },
    { investorIndex: 1, companyIndex: 3, shares: '40.0', price: '2.20', current: '2.95', status: 'ACTIVE' },
    { investorIndex: 2, companyIndex: 0, shares: '5.0', price: '1.00', current: '1.45', status: 'ACTIVE' },
    { investorIndex: 4, companyIndex: 2, shares: '15.0', price: '2.40', current: '2.80', status: 'EXITED' },
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
      currentPrice: d(h.current),
      status: h.status as any,
    }})
    console.log('Created PortfolioHolding for', comp.name, 'and investor', inv.id)
  }

  const adminId = admin.id
  const docData = [
    { title: 'Q4 2024 Performance Report', fileType: 'PDF', size: '2.4 MB', url: 'https://example.com/q4-2024.pdf', companyIndex: null, investorIndex: null, category: 'Reports' },
    { title: 'Annual Financial Statements 2024', fileType: 'EXCEL', size: '4.8 MB', url: 'https://example.com/financials-2024.xlsx', companyIndex: null, investorIndex: null, category: 'Financial' },
    { title: 'Portfolio Allocation Summary', fileType: 'PDF', size: '1.2 MB', url: 'https://example.com/portfolio-allocation.pdf', companyIndex: 1, investorIndex: null, category: 'Reports' },
    { title: 'ESG Impact Report 2024', fileType: 'PDF', size: '5.6 MB', url: 'https://example.com/esg-2024.pdf', companyIndex: null, investorIndex: null, category: 'ESG' },
    { title: 'K-1 Form 2024 - Africapital Finance', fileType: 'PDF', size: '1.1 MB', url: 'https://example.com/k1-africapital-2024.pdf', companyIndex: null, investorIndex: 0, category: 'Tax' },
    { title: 'K-1 Form 2024 - GreenPower Cameroon', fileType: 'PDF', size: '1.0 MB', url: 'https://example.com/k1-greenpower-2024.pdf', companyIndex: null, investorIndex: 0, category: 'Tax' },
    { title: '2024 Tax Statement', fileType: 'PDF', size: '0.8 MB', url: 'https://example.com/tax-statement-2024.pdf', companyIndex: null, investorIndex: 0, category: 'Tax' },
    { title: '2023 Tax Statement', fileType: 'PDF', size: '0.7 MB', url: 'https://example.com/tax-statement-2023.pdf', companyIndex: null, investorIndex: 0, category: 'Tax' },
  ]
  for (const dInfo of docData) {
    const isTax = dInfo.category === 'Tax';
    const created = await prisma.document.create({ data: {
      name: dInfo.title,
      fileType: dInfo.fileType,
      size: dInfo.size,
      url: dInfo.url,
      uploadedById: adminId,
      category: dInfo.category,
      companyId: dInfo.companyIndex != null ? companies[dInfo.companyIndex].id : null,
      investorId: dInfo.investorIndex != null ? investors[dInfo.investorIndex].investor.id : null,
      createdAt: isTax ? new Date('2024-03-15') : undefined,
    }})
    console.log('Created Document:', created.name)
  }

  for (let i = 0; i < investors.length; i++) {
    const userId = investors[i].user.id
    for (let n = 0; n < 4; n++) {
      await prisma.notification.create({ data: {
        type: (n % 3 === 0) ? 'INFO' : (n % 3 === 1) ? 'SUCCESS' : 'WARNING',
        title: `Notification ${n + 1} for Investor`,
        message: 'TerraVest has updated your investor profile.',
        userId: userId,
        read: n % 2 === 0,
      }})
    }
    console.log('Created 4 Notifications for investor', userId)
  }

  const support = admin
  for (const inv of investors) {
    for (let m = 0; m < 2; m++) {
      await prisma.message.create({ data: {
        subject: m === 0 ? 'Welcome to TerraVest' : 'Quarterly Update',
        content: m === 0 ? 'Welcome to TerraVest! Please review your onboarding documents.' : 'Your quarterly performance notification is available in your portal.',
        senderId: support.id,
        recipientId: inv.user.id,
        read: m % 2 === 0,
      }})
    }
  }
  console.log('Messages seeded')

  const opps = [
    { companyIndex: 0, title: 'Discounted Credit Facility', description: 'Expand lending capacity for SMEs.', targetAmount: '5000000', raisedAmount: '1200000', minimumInvestment: '50000', maxInvestment: '500000', status: 'OPEN' },
    { companyIndex: 2, title: 'Green Energy Expansion', description: 'Build 2 new solar farms in rural Cameroon.', targetAmount: '15000000', raisedAmount: '8200000', minimumInvestment: '100000', maxInvestment: '2000000', status: 'OPEN' },
  ]
  for (const o of opps) {
    const comp = companies[o.companyIndex]
    await prisma.opportunity.create({ data: {
      companyId: comp.id,
      title: o.title,
      description: o.description,
      targetAmount: d(o.targetAmount),
      raisedAmount: d(o.raisedAmount),
      minimumInvestment: d(o.minimumInvestment),
      maxInvestment: o.maxInvestment ? d(o.maxInvestment) : null,
      status: o.status as any,
    }})
    console.log('Created Opportunity for', comp.name)
  }

  const calls = [
    { investorIndex: 0, title: 'Series A Follow-on', description: 'Additional capital for TechVentures Africa.', amount: '100000', dueDate: new Date(), status: 'PENDING' },
    { investorIndex: 1, title: 'GreenPower Expansion', description: 'Solar farm construction phase 2.', amount: '50000', dueDate: new Date(), status: 'PAID' },
  ]
  for (const c of calls) {
    const inv = investors[c.investorIndex].investor
    await prisma.capitalCall.create({ data: {
      investorId: inv.id,
      title: c.title,
      description: c.description,
      amount: d(c.amount),
      dueDate: c.dueDate,
      status: c.status as any,
      paidAt: c.status === 'PAID' ? new Date() : null,
    }})
    console.log('Created CapitalCall for investor', inv.id)
  }

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
