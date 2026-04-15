import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { portalApi } from '@/lib/api';
import { useAuth } from './AuthContext';
import type { Document, Notification, Message, Company, PortfolioHolding, Opportunity, CapitalCall } from '@/lib/api/types';
import type { ComplianceData, ReportItem, SettingsData } from '@/lib/api/portal.api';

interface PerformancePoint {
  month: string;
  portfolioValue: number;
}

interface DataContextType {
  documents: Document[];
  notifications: Notification[];
  unreadCount: number;
  messages: Message[];
  companies: Company[];
  portfolio: PortfolioHolding[];
  opportunities: Opportunity[];
  capitalCalls: CapitalCall[];
  taxDocuments: Document[];
  compliance: ComplianceData | null;
  reports: ReportItem[];
  settings: SettingsData | null;
  performance: PerformancePoint[];
  isLoading: {
    documents: boolean;
    notifications: boolean;
    messages: boolean;
    companies: boolean;
    portfolio: boolean;
    opportunities: boolean;
    capitalCalls: boolean;
    taxDocuments: boolean;
    compliance: boolean;
    reports: boolean;
    settings: boolean;
  };
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  deleteNotification: (id: string) => void;
  markMessageRead: (id: string) => void;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [capitalCalls, setCapitalCalls] = useState<CapitalCall[]>([]);
  const [taxDocuments, setTaxDocuments] = useState<Document[]>([]);
  const [compliance, setCompliance] = useState<ComplianceData | null>(null);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [performance] = useState<PerformancePoint[]>([
    { month: 'Jan', portfolioValue: 850000 },
    { month: 'Feb', portfolioValue: 920000 },
    { month: 'Mar', portfolioValue: 980000 },
    { month: 'Apr', portfolioValue: 1050000 },
    { month: 'May', portfolioValue: 1120000 },
    { month: 'Jun', portfolioValue: 1200000 },
  ]);

  const [isLoading, setIsLoading] = useState({
    documents: false,
    notifications: false,
    messages: false,
    companies: false,
    portfolio: false,
    opportunities: false,
    capitalCalls: false,
    taxDocuments: false,
    compliance: false,
    reports: false,
    settings: false,
  });

  const fetchData = useCallback(async () => {
    setIsLoading({
      documents: true,
      notifications: true,
      messages: true,
      companies: true,
      portfolio: true,
      opportunities: true,
      capitalCalls: true,
      taxDocuments: true,
      compliance: true,
      reports: true,
      settings: true,
    });

    try {
      const [
        docsRes, notifRes, msgRes, compRes, portRes, oppRes, ccRes,
        taxRes, compRes2, repRes, setRes,
      ] = await Promise.allSettled([
        portalApi.getDocuments(),
        portalApi.getNotifications(),
        portalApi.getMessages(),
        portalApi.getCompanies(),
        portalApi.getPortfolio(),
        portalApi.getOpportunities(),
        portalApi.getCapitalCalls(),
        portalApi.getTaxDocuments(),
        portalApi.getCompliance(),
        portalApi.getReports(),
        portalApi.getSettings(),
      ]);

      if (docsRes.status === 'fulfilled') setDocuments(docsRes.value);
      if (notifRes.status === 'fulfilled') setNotifications(notifRes.value);
      if (msgRes.status === 'fulfilled') setMessages(msgRes.value);
      if (compRes.status === 'fulfilled') setCompanies(compRes.value);
      if (portRes.status === 'fulfilled') setPortfolio(portRes.value);
      if (oppRes.status === 'fulfilled') setOpportunities(oppRes.value);
      if (ccRes.status === 'fulfilled') setCapitalCalls(ccRes.value);
      if (taxRes.status === 'fulfilled') setTaxDocuments(taxRes.value);
      if (compRes2.status === 'fulfilled') setCompliance(compRes2.value);
      if (repRes.status === 'fulfilled') setReports(repRes.value);
      if (setRes.status === 'fulfilled') setSettings(setRes.value);
    } finally {
      setIsLoading({
        documents: false,
        notifications: false,
        messages: false,
        companies: false,
        portfolio: false,
        opportunities: false,
        capitalCalls: false,
        taxDocuments: false,
        compliance: false,
        reports: false,
        settings: false,
      });
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markNotificationRead = useCallback(async (id: string) => {
    try {
      await portalApi.markNotificationRead(id);
      const updated = notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      );
      setNotifications(updated);
    } catch {
    }
  }, [notifications]);

  const markAllNotificationsRead = useCallback(async () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
  }, [notifications]);

  const deleteNotification = useCallback((id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
  }, [notifications]);

  const markMessageRead = useCallback((id: string) => {
    const updated = messages.map(m => 
      m.id === id ? { ...m, read: true } : m
    );
    setMessages(updated);
  }, [messages]);

  const refreshData = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider
      value={{
        documents,
        notifications,
        unreadCount,
        messages,
        companies,
        portfolio,
        opportunities,
        capitalCalls,
        taxDocuments,
        compliance,
        reports,
        settings,
        performance,
        isLoading,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        markMessageRead,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
