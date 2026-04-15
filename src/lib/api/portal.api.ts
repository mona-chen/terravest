import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';
import type {
  DashboardData,
  User,
  PortfolioHolding,
  Company,
  Document,
  Notification,
  Message,
  Opportunity,
  CapitalCall,
} from './types';

export interface ComplianceRequirement {
  id: string;
  category: 'identity' | 'address' | 'financial' | 'accreditation';
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'required';
  documents: string[];
  uploadedFiles?: string[];
}

export interface ComplianceData {
  overall: string;
  completed: number;
  total: number;
  lastUpdated: string;
  nextReview: string;
  requirements: ComplianceRequirement[];
  kycStatus: string;
  accreditationStatus: string;
}

export interface ReportItem {
  id: string;
  name: string;
  type: string;
  date: string;
  status: string;
}

export interface SettingsData {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  portfolioUpdates: boolean;
  documentAlerts: boolean;
  dividendNotifications: boolean;
  marketNews: boolean;
  twoFactorEnabled: boolean;
}

export const portalApi = {
  getDashboard: () =>
    apiClient.get<DashboardData>(ENDPOINTS.PORTAL.DASHBOARD),

  getProfile: () =>
    apiClient.get<{ user: User }>(ENDPOINTS.PORTAL.PROFILE),

  updateProfile: (data: Partial<User>) =>
    apiClient.patch<{ user: User }>(ENDPOINTS.PORTAL.PROFILE, data),

  getPortfolio: () =>
    apiClient.get<PortfolioHolding[]>(ENDPOINTS.PORTAL.PORTFOLIO),

  getCompanies: () =>
    apiClient.get<Company[]>(ENDPOINTS.PORTAL.COMPANIES),

  getDocuments: () =>
    apiClient.get<Document[]>(ENDPOINTS.PORTAL.DOCUMENTS),

  getNotifications: () =>
    apiClient.get<Notification[]>(ENDPOINTS.PORTAL.NOTIFICATIONS),

  markNotificationRead: (id: string) =>
    apiClient.patch(ENDPOINTS.PORTAL.NOTIFICATIONS + `/${id}/read`, {}),

  getMessages: () =>
    apiClient.get<Message[]>(ENDPOINTS.PORTAL.MESSAGES),

  sendMessage: (data: { subject: string; content: string }) =>
    apiClient.post<Message>(ENDPOINTS.PORTAL.MESSAGES, data),

  getOpportunities: () =>
    apiClient.get<Opportunity[]>(ENDPOINTS.PORTAL.OPPORTUNITIES),

  getCapitalCalls: () =>
    apiClient.get<CapitalCall[]>(ENDPOINTS.PORTAL.CAPITAL_CALLS),

  getTaxDocuments: () =>
    apiClient.get<Document[]>(ENDPOINTS.PORTAL.TAX_DOCUMENTS),

  getCompliance: () =>
    apiClient.get<ComplianceData>(ENDPOINTS.PORTAL.COMPLIANCE),

  getReports: () =>
    apiClient.get<ReportItem[]>(ENDPOINTS.PORTAL.REPORTS),

  getSettings: () =>
    apiClient.get<SettingsData>(ENDPOINTS.PORTAL.SETTINGS),

  updateSettings: (data: Partial<SettingsData>) =>
    apiClient.patch<SettingsData>(ENDPOINTS.PORTAL.SETTINGS, data),
};
