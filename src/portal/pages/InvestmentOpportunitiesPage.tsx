import { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  TrendingUp,
  Building2,
  MapPin,
  DollarSign,
  CheckCircle2,
  X,
  Download,
  Eye
} from 'lucide-react';

interface InvestmentOpportunity {
  id: string;
  name: string;
  sector: string;
  location: string;
  description: string;
  targetRaise: number;
  minInvestment: number;
  expectedReturn: number;
  duration: string;
  stage: 'open' | 'closing' | 'funded';
  progress: number;
  raised: number;
  image: string;
  tags: string[];
}

const opportunities: InvestmentOpportunity[] = [
  {
    id: '1',
    name: 'GreenEnergy Africa Fund II',
    sector: 'Energy',
    location: 'Cameroon, Ghana, Kenya',
    description: 'Renewable energy infrastructure across West and East Africa. Focus on solar and wind projects with government partnerships.',
    targetRaise: 50000000,
    minInvestment: 250000,
    expectedReturn: 22,
    duration: '5 years',
    stage: 'open',
    progress: 65,
    raised: 32500000,
    image: '/sectors/energy.jpg',
    tags: ['Renewable', 'Infrastructure', 'ESG']
  },
  {
    id: '2',
    name: 'Tech Ventures Cameroon',
    sector: 'Technology',
    location: 'Douala, Cameroon',
    description: 'Early-stage tech startups in fintech, e-commerce, and logistics. Portfolio of 8-10 companies.',
    targetRaise: 15000000,
    minInvestment: 100000,
    expectedReturn: 35,
    duration: '7 years',
    stage: 'open',
    progress: 40,
    raised: 6000000,
    image: '/sectors/technology.jpg',
    tags: ['Venture Capital', 'High Growth']
  },
  {
    id: '3',
    name: 'AgriBusiness Expansion',
    sector: 'Agriculture',
    location: 'Yaoundé Region, Cameroon',
    description: 'Large-scale agricultural processing facility for cocoa and coffee with export capabilities.',
    targetRaise: 25000000,
    minInvestment: 150000,
    expectedReturn: 18,
    duration: '4 years',
    stage: 'closing',
    progress: 88,
    raised: 22000000,
    image: '/sectors/agriculture.jpg',
    tags: ['Export', 'Processing']
  },
  {
    id: '4',
    name: 'Healthcare Infrastructure',
    sector: 'Healthcare',
    location: 'Multiple Cities, Cameroon',
    description: 'Network of primary care clinics and diagnostic centers in underserved regions.',
    targetRaise: 35000000,
    minInvestment: 200000,
    expectedReturn: 20,
    duration: '6 years',
    stage: 'open',
    progress: 30,
    raised: 10500000,
    image: '/sectors/healthcare.jpg',
    tags: ['Impact', 'Healthcare']
  },
  {
    id: '5',
    name: 'Real Estate Development Fund',
    sector: 'Real Estate',
    location: 'Douala & Yaoundé, Cameroon',
    description: 'Mixed-use commercial and residential developments in prime urban locations.',
    targetRaise: 40000000,
    minInvestment: 300000,
    expectedReturn: 25,
    duration: '5 years',
    stage: 'open',
    progress: 50,
    raised: 20000000,
    image: '/sectors/real-estate.jpg',
    tags: ['Commercial', 'Residential']
  },
  {
    id: '6',
    name: 'Logistics & Transportation',
    sector: 'Infrastructure',
    location: 'Central Africa Region',
    description: 'Regional logistics hub with warehousing and fleet operations.',
    targetRaise: 30000000,
    minInvestment: 200000,
    expectedReturn: 19,
    duration: '5 years',
    stage: 'closing',
    progress: 92,
    raised: 27600000,
    image: '/sectors/infrastructure.jpg',
    tags: ['Logistics', 'Regional']
  }
];

const sectors = ['All', 'Energy', 'Technology', 'Agriculture', 'Healthcare', 'Real Estate', 'Infrastructure'];
const stages = ['All', 'Open', 'Closing', 'Funded'];

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

