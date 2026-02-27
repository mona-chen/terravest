import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  Download,
  Grid3X3,
  List,
  Building2,
} from 'lucide-react';
import { portfolioData } from '../data/mockData';

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

const sectors = ['All', 'Finance', 'Infrastructure', 'Energy', 'Technology', 'Healthcare', 'Agriculture', 'Hospitality', 'Real Estate'];
const statuses = ['All', 'Active', 'Pending', 'Exited'];

export default function PortfolioPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPortfolio = portfolioData.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'All' || company.sector === selectedSector;
    const matchesStatus = selectedStatus === 'All' || company.status === selectedStatus;
    return matchesSearch && matchesSector && matchesStatus;
  });

  const totalValue = filteredPortfolio.reduce((sum, company) => sum + company.value, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Portfolio</h1>
          <p className="text-white/50">Manage and track your investments</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Export</span>
          </button>
          <button 
            onClick={() => navigate('/opportunities')}
            className="flex items-center gap-2 px-4 py-2 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-sm">New Investment</span>
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Total Value</p>
          <p className="text-xl font-semibold text-white">{formatCurrency(totalValue)}</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Companies</p>
          <p className="text-xl font-semibold text-white">{filteredPortfolio.length}</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Avg. Return</p>
          <p className="text-xl font-semibold text-green-400">+8.4%</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Sectors</p>
          <p className="text-xl font-semibold text-white">{new Set(filteredPortfolio.map(p => p.sector)).size}</p>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies..."
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-2.5 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
            />
          </div>

          {/* Filter toggle */}
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

          {/* View mode toggle */}
          <div className="flex bg-[#1A1A1A] rounded-lg p-1 border border-[#2A2A2A]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#2A2A2A] text-white' : 'text-white/40 hover:text-white'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#2A2A2A] text-white' : 'text-white/40 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-[#2A2A2A] grid sm:grid-cols-2 gap-4 animate-slideUp">
            <div>
              <label className="block text-sm text-white/50 mb-2">Sector</label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors"
              >
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Portfolio grid/list */}
      {viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPortfolio.map((company) => (
            <div 
              key={company.id} 
              className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5 card-hover group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#8FB8A3]/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#8FB8A3]" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${company.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {company.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{company.change >= 0 ? '+' : ''}{company.changePercent}%</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-medium text-white mb-1">{company.name}</h3>
              <p className="text-sm text-white/50 mb-4">{company.sector}</p>

              {/* Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/40">Value</span>
                  <span className="text-sm font-medium text-white">{formatCurrency(company.value)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/40">Allocation</span>
                  <span className="text-sm font-medium text-white">{company.allocation}%</span>
                </div>
              </div>

              {/* Status badge */}
              <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  company.status === 'active' ? 'bg-green-500/10 text-green-400' :
                  company.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-gray-500/10 text-gray-400'
                }`}>
                  {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="text-left py-4 px-6 text-sm font-medium text-white/50">Company</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-white/50">Sector</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-white/50">Value</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-white/50">Allocation</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-white/50">Change</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-white/50">Status</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPortfolio.map((company) => (
                <tr key={company.id} className="border-b border-[#2A2A2A] table-row-hover">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#8FB8A3]/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#8FB8A3]" />
                      </div>
                      <span className="font-medium text-white">{company.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white/70">{company.sector}</td>
                  <td className="py-4 px-6 text-right font-medium text-white">{formatCurrency(company.value)}</td>
                  <td className="py-4 px-6 text-right text-white">{company.allocation}%</td>
                  <td className={`py-4 px-6 text-right ${company.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {company.change >= 0 ? '+' : ''}{company.changePercent}%
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      company.status === 'active' ? 'bg-green-500/10 text-green-400' :
                      company.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="p-2 text-white/30 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty state */}
      {filteredPortfolio.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-white/30" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No companies found</h3>
          <p className="text-white/50">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
