import type { 
  User, 
  Investor, 
  Company, 
  Document, 
  Notification, 
  PerformanceData,
  Message
} from '../types';

// Initial mock data
const initialInvestors: Investor[] = [
  {
    id: '1',
    name: 'Jean-Pierre Moussa',
    email: 'investor@terravest.cm',
    role: 'investor',
    avatar: 'https://ui-avatars.com/api/?name=Jean+Pierre+Moussa&background=8FB8A3&color=fff',
    phone: '+237 677 123 456',
    company: 'Moussa Holdings',
    joinedAt: '2023-01-15',
    lastLogin: new Date().toISOString(),
    status: 'active',
    totalInvested: 15000000,
    currentValue: 18750000,
    totalReturn: 3750000,
    portfolio: [],
    documents: [],
    notifications: [],
  },
];

const initialCompanies: Company[] = [
  {
    id: '1',
    name: 'Africapital Finance',
    description: 'Leading fintech platform providing digital banking services across Central Africa.',
    sector: 'Finance',
    founded: '2019',
    headquarters: 'Douala, Cameroon',
    website: 'https://africapital.cm',
    valuation: 45000000,
    revenue: 12500000,
    employees: 145,
    status: 'active',
    metrics: {
      revenueGrowth: 45,
      profitMargin: 28,
      customerCount: 85000,
      marketShare: 12,
    },
  },
  {
    id: '2',
    name: 'Douala Logistics Hub',
    description: 'Modern logistics and warehousing facility serving the Central African region.',
    sector: 'Infrastructure',
    founded: '2018',
    headquarters: 'Douala, Cameroon',
    valuation: 32000000,
    revenue: 8900000,
    employees: 78,
    status: 'active',
    metrics: {
      revenueGrowth: 22,
      profitMargin: 35,
      customerCount: 450,
      marketShare: 8,
    },
  },
  {
    id: '3',
    name: 'GreenPower Cameroon',
    description: 'Renewable energy company developing solar power projects across Cameroon.',
    sector: 'Energy',
    founded: '2020',
    headquarters: 'Yaoundé, Cameroon',
    website: 'https://greenpower.cm',
    valuation: 28000000,
    revenue: 6200000,
    employees: 56,
    status: 'active',
    metrics: {
      revenueGrowth: 68,
      profitMargin: 42,
      customerCount: 12000,
      marketShare: 5,
    },
  },
  {
    id: '4',
    name: 'TechVentures Africa',
    description: 'Technology incubator and venture studio supporting African startups.',
    sector: 'Technology',
    founded: '2021',
    headquarters: 'Douala, Cameroon',
    valuation: 22000000,
    revenue: 3800000,
    employees: 34,
    status: 'active',
    metrics: {
      revenueGrowth: 125,
      profitMargin: 18,
      customerCount: 25,
      marketShare: 3,
    },
  },
  {
    id: '5',
    name: 'Yaoundé Medical Center',
    description: 'Private healthcare facility offering specialized medical services.',
    sector: 'Healthcare',
    founded: '2017',
    headquarters: 'Yaoundé, Cameroon',
    valuation: 18500000,
    revenue: 7200000,
    employees: 89,
    status: 'active',
    metrics: {
      revenueGrowth: 18,
      profitMargin: 25,
      customerCount: 15000,
      marketShare: 6,
    },
  },
];

const initialDocuments: Document[] = [
  { id: '1', name: 'Q4 2024 Performance Report', type: 'pdf', size: '2.4 MB', category: 'Reports', uploadedAt: '2024-12-15', uploadedBy: 'Admin', url: '#', isPublic: false, accessLevel: 'investors', downloads: 45 },
  { id: '2', name: 'Annual Financial Statements 2024', type: 'excel', size: '4.8 MB', category: 'Financial', uploadedAt: '2024-12-10', uploadedBy: 'Admin', url: '#', isPublic: false, accessLevel: 'investors', downloads: 32 },
  { id: '3', name: 'Portfolio Allocation Summary', type: 'pdf', size: '1.2 MB', category: 'Reports', uploadedAt: '2024-12-05', uploadedBy: 'Admin', url: '#', isPublic: false, accessLevel: 'investors', downloads: 28 },
  { id: '4', name: 'ESG Impact Report 2024', type: 'pdf', size: '5.6 MB', category: 'ESG', uploadedAt: '2024-11-28', uploadedBy: 'Admin', url: '#', isPublic: true, accessLevel: 'all', downloads: 67 },
];

