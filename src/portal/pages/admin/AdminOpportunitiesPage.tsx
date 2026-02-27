import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  TrendingUp,
  MapPin,
  Edit2,
  Trash2,
  Eye,
  Download,
} from 'lucide-react';

interface Opportunity {
  id: string;
  name: string;
  sector: string;
  location: string;
  targetRaise: number;
  minInvestment: number;
  expectedReturn: number;
  duration: string;
  stage: 'open' | 'closing' | 'funded';
  progress: number;
  raised: number;
  investors: number;
}

const mockOpportunities: Opportunity[] = [
  { id: '1', name: 'GreenEnergy Africa Fund II', sector: 'Energy', location: 'Cameroon, Ghana, Kenya', targetRaise: 50000000, minInvestment: 250000, expectedReturn: 22, duration: '5 years', stage: 'open', progress: 65, raised: 32500000, investors: 12 },
  { id: '2', name: 'Tech Ventures Cameroon', sector: 'Technology', location: 'Douala, Cameroon', targetRaise: 15000000, minInvestment: 100000, expectedReturn: 35, duration: '7 years', stage: 'open', progress: 40, raised: 6000000, investors: 8 },
  { id: '3', name: 'AgriBusiness Expansion', sector: 'Agriculture', location: 'Yaoundé Region, Cameroon', targetRaise: 25000000, minInvestment: 150000, expectedReturn: 18, duration: '4 years', stage: 'closing', progress: 88, raised: 22000000, investors: 15 },
  { id: '4', name: 'Healthcare Infrastructure', sector: 'Healthcare', location: 'Multiple Cities, Cameroon', targetRaise: 35000000, minInvestment: 200000, expectedReturn: 20, duration: '6 years', stage: 'open', progress: 30, raised: 10500000, investors: 6 },
  { id: '5', name: 'Real Estate Development Fund', sector: 'Real Estate', location: 'Douala & Yaoundé, Cameroon', targetRaise: 40000000, minInvestment: 300000, expectedReturn: 25, duration: '5 years', stage: 'open', progress: 50, raised: 20000000, investors: 10 },
  { id: '6', name: 'Logistics & Transportation', sector: 'Infrastructure', location: 'Central Africa Region', targetRaise: 30000000, minInvestment: 200000, expectedReturn: 19, duration: '5 years', stage: 'closing', progress: 92, raised: 27600000, investors: 14 },
];

const sectors = ['All', 'Energy', 'Technology', 'Agriculture', 'Healthcare', 'Real Estate', 'Infrastructure'];
const stages = ['All', 'Open', 'Closing', 'Funded'];

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

export default function AdminOpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [, setShowEditModal] = useState(false);
  const [, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const filteredOpportunities = mockOpportunities.filter(o => {
    const matchesSearch = o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         o.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'All' || o.sector === selectedSector;
    const matchesStage = selectedStage === 'All' || o.stage.toLowerCase() === selectedStage.toLowerCase();
    return matchesSearch && matchesSector && matchesStage;
  });

  const totalTarget = filteredOpportunities.reduce((sum, o) => sum + o.targetRaise, 0);
  const totalRaised = filteredOpportunities.reduce((sum, o) => sum + o.raised, 0);
  const avgReturn = filteredOpportunities.length > 0 
    ? filteredOpportunities.reduce((sum, o) => sum + o.expectedReturn, 0) / filteredOpportunities.length 
    : 0;

  const handleEdit = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Investment Opportunities</h1>
          <p className="text-white/50">Manage and create investment opportunities</p>
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
            <span className="text-sm">New Opportunity</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Total Target</p>
          <p className="text-xl font-semibold text-white">{formatCurrency(totalTarget)}</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Total Raised</p>
          <p className="text-xl font-semibold text-[#8FB8A3]">{formatCurrency(totalRaised)}</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Avg. Return</p>
          <p className="text-xl font-semibold text-green-400">+{avgReturn.toFixed(0)}%</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Open</p>
          <p className="text-xl font-semibold text-white">{filteredOpportunities.filter(o => o.stage === 'open').length}</p>
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
              placeholder="Search opportunities..."
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-2.5 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
            />
          </div>

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
              <label className="block text-sm text-white/50 mb-2">Stage</label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors"
              >
                {stages.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Opportunities Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-white/50 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{opportunity.sector}</span>
                </div>
                <h3 className="text-lg font-medium text-white">{opportunity.name}</h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                opportunity.stage === 'open' ? 'bg-green-500/20 text-green-400' :
                opportunity.stage === 'closing' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {opportunity.stage.charAt(0).toUpperCase() + opportunity.stage.slice(1)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{opportunity.location}</span>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/50">Raised</span>
                <span className="text-white">{formatCurrency(opportunity.raised)} of {formatCurrency(opportunity.targetRaise)}</span>
              </div>
              <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#8FB8A3] to-[#7BA391] rounded-full transition-all duration-500"
                  style={{ width: `${opportunity.progress}%` }}
                />
              </div>
              <p className="text-xs text-white/40 mt-1">{opportunity.progress}% funded • {opportunity.investors} investors</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b border-[#2A2A2A]">
              <div>
                <p className="text-xs text-white/40 mb-1">Min. Investment</p>
                <p className="text-sm font-medium text-white">{formatCurrency(opportunity.minInvestment)}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">Expected Return</p>
                <p className="text-sm font-medium text-green-400">+{opportunity.expectedReturn}%</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">Duration</p>
                <p className="text-sm font-medium text-white">{opportunity.duration}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors text-sm">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button 
                onClick={() => handleEdit(opportunity)}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-red-400 hover:border-red-500/50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-white/30" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No opportunities found</h3>
          <p className="text-white/50">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add Opportunity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-[#141414] border border-[#2A2A2A] rounded-xl w-full max-w-lg p-6 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Create New Opportunity</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/50 mb-2">Opportunity Name</label>
                <input type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors" placeholder="Enter name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/50 mb-2">Sector</label>
                  <select className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors">
                    {sectors.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">Stage</label>
                  <select className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors">
                    <option>Open</option>
                    <option>Closing</option>
                    <option>Funded</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Location</label>
                <input type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors" placeholder="Enter location" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/50 mb-2">Target Raise</label>
                  <input type="number" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors" placeholder="$" />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">Min. Investment</label>
                  <input type="number" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors" placeholder="$" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/50 mb-2">Expected Return (%)</label>
                  <input type="number" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors" placeholder="%" />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">Duration</label>
                  <input type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors" placeholder="e.g. 5 years" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white transition-colors">Cancel</button>
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors">Create Opportunity</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
