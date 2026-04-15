import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LandingLayout from './layouts/LandingLayout';
import InvestmentCriteria from './pages/InvestmentCriteria'
import Leadership from './pages/Leadership'
import CaseStudies from './pages/CaseStudies'
import News from './pages/News'
import Careers from './pages/Careers'
import { AuthProvider, useAuth } from './portal/contexts/AuthContext';
import { DataProvider } from './portal/contexts/DataContext';
import PortalLayout from './portal/components/Layout';
import AdminLayout from './portal/components/AdminLayout';
import LoginPage from './portal/pages/LoginPage';
import DashboardPage from './portal/pages/DashboardPage';
import PortfolioPage from './portal/pages/PortfolioPage';
import CompanyDetailPage from './portal/pages/CompanyDetailPage';
import InvestmentOpportunitiesPage from './portal/pages/InvestmentOpportunitiesPage';
import CapitalCallsPage from './portal/pages/CapitalCallsPage';
import DocumentsPage from './portal/pages/DocumentsPage';
import TaxDocumentsPage from './portal/pages/TaxDocumentsPage';
import MessagesPage from './portal/pages/MessagesPage';
import NotificationsPage from './portal/pages/NotificationsPage';
import ProfilePage from './portal/pages/ProfilePage';
import SettingsPage from './portal/pages/SettingsPage';
import CompliancePage from './portal/pages/CompliancePage';
import ReportsPage from './portal/pages/ReportsPage';
import AdminDashboardPage from './portal/pages/admin/AdminDashboardPage';
import AdminUsersPage from './portal/pages/admin/UsersPage';
import AdminPortfoliosPage from './portal/pages/admin/PortfoliosPage';
import AdminOpportunitiesPage from './portal/pages/admin/AdminOpportunitiesPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('terravest_access_token');
  if (!token) {
    return <Navigate to="/portal/login" replace />;
  }
  return <>{children}</>;
}

function LoginRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/portal/dashboard" replace /> : <LoginPage />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />} />
      <Route path="/investment-criteria" element={<InvestmentCriteria />} />
      <Route path="/leadership" element={<Leadership />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/news" element={<News />} />
      <Route path="/careers" element={<Careers />} />
      <Route
        path="/portal/*"
        element={
          <AuthProvider>
            <DataProvider>
              <PortalRoutes />
            </DataProvider>
          </AuthProvider>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function PortalRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginRoute />} />
      <Route
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route element={<PortalLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:companyId" element={<CompanyDetailPage />} />
          <Route path="opportunities" element={<InvestmentOpportunitiesPage />} />
          <Route path="capital-calls" element={<CapitalCallsPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="tax-documents" element={<TaxDocumentsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="compliance" element={<CompliancePage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="admin/users" element={<AdminUsersPage />} />
          <Route path="admin/portfolios" element={<AdminPortfoliosPage />} />
          <Route path="admin/opportunities" element={<AdminOpportunitiesPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