export default function InvestmentOpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<InvestmentOpportunity | null>(null);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentSuccess, setInvestmentSuccess] = useState(false);

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'All' || opp.sector === selectedSector;
    const matchesStage = selectedStage === 'All' || opp.stage.toLowerCase() === selectedStage.toLowerCase();
    return matchesSearch && matchesSector && matchesStage;
  });

  const handleInvest = () => {
    setInvestmentSuccess(true);
    setTimeout(() => {
      setShowInvestModal(false);
      setInvestmentSuccess(false);
      setInvestmentAmount('');
    }, 2000);
  };

  const openInvestModal = (opportunity: InvestmentOpportunity) => {
    setSelectedOpportunity(opportunity);
    setInvestmentAmount(opportunity.minInvestment.toString());
    setShowInvestModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Investment Opportunities</h1>
          <p className="text-white/50">Discover and invest in curated opportunities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Download Prospectus</span>
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Total Opportunities</p>
          <p className="text-xl font-semibold text-white">{opportunities.length}</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Total Value</p>
          <p className="text-xl font-semibold text-white">{formatCurrency(opportunities.reduce((sum, o) => sum + o.targetRaise, 0))}</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Avg. Return</p>
          <p className="text-xl font-semibold text-green-400">+{(opportunities.reduce((sum, o) => sum + o.expectedReturn, 0) / opportunities.length).toFixed(0)}%</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Open for Investment</p>
          <p className="text-xl font-semibold text-[#8FB8A3]">{opportunities.filter(o => o.stage === 'open').length}</p>
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
              placeholder="Search opportunities..."
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
              <label className="block text-sm text-white/50 mb-2">Stage</label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors"
              >
                {stages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Opportunities Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <div 
            key={opportunity.id} 
            className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden card-hover group"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={opportunity.image} 
                alt={opportunity.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                {opportunity.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  opportunity.stage === 'open' ? 'bg-green-500/20 text-green-400' :
                  opportunity.stage === 'closing' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {opportunity.stage.charAt(0).toUpperCase() + opportunity.stage.slice(1)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
                <Building2 className="w-4 h-4" />
                <span>{opportunity.sector}</span>
                <span className="mx-1">•</span>
                <MapPin className="w-4 h-4" />
                <span className="truncate">{opportunity.location}</span>
              </div>

              <h3 className="text-lg font-medium text-white mb-2">{opportunity.name}</h3>
              <p className="text-sm text-white/50 mb-4 line-clamp-2">{opportunity.description}</p>

              {/* Progress bar */}
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
              <div className="flex gap-3">
                <button 
                  onClick={() => openInvestModal(opportunity)}
                  disabled={opportunity.stage === 'funded'}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <TrendingUp className="w-4 h-4" />
                  Invest Now
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredOpportunities.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-white/30" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No opportunities found</h3>
          <p className="text-white/50">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Investment Modal */}
      {showInvestModal && selectedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowInvestModal(false)}
          />
          <div className="relative bg-[#141414] border border-[#2A2A2A] rounded-xl w-full max-w-md p-6 animate-fadeIn">
            <button 
              onClick={() => setShowInvestModal(false)}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {investmentSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Investment Submitted!</h3>
                <p className="text-white/50">Your investment request has been received. Our team will contact you shortly.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-white mb-2">Invest in {selectedOpportunity.name}</h3>
                <p className="text-sm text-white/50 mb-6">Please enter your investment amount</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/50 mb-2">Investment Amount (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        min={selectedOpportunity.minInvestment}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
                        placeholder="Enter amount"
                      />
                    </div>
                    <p className="text-xs text-white/40 mt-2">Minimum investment: {formatCurrency(selectedOpportunity.minInvestment)}</p>
                  </div>

                  <div className="bg-[#1A1A1A] rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">Expected Return</span>
                      <span className="text-green-400">+{selectedOpportunity.expectedReturn}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">Duration</span>
                      <span className="text-white">{selectedOpportunity.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">Projected Value</span>
                      <span className="text-white">{formatCurrency(Number(investmentAmount || 0) * (1 + selectedOpportunity.expectedReturn / 100))}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleInvest}
                    disabled={!investmentAmount || Number(investmentAmount) < selectedOpportunity.minInvestment}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    Confirm Investment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
