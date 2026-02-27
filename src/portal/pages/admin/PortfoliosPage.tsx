import { useState } from 'react';
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

interface Portfolio {
  id: string;
  name: string;
  sector: string;
  valuation: number;
  revenue: number;
  growth: number;
  status: 'active' | 'pending' | 'exited';
  investors: number;
  image: string;
}

const mockPortfolios: Portfolio[] = [
  { id: '1', name: 'AfriCapital Finance', sector: 'Finance', valuation: 45000000, revenue: 12000000, growth: 18.5, status: 'active', investors: 12, image: '/sectors/finance.jpg' },
  { id: '2', name: 'GreenEnergy Cameroon', sector: 'Energy', valuation: 32000000, revenue: 8500000, growth: 24.2, status: 'active', investors: 8, image: '/sectors/energy.jpg' },
  { id: '3', name: 'TechVentures Douala', sector: 'Technology', valuation: 28000000, revenue: 6200000, growth: 35.8, status: 'active', investors: 15, image: '/sectors/technology.jpg' },
  { id: '4', name: 'AgriProcess Yaoundé', sector: 'Agriculture', valuation: 22000000, revenue: 7800000, growth: 12.3, status: 'active', investors: 6, image: '/sectors/agriculture.jpg' },
  { id: '5', name: 'HealthPlus Clinics', sector: 'Healthcare', valuation: 18000000, revenue: 5400000, growth: 15.7, status: 'pending', investors: 4, image: '/sectors/healthcare.jpg' },
  { id: '6', name: 'UrbanDevelopments', sector: 'Real Estate', valuation: 38000000, revenue: 9200000, growth: 8.4, status: 'active', investors: 10, image: '/sectors/real-estate.jpg' },
];

const sectors = ['All', 'Finance', 'Energy', 'Technology', 'Agriculture', 'Healthcare', 'Real Estate', 'Infrastructure'];
const statuses = ['All', 'Active', 'Pending', 'Exited'];

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

export default function PortfoliosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPortfolios = mockPortfolios.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'All' || p.sector === selectedSector;
    const matchesStatus = selectedStatus === 'All' || p.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesSector && matchesStatus;
  });

  const totalValue = filteredPortfolios.reduce((sum, p) => sum + p.valuation, 0);
  const avgGrowth = filteredPortfolios.length > 0 
    ? filteredPortfolios.reduce((sum, p) => sum + p.growth, 0) / filteredPortfolios.length 
    : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Portfolios</h1>
          <p className="text-white/50">Manage portfolio companies and investments</p>
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
            <span className="text-sm">Add Company</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Total Value</p>
          <p className="text-xl font-semibold text-white">{formatCurrency(totalValue)}</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Companies</p>
          <p className="text-xl font-semibold text-white">{filteredPortfolios.length}</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Avg. Growth</p>
          <p className="text-xl font-semibold text-green-400">+{avgGrowth.toFixed(1)}%</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Active</p>
          <p className="text-xl font-semibold text-[#8FB8A3]">{filteredPortfolios.filter(p => p.status === 'active').length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
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
              <label className="block text-sm text-white/50 mb-2">Sector</label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors"
              >
                {sectors.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
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

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPortfolios.map((portfolio) => (
            <div key={portfolio.id} className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden card-hover group">
              <div className="relative h-40 overflow-hidden">
                <img src={portfolio.image} alt={portfolio.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    portfolio.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    portfolio.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {portfolio.status.charAt(0).toUpperCase() + portfolio.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>{portfolio.sector}</span>
                </div>
                
                <h3 className="text-lg font-medium text-white mb-4">{portfolio.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-white/40 mb-1">Valuation</p>
                    <p className="text-sm font-medium text-white">{formatCurrency(portfolio.valuation)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Revenue</p>
                    <p className="text-sm font-medium text-white">{formatCurrency(portfolio.revenue)}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]">
                  <div className={`flex items-center gap-1 text-sm ${portfolio.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {portfolio.growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>+{portfolio.growth}%</span>
                  </div>
                  <span className="text-sm text-white/50">{portfolio.investors} investors</span>
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
        /* List View */
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="py-4 px-6 text-left text-sm font-medium text-white/50">Company</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-white/50">Sector</th>
                <th className="py-4 px-6 text-right text-sm font-medium text-white/50">Valuation</th>
                <th className="py-4 px-6 text-right text-sm font-medium text-white/50">Revenue</th>
                <th className="py-4 px-6 text-right text-sm font-medium text-white/50">Growth</th>
                <th className="py-4 px-6 text-center text-sm font-medium text-white/50">Status</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPortfolios.map((portfolio) => (
                <tr key={portfolio.id} className="border-b border-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#8FB8A3]/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#8FB8A3]" />
                      </div>
                      <span className="font-medium text-white">{portfolio.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white/70">{portfolio.sector}</td>
                  <td className="py-4 px-6 text-right font-medium text-white">{formatCurrency(portfolio.valuation)}</td>
                  <td className="py-4 px-6 text-right text-white">{formatCurrency(portfolio.revenue)}</td>
                  <td className={`py-4 px-6 text-right ${portfolio.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    +{portfolio.growth}%
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      portfolio.status === 'active' ? 'bg-green-500/10 text-green-400' :
                      portfolio.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {portfolio.status.charAt(0).toUpperCase() + portfolio.status.slice(1)}
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
          <h3 className="text-lg font-medium text-white mb-2">No companies found</h3>
          <p className="text-white/50">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add Company Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-[#141414] border border-[#2A2A2A] rounded-xl w-full max-w-md p-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-white mb-4">Add New Company</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/50 mb-2">Company Name</label>
                <input type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors" placeholder="Enter company name" />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Sector</label>
                <select className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors">
                  {sectors.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/50 mb-2">Valuation</label>
                  <input type="number" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors" placeholder="$" />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">Revenue</label>
                  <input type="number" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors" placeholder="$" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white transition-colors">Cancel</button>
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors">Add Company</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
