import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api';
import type { AdminPortfolio } from '@/lib/api/admin.api';
import { 
  Search, 
  Filter, 
  Plus, 
  Building2,
  TrendingUp,
  TrendingDown,
  Edit2,
  Trash2,
  Eye,
  Download,
} from 'lucide-react';

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

export default function PortfoliosPage() {
  const [portfolios, setPortfolios] = useState<AdminPortfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const data = await adminApi.getPortfolios();
        setPortfolios(data);
      } catch (err) {
        // silently fail
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  const statuses = ['All', 'Active', 'Pending', 'Exited'];

  const filteredPortfolios = portfolios.filter((p: AdminPortfolio) => {
    const matchesSearch = (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (p.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalValue = filteredPortfolios.reduce((sum: number, p: AdminPortfolio) => sum + (p.totalValue || 0), 0);
  const avgGrowth = filteredPortfolios.length > 0 
    ? filteredPortfolios.reduce((sum: number, p: AdminPortfolio) => {
        const growth = p.holdings?.reduce((hSum: number, h: any) => hSum + (h.company?.metricsRevenueGrowth || 0), 0) ?? 0;
        return sum + growth;
      }, 0) / filteredPortfolios.length 
    : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-[#8FB8A3]/30 border-t-[#8FB8A3] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Portfolios</h1>
          <p className="text-white/50">Manage investor portfolios and holdings</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Export</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Portfolio</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Total Value</p>
          <p className="text-xl font-semibold text-white">{formatCurrency(totalValue)}</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Portfolios</p>
          <p className="text-xl font-semibold text-white">{filteredPortfolios.length}</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Avg. Growth</p>
          <p className="text-xl font-semibold text-green-400">+{avgGrowth.toFixed(1)}%</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Active</p>
          <p className="text-xl font-semibold text-[#8FB8A3]">{filteredPortfolios.filter((p: AdminPortfolio) => p.status === 'ACTIVE').length}</p>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search portfolios..."
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-2.5 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
                showFilters 
                  ? 'bg-[#8FB8A3]/10 border-[#8FB8A3] text-[#8FB8A3]' 
                  : 'bg-[#1A1A1A] border-[#2A2A2A] text-white/70 hover:text-white'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>

            <div className="flex bg-[#1A1A1A] rounded-lg p-1 border border-[#2A2A2A]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#2A2A2A] text-white' : 'text-white/40 hover:text-white'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#2A2A2A] text-white' : 'text-white/40 hover:text-white'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-[#2A2A2A] grid sm:grid-cols-2 gap-4 animate-slideUp">
            <div>
              <label className="block text-sm text-white/50 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors"
              >
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPortfolios.map((portfolio: AdminPortfolio) => (
            <div key={portfolio.id} className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden card-hover group">
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={`/sectors/${(portfolio.holdings?.[0]?.company?.sector || 'general').toLowerCase()}.jpg`} 
                  alt={portfolio.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/sectors/energy.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    portfolio.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                    portfolio.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {portfolio.status}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>{portfolio.holdingsCount} holdings</span>
                </div>
                
                <h3 className="text-lg font-medium text-white mb-4">{portfolio.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-white/40 mb-1">Total Value</p>
                    <p className="text-sm font-medium text-white">{formatCurrency(portfolio.totalValue || 0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Invested</p>
                    <p className="text-sm font-medium text-white">{formatCurrency(portfolio.totalInvested || 0)}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]">
                  <div className={`flex items-center gap-1 text-sm ${avgGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {avgGrowth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>+{avgGrowth.toFixed(1)}%</span>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors text-sm">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="py-4 px-6 text-left text-sm font-medium text-white/50">Portfolio</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-white/50">Holdings</th>
                <th className="py-4 px-6 text-right text-sm font-medium text-white/50">Total Value</th>
                <th className="py-4 px-6 text-right text-sm font-medium text-white/50">Invested</th>
                <th className="py-4 px-6 text-right text-sm font-medium text-white/50">Growth</th>
                <th className="py-4 px-6 text-center text-sm font-medium text-white/50">Status</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPortfolios.map((portfolio: AdminPortfolio) => (
                <tr key={portfolio.id} className="border-b border-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#8FB8A3]/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#8FB8A3]" />
                      </div>
                      <div>
                        <span className="font-medium text-white">{portfolio.name}</span>
                        <p className="text-xs text-white/40">{portfolio.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white/70">{portfolio.holdingsCount}</td>
                  <td className="py-4 px-6 text-right font-medium text-white">{formatCurrency(portfolio.totalValue || 0)}</td>
                  <td className="py-4 px-6 text-right text-white">{formatCurrency(portfolio.totalInvested || 0)}</td>
                  <td className={`py-4 px-6 text-right ${avgGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    +{avgGrowth.toFixed(1)}%
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      portfolio.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400' :
                      portfolio.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {portfolio.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-white/30 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/30 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredPortfolios.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-white/30" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No portfolios found</h3>
          <p className="text-white/50">Try adjusting your search or filters</p>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-[#141414] border border-[#2A2A2A] rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Add New Portfolio</h3>
            <div className="space-y-4">
              <input type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white" placeholder="Portfolio Name" />
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white">Cancel</button>
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium">Add Portfolio</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
