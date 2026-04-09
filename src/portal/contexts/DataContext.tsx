import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { portalApi } from '@/lib/api';
import type { Document, Notification, Message, Company, PortfolioHolding, Opportunity, CapitalCall } from '@/lib/api/types';

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
  performance: PerformancePoint[];
  isLoading: {
    documents: boolean;
    notifications: boolean;
    messages: boolean;
    companies: boolean;
    portfolio: boolean;
    opportunities: boolean;
    capitalCalls: boolean;
  };
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  deleteNotification: (id: string) => void;
  markMessageRead: (id: string) => void;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [capitalCalls, setCapitalCalls] = useState<CapitalCall[]>([]);
  const [performance] = useState<PerformancePoint[]>([
    { month: 'Jan', portfolioValue: 850000 },
    { month: 'Feb', portfolioValue: 920000 },
    { month: 'Mar', portfolioValue: 980000 },
    { month: 'Apr', portfolioValue: 1050000 },
    { month: 'May', portfolioValue: 1120000 },
    { month: 'Jun', portfolioValue: 1200000 },
  ]);
  
  const [isLoading, setIsLoading] = useState({
    documents: true,
    notifications: true,
    messages: true,
    companies: true,
    portfolio: true,
    opportunities: true,
    capitalCalls: true,
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
    });

    try {
      const [docsRes, notifRes, msgRes, compRes, portRes, oppRes, ccRes] = await Promise.allSettled([
        portalApi.getDocuments(),
        portalApi.getNotifications(),
        portalApi.getMessages(),
        portalApi.getCompanies(),
        portalApi.getPortfolio(),
        portalApi.getOpportunities(),
        portalApi.getCapitalCalls(),
      ]);

      if (docsRes.status === 'fulfilled') setDocuments(docsRes.value.data);
      if (notifRes.status === 'fulfilled') setNotifications(notifRes.value.data);
      if (msgRes.status === 'fulfilled') setMessages(msgRes.value.data);
      if (compRes.status === 'fulfilled') setCompanies(compRes.value.data);
      if (portRes.status === 'fulfilled') setPortfolio(portRes.value.data);
      if (oppRes.status === 'fulfilled') setOpportunities(oppRes.value.data);
      if (ccRes.status === 'fulfilled') setCapitalCalls(ccRes.value.data);
    } finally {
      setIsLoading({
        documents: false,
        notifications: false,
        messages: false,
        companies: false,
        portfolio: false,
        opportunities: false,
        capitalCalls: false,
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
