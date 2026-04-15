import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';
import type { User, Company, Document } from './types';

export interface AdminDashboardData {
  totalUsers: number;
  activeInvestors: number;
  totalAUM: number;
  totalCompanies: number;
  pendingNotifications: number;
}

export interface AdminPortfolio {
  id: string;
  userId: string;
  email: string;
  name: string;
  totalInvested: number;
  totalValue: number;
  holdingsCount: number;
  holdings: {
    id: string;
    shares: number;
    purchasePrice: number;
    currentPrice: number;
    value: number;
    company: Company;
  }[];
}

export interface AdminOpportunity {
  id: string;
  title: string;
  description: string;
  company: Company;
  targetAmount: number;
  raisedAmount: number;
  minimumInvestment: number;
  maxInvestment?: number;
  status: 'OPEN' | 'CLOSED';
}

export interface AnalyticsData {
  usersByRole: { role: string; _count: { id: number } }[];
  companiesBySector: { sector: string; _count: { id: number } }[];
  totalAUM: number;
  recentInvestors: {
    id: string;
    email: string;
    name: string;
    totalInvested: number;
    joinedAt: string;
  }[];
}

export const adminApi = {
  getDashboard: () =>
    apiClient.get<AdminDashboardData>(ENDPOINTS.ADMIN.DASHBOARD),

  getUsers: () =>
    apiClient.get<User[]>(ENDPOINTS.ADMIN.USERS),

  getUser: (id: string) =>
    apiClient.get<User>(`${ENDPOINTS.ADMIN.USERS}/${id}`),

  updateUser: (id: string, data: Partial<User>) =>
    apiClient.patch<User>(`${ENDPOINTS.ADMIN.USERS}/${id}`, data),

  getCompanies: () =>
    apiClient.get<Company[]>(ENDPOINTS.ADMIN.COMPANIES),

  createCompany: (data: Partial<Company>) =>
    apiClient.post<Company>(ENDPOINTS.ADMIN.COMPANIES, data),

  updateCompany: (id: string, data: Partial<Company>) =>
    apiClient.patch<Company>(`${ENDPOINTS.ADMIN.COMPANIES}/${id}`, data),

  deleteCompany: (id: string) =>
    apiClient.delete<void>(`${ENDPOINTS.ADMIN.COMPANIES}/${id}`),

  getDocuments: () =>
    apiClient.get<Document[]>(ENDPOINTS.ADMIN.DOCUMENTS),

  createDocument: (data: Partial<Document>) =>
    apiClient.post<Document>(ENDPOINTS.ADMIN.DOCUMENTS, data),

  deleteDocument: (id: string) =>
    apiClient.delete<void>(`${ENDPOINTS.ADMIN.DOCUMENTS}/${id}`),

  getPortfolios: () =>
    apiClient.get<AdminPortfolio[]>(ENDPOINTS.ADMIN.PORTFOLIOS),

  getOpportunities: () =>
    apiClient.get<AdminOpportunity[]>(ENDPOINTS.ADMIN.OPPORTUNITIES),

  getAnalytics: () =>
    apiClient.get<AnalyticsData>(ENDPOINTS.ADMIN.ANALYTICS),
};
