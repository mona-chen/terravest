import { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  PieChart,
  TrendingUp,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  Search,
  ChevronDown,
  User,
  Bell,
  Shield,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Portfolios', path: '/admin/portfolios', icon: PieChart },
  { name: 'Opportunities', path: '/admin/opportunities', icon: TrendingUp },
  { name: 'Documents', path: '/admin/documents', icon: FileText },
  { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/users?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="h-screen flex bg-[#0A0A0A] overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:fixed inset-y-0 left-0 z-50 w-64 bg-[#141414] border-r border-[#2A2A2A] transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#2A2A2A] flex-shrink-0">
          <NavLink to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#8FB8A3] flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div>
              <span className="text-lg font-semibold text-white">TerraVest</span>
              <span className="text-xs text-[#8FB8A3] block -mt-1">Admin</span>
            </div>
          </NavLink>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto text-white/50 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px - 80px)' }}>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#8FB8A3]/10 text-[#8FB8A3]' 
                    : 'text-white/60 hover:bg-[#1A1A1A] hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-[#8FB8A3] rounded-full" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2A2A2A] bg-[#141414]">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/60 hover:bg-[#1A1A1A] hover:text-white transition-all duration-200"
          >
            <Building2 className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">Back to Portal</span>
          </NavLink>
          <button 
            onClick={logout}
            className="mt-1 flex items-center gap-3 px-4 py-2.5 w-full text-white/60 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#141414]/80 backdrop-blur-md border-b border-[#2A2A2A] flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-white/50 hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <form onSubmit={handleSearch} className="relative max-w-md flex-1 hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users, portfolios..."
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-11 pr-4 py-2 text-sm text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
              />
            </form>
          </div>

          <div className="flex items-center gap-3">
            <NavLink 
              to="/admin/notifications"
              className="relative p-2 text-white/50 hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </NavLink>

            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#1A1A1A] transition-colors"
              >
                <img 
                  src={user?.avatar} 
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-white/40">Administrator</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl py-2 animate-fadeIn z-50">
                  <div className="px-4 py-3 border-b border-[#2A2A2A]">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-white/40">{user?.email}</p>
                  </div>
                  <NavLink 
                    to="/admin/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-white/60 hover:text-white hover:bg-[#2A2A2A] transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </NavLink>
                  <div className="border-t border-[#2A2A2A] mt-2 pt-2">
                    <button 
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
