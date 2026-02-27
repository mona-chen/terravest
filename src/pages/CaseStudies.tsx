import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  TrendingUp, 
  Building2, 
  ArrowUpRight,
  X,
  Calendar,
  MapPin,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    id: 1,
    company: 'AfriCapital Finance',
    sector: 'Financial Services',
    location: 'Douala, Cameroon',
    year: '2021',
    image: '/sectors/finance.jpg',
    headline: 'Transforming a Regional Bank into a Digital Finance Leader',
    challenge: 'AfriCapital was a traditional microfinance institution with limited digital capabilities, struggling to scale beyond its physical branch network.',
    solution: 'We partnered with management to develop a comprehensive digital transformation strategy, investing in mobile banking infrastructure and expanding the loan portfolio.',
    results: [
      { metric: '3.5x', label: 'Revenue Growth' },
      { metric: '250K+', label: 'New Digital Customers' },
      { metric: '45%', label: 'Cost Reduction' },
    ],
    quote: 'TerraVest\'s strategic guidance and capital enabled us to leapfrog traditional banking models and become a fintech leader in Central Africa.',
    quotee: 'Marie-Claire Nkoulou, CEO',
  },
  {
    id: 2,
    company: 'GreenEnergy Cameroon',
    sector: 'Energy',
    location: 'Yaoundé, Cameroon',
    year: '2020',
    image: '/sectors/energy.jpg',
    headline: 'Building Sustainable Energy Infrastructure',
    challenge: 'Rural communities lacked reliable electricity access, hampering economic development and quality of life.',
    solution: 'Developed a distributed solar power network with mini-grids serving off-grid communities, combined with pay-as-you-go financing models.',
    results: [
      { metric: '150K', label: 'People Connected' },
      { metric: '85%', label: 'Renewable Energy' },
      { metric: '$12M', label: 'Social Impact Value' },
    ],
    quote: 'The partnership with TerraVest allowed us to scale our impact while maintaining financial sustainability.',
    quotee: 'Dr. Paul Essomba, Founder',
  },
  {
    id: 3,
    company: 'TechVentures Douala',
    sector: 'Technology',
    location: 'Douala, Cameroon',
    year: '2022',
    image: '/sectors/technology.jpg',
    headline: 'Scaling Africa\'s Next Unicorn',
    challenge: 'A promising fintech startup needed capital and expertise to scale across West Africa.',
    solution: 'Led a Series B funding round and provided operational support for expansion into Ghana and Nigeria.',
    results: [
      { metric: '5x', label: 'User Growth' },
      { metric: '3', label: 'Countries' },
      { metric: '$50M', label: 'Valuation' },
    ],
    quote: 'TerraVest understood our vision and provided the resources to turn it into reality.',
    quotee: 'Kofi Mensah, Co-founder',
  },
  {
    id: 4,
    company: 'AgriProcess Yaoundé',
    sector: 'Agriculture',
    location: 'Yaoundé, Cameroon',
    year: '2019',
    image: '/sectors/agriculture.jpg',
    headline: 'Modernizing Agricultural Supply Chains',
    challenge: 'Post-harvest losses were devastating farmer incomes and food security in the region.',
    solution: 'Built modern processing facilities and established direct farmer partnerships with fair pricing guarantees.',
    results: [
      { metric: '60%', label: 'Loss Reduction' },
      { metric: '12K', label: 'Farmers Supported' },
      { metric: '3x', label: 'Farmer Income' },
    ],
    quote: 'Working with TerraVest transformed our business and the lives of thousands of farming families.',
    quotee: 'Isabelle Fouda, Managing Director',
  },
];

export default function CaseStudies() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedCase, setSelectedCase] = useState<typeof caseStudies[0] | null>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.case-hero > *', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo('.case-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.cases-grid', start: 'top 80%' }
        }
      );
    }, page);

    return () => ctx.revert();
  }, []);

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
      <section className="case-hero pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8FB8A3]/10 border border-[#8FB8A3]/20 rounded-full text-sm font-medium text-[#8FB8A3] mb-6">
            <Building2 className="w-4 h-4" />
            Portfolio
          </span>
          <h1 className="text-4xl lg:text-6xl font-semibold text-[#1A1A1A] mb-6">
            Case Studies
          </h1>
          <p className="text-lg lg:text-xl text-[#5A5A5A] max-w-2xl mx-auto leading-relaxed">
            Real stories of transformation and growth. See how we partner with 
            exceptional companies to create lasting value.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="cases-grid py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <div 
                key={study.id} 
                className="case-card group bg-[#F7F5F0] rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedCase(study)}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.company}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      {study.location}
                      <span className="mx-2">•</span>
                      <Calendar className="w-4 h-4" />
                      {study.year}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{study.company}</h3>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-[#8FB8A3]/10 text-[#8FB8A3] text-sm rounded-full mb-4">
                    {study.sector}
                  </span>
                  <p className="text-[#1A1A1A] font-medium mb-4">{study.headline}</p>
                  
                  {/* Results Preview */}
                  <div className="flex gap-6 mb-4">
                    {study.results.slice(0, 2).map((result, i) => (
                      <div key={i}>
                        <div className="text-2xl font-bold text-[#8FB8A3]">{result.metric}</div>
                        <div className="text-xs text-[#7A7A7A]">{result.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-[#8FB8A3] font-medium group-hover:gap-3 transition-all">
                    Read Full Story <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedCase(null)}
          />
          <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Hero Image */}
            <div className="relative h-64">
              <img 
                src={selectedCase.image} 
                alt={selectedCase.company}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {selectedCase.location}
                  <span className="mx-2">•</span>
                  <Calendar className="w-4 h-4" />
                  {selectedCase.year}
                </div>
                <h2 className="text-3xl font-bold text-white">{selectedCase.company}</h2>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <span className="inline-block px-3 py-1 bg-[#8FB8A3]/10 text-[#8FB8A3] text-sm rounded-full mb-6">
                {selectedCase.sector}
              </span>
              
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">{selectedCase.headline}</h3>
              
              {/* Challenge */}
              <div className="mb-6">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-[#1A1A1A] mb-2">
                  <Target className="w-5 h-5 text-[#8FB8A3]" />
                  The Challenge
                </h4>
                <p className="text-[#5A5A5A] leading-relaxed">{selectedCase.challenge}</p>
              </div>
              
              {/* Solution */}
              <div className="mb-6">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-[#1A1A1A] mb-2">
                  <TrendingUp className="w-5 h-5 text-[#8FB8A3]" />
                  Our Solution
                </h4>
                <p className="text-[#5A5A5A] leading-relaxed">{selectedCase.solution}</p>
              </div>
              
              {/* Results */}
              <div className="mb-6">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-[#1A1A1A] mb-4">
                  <Building2 className="w-5 h-5 text-[#8FB8A3]" />
                  Results
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {selectedCase.results.map((result, i) => (
                    <div key={i} className="bg-[#F7F5F0] rounded-xl p-4 text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-[#8FB8A3] mb-1">{result.metric}</div>
                      <div className="text-sm text-[#5A5A5A]">{result.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quote */}
              <div className="bg-[#1A1A1A] rounded-2xl p-6">
                <p className="text-white/90 italic mb-4">"{selectedCase.quote}"</p>
                <p className="text-[#8FB8A3] font-medium">— {selectedCase.quotee}</p>
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
