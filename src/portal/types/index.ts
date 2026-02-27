// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'investor' | 'admin';
  avatar?: string;
  phone?: string;
  company?: string;
  joinedAt: string;
  lastLogin?: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Investor extends User {
  role: 'investor';
  totalInvested: number;
  currentValue: number;
  totalReturn: number;
  portfolio: PortfolioHolding[];
  documents: Document[];
  notifications: Notification[];
}

// Portfolio Types
export interface PortfolioHolding {
  id: string;
  companyId: string;
  companyName: string;
  sector: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  value: number;
  change: number;
  changePercent: number;
  status: 'active' | 'pending' | 'exited';
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
  status: 'active' | 'pending' | 'exited';
  metrics: CompanyMetrics;
}

export interface CompanyMetrics {
  revenueGrowth: number;
  profitMargin: number;
  customerCount: number;
  marketShare: number;
}

// Document Types
export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'excel' | 'doc' | 'image';
  size: string;
  category: DocumentCategory;
  uploadedAt: string;
  uploadedBy: string;
  url: string;
  isPublic: boolean;
  accessLevel: 'all' | 'investors' | 'admin';
  downloads: number;
  starred?: boolean;
}

export type DocumentCategory = 
  | 'Reports' 
  | 'Financial' 
  | 'ESG' 
  | 'Governance' 
  | 'Investments' 
  | 'Risk' 
  | 'Legal' 
  | 'Other';

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  type: 'investment' | 'dividend' | 'withdrawal' | 'fee';
  amount: number;
  date: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  relatedCompanyId?: string;
  relatedCompanyName?: string;
}

// Performance Types
export interface PerformanceData {
  date: string;
  portfolioValue: number;
  invested: number;
  benchmark: number;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  subject: string;
  content: string;
  sentAt: string;
  read: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  url: string;
}

// Settings Types
export interface UserSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  twoFactorEnabled: boolean;
  language: string;
  timezone: string;
  currency: string;
}

// Admin Types
export interface AdminStats {
  totalInvestors: number;
  activeInvestors: number;
  totalAum: number;
  totalCompanies: number;
  pendingApprovals: number;
  recentSignups: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}
