import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { 
  FileText, 
  Download, 
  Calendar, 
  AlertCircle,
  CheckCircle2,
  Search,
  ChevronDown,
  ChevronUp,
  Mail
} from 'lucide-react';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function TaxDocumentsPage() {
  const { taxDocuments, isLoading } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const docs = taxDocuments || [];
  
  const years = Array.from(new Set(docs.map(d => new Date(d.createdAt).getFullYear()))).sort((a, b) => b - a);

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const docYear = new Date(doc.createdAt).getFullYear();
    const matchesYear = selectedYear === 'all' || docYear === selectedYear;
    return matchesSearch && matchesYear;
  });

  const k1Docs = filteredDocs.filter(d => d.name.toLowerCase().includes('k-1'));
  const taxStatementDocs = filteredDocs.filter(d => 
    d.name.toLowerCase().includes('1099') || 
    d.name.toLowerCase().includes('statement') ||
    d.name.toLowerCase().includes('tax')
  );

  const getStatusClass = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'bg-green-500/10 text-green-500';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'correction':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-green-500/10 text-green-500';
    }
  };

  if (isLoading.taxDocuments) {
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
          <h1 className="text-2xl font-semibold text-white mb-1">Tax Documents</h1>
          <p className="text-white/50">Access your tax forms and statements</p>
        </div>
        <a 
          href="mailto:tax@terravest.co"
          className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors"
        >
          <Mail className="w-4 h-4" />
          Contact Tax Team
        </a>
      </div>

      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">2023 Tax Summary</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-white/40 mb-1">Total Distributions</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(155700)}</p>
          </div>
          <div>
            <p className="text-sm text-white/40 mb-1">Taxable Income</p>
            <p className="text-2xl font-bold text-[#8FB8A3]">{formatCurrency(142500)}</p>
          </div>
          <div>
            <p className="text-sm text-white/40 mb-1">Foreign Taxes Paid</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(8500)}</p>
          </div>
          <div>
            <p className="text-sm text-white/40 mb-1">State Taxes Paid</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(12500)}</p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-yellow-500 mb-1">Important Tax Information</h4>
          <p className="text-sm text-white/60">
            Tax documents are typically issued by March 15th each year. Please consult with your tax advisor 
            for guidance on reporting your investment income. Contact our tax team at{' '}
            <a href="mailto:tax@terravest.co" className="text-[#8FB8A3] hover:underline">tax@terravest.co</a>{' '}
            for any questions.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              selectedYear === 'all'
                ? 'bg-[#8FB8A3] text-[#0A0A0A]'
                : 'bg-[#141414] border border-[#2A2A2A] text-white/60 hover:text-white'
            }`}
          >
            All Years
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                selectedYear === year
                  ? 'bg-[#8FB8A3] text-[#0A0A0A]'
                  : 'bg-[#141414] border border-[#2A2A2A] text-white/60 hover:text-white'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
        <div>
          <label className="sr-only">Tax Year</label>
          <select
            aria-label="Tax Year"
            value={selectedYear === 'all' ? '' : selectedYear}
            onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : 'all')}
            className="bg-[#141414] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:border-[#8FB8A3] transition-colors"
          >
            <option value="">All Years</option>
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-white mb-3">K-1 Forms</h2>
          <div className="space-y-4">
            {k1Docs.length > 0 ? k1Docs.map((doc) => (
              <div key={doc.id} className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
                <div 
                  className="p-6 cursor-pointer hover:bg-[#1A1A1A] transition-colors"
                  onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusClass()}`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{doc.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-white/40">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Tax Year: {new Date(doc.createdAt).getFullYear()}
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Issued: {new Date(doc.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {expandedDoc === doc.id ? (
                      <ChevronUp className="w-5 h-5 text-white/40" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/40" />
                    )}
                  </div>
                </div>
                {expandedDoc === doc.id && (
                  <div className="px-6 pb-6 border-t border-[#2A2A2A]">
                    <div className="pt-4">
                      <button className="flex items-center gap-2 px-4 py-3 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors">
                        <Download className="w-5 h-5" />
                        Download {doc.name}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )) : (
              <p className="text-white/50">No K-1 forms found</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-white mb-3">Tax Statements</h2>
          <div className="space-y-4">
            {taxStatementDocs.length > 0 ? taxStatementDocs.map((doc) => (
              <div key={`stmt-${doc.id}`} className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
                <div 
                  className="p-6 cursor-pointer hover:bg-[#1A1A1A] transition-colors"
                  onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusClass()}`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{doc.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-white/40">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Tax Year: {new Date(doc.createdAt).getFullYear()}
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Issued: {new Date(doc.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {expandedDoc === doc.id ? (
                      <ChevronUp className="w-5 h-5 text-white/40" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/40" />
                    )}
                  </div>
                </div>
                {expandedDoc === doc.id && (
                  <div className="px-6 pb-6 border-t border-[#2A2A2A]">
                    <div className="pt-4">
                      <button className="flex items-center gap-2 px-4 py-3 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors">
                        <Download className="w-5 h-5" />
                        Download {doc.name}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )) : (
              <p className="text-white/50">No tax statements found</p>
            )}
          </div>
        </div>
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No documents found</h3>
          <p className="text-white/50">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
