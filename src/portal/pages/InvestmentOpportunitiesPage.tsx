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
import { useData } from '../contexts/DataContext';

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
  const { opportunities, isLoading } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentSuccess, setInvestmentSuccess] = useState(false);

  const oppList = opportunities || [];
  const sectors = ['All', ...Array.from(new Set(oppList.map((o: any) => o?.company?.sector).filter(Boolean)))];
  const stages = ['All', 'Open', 'Closing', 'Funded'];

  const mapStatus = (s?: string) => {
    if (!s) return 'open';
    if (s.toUpperCase() === 'OPEN') return 'open';
    if (s.toUpperCase() === 'CLOSED') return 'closing';
    return 'funded';
  };

  const filteredOpportunities = oppList.filter((opp: any) => {
    const title = opp.title || '';
    const sector = opp?.company?.sector || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (opp.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'All' || sector === selectedSector;
    const status = mapStatus(opp.status);
    const matchesStage = selectedStatus === 'All' || status === selectedStatus.toLowerCase();
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

  const openInvestModal = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setInvestmentAmount(String(opportunity.minInvestment || 0));
    setShowInvestModal(true);
  };

  const openViewDetails = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
  };

  if (isLoading.opportunities) {
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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Total Opportunities</p>
          <p className="text-xl font-semibold text-white">{oppList.length}</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Total Value</p>
          <p className="text-xl font-semibold text-white">{formatCurrency(oppList.reduce((sum: number, o: any) => sum + (o.targetAmount || 0), 0))}</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Avg. Return</p>
          <p className="text-xl font-semibold text-green-400">+15%</p>
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-white/50 text-sm mb-1">Open for Investment</p>
          <p className="text-xl font-semibold text-[#8FB8A3]">{oppList.filter((o: any) => mapStatus(o.status) === 'open').length}</p>
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
                aria-label="Sector"
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors"
              >
                {sectors.map((sector: string) => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                aria-label="Status"
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

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOpportunities.map((opp: any) => {
          const progress = opp.targetAmount > 0 ? ((opp.raisedAmount || 0) / opp.targetAmount) * 100 : 0;
          const status = mapStatus(opp.status);
          return (
            <div 
              key={opp.id} 
              className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden card-hover group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={`/sectors/${(opp.company?.sector || 'general').toLowerCase()}.jpg`}
                  alt={opp.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/sectors/energy.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white/80">{opp.company?.sector || 'Sector'}</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    status === 'open' ? 'bg-green-500/20 text-green-400' :
                    status === 'closing' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>{opp.company?.sector || 'Sector'}</span>
                  <span className="mx-1">•</span>
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{opp.company?.headquarters || 'Location'}</span>
                </div>

                <h3 className="text-lg font-medium text-white mb-2">{opp.title}</h3>
                <p className="text-sm text-white/50 mb-4 line-clamp-2">{opp.description}</p>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/50">Raised</span>
                    <span className="text-white">{formatCurrency(opp.raisedAmount || 0)} of {formatCurrency(opp.targetAmount || 0)}</span>
                  </div>
                  <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#8FB8A3] to-[#7BA391] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b border-[#2A2A2A]">
                  <div>
                    <p className="text-xs text-white/40 mb-1">Min. Investment</p>
                    <p className="text-sm font-medium text-white">{formatCurrency(opp.minInvestment || 0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Target Return</p>
                    <p className="text-sm font-medium text-green-400">+20%</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Duration</p>
                    <p className="text-sm font-medium text-white">5 years</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => openInvestModal(opp)}
                    disabled={status === 'funded'}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Invest Now
                  </button>
                  <button 
                    onClick={() => openViewDetails(opp)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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

      {selectedOpportunity && !showInvestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedOpportunity(null)} />
          <div className="relative bg-[#141414] border border-[#2A2A2A] rounded-xl w-full max-w-md p-6 animate-fadeIn">
            <button onClick={() => setSelectedOpportunity(null)} className="absolute top-4 right-4 text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold text-white mb-2">Investment Details</h3>
            <p className="text-lg text-white mb-4">{selectedOpportunity.title}</p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/50">Minimum Investment</span>
                <span className="text-white">{formatCurrency(selectedOpportunity.minInvestment || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Target Return</span>
                <span className="text-green-400">+20%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showInvestModal && selectedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowInvestModal(false)} />
          <div className="relative bg-[#141414] border border-[#2A2A2A] rounded-xl w-full max-w-md p-6 animate-fadeIn">
            <button onClick={() => setShowInvestModal(false)} className="absolute top-4 right-4 text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            
            {investmentSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Interest Expressed</h3>
                <p className="text-white/50">Your investment request has been received</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-white mb-2">Invest in {selectedOpportunity.title}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/50 mb-2">Investment Amount (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
                        placeholder="Enter amount"
                      />
                    </div>
                    <p className="text-xs text-white/40 mt-2">Minimum investment: {formatCurrency(selectedOpportunity.minInvestment || 0)}</p>
                  </div>
                  <button 
                    onClick={handleInvest}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors"
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