const initialNotifications: Notification[] = [
  { id: '1', title: 'New Document Available', message: 'Q4 2024 Performance Report has been uploaded to your document vault.', type: 'info', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), read: false, actionUrl: '/documents', actionLabel: 'View Document' },
  { id: '2', title: 'Portfolio Update', message: 'TechVentures Africa valuation increased by 18.9% following Series B funding.', type: 'success', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), read: false, actionUrl: '/portfolio', actionLabel: 'View Portfolio' },
  { id: '3', title: 'Dividend Payment', message: 'Dividend payment of $125,000 scheduled for December 31, 2024.', type: 'success', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), read: true },
  { id: '4', title: 'Board Meeting', message: 'Annual General Meeting scheduled for January 15, 2025.', type: 'info', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), read: true },
];

const initialPerformance: PerformanceData[] = [
  { date: '2023-01', portfolioValue: 10000000, invested: 10000000, benchmark: 10000000 },
  { date: '2023-02', portfolioValue: 10250000, invested: 10000000, benchmark: 10100000 },
  { date: '2023-03', portfolioValue: 10500000, invested: 13200000, benchmark: 10200000 },
  { date: '2023-04', portfolioValue: 10800000, invested: 13200000, benchmark: 10350000 },
  { date: '2023-05', portfolioValue: 11100000, invested: 13200000, benchmark: 10450000 },
  { date: '2023-06', portfolioValue: 11450000, invested: 13200000, benchmark: 10600000 },
  { date: '2023-07', portfolioValue: 11800000, invested: 16000000, benchmark: 10750000 },
  { date: '2023-08', portfolioValue: 12100000, invested: 16000000, benchmark: 10850000 },
  { date: '2023-09', portfolioValue: 12450000, invested: 16000000, benchmark: 11000000 },
  { date: '2023-10', portfolioValue: 12800000, invested: 16000000, benchmark: 11150000 },
  { date: '2023-11', portfolioValue: 13150000, invested: 16000000, benchmark: 11300000 },
  { date: '2023-12', portfolioValue: 13500000, invested: 16000000, benchmark: 11450000 },
  { date: '2024-01', portfolioValue: 14200000, invested: 18200000, benchmark: 11600000 },
  { date: '2024-02', portfolioValue: 14600000, invested: 18200000, benchmark: 11750000 },
  { date: '2024-03', portfolioValue: 15000000, invested: 18200000, benchmark: 11900000 },
  { date: '2024-04', portfolioValue: 15450000, invested: 18200000, benchmark: 12050000 },
  { date: '2024-05', portfolioValue: 15900000, invested: 18200000, benchmark: 12200000 },
  { date: '2024-06', portfolioValue: 16350000, invested: 18200000, benchmark: 12350000 },
  { date: '2024-07', portfolioValue: 16800000, invested: 18200000, benchmark: 12500000 },
  { date: '2024-08', portfolioValue: 17250000, invested: 18200000, benchmark: 12650000 },
  { date: '2024-09', portfolioValue: 17800000, invested: 20050000, benchmark: 12800000 },
  { date: '2024-10', portfolioValue: 18200000, invested: 20050000, benchmark: 12950000 },
  { date: '2024-11', portfolioValue: 18650000, invested: 20050000, benchmark: 13100000 },
  { date: '2024-12', portfolioValue: 19100000, invested: 20050000, benchmark: 13250000 },
];

