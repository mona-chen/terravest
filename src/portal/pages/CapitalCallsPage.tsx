import { useState } from 'react';
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

interface CapitalCall {
  id: string;
  fund: string;
  date: string;
  dueDate: string;
  amount: number;
  percentage: number;
  status: 'pending' | 'paid' | 'overdue';
  description: string;
  documents: string[];
}

interface Distribution {
  id: string;
  fund: string;
  date: string;
  amount: number;
  type: 'income' | 'capital' | 'dividend';
  description: string;
  documents: string[];
}

const capitalCalls: CapitalCall[] = [
  {
    id: 'CC-2024-001',
    fund: 'TerraVest Fund I',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    amount: 125000,
    percentage: 5,
    status: 'paid',
    description: 'Capital call for GreenEnergy Cameroon expansion',
    documents: ['Capital_Call_Notice_CC-2024-001.pdf', 'Wire_Instructions.pdf'],
  },
  {
    id: 'CC-2024-002',
    fund: 'TerraVest Fund I',
    date: '2024-06-01',
    dueDate: '2024-07-01',
    amount: 87500,
    percentage: 3.5,
    status: 'pending',
    description: 'Follow-on investment in AfriCapital Finance',
    documents: ['Capital_Call_Notice_CC-2024-002.pdf', 'Investment_Memo.pdf'],
  },
  {
    id: 'CC-2024-003',
    fund: 'TerraVest Fund II',
    date: '2024-03-10',
    dueDate: '2024-04-10',
    amount: 250000,
    percentage: 10,
    status: 'overdue',
    description: 'Initial capital call for Fund II investments',
    documents: ['Capital_Call_Notice_CC-2024-003.pdf'],
  },
];

const distributions: Distribution[] = [
  {
    id: 'DIST-2024-001',
    fund: 'TerraVest Fund I',
    date: '2024-02-28',
    amount: 45000,
    type: 'income',
    description: 'Q1 2024 distribution from portfolio companies',
    documents: ['Distribution_Notice_DIST-2024-001.pdf', 'K1_Tax_Form.pdf'],
  },
  {
    id: 'DIST-2024-002',
    fund: 'TerraVest Fund I',
    date: '2024-05-31',
    amount: 62000,
    type: 'capital',
    description: 'Partial return of capital from AfriCapital Finance exit',
    documents: ['Distribution_Notice_DIST-2024-002.pdf'],
  },
  {
    id: 'DIST-2024-003',
    fund: 'TerraVest Fund I',
    date: '2024-08-15',
    amount: 38000,
    type: 'dividend',
    description: 'Dividend distribution from portfolio holdings',
    documents: ['Distribution_Notice_DIST-2024-003.pdf', 'K1_Tax_Form.pdf'],
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function CapitalCallsPage() {
  const [activeTab, setActiveTab] = useState<'calls' | 'distributions'>('calls');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');

  const filteredCalls = filterStatus === 'all' 
    ? capitalCalls 
    : capitalCalls.filter(c => c.status === filterStatus);

  const totalCallsPending = capitalCalls
    .filter(c => c.status === 'pending' || c.status === 'overdue')
    .reduce((sum, c) => sum + c.amount, 0);

  const totalDistributions = distributions.reduce((sum, d) => sum + d.amount, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/10 text-green-500';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'overdue':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Capital Activity</h1>
          <p className="text-white/50">Track capital calls and distributions</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-white/50">Pending Capital Calls</span>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalCallsPending)}</p>
          <p className="text-sm text-white/40 mt-1">{capitalCalls.filter(c => c.status === 'pending' || c.status === 'overdue').length} active</p>
        </div>

        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-white/50">Total Distributions</span>
          </div>
          <p className="text-3xl font-bold text-green-400">{formatCurrency(totalDistributions)}</p>
          <p className="text-sm text-white/40 mt-1">{distributions.length} payments</p>
        </div>

        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#8FB8A3]/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#8FB8A3]" />
            </div>
            <span className="text-white/50">Net Investment</span>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalCallsPending - totalDistributions)}</p>
          <p className="text-sm text-white/40 mt-1">Capital calls - Distributions</p>
        </div>
      </div>

      {/* Tabs */}
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
            {capitalCalls.length}
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
          Distributions
          <span className="px-2 py-0.5 bg-[#0A0A0A]/20 rounded-full text-xs">
            {distributions.length}
          </span>
        </button>
      </div>

      {/* Filter (only for calls) */}
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

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'calls' ? (
          filteredCalls.map((call) => (
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
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusClass(call.status)}`}>
                      {getStatusIcon(call.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-white">{call.id}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${getStatusClass(call.status)}`}>
                          {call.status}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm">{call.fund}</p>
                      <p className="text-white/40 text-sm mt-1">{call.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-white">{formatCurrency(call.amount)}</p>
                    <p className="text-sm text-white/40">{call.percentage}% of commitment</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2A2A2A]">
                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-2 text-white/40">
                      <Calendar className="w-4 h-4" />
                      Issued: {formatDate(call.date)}
                    </span>
                    <span className="flex items-center gap-2 text-white/40">
                      <Clock className="w-4 h-4" />
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
                      {call.documents.map((doc, i) => (
                        <button
                          key={i}
                          className="flex items-center gap-3 w-full p-3 bg-[#1A1A1A] rounded-lg hover:bg-[#2A2A2A] transition-colors"
                        >
                          <FileText className="w-5 h-5 text-[#8FB8A3]" />
                          <span className="text-sm text-white flex-1 text-left">{doc}</span>
                          <Download className="w-4 h-4 text-white/40" />
                        </button>
                      ))}
                    </div>
                    
                    {call.status !== 'paid' && (
                      <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors">
                        <DollarSign className="w-5 h-5" />
                        Pay Capital Call
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          distributions.map((dist) => (
            <div 
              key={dist.id}
              className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden"
            >
              <div 
                className="p-6 cursor-pointer hover:bg-[#1A1A1A] transition-colors"
                onClick={() => setExpandedItem(expandedItem === dist.id ? null : dist.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-white">{dist.id}</h3>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full text-xs capitalize">
                          {dist.type}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm">{dist.fund}</p>
                      <p className="text-white/40 text-sm mt-1">{dist.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-green-400">{formatCurrency(dist.amount)}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2A2A2A]">
                  <span className="flex items-center gap-2 text-sm text-white/40">
                    <Calendar className="w-4 h-4" />
                    {formatDate(dist.date)}
                  </span>
                  {expandedItem === dist.id ? (
                    <ChevronUp className="w-5 h-5 text-white/40" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40" />
                  )}
                </div>
              </div>
              
              {expandedItem === dist.id && (
                <div className="px-6 pb-6 border-t border-[#2A2A2A]">
                  <div className="pt-4">
                    <h4 className="text-sm font-medium text-white mb-3">Documents</h4>
                    <div className="space-y-2">
                      {dist.documents.map((doc, i) => (
                        <button
                          key={i}
                          className="flex items-center gap-3 w-full p-3 bg-[#1A1A1A] rounded-lg hover:bg-[#2A2A2A] transition-colors"
                        >
                          <FileText className="w-5 h-5 text-[#8FB8A3]" />
                          <span className="text-sm text-white flex-1 text-left">{doc}</span>
                          <Download className="w-4 h-4 text-white/40" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
