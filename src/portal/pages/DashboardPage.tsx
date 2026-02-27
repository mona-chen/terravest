import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  FileText,
  Bell,
  Building2,
  Eye,
  Plus,
  PieChart as PieChartIcon,
  MessageSquare,
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { formatCurrency, formatRelativeTime } from '../data/store';

const sectorColors = ['#8FB8A3', '#7BA391', '#6B9A82', '#5A8F73', '#4A8564'];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { performance, notifications, companies, documents } = useData();
  const [timeRange, setTimeRange] = useState('1Y');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate KPIs
  const totalValue = companies.reduce((sum, c) => sum + c.valuation, 0);
  const totalRevenue = companies.reduce((sum, c) => sum + c.revenue, 0);
  const avgGrowth = companies.length > 0 
    ? companies.reduce((sum, c) => sum + c.metrics.revenueGrowth, 0) / companies.length 
    : 0;
  
  const latestPerformance = performance[performance.length - 1];
  const firstPerformance = performance[0];
  const totalReturn = firstPerformance 
    ? ((latestPerformance.portfolioValue - firstPerformance.portfolioValue) / firstPerformance.portfolioValue) * 100 
    : 0;

  // Filter performance data
  const getFilteredPerformance = () => {
    const months = timeRange === '1M' ? 1 : timeRange === '3M' ? 3 : timeRange === '6M' ? 6 : timeRange === '1Y' ? 12 : performance.length;
    return performance.slice(-months);
  };

  const filteredPerformance = getFilteredPerformance();

  // Sector allocation
  const sectorAllocation = companies.map((company, index) => ({
    name: company.sector,
    value: totalValue > 0 ? Math.round((company.valuation / totalValue) * 100) : 0,
    color: sectorColors[index % sectorColors.length],
  }));

  const recentNotifications = notifications.slice(0, 3);
  const recentDocuments = documents.slice(0, 3);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-[#8FB8A3]/30 border-t-[#8FB8A3] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#8FB8A3]/20 to-transparent border border-[#8FB8A3]/30 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">
              Welcome back, {user?.name?.split(' ')[0] || 'Investor'}
            </h1>
            <p className="text-white/50">
              Here's what's happening with your portfolio today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/opportunities')}
              className="flex items-center gap-2 px-4 py-2 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">New Investment</span>
            </button>
            <NavLink 
              to="/reports"
              className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Reports</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-[#8FB8A3]/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#8FB8A3]" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalReturn >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span>+{totalReturn.toFixed(1)}%</span>
            </div>
          </div>
          <p className="text-white/50 text-sm mb-1">Total Portfolio Value</p>
          <p className="text-2xl font-semibold text-white">{formatCurrency(totalValue)}</p>
          <p className="text-sm text-white/40 mt-2">Across {companies.length} companies</p>
        </div>

        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-green-400">+{avgGrowth.toFixed(1)}%</span>
          </div>
          <p className="text-white/50 text-sm mb-1">Combined Revenue</p>
          <p className="text-2xl font-semibold text-white">{formatCurrency(totalRevenue)}</p>
          <p className="text-sm text-white/40 mt-2">Annual revenue</p>
        </div>

        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Percent className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm text-green-400">+{avgGrowth.toFixed(1)}%</span>
          </div>
          <p className="text-white/50 text-sm mb-1">Avg. Growth Rate</p>
          <p className="text-2xl font-semibold text-white">{avgGrowth.toFixed(1)}%</p>
          <p className="text-sm text-white/40 mt-2">Revenue growth</p>
        </div>

        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-[#8FB8A3]">{companies.filter(c => c.status === 'active').length} active</span>
          </div>
          <p className="text-white/50 text-sm mb-1">Portfolio Companies</p>
          <p className="text-2xl font-semibold text-white">{companies.length}</p>
          <p className="text-sm text-white/40 mt-2">In {new Set(companies.map(c => c.sector)).size} sectors</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={() => navigate('/opportunities')}
          className="flex items-center gap-3 p-4 bg-[#141414] border border-[#2A2A2A] rounded-xl hover:border-[#8FB8A3] hover:bg-[#1A1A1A] transition-all group"
        >
          <div className="w-10 h-10 bg-[#8FB8A3]/10 rounded-lg flex items-center justify-center group-hover:bg-[#8FB8A3]/20 transition-colors">
            <TrendingUp className="w-5 h-5 text-[#8FB8A3]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">Invest</p>
            <p className="text-xs text-white/40">New opportunity</p>
          </div>
        </button>
        <button 
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-3 p-4 bg-[#141414] border border-[#2A2A2A] rounded-xl hover:border-[#8FB8A3] hover:bg-[#1A1A1A] transition-all group"
        >
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
            <PieChartIcon className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">Portfolio</p>
            <p className="text-xs text-white/40">View holdings</p>
          </div>
        </button>
        <button 
          onClick={() => navigate('/documents')}
          className="flex items-center gap-3 p-4 bg-[#141414] border border-[#2A2A2A] rounded-xl hover:border-[#8FB8A3] hover:bg-[#1A1A1A] transition-all group"
        >
          <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
            <FileText className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">Documents</p>
            <p className="text-xs text-white/40">View files</p>
          </div>
        </button>
        <button 
          onClick={() => navigate('/messages')}
          className="flex items-center gap-3 p-4 bg-[#141414] border border-[#2A2A2A] rounded-xl hover:border-[#8FB8A3] hover:bg-[#1A1A1A] transition-all group"
        >
          <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
            <MessageSquare className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">Messages</p>
            <p className="text-xs text-white/40">Contact team</p>
          </div>
        </button>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Portfolio Performance</h3>
              <p className="text-sm text-white/40">Value vs. Benchmark over time</p>
            </div>
            <div className="flex bg-[#1A1A1A] rounded-lg p-1">
              {['1M', '3M', '6M', '1Y', 'ALL'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    timeRange === range 
                      ? 'bg-[#8FB8A3] text-[#0A0A0A]' 
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredPerformance}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8FB8A3" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8FB8A3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#666666" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.toLocaleString('default', { month: 'short' })}`;
                  }}
                />
                <YAxis 
                  stroke="#666666" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A', 
                    border: '1px solid #2A2A2A',
                    borderRadius: '8px',
                  }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area 
                  type="monotone" 
                  dataKey="portfolioValue" 
                  stroke="#8FB8A3" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  name="Portfolio"
                />
                <Area 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke="#666666" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="none" 
                  name="Benchmark"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-6">Allocation</h3>
          <div className="h-48 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sectorAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 max-h-40 overflow-auto">
            {sectorAllocation.slice(0, 5).map((sector) => (
              <div key={sector.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }} />
                  <span className="text-sm text-white/70">{sector.name}</span>
                </div>
                <span className="text-sm text-white">{sector.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Portfolio Companies */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Portfolio Companies</h3>
              <p className="text-sm text-white/40">By valuation</p>
            </div>
            <NavLink to="/portfolio" className="text-sm text-[#8FB8A3] hover:underline">
              View All
            </NavLink>
          </div>

          <div className="space-y-3">
            {companies.slice(0, 5).map((company) => (
              <NavLink
                key={company.id}
                to={`/portfolio/${company.id}`}
                className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg hover:bg-[#2A2A2A] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#8FB8A3]/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#8FB8A3]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{company.name}</p>
                    <p className="text-xs text-white/40">{company.sector}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{formatCurrency(company.valuation)}</p>
                  <p className={`text-xs ${company.metrics.revenueGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    +{company.metrics.revenueGrowth}%
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Recent Activity</h3>
              <p className="text-sm text-white/40">Notifications & updates</p>
            </div>
            <NavLink to="/notifications" className="text-sm text-[#8FB8A3] hover:underline">
              View All
            </NavLink>
          </div>

          <div className="space-y-3">
            {recentNotifications.length === 0 ? (
              <div className="text-center py-8 text-white/40">
                <Bell className="w-8 h-8 mx-auto mb-2" />
                <p>No recent notifications</p>
              </div>
            ) : (
              recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 bg-[#1A1A1A] rounded-lg">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notification.type === 'success' ? 'bg-green-500/10' :
                    notification.type === 'warning' ? 'bg-yellow-500/10' :
                    'bg-blue-500/10'
                  }`}>
                    {notification.type === 'success' ? <TrendingUp className="w-4 h-4 text-green-400" /> :
                     notification.type === 'warning' ? <Bell className="w-4 h-4 text-yellow-400" /> :
                     <FileText className="w-4 h-4 text-blue-400" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{notification.title}</p>
                    <p className="text-xs text-white/50 mt-0.5 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-white/30 mt-1">{formatRelativeTime(notification.createdAt)}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-[#8FB8A3] rounded-full flex-shrink-0 mt-1" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Recent Documents</h3>
            <p className="text-sm text-white/40">Recently uploaded files</p>
          </div>
          <NavLink to="/documents" className="text-sm text-[#8FB8A3] hover:underline">
            View All
          </NavLink>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentDocuments.map((doc) => (
            <div 
              key={doc.id} 
              onClick={() => navigate(`/documents?doc=${doc.id}`)}
              className="p-4 bg-[#1A1A1A] rounded-lg hover:bg-[#2A2A2A] transition-colors group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <FileText className="w-8 h-8 text-[#8FB8A3]" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/documents?doc=${doc.id}`);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-white/30 hover:text-white hover:bg-[#3A3A3A] rounded transition-all"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm font-medium text-white mb-1 line-clamp-1">{doc.name}</p>
              <p className="text-xs text-white/40">{doc.category} • {doc.size}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
