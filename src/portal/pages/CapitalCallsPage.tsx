import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function CapitalCallsPage() {
  const { capitalCalls, isLoading } = useData();
  const [activeTab, setActiveTab] = useState<'calls' | 'distributions'>('calls');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const calls = capitalCalls || [];

  const filteredCalls = filterStatus === 'all' 
    ? calls 
    : calls.filter((c: any) => {
        if (filterStatus === 'overdue') return c.status === 'PENDING' && new Date(c.dueDate) < new Date();
        return c.status.toLowerCase() === filterStatus;
      });

  const pendingCalls = calls.filter((c: any) => c.status === 'PENDING');
  const totalCallsPending = pendingCalls.reduce((sum: number, c: any) => sum + (c.amount || 0), 0);
  const totalPaid = calls.filter((c: any) => c.status === 'PAID').reduce((sum: number, c: any) => sum + (c.amount || 0), 0);

  const getStatusIcon = (status: string, dueDate?: string) => {
    if (status === 'PAID') return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (status === 'PENDING' && dueDate && new Date(dueDate) < new Date()) {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
    return <Clock className="w-5 h-5 text-yellow-500" />;
  };

  const getStatusClass = (status: string, dueDate?: string) => {
    if (status === 'PAID') return 'bg-green-500/10 text-green-500';
    if (status === 'PENDING' && dueDate && new Date(dueDate) < new Date()) {
      return 'bg-red-500/10 text-red-500';
    }
    return 'bg-yellow-500/10 text-yellow-500';
  };

  const getDisplayStatus = (status: string, dueDate?: string) => {
    if (status === 'PAID') return 'paid';
    if (status === 'PENDING' && dueDate && new Date(dueDate) < new Date()) {
      return 'overdue';
    }
    return 'pending';
  };

  if (isLoading.capitalCalls) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-[#8FB8A3]/30 border-t-[#8FB8A3] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Capital Calls</h1>
          <p className="text-white/50">Track capital calls and distributions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-white/50">Total Called</span>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalCallsPending)}</p>
          <p className="text-sm text-white/40 mt-1">{pendingCalls.length} active</p>
        </div>

        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-white/50">Total Paid</span>
          </div>
          <p className="text-3xl font-bold text-green-400">{formatCurrency(totalPaid)}</p>
          <p className="text-sm text-white/40 mt-1">Paid capital calls</p>
        </div>

        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#8FB8A3]/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#8FB8A3]" />
            </div>
            <span className="text-white/50">Net Investment</span>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalCallsPending - totalPaid)}</p>
          <p className="text-sm text-white/40 mt-1">Capital calls - Distributions</p>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-1 flex gap-1">
        <button
          onClick={() => setActiveTab('calls')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'calls'
              ? 'bg-[#8FB8A3] text-[#0A0A0A]'
              : 'text-white/60 hover:text-white hover:bg-[#1A1A1A]'
          }`}
        >
          <TrendingDown className="w-4 h-4" />
          Capital Calls
          <span className="px-2 py-0.5 bg-[#0A0A0A]/20 rounded-full text-xs">
            {calls.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('distributions')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'distributions'
              ? 'bg-[#8FB8A3] text-[#0A0A0A]'
              : 'text-white/60 hover:text-white hover:bg-[#1A1A1A]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          History
          <span className="px-2 py-0.5 bg-[#0A0A0A]/20 rounded-full text-xs">
            0
          </span>
        </button>
      </div>

      {activeTab === 'calls' && (
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          <span className="text-sm text-white/40">Filter:</span>
          {(['all', 'pending', 'paid', 'overdue'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
                filterStatus === status
                  ? 'bg-[#8FB8A3] text-[#0A0A0A]'
                  : 'bg-[#1A1A1A] text-white/60 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {activeTab === 'calls' ? (
          filteredCalls.length > 0 ? filteredCalls.map((call: any) => {
            const displayStatus = getDisplayStatus(call.status, call.dueDate);
            return (
              <div 
                key={call.id}
                className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden"
              >
                <div 
                  className="p-6 cursor-pointer hover:bg-[#1A1A1A] transition-colors"
                  onClick={() => setExpandedItem(expandedItem === call.id ? null : call.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusClass(call.status, call.dueDate)}`}>
                        {getStatusIcon(call.status, call.dueDate)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium text-white">{call.title || call.id}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${getStatusClass(call.status, call.dueDate)}`}>
                            {displayStatus}
                          </span>
                        </div>
                        <p className="text-white/60 text-sm">{call.description || 'Capital call'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-white">{formatCurrency(call.amount || 0)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2A2A2A]">
                    <div className="flex items-center gap-6 text-sm">
                      <span className="flex items-center gap-2 text-white/40">
                        <Calendar className="w-4 h-4" />
                        Due: {formatDate(call.dueDate)}
                      </span>
                    </div>
                    {expandedItem === call.id ? (
                      <ChevronUp className="w-5 h-5 text-white/40" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/40" />
                    )}
                  </div>
                </div>
                
                {expandedItem === call.id && (
                  <div className="px-6 pb-6 border-t border-[#2A2A2A]">
                    <div className="pt-4">
                      <h4 className="text-sm font-medium text-white mb-3">Documents</h4>
                      <div className="space-y-2">
                        <button className="flex items-center gap-3 w-full p-3 bg-[#1A1A1A] rounded-lg hover:bg-[#2A2A2A] transition-colors">
                          <FileText className="w-5 h-5 text-[#8FB8A3]" />
                          <span className="text-sm text-white flex-1 text-left">Capital Call Notice</span>
                          <Download className="w-4 h-4 text-white/40" />
                        </button>
                      </div>
                      
                      {call.status !== 'PAID' && (
                        <button 
                          onClick={() => setShowPaymentModal(true)}
                          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors"
                        >
                          <DollarSign className="w-5 h-5" />
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          }) : (
            <div className="text-center py-16 text-white/50">No capital calls found</div>
          )
        ) : (
          <div className="text-center py-16 text-white/50">No distribution history</div>
        )}
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowPaymentModal(false)} />
          <div className="relative bg-[#141414] border border-[#2A2A2A] rounded-xl w-full max-w-md p-6 animate-fadeIn">
            <button onClick={() => setShowPaymentModal(false)} className="absolute top-4 right-4 text-white/40 hover:text-white">Close</button>
            <h3 className="text-xl font-semibold text-white mb-4">Payment Instructions</h3>
            <p className="text-white/70 mb-4">Please transfer the amount to the following account:</p>
            <div className="bg-[#1A1A1A] rounded-lg p-4 text-sm text-white/80">
              <p>Bank: TerraVest Bank</p>
              <p>Account: 1234567890</p>
              <p>Reference: Your Investor ID</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
