export interface Portfolio {
  id: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  allocation: number;
  sector: string;
  status: 'active' | 'pending' | 'exited';
}

export interface PerformanceData {
  month: string;
  value: number;
  benchmark: number;
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'excel' | 'doc';
  size: string;
  date: string;
  category: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  date: string;
  read: boolean;
}

export const portfolioData: Portfolio[] = [
  { id: '1', name: 'Africapital Finance', value: 45000000, change: 2300000, changePercent: 5.4, allocation: 18, sector: 'Finance', status: 'active' },
  { id: '2', name: 'Douala Logistics Hub', value: 32000000, change: 1800000, changePercent: 6.0, allocation: 13, sector: 'Infrastructure', status: 'active' },
  { id: '3', name: 'GreenPower Cameroon', value: 28000000, change: 1200000, changePercent: 4.5, allocation: 11, sector: 'Energy', status: 'active' },
  { id: '4', name: 'TechVentures Africa', value: 22000000, change: 3500000, changePercent: 18.9, allocation: 9, sector: 'Technology', status: 'active' },
  { id: '5', name: 'Yaoundé Medical Center', value: 18500000, change: 850000, changePercent: 4.8, allocation: 7, sector: 'Healthcare', status: 'active' },
  { id: '6', name: 'Cocoa Processing Co.', value: 15000000, change: -500000, changePercent: -3.2, allocation: 6, sector: 'Agriculture', status: 'active' },
  { id: '7', name: 'Libreville Resort', value: 12000000, change: 600000, changePercent: 5.3, allocation: 5, sector: 'Hospitality', status: 'active' },
  { id: '8', name: 'Urban Developments Ltd', value: 8500000, change: 420000, changePercent: 5.2, allocation: 3, sector: 'Real Estate', status: 'pending' },
];

export const performanceHistory: PerformanceData[] = [
  { month: 'Jan', value: 100, benchmark: 100 },
  { month: 'Feb', value: 104, benchmark: 102 },
  { month: 'Mar', value: 108, benchmark: 103 },
  { month: 'Apr', value: 112, benchmark: 105 },
  { month: 'May', value: 118, benchmark: 106 },
  { month: 'Jun', value: 124, benchmark: 108 },
  { month: 'Jul', value: 128, benchmark: 109 },
  { month: 'Aug', value: 135, benchmark: 111 },
  { month: 'Sep', value: 142, benchmark: 112 },
  { month: 'Oct', value: 148, benchmark: 114 },
  { month: 'Nov', value: 156, benchmark: 115 },
  { month: 'Dec', value: 164, benchmark: 117 },
];

export const documents: Document[] = [
  { id: '1', name: 'Q4 2024 Performance Report', type: 'pdf', size: '2.4 MB', date: '2024-12-15', category: 'Reports' },
  { id: '2', name: 'Annual Financial Statements 2024', type: 'excel', size: '4.8 MB', date: '2024-12-10', category: 'Financial' },
  { id: '3', name: 'Portfolio Allocation Summary', type: 'pdf', size: '1.2 MB', date: '2024-12-05', category: 'Reports' },
  { id: '4', name: 'ESG Impact Report 2024', type: 'pdf', size: '5.6 MB', date: '2024-11-28', category: 'ESG' },
  { id: '5', name: 'Board Meeting Minutes - Nov', type: 'pdf', size: '890 KB', date: '2024-11-20', category: 'Governance' },
  { id: '6', name: 'Investment Thesis - TechVentures', type: 'doc', size: '2.1 MB', date: '2024-11-15', category: 'Investments' },
  { id: '7', name: 'Q3 2024 Performance Report', type: 'pdf', size: '2.3 MB', date: '2024-10-15', category: 'Reports' },
  { id: '8', name: 'Risk Assessment Matrix', type: 'excel', size: '1.8 MB', date: '2024-10-01', category: 'Risk' },
];

export const notifications: Notification[] = [
  { id: '1', title: 'New Document Available', message: 'Q4 2024 Performance Report has been uploaded to your document vault.', type: 'info', date: '2 hours ago', read: false },
  { id: '2', title: 'Portfolio Update', message: 'TechVentures Africa valuation increased by 18.9% following Series B funding.', type: 'success', date: '1 day ago', read: false },
  { id: '3', title: 'Dividend Payment', message: 'Dividend payment of $125,000 scheduled for December 31, 2024.', type: 'success', date: '3 days ago', read: true },
  { id: '4', title: 'Board Meeting', message: 'Annual General Meeting scheduled for January 15, 2025.', type: 'info', date: '5 days ago', read: true },
];

export const kpis = {
  totalValue: 247500000,
  totalChange: 12400000,
  totalChangePercent: 5.28,
  ytdReturn: 18.4,
  irr: 24.2,
  multiple: 1.64,
};

export const sectorAllocation = [
  { name: 'Finance', value: 18, color: '#8FB8A3' },
  { name: 'Infrastructure', value: 13, color: '#7BA391' },
  { name: 'Energy', value: 11, color: '#6B9A82' },
  { name: 'Technology', value: 9, color: '#5A8F73' },
  { name: 'Healthcare', value: 7, color: '#4A8564' },
  { name: 'Agriculture', value: 6, color: '#3A7B55' },
  { name: 'Hospitality', value: 5, color: '#2A7146' },
  { name: 'Real Estate', value: 3, color: '#1A6737' },
  { name: 'Cash', value: 28, color: '#3A3A3A' },
];
