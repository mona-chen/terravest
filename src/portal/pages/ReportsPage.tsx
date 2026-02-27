import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  ChevronDown,
  FileText,
  PieChart,
  Activity,
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';
import { performanceHistory, sectorAllocation, portfolioData } from '../data/mockData';

const quarterlyData = [
  { quarter: 'Q1 2024', revenue: 12.5, expenses: 8.2, profit: 4.3 },
  { quarter: 'Q2 2024', revenue: 14.8, expenses: 9.1, profit: 5.7 },
  { quarter: 'Q3 2024', revenue: 16.2, expenses: 9.8, profit: 6.4 },
  { quarter: 'Q4 2024', revenue: 18.5, expenses: 10.5, profit: 8.0 },
];

const riskMetrics = [
  { name: 'Low Risk', value: 45, color: '#22C55E' },
  { name: 'Medium Risk', value: 35, color: '#F59E0B' },
  { name: 'High Risk', value: 20, color: '#EF4444' },
];

const reports = [
  { id: 1, name: 'Annual Performance Report 2024', type: 'Annual', date: 'Dec 31, 2024', status: 'Available' },
  { id: 2, name: 'Q4 2024 Quarterly Report', type: 'Quarterly', date: 'Dec 31, 2024', status: 'Available' },
  { id: 3, name: 'ESG Impact Assessment 2024', type: 'ESG', date: 'Dec 15, 2024', status: 'Available' },
  { id: 4, name: 'Risk Assessment Q4 2024', type: 'Risk', date: 'Dec 10, 2024', status: 'Available' },
  { id: 5, name: 'Portfolio Valuation Report', type: 'Valuation', date: 'Nov 30, 2024', status: 'Available' },
];

export default function ReportsPage() {
  const [selectedPeriod] = useState('2024');
  const [activeTab, setActiveTab] = useState('overview');

  const totalValue = portfolioData.reduce((sum, company) => sum + company.value, 0);
  const totalChange = portfolioData.reduce((sum, company) => sum + company.change, 0);
  const avgReturn = portfolioData.reduce((sum, company) => sum + company.changePercent, 0) / portfolioData.length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Reports & Analytics</h1>
          <p className="text-white/50">Detailed insights into your investment performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white transition-colors">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{selectedPeriod}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export Report</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#141414] border border-[#2A2A2A] rounded-lg p-1 w-fit">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'performance', label: 'Performance', icon: TrendingUp },
          { id: 'allocation', label: 'Allocation', icon: PieChart },
          { id: 'documents', label: 'Documents', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#8FB8A3] text-[#0A0A0A]'
                  : 'text-white/50 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-[#8FB8A3]" />
                <span className="text-sm text-white/50">Total Value</span>
              </div>
              <p className="text-2xl font-semibold text-white">${(totalValue / 1000000).toFixed(1)}M</p>
              <p className={`text-sm mt-1 ${totalChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalChange >= 0 ? '+' : ''}${(totalChange / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white/50">Avg. Return</span>
              </div>
              <p className="text-2xl font-semibold text-white">+{avgReturn.toFixed(1)}%</p>
              <p className="text-sm text-green-400 mt-1">+2.3% vs last period</p>
            </div>
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white/50">Volatility</span>
              </div>
              <p className="text-2xl font-semibold text-white">12.4%</p>
              <p className="text-sm text-green-400 mt-1">-1.2% vs last period</p>
            </div>
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <PieChart className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/50">Diversification</span>
              </div>
              <p className="text-2xl font-semibold text-white">8 Sectors</p>
              <p className="text-sm text-white/50 mt-1">Well diversified</p>
            </div>
          </div>

          {/* Charts row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-6">Portfolio Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                    <XAxis dataKey="month" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#8FB8A3" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="benchmark" stroke="#666666" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quarterly Performance */}
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-6">Quarterly Performance ($M)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={quarterlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                    <XAxis dataKey="quarter" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="revenue" fill="#8FB8A3" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" fill="#22C55E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-6">Historical Performance</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                  <XAxis dataKey="month" stroke="#666666" />
                  <YAxis stroke="#666666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#8FB8A3" strokeWidth={3} />
                  <Line type="monotone" dataKey="benchmark" stroke="#666666" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Allocation Tab */}
      {activeTab === 'allocation' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-6">Sector Allocation</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={sectorAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
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
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {sectorAllocation.slice(0, 6).map((sector) => (
                <div key={sector.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }} />
                  <span className="text-sm text-white/70">{sector.name}</span>
                  <span className="text-sm text-white ml-auto">{sector.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-6">Risk Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={riskMetrics}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {riskMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="text-left py-4 px-6 text-sm font-medium text-white/50">Report Name</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-white/50">Type</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-white/50">Date</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-white/50">Status</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-[#2A2A2A] table-row-hover">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#8FB8A3]" />
                      <span className="font-medium text-white">{report.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 bg-[#1A1A1A] rounded-full text-xs text-white/60">
                      {report.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-white/50">{report.date}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 bg-green-500/10 rounded-full text-xs text-green-400">
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#8FB8A3] hover:bg-[#8FB8A3]/10 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
