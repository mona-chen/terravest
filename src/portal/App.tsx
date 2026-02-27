import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PortfolioPage from './pages/PortfolioPage';
import DocumentsPage from './pages/DocumentsPage';
import ReportsPage from './pages/ReportsPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import InvestmentOpportunitiesPage from './pages/InvestmentOpportunitiesPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import UsersPage from './pages/admin/UsersPage';
import PortfoliosPage from './pages/admin/PortfoliosPage';
import AdminOpportunitiesPage from './pages/admin/AdminOpportunitiesPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import CapitalCallsPage from './pages/CapitalCallsPage';
import TaxDocumentsPage from './pages/TaxDocumentsPage';
import CompliancePage from './pages/CompliancePage';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      <Route 
        path="/" 
        element={isAuthenticated ? (
          <DataProvider>
            <Layout />
          </DataProvider>
        ) : (
          <Navigate to="/login" />
        )}
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="portfolio/:companyId" element={<CompanyDetailPage />} />
        <Route path="opportunities" element={<InvestmentOpportunitiesPage />} />
        <Route path="capital-calls" element={<CapitalCallsPage />} />
        <Route path="tax-documents" element={<TaxDocumentsPage />} />
        <Route path="compliance" element={<CompliancePage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={isAuthenticated ? (
          <DataProvider>
            <AdminLayout />
          </DataProvider>
        ) : (
          <Navigate to="/login" />
        )}
      >
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="portfolios" element={<PortfoliosPage />} />
        <Route path="opportunities" element={<AdminOpportunitiesPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="analytics" element={<ReportsPage />} />
        <Route path="notifications" element={<AdminNotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
