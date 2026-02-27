import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  Calendar, 
  ArrowUpRight, 
  Search,
  X,
  Share2,
  Bookmark
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const newsItems = [
  {
    id: 1,
    title: 'TerraVest Announces $50M Fund II for Renewable Energy Projects',
    excerpt: 'The new fund will focus on solar and wind energy infrastructure across West and East Africa, building on the success of our first energy fund.',
    category: 'Company News',
    date: '2024-02-15',
    image: '/sectors/energy.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'AfriCapital Finance Reaches 250,000 Digital Customers Milestone',
    excerpt: 'Our portfolio company celebrates a major milestone in financial inclusion, just two years after our initial investment.',
    category: 'Portfolio',
    date: '2024-02-08',
    image: '/sectors/finance.jpg',
    featured: false,
  },
  {
    id: 3,
    title: 'Jean-Pierre Moussa Named African CEO of the Year 2023',
    excerpt: 'TerraVest founder recognized for outstanding leadership in developing African enterprises and creating sustainable value.',
    category: 'Awards',
    date: '2024-01-22',
    image: '/team/ceo.jpg',
    featured: false,
  },
  {
    id: 4,
    title: 'TerraVest Expands into Nigeria with Lagos Office Opening',
    excerpt: 'Strategic expansion into Africa\'s largest economy marks a new chapter in our regional growth strategy.',
    category: 'Company News',
    date: '2024-01-15',
    image: '/sectors/real-estate.jpg',
    featured: false,
  },
  {
    id: 5,
    title: 'GreenEnergy Cameroon Connects 150,000 People to Clean Power',
    excerpt: 'Our portfolio company achieves major impact milestone with solar mini-grids across rural Cameroon.',
    category: 'Portfolio',
    date: '2023-12-20',
    image: '/sectors/energy.jpg',
    featured: false,
  },
  {
    id: 6,
    title: 'TerraVest Releases 2023 ESG Impact Report',
    excerpt: 'Annual report highlights our commitment to sustainable investing and measurable social impact across our portfolio.',
    category: 'ESG',
    date: '2023-12-10',
    image: '/sectors/agriculture.jpg',
    featured: false,
  },
];

const categories = ['All', 'Company News', 'Portfolio', 'Awards', 'ESG', 'Press'];

export default function News() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<typeof newsItems[0] | null>(null);

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = newsItems.find(item => item.featured);
  const regularArticles = filteredNews.filter(item => !item.featured || item.id !== featuredArticle?.id);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.news-hero > *', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo('.news-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.news-grid', start: 'top 85%' }
        }
      );
    }, page);

    return () => ctx.revert();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#F7F5F0]">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-sora text-xl font-semibold text-[#1A1A1A]">
              TerraVest
            </Link>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-sm text-[#5A5A5A] hover:text-[#1A1A1A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="news-hero pt-32 pb-12 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8FB8A3]/10 border border-[#8FB8A3]/20 rounded-full text-sm font-medium text-[#8FB8A3] mb-6">
            <Calendar className="w-4 h-4" />
            News & Updates
          </span>
          <h1 className="text-4xl lg:text-6xl font-semibold text-[#1A1A1A] mb-6">
            Latest from TerraVest
          </h1>
          <p className="text-lg lg:text-xl text-[#5A5A5A] max-w-2xl mx-auto leading-relaxed">
            Stay informed about our latest investments, portfolio milestones, 
            and industry insights.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 lg:px-8 bg-white border-y border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#8FB8A3] text-[#1A1A1A]'
                      : 'bg-[#F7F5F0] text-[#5A5A5A] hover:bg-[#8FB8A3]/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A7A]" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#F7F5F0] rounded-full text-sm w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-[#8FB8A3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && selectedCategory === 'All' && !searchQuery && (
        <section className="py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div 
              className="group bg-white rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedArticle(featuredArticle)}
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#8FB8A3] text-[#1A1A1A] text-sm font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm text-[#7A7A7A] mb-4">
                    <span className="text-[#8FB8A3]">{featuredArticle.category}</span>
                    <span>•</span>
                    <span>{formatDate(featuredArticle.date)}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-semibold text-[#1A1A1A] mb-4 group-hover:text-[#8FB8A3] transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-[#5A5A5A] mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[#8FB8A3] font-medium">
                    Read More <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="news-grid py-12 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-8">
            {selectedCategory === 'All' ? 'All News' : `${selectedCategory} News`}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <div 
                key={article.id} 
                className="news-card group bg-[#F7F5F0] rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-[#7A7A7A] mb-3">
                    <span className="text-[#8FB8A3]">{article.category}</span>
                    <span>•</span>
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2 group-hover:text-[#8FB8A3] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#5A5A5A] line-clamp-2">{article.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
          
          {regularArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#7A7A7A]">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          />
          <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="relative h-64">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-2 text-sm text-[#7A7A7A] mb-4">
                <span className="px-3 py-1 bg-[#8FB8A3]/10 text-[#8FB8A3] rounded-full">
                  {selectedArticle.category}
                </span>
                <span>•</span>
                <span>{formatDate(selectedArticle.date)}</span>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#1A1A1A] mb-4">
                {selectedArticle.title}
              </h2>
              
              <p className="text-[#5A5A5A] leading-relaxed mb-6">
                {selectedArticle.excerpt}
              </p>
              
              <p className="text-[#5A5A5A] leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <p className="text-[#5A5A5A] leading-relaxed mb-8">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-[#E5E5E5]">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#F7F5F0] rounded-full text-sm text-[#5A5A5A] hover:bg-[#8FB8A3]/10 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#F7F5F0] rounded-full text-sm text-[#5A5A5A] hover:bg-[#8FB8A3]/10 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0F0F0F] py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/" className="inline-block mb-4">
            <span className="font-sora text-2xl font-semibold text-white">TerraVest</span>
          </Link>
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} TerraVest Holdings. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
