import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  PieChart, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  FileText,
  Building2,
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const stats = [
  { label: 'Total Users', value: '156', change: '+12', trend: 'up', icon: Users },
  { label: 'AUM', value: '$247M', change: '+8.4%', trend: 'up', icon: DollarSign },
  { label: 'Portfolio Companies', value: '9', change: '+2', trend: 'up', icon: Building2 },
  { label: 'Active Investments', value: '12', change: '0', trend: 'neutral', icon: PieChart },
];

const recentActivity = [
  { id: 1, user: 'Jean-Pierre Moussa', action: 'New investment', amount: '$250,000', time: '2 min ago', type: 'investment' },
  { id: 2, user: 'Sarah Johnson', action: 'Document uploaded', item: 'Q4 Report 2024', time: '15 min ago', type: 'document' },
  { id: 3, user: 'Michael Chen', action: 'Profile updated', time: '1 hour ago', type: 'profile' },
  { id: 4, user: 'New user registered', action: 'Amara Okafor', time: '2 hours ago', type: 'user' },
];

const performanceData = [
  { month: 'Jan', value: 210, users: 120 },
  { month: 'Feb', value: 225, users: 125 },
  { month: 'Mar', value: 218, users: 130 },
  { month: 'Apr', value: 235, users: 135 },
  { month: 'May', value: 242, users: 140 },
  { month: 'Jun', value: 238, users: 145 },
  { month: 'Jul', value: 247, users: 156 },
];

const sectorData = [
  { name: 'Finance', value: 31 },
  { name: 'Infrastructure', value: 22 },
  { name: 'Energy', value: 19 },
  { name: 'Technology', value: 15 },
  { name: 'Healthcare', value: 13 },
];

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-[#8FB8A3]/30 border-t-[#8FB8A3] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Admin Dashboard</h1>
          <p className="text-white/50">Overview of platform performance and activity</p>
        </div>
        <div className="flex items-center gap-3">
          <NavLink 
            to="/admin/users/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-sm">Add User</span>
          </NavLink>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-[#8FB8A3]/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-[#8FB8A3]" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-400' : 
                stat.trend === 'down' ? 'text-red-400' : 'text-[#7A7A7A]'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : 
                 stat.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> : null}
                <span>{stat.change}</span>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Portfolio Performance */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Portfolio Growth</h3>
              <p className="text-sm text-white/40">AUM over time (in millions)</p>
            </div>
            <NavLink to="/admin/analytics" className="text-sm text-[#8FB8A3] hover:underline">
              View Details
            </NavLink>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="adminColorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8FB8A3" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8FB8A3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="month" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#8FB8A3" strokeWidth={2} fillOpacity={1} fill="url(#adminColorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">User Growth</h3>
              <p className="text-sm text-white/40">New users over time</p>
            </div>
            <NavLink to="/admin/users" className="text-sm text-[#8FB8A3] hover:underline">
              View All
            </NavLink>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="month" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="users" fill="#8FB8A3" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Recent Activity</h3>
              <p className="text-sm text-white/40">Latest platform actions</p>
            </div>
            <NavLink to="/admin/analytics" className="text-sm text-[#8FB8A3] hover:underline">
              View All
            </NavLink>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 bg-[#1A1A1A] rounded-lg">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'investment' ? 'bg-green-500/10' :
                  activity.type === 'document' ? 'bg-blue-500/10' :
                  activity.type === 'user' ? 'bg-purple-500/10' :
                  'bg-orange-500/10'
                }`}>
                  {activity.type === 'investment' ? <TrendingUp className="w-5 h-5 text-green-400" /> :
                   activity.type === 'document' ? <FileText className="w-5 h-5 text-blue-400" /> :
                   activity.type === 'user' ? <Users className="w-5 h-5 text-purple-400" /> :
                   <Activity className="w-5 h-5 text-orange-400" />
                  }
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{activity.user}</p>
                  <p className="text-xs text-white/50">
                    {activity.action} {activity.amount && `• ${activity.amount}`} {activity.item && `• ${activity.item}`}
                  </p>
                </div>
                <span className="text-xs text-white/30">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Sector Allocation</h3>
              <p className="text-sm text-white/40">By portfolio value</p>
            </div>
          </div>

          <div className="space-y-4">
            {sectorData.map((sector, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">{sector.name}</span>
                  <span className="text-sm text-white">{sector.value}%</span>
                </div>
                <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#8FB8A3] rounded-full transition-all duration-500"
                    style={{ width: `${sector.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <NavLink 
            to="/admin/portfolios"
            className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 border border-[#2A2A2A] rounded-lg text-white/60 hover:text-white hover:border-[#8FB8A3] transition-colors"
          >
            <PieChart className="w-4 h-4" />
            <span className="text-sm">Manage Portfolios</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
