import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { 
  Document, 
  Notification, 
  PerformanceData, 
  Message,
  Company 
} from '../types';
import { store } from '../data/store';

interface DataContextType {
  documents: Document[];
  notifications: Notification[];
  unreadCount: number;
  performance: PerformanceData[];
  messages: Message[];
  companies: Company[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  markMessageRead: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [documents] = useState<Document[]>(store.getDocuments());
  const [notifications, setNotifications] = useState<Notification[]>(store.getNotifications());
  const [performance] = useState<PerformanceData[]>(store.getPerformance());
  const [messages, setMessages] = useState<Message[]>(store.getMessages());
  const [companies] = useState<Company[]>(store.getCompanies());

  const unreadCount = notifications.filter(n => !n.read).length;

  const markNotificationRead = useCallback((id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    store.setNotifications(updated);
    setNotifications(updated);
  }, [notifications]);

  const markAllNotificationsRead = useCallback(() => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    store.setNotifications(updated);
    setNotifications(updated);
  }, [notifications]);

  const deleteNotification = useCallback((id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    store.setNotifications(updated);
    setNotifications(updated);
  }, [notifications]);

  const markMessageRead = useCallback((id: string) => {
    const updated = messages.map(m => 
      m.id === id ? { ...m, read: true } : m
    );
    store.setMessages(updated);
    setMessages(updated);
  }, [messages]);

  return (
    <DataContext.Provider
      value={{
        documents,
        notifications,
        unreadCount,
        performance,
        messages,
        companies,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        markMessageRead,
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