const initialMessages: Message[] = [
  {
    id: '1',
    senderId: 'admin',
    senderName: 'TerraVest Support',
    senderAvatar: 'https://ui-avatars.com/api/?name=TerraVest&background=8FB8A3&color=fff',
    recipientId: '1',
    subject: 'Welcome to TerraVest Investor Portal',
    content: 'Dear Investor,\n\nWelcome to the TerraVest Investor Portal. You now have access to your portfolio performance, documents, and investment insights.\n\nIf you have any questions, please do not hesitate to contact us.\n\nBest regards,\nThe TerraVest Team',
    sentAt: '2023-01-15T10:00:00Z',
    read: true,
  },
  {
    id: '2',
    senderId: 'admin',
    senderName: 'TerraVest Support',
    senderAvatar: 'https://ui-avatars.com/api/?name=TerraVest&background=8FB8A3&color=fff',
    recipientId: '1',
    subject: 'Q4 2024 Performance Report Available',
    content: 'Dear Investor,\n\nThe Q4 2024 Performance Report is now available in your document vault. Please review it at your convenience.\n\nKey highlights:\n- Portfolio value increased by 5.2%\n- New investment in Yaoundé Medical Center\n- Dividend payment scheduled for Dec 31\n\nBest regards,\nThe TerraVest Team',
    sentAt: '2024-12-15T09:00:00Z',
    read: false,
  },
];

// Storage keys
const STORAGE_KEYS = {
  INVESTORS: 'terravest_investors',
  COMPANIES: 'terravest_companies',
  DOCUMENTS: 'terravest_documents',
  NOTIFICATIONS: 'terravest_notifications',
  PERFORMANCE: 'terravest_performance',
  MESSAGES: 'terravest_messages',
  CURRENT_USER: 'terravest_current_user',
};

// Initialize storage with default data - ALWAYS reset to ensure fresh data
export function initializeStorage() {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(STORAGE_KEYS.INVESTORS, JSON.stringify(initialInvestors));
  localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(initialCompanies));
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(initialDocuments));
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initialNotifications));
  localStorage.setItem(STORAGE_KEYS.PERFORMANCE, JSON.stringify(initialPerformance));
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(initialMessages));
}

// Generic get/set functions
export function getItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Specific data getters/setters
export const store = {
  getInvestors: (): Investor[] => getItem(STORAGE_KEYS.INVESTORS) || initialInvestors,
  setInvestors: (investors: Investor[]) => setItem(STORAGE_KEYS.INVESTORS, investors),
  
  getCompanies: (): Company[] => getItem(STORAGE_KEYS.COMPANIES) || initialCompanies,
  setCompanies: (companies: Company[]) => setItem(STORAGE_KEYS.COMPANIES, companies),
  
  getDocuments: (): Document[] => getItem(STORAGE_KEYS.DOCUMENTS) || initialDocuments,
  setDocuments: (documents: Document[]) => setItem(STORAGE_KEYS.DOCUMENTS, documents),
  
  getNotifications: (): Notification[] => getItem(STORAGE_KEYS.NOTIFICATIONS) || initialNotifications,
  setNotifications: (notifications: Notification[]) => setItem(STORAGE_KEYS.NOTIFICATIONS, notifications),
  
  getPerformance: (): PerformanceData[] => getItem(STORAGE_KEYS.PERFORMANCE) || initialPerformance,
  setPerformance: (performance: PerformanceData[]) => setItem(STORAGE_KEYS.PERFORMANCE, performance),
  
  getMessages: (): Message[] => getItem(STORAGE_KEYS.MESSAGES) || initialMessages,
  setMessages: (messages: Message[]) => setItem(STORAGE_KEYS.MESSAGES, messages),
  
  getCurrentUser: (): User | null => getItem(STORAGE_KEYS.CURRENT_USER),
  setCurrentUser: (user: User | null) => setItem(STORAGE_KEYS.CURRENT_USER, user),
  clearCurrentUser: () => localStorage.removeItem(STORAGE_KEYS.CURRENT_USER),
};

// Helper functions
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return formatDate(dateString);
}
