import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  FileText, 
  FileSpreadsheet, 
  File,
  Download,
  MoreVertical,
  Folder,
  Clock,
  Star,
  Share2,
} from 'lucide-react';
import { documents } from '../data/mockData';

const categories = ['All', 'Reports', 'Financial', 'ESG', 'Governance', 'Investments', 'Risk'];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="w-8 h-8 text-red-400" />;
    case 'excel':
      return <FileSpreadsheet className="w-8 h-8 text-green-400" />;
    case 'doc':
      return <File className="w-8 h-8 text-blue-400" />;
    default:
      return <File className="w-8 h-8 text-white/40" />;
  }
};

export default function DocumentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSelection = (id: string) => {
    setSelectedDocuments(prev => 
      prev.includes(id) 
        ? prev.filter(docId => docId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(filteredDocuments.map(doc => doc.id));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Documents</h1>
          <p className="text-white/50">Access and manage your investment documents</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedDocuments.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-[#8FB8A3]/10 border border-[#8FB8A3]/30 rounded-lg">
              <span className="text-sm text-[#8FB8A3]">{selectedDocuments.length} selected</span>
            </div>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Download All</span>
          </button>
        </div>
      </div>

      {/* Quick categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-[#8FB8A3] text-[#0A0A0A]'
                : 'bg-[#141414] border border-[#2A2A2A] text-white/70 hover:text-white hover:border-[#8FB8A3]'
            }`}
          >
            {category}
          </button>
        ))}
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
              placeholder="Search documents..."
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
      </div>

      {/* Documents */}
      {viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDocuments.map((doc) => (
            <div 
              key={doc.id} 
              className={`bg-[#141414] border rounded-xl p-5 card-hover group cursor-pointer ${
                selectedDocuments.includes(doc.id) 
                  ? 'border-[#8FB8A3] bg-[#8FB8A3]/5' 
                  : 'border-[#2A2A2A]'
              }`}
              onClick={() => toggleSelection(doc.id)}
            >
              <div className="flex items-start justify-between mb-4">
                {getFileIcon(doc.type)}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // More options
                  }}
                  className="p-2 text-white/30 hover:text-white hover:bg-[#2A2A2A] rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-sm font-medium text-white mb-2 line-clamp-2">{doc.name}</h3>
              
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>{doc.size}</span>
                <span>{doc.date}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
                <span className="inline-flex items-center px-2 py-1 bg-[#1A1A1A] rounded text-xs text-white/60">
                  <Folder className="w-3 h-3 mr-1" />
                  {doc.category}
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
                <th className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                    onChange={selectAll}
                    className="w-4 h-4 rounded border-[#2A2A2A] bg-[#1A1A1A] text-[#8FB8A3] focus:ring-[#8FB8A3] focus:ring-offset-0"
                  />
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-white/50">Name</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-white/50">Category</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-white/50">Date</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-white/50">Size</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr 
                  key={doc.id} 
                  className={`border-b border-[#2A2A2A] table-row-hover ${
                    selectedDocuments.includes(doc.id) ? 'bg-[#8FB8A3]/5' : ''
                  }`}
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => toggleSelection(doc.id)}
                      className="w-4 h-4 rounded border-[#2A2A2A] bg-[#1A1A1A] text-[#8FB8A3] focus:ring-[#8FB8A3] focus:ring-offset-0"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <span className="font-medium text-white">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 bg-[#1A1A1A] rounded-full text-xs text-white/60">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-white/50">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {doc.date}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right text-white/50">{doc.size}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-white/30 hover:text-[#8FB8A3] hover:bg-[#8FB8A3]/10 rounded-lg transition-colors">
                        <Star className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/30 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/30 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty state */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white/30" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No documents found</h3>
          <p className="text-white/50">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
