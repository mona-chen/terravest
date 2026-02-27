import { useState } from 'react';
import { 
  Shield, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Upload,
  Download,
  User,
  Building2,
  Briefcase,
  Lock
} from 'lucide-react';

interface KYCRequirement {
  id: string;
  category: 'identity' | 'address' | 'financial' | 'accreditation';
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'required';
  documents: string[];
  uploadedFiles?: string[];
}

const kycRequirements: KYCRequirement[] = [
  {
    id: 'kyc-1',
    category: 'identity',
    title: 'Government-Issued ID',
    description: 'Valid passport, national ID, or driver\'s license',
    status: 'completed',
    documents: ['Passport or National ID', 'Driver\'s License (alternative)'],
    uploadedFiles: ['passport_scan.pdf'],
  },
  {
    id: 'kyc-2',
    category: 'identity',
    title: 'Proof of Address',
    description: 'Utility bill or bank statement from the last 3 months',
    status: 'completed',
    documents: ['Utility Bill', 'Bank Statement', 'Government Correspondence'],
    uploadedFiles: ['utility_bill_march.pdf'],
  },
  {
    id: 'kyc-3',
    category: 'financial',
    title: 'Source of Funds Declaration',
    description: 'Documentation proving the origin of your investment capital',
    status: 'pending',
    documents: ['Bank Statements (6 months)', 'Employment Letter', 'Business Ownership Docs'],
  },
  {
    id: 'kyc-4',
    category: 'accreditation',
    title: 'Accredited Investor Verification',
    description: 'Proof that you meet accredited investor criteria',
    status: 'required',
    documents: ['Net Worth Statement', 'Income Verification', 'Professional License'],
  },
  {
    id: 'kyc-5',
    category: 'financial',
    title: 'Tax Identification',
    description: 'Tax ID number and relevant tax documentation',
    status: 'completed',
    documents: ['Tax ID Certificate', 'Recent Tax Return'],
    uploadedFiles: ['tax_id_certificate.pdf'],
  },
  {
    id: 'kyc-6',
    category: 'address',
    title: 'Beneficial Ownership Declaration',
    description: 'If investing through an entity, declare beneficial owners',
    status: 'required',
    documents: ['Corporate Structure Chart', 'Shareholder Register'],
  },
];

const complianceStatus = {
  overall: 'in-progress',
  completed: 3,
  total: 6,
  lastUpdated: '2024-02-15',
  nextReview: '2024-08-15',
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'identity':
      return User;
    case 'address':
      return Building2;
    case 'financial':
      return Briefcase;
    case 'accreditation':
      return Shield;
    default:
      return FileText;
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'required':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

export default function CompliancePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [uploadingItem, setUploadingItem] = useState<string | null>(null);

  const filteredRequirements = selectedCategory
    ? kycRequirements.filter(r => r.category === selectedCategory)
    : kycRequirements;

  const completionPercentage = (complianceStatus.completed / complianceStatus.total) * 100;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Compliance & KYC</h1>
          <p className="text-white/50">Manage your KYC/AML documentation</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#8FB8A3]/10 border border-[#8FB8A3]/20 rounded-lg">
          <Lock className="w-4 h-4 text-[#8FB8A3]" />
          <span className="text-sm text-[#8FB8A3]">Bank-grade security</span>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#2A2A2A]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-[#8FB8A3]"
                  strokeDasharray={`${completionPercentage}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{Math.round(completionPercentage)}%</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Compliance Status</h3>
              <p className="text-white/50 text-sm">
                {complianceStatus.completed} of {complianceStatus.total} requirements completed
              </p>
            </div>
          </div>
          
          <div className="flex-1 lg:border-l lg:border-[#2A2A2A] lg:pl-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/40 mb-1">Last Updated</p>
                <p className="text-white">{new Date(complianceStatus.lastUpdated).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-white/40 mb-1">Next Review</p>
                <p className="text-white">{new Date(complianceStatus.nextReview).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          {completionPercentage < 100 && (
            <div className="flex items-center gap-2 px-4 py-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-yellow-500">
                {complianceStatus.total - complianceStatus.completed} items require attention
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-[#8FB8A3] text-[#0A0A0A]'
              : 'bg-[#141414] border border-[#2A2A2A] text-white/60 hover:text-white'
          }`}
        >
          All Requirements
        </button>
        {['identity', 'address', 'financial', 'accreditation'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              selectedCategory === cat
                ? 'bg-[#8FB8A3] text-[#0A0A0A]'
                : 'bg-[#141414] border border-[#2A2A2A] text-white/60 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Requirements List */}
      <div className="space-y-4">
        {filteredRequirements.map((req) => {
          const CategoryIcon = getCategoryIcon(req.category);
          return (
            <div 
              key={req.id}
              className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusClass(req.status)}`}>
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-white">{req.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs capitalize border ${getStatusClass(req.status)}`}>
                        {req.status}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm">{req.description}</p>
                    
                    {/* Document Types */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {req.documents.map((doc, i) => (
                        <span key={i} className="px-2 py-1 bg-[#1A1A1A] rounded text-xs text-white/50">
                          {doc}
                        </span>
                      ))}
                    </div>
                    
                    {/* Uploaded Files */}
                    {req.uploadedFiles && req.uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {req.uploadedFiles.map((file, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-3 p-2 bg-green-500/5 border border-green-500/20 rounded-lg"
                          >
                            <FileText className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-white flex-1">{file}</span>
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <button className="p-1 hover:bg-[#2A2A2A] rounded">
                              <Download className="w-4 h-4 text-white/40" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Button */}
                {req.status !== 'completed' && (
                  <button
                    onClick={() => setUploadingItem(req.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="bg-[#1A1A1A] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-2">Need Help?</h3>
        <p className="text-white/50 text-sm mb-4">
          Our compliance team is available to assist you with any KYC/AML documentation questions.
        </p>
        <div className="flex flex-wrap gap-3">
          <a 
            href="mailto:compliance@terravest.co"
            className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors"
          >
            <Shield className="w-4 h-4" />
            Contact Compliance Team
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors">
            <FileText className="w-4 h-4" />
            Download KYC Guide
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {uploadingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setUploadingItem(null)}
          />
          <div className="relative bg-[#141414] border border-[#2A2A2A] rounded-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-semibold text-white mb-4">Upload Document</h3>
            <p className="text-white/50 text-sm mb-6">
              Upload your document for {kycRequirements.find(r => r.id === uploadingItem)?.title}
            </p>
            
            <div className="border-2 border-dashed border-[#2A2A2A] rounded-xl p-8 text-center hover:border-[#8FB8A3]/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <p className="text-white mb-2">Drag and drop your file here</p>
              <p className="text-white/40 text-sm">or click to browse</p>
              <p className="text-white/30 text-xs mt-2">PDF, JPG, PNG up to 10MB</p>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setUploadingItem(null)}
                className="flex-1 px-4 py-3 border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setUploadingItem(null)}
                className="flex-1 px-4 py-3 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors"
              >
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
