export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'INVESTOR';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  investor?: Investor;
}

export interface Investor {
  id: string;
  phone?: string;
  company?: string;
  avatar?: string;
  totalInvested: number;
  currentValue: number;
  totalReturn: number;
  joinedAt: string;
  lastLoginAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  company?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface DashboardData {
  portfolioValue: number;
  totalInvested: number;
  totalReturn: number;
  totalReturnPercent: number;
  companyCount: number;
  unreadNotifications: number;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  sector: string;
  founded: string;
  headquarters: string;
  website?: string;
  logo?: string;
  valuation: number;
  revenue: number;
  employees: number;
  status: 'ACTIVE' | 'PENDING' | 'EXITED';
}

export interface PortfolioHolding {
  id: string;
  company: Company;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
  value: number;
  change: number;
  changePercent: number;
  status: 'ACTIVE' | 'PENDING' | 'EXITED';
}

export interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'EXCEL' | 'DOC' | 'IMAGE';
  size: string;
  category: string;
  url: string;
  isPublic: boolean;
  accessLevel: 'ALL' | 'INVESTORS' | 'ADMIN';
  downloads: number;
  starred: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    email: string;
  };
  subject: string;
  content: string;
  read: boolean;
  readAt?: string;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  company: Company;
  targetAmount: number;
  raisedAmount: number;
  minInvestment: number;
  maxInvestment?: number;
  status: 'OPEN' | 'CLOSED' | 'FUNDED';
}

export interface CapitalCall {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
  paidAt?: string;
}
