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

export const portalApi = {
  getDashboard: () =>
    apiClient.get<{ data: DashboardData }>(ENDPOINTS.PORTAL.DASHBOARD),

  getProfile: () =>
    apiClient.get<{ user: User }>(ENDPOINTS.PORTAL.PROFILE),

  updateProfile: (data: Partial<User>) =>
    apiClient.patch<{ user: User }>(ENDPOINTS.PORTAL.PROFILE, data),

  getPortfolio: () =>
    apiClient.get<{ data: PortfolioHolding[] }>(ENDPOINTS.PORTAL.PORTFOLIO),

  getCompanies: () =>
    apiClient.get<{ data: Company[] }>(ENDPOINTS.PORTAL.COMPANIES),

  getDocuments: () =>
    apiClient.get<{ data: Document[] }>(ENDPOINTS.PORTAL.DOCUMENTS),

  getNotifications: () =>
    apiClient.get<{ data: Notification[] }>(ENDPOINTS.PORTAL.NOTIFICATIONS),

  markNotificationRead: (id: string) =>
    apiClient.patch(ENDPOINTS.PORTAL.NOTIFICATIONS + `/${id}/read`, {}),

  getMessages: () =>
    apiClient.get<{ data: Message[] }>(ENDPOINTS.PORTAL.MESSAGES),

  sendMessage: (data: { subject: string; content: string }) =>
    apiClient.post<{ data: Message }>(ENDPOINTS.PORTAL.MESSAGES, data),

  getOpportunities: () =>
    apiClient.get<{ data: Opportunity[] }>(ENDPOINTS.PORTAL.OPPORTUNITIES),

  getCapitalCalls: () =>
    apiClient.get<{ data: CapitalCall[] }>(ENDPOINTS.PORTAL.CAPITAL_CALLS),
};
