import { useState } from 'react';
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

interface TaxDocument {
  id: string;
  name: string;
  type: 'K1' | '1099' | 'Schedule' | 'Statement';
  taxYear: number;
  fund: string;
  dateIssued: string;
  status: 'available' | 'pending' | 'correction';
  amount?: number;
  description: string;
}

const taxDocuments: TaxDocument[] = [
  {
    id: 'K1-2023-001',
    name: 'Schedule K-1 (Form 1065)',
    type: 'K1',
    taxYear: 2023,
    fund: 'TerraVest Fund I',
    dateIssued: '2024-03-15',
    status: 'available',
    amount: 45000,
    description: 'Partner\'s share of income, deductions, credits',
  },
  {
    id: 'K1-2023-002',
    name: 'Schedule K-1 (Form 1065)',
    type: 'K1',
    taxYear: 2023,
    fund: 'TerraVest Fund II',
    dateIssued: '2024-03-15',
    status: 'available',
    amount: 12500,
    description: 'Partner\'s share of income, deductions, credits',
  },
  {
    id: '1099-2023-001',
    name: 'Form 1099-DIV',
    type: '1099',
    taxYear: 2023,
    fund: 'TerraVest Fund I',
    dateIssued: '2024-02-01',
    status: 'available',
    amount: 8200,
    description: 'Dividends and distributions',
  },
  {
    id: 'K1-2022-001',
    name: 'Schedule K-1 (Form 1065)',
    type: 'K1',
    taxYear: 2022,
    fund: 'TerraVest Fund I',
    dateIssued: '2023-03-10',
    status: 'available',
    amount: 38000,
    description: 'Partner\'s share of income, deductions, credits',
  },
  {
    id: 'STMT-2023-001',
    name: 'Foreign Tax Credit Statement',
    type: 'Statement',
    taxYear: 2023,
    fund: 'TerraVest Fund I',
    dateIssued: '2024-03-15',
    status: 'available',
    description: 'Foreign taxes paid for credit claim',
  },
  {
    id: 'K1-2024-001',
    name: 'Schedule K-1 (Form 1065)',
    type: 'K1',
    taxYear: 2024,
    fund: 'TerraVest Fund I',
    dateIssued: '',
    status: 'pending',
    description: 'Partner\'s share of income, deductions, credits',
  },
];

const taxSummary = {
  totalDistributions: 155700,
  taxableIncome: 142500,
  foreignTaxesPaid: 8500,
  stateTaxesPaid: 12500,
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function TaxDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const years = Array.from(new Set(taxDocuments.map(d => d.taxYear))).sort((a, b) => b - a);

  const filteredDocs = taxDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.fund.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === 'all' || doc.taxYear === selectedYear;
    return matchesSearch && matchesYear;
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/10 text-green-500';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'correction':
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

      {/* Tax Summary */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">2023 Tax Summary</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-white/40 mb-1">Total Distributions</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(taxSummary.totalDistributions)}</p>
          </div>
          <div>
            <p className="text-sm text-white/40 mb-1">Taxable Income</p>
            <p className="text-2xl font-bold text-[#8FB8A3]">{formatCurrency(taxSummary.taxableIncome)}</p>
          </div>
          <div>
            <p className="text-sm text-white/40 mb-1">Foreign Taxes Paid</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(taxSummary.foreignTaxesPaid)}</p>
          </div>
          <div>
            <p className="text-sm text-white/40 mb-1">State Taxes Paid</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(taxSummary.stateTaxesPaid)}</p>
          </div>
        </div>
      </div>

      {/* Important Notice */}
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

      {/* Filters */}
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
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => (
          <div 
            key={doc.id}
            className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden"
          >
            <div 
              className="p-6 cursor-pointer hover:bg-[#1A1A1A] transition-colors"
              onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusClass(doc.status)}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-white">{doc.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusClass(doc.status)}`}>
                        {doc.status === 'available' ? 'Ready' : doc.status === 'pending' ? 'Pending' : 'Correction'}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm">{doc.fund}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Tax Year: {doc.taxYear}
                      </span>
                      {doc.dateIssued && (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          Issued: {new Date(doc.dateIssued).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {doc.amount && (
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">{formatCurrency(doc.amount)}</p>
                      <p className="text-xs text-white/40">Reported Amount</p>
                    </div>
                  )}
                  {expandedDoc === doc.id ? (
                    <ChevronUp className="w-5 h-5 text-white/40" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40" />
                  )}
                </div>
              </div>
            </div>
            
            {expandedDoc === doc.id && doc.status === 'available' && (
              <div className="px-6 pb-6 border-t border-[#2A2A2A]">
                <div className="pt-4">
                  <p className="text-white/60 text-sm mb-4">{doc.description}</p>
                  <button className="flex items-center gap-2 px-4 py-3 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors">
                    <Download className="w-5 h-5" />
                    Download {doc.name}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
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
