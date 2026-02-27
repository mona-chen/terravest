import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, Investor } from '../types';
import { store, initializeStorage, generateId } from '../data/store';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  changePassword: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    const savedUser = store.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const investors = store.getInvestors();
    const existingInvestor = investors.find(inv => inv.email.toLowerCase() === email.toLowerCase());
    
    if (existingInvestor) {
      const updatedInvestor = { ...existingInvestor, lastLogin: new Date().toISOString() };
      const updatedInvestors = investors.map(inv => inv.id === existingInvestor.id ? updatedInvestor : inv);
      store.setInvestors(updatedInvestors);
      
      setUser(updatedInvestor);
      store.setCurrentUser(updatedInvestor);
      
      setIsLoading(false);
      return { success: true };
    }
    
    const newInvestor: Investor = {
      id: generateId(),
      name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email.toLowerCase(),
      role: 'investor',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=8FB8A3&color=fff`,
      joinedAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      status: 'active',
      totalInvested: 0,
      currentValue: 0,
      totalReturn: 0,
      portfolio: [],
      documents: [],
      notifications: [],
    };
    
    store.setInvestors([...investors, newInvestor]);
    setUser(newInvestor);
    store.setCurrentUser(newInvestor);
    
    setIsLoading(false);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    store.clearCurrentUser();
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedUser = { ...user, ...updates };
    
    const investors = store.getInvestors();
    const updatedInvestors = investors.map(inv => inv.id === user.id ? updatedUser as Investor : inv);
    store.setInvestors(updatedInvestors);
    
    setUser(updatedUser);
    store.setCurrentUser(updatedUser);
    
    setIsLoading(false);
    return { success: true };
  }, [user]);

  const changePassword = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    return { success: true };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
