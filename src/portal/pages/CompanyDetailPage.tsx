import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { 
  ArrowLeft, 
  Building2, 
  Globe, 
  MapPin, 
  Users, 
  DollarSign,
  Calendar,
  FileText,
  ExternalLink,
  BarChart3,
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { formatCurrency, formatDate } from '../data/store';

// Mock performance data for a company
const companyPerformance = [
  { month: 'Jan', revenue: 850, profit: 120 },
  { month: 'Feb', revenue: 920, profit: 145 },
  { month: 'Mar', revenue: 980, profit: 160 },
  { month: 'Apr', revenue: 1050, profit: 185 },
  { month: 'May', revenue: 1120, profit: 210 },
  { month: 'Jun', revenue: 1200, profit: 245 },
];

const companyDocuments = [
  { id: '1', name: 'Investment Thesis', type: 'pdf', date: '2023-01-15' },
  { id: '2', name: 'Q4 2024 Financial Report', type: 'excel', date: '2024-12-31' },
  { id: '3', name: 'Board Presentation', type: 'pdf', date: '2024-11-20' },
];

export default function CompanyDetailPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const { companies } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'documents'>('overview');

  const company = companies.find(c => c.id === companyId);

  if (!company) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-medium text-white mb-2">Company not found</h2>
        <p className="text-white/50 mb-4">The company you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/portfolio')}
          className="px-4 py-2 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors"
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Back button */}
      <button 
        onClick={() => navigate('/portfolio')}
        className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Portfolio</span>
      </button>

      {/* Company Header */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-[#8FB8A3]/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-[#8FB8A3]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white mb-1">{company.name}</h1>
              <p className="text-white/50 mb-3">{company.sector}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {company.headquarters}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Founded {company.founded}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {company.employees} employees
                </span>
                {company.website && (
                  <a 
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#8FB8A3] hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              company.status === 'active' ? 'bg-green-500/10 text-green-400' :
              company.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
              'bg-gray-500/10 text-gray-400'
            }`}>
              {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#141414] border border-[#2A2A2A] rounded-lg p-1 w-fit mb-6">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'financials', label: 'Financials', icon: DollarSign },
          { id: 'documents', label: 'Documents', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#8FB8A3] text-[#0A0A0A]'
                  : 'text-white/50 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
              <p className="text-white/50 text-sm mb-1">Valuation</p>
              <p className="text-xl font-semibold text-white">{formatCurrency(company.valuation)}</p>
            </div>
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
              <p className="text-white/50 text-sm mb-1">Annual Revenue</p>
              <p className="text-xl font-semibold text-white">{formatCurrency(company.revenue)}</p>
            </div>
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
              <p className="text-white/50 text-sm mb-1">Revenue Growth</p>
              <p className="text-xl font-semibold text-green-400">+{company.metrics.revenueGrowth}%</p>
            </div>
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
              <p className="text-white/50 text-sm mb-1">Profit Margin</p>
              <p className="text-xl font-semibold text-white">{company.metrics.profitMargin}%</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">About</h3>
            <p className="text-white/70 leading-relaxed">{company.description}</p>
          </div>

          {/* Performance Chart */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-6">Performance (Last 6 Months)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={companyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                  <XAxis dataKey="month" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#8FB8A3" strokeWidth={2} name="Revenue ($K)" />
                  <Line type="monotone" dataKey="profit" stroke="#22C55E" strokeWidth={2} name="Profit ($K)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Financials Tab */}
      {activeTab === 'financials' && (
        <div className="space-y-6">
          {/* Financial Metrics */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Key Metrics</h3>
              <div className="space-y-4">
                {[
                  { label: 'Revenue Growth', value: `+${company.metrics.revenueGrowth}%`, trend: 'up' },
                  { label: 'Profit Margin', value: `${company.metrics.profitMargin}%`, trend: 'neutral' },
                  { label: 'Customer Count', value: company.metrics.customerCount.toLocaleString(), trend: 'up' },
                  { label: 'Market Share', value: `${company.metrics.marketShare}%`, trend: 'up' },
                ].map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg">
                    <span className="text-white/70">{metric.label}</span>
                    <span className="font-medium text-white">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Revenue Breakdown</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={companyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                    <XAxis dataKey="month" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="revenue" fill="#8FB8A3" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
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
                <th className="text-left py-4 px-6 text-sm font-medium text-white/50">Document</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-white/50">Type</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-white/50">Date</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {companyDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-[#2A2A2A] table-row-hover">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#8FB8A3]" />
                      <span className="font-medium text-white">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 bg-[#1A1A1A] rounded-full text-xs text-white/60 uppercase">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-white/50">{formatDate(doc.date)}</td>
                  <td className="py-4 px-6">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#8FB8A3] hover:bg-[#8FB8A3]/10 rounded-lg transition-colors">
                      <FileText className="w-4 h-4" />
                      View
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
