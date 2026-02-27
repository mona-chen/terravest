import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Target, 
  MapPin, 
  Clock, 
  Building2, 
  Users, 
  CheckCircle2,
  ArrowLeft,
  DollarSign,
  BarChart3,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const criteria = [
  {
    icon: Target,
    title: 'Investment Stage',
    description: 'Growth equity and buyout opportunities',
    details: ['Series B+', 'Buyouts', 'Recapitalizations', 'Secondary transactions'],
    color: '#8FB8A3',
  },
  {
    icon: DollarSign,
    title: 'Deal Size',
    description: 'Flexible check sizes based on opportunity',
    details: ['$5M - $50M equity', 'Lead or co-invest', 'Follow-on capacity'],
    color: '#6B9A82',
  },
  {
    icon: MapPin,
    title: 'Geography',
    description: 'Central and West Africa focus',
    details: ['Cameroon', 'Ghana', 'Nigeria', 'Kenya', 'Gabon'],
    color: '#4A7A68',
  },
  {
    icon: Building2,
    title: 'Sectors',
    description: 'Strategic focus industries',
    details: ['Financial Services', 'Infrastructure', 'Energy', 'Technology', 'Healthcare'],
    color: '#A8C9B8',
  },
  {
    icon: BarChart3,
    title: 'Ownership',
    description: 'Flexible ownership structures',
    details: ['Majority stakes', 'Strategic minority', 'Board representation'],
    color: '#7BA391',
  },
  {
    icon: Clock,
    title: 'Hold Period',
    description: 'Long-term value creation',
    details: ['4-7 year horizon', 'Active management', 'Exit flexibility'],
    color: '#5A8A72',
  },
];

const requirements = [
  'Proven management team with track record',
  'Sustainable competitive advantage',
  'Clear path to profitability',
  'Revenue of $5M+ annually',
  'Strong governance and transparency',
  'Alignment with ESG principles',
];

const processSteps = [
  {
    step: '01',
    title: 'Initial Screening',
    description: 'We review your business profile, financials, and strategic fit against our investment criteria.',
    duration: '1-2 weeks',
  },
  {
    step: '02',
    title: 'Due Diligence',
    description: 'Comprehensive analysis of financials, operations, market position, and management team.',
    duration: '4-8 weeks',
  },
  {
    step: '03',
    title: 'Investment Committee',
    description: 'Internal review and decision-making by our investment committee.',
    duration: '2-3 weeks',
  },
  {
    step: '04',
    title: 'Term Sheet & Closing',
    description: 'Negotiation of terms, legal documentation, and final closing.',
    duration: '4-6 weeks',
  },
];

export default function InvestmentCriteria() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.criteria-hero > *', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo('.criteria-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.criteria-grid', start: 'top 80%' }
        }
      );

      gsap.fromTo('.process-step',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.process-section', start: 'top 80%' }
        }
      );

      gsap.fromTo('.requirement-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.requirements-section', start: 'top 80%' }
        }
      );
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#F7F5F0]">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation Bar */}
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

      {/* Hero Section */}
      <section className="criteria-hero pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8FB8A3]/10 border border-[#8FB8A3]/20 rounded-full text-sm font-medium text-[#8FB8A3] mb-6">
            <Target className="w-4 h-4" />
            For Entrepreneurs
          </span>
          <h1 className="text-4xl lg:text-6xl font-semibold text-[#1A1A1A] mb-6">
            Investment Criteria
          </h1>
          <p className="text-lg lg:text-xl text-[#5A5A5A] max-w-2xl mx-auto leading-relaxed">
            We partner with exceptional companies across Central Africa. 
            Here's what we look for in potential investments.
          </p>
        </div>
      </section>

      {/* Criteria Grid */}
      <section className="criteria-grid py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-4">
              What We Look For
            </h2>
            <p className="text-[#5A5A5A] max-w-2xl mx-auto">
              Our investment criteria reflect our strategy of building profitable enterprises 
              through disciplined capital allocation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {criteria.map((item, index) => (
              <div 
                key={index} 
                className="criteria-card group p-8 bg-[#F7F5F0] rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-[#5A5A5A] mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#7A7A7A]">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="requirements-section py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-6">
                Ideal Partner Profile
              </h2>
              <p className="text-[#5A5A5A] mb-8 leading-relaxed">
                We seek companies and management teams that demonstrate excellence 
                in their markets and share our vision for sustainable growth.
              </p>
              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <div key={index} className="requirement-item flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#8FB8A3]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[#8FB8A3]" />
                    </div>
                    <span className="text-[#1A1A1A]">{req}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1A1A1A] rounded-3xl p-8 lg:p-12">
              <Shield className="w-12 h-12 text-[#8FB8A3] mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Our Commitment
              </h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                When we invest, we bring more than capital. We provide strategic 
                guidance, operational expertise, and access to our network of 
                industry leaders across Africa.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-[#8FB8A3] mb-1">24%</div>
                  <div className="text-sm text-white/50">Average IRR</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#8FB8A3] mb-1">$247M</div>
                  <div className="text-sm text-white/50">AUM</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#8FB8A3] mb-1">16</div>
                  <div className="text-sm text-white/50">Portfolio Companies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#8FB8A3] mb-1">4</div>
                  <div className="text-sm text-white/50">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Our Investment Process
            </h2>
            <p className="text-[#5A5A5A] max-w-2xl mx-auto">
              A disciplined approach to evaluating and executing investment opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step relative">
                <div className="bg-[#F7F5F0] rounded-2xl p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-[#8FB8A3]/30">{step.step}</span>
                    <span className="text-xs text-[#7A7A7A] bg-white px-3 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#5A5A5A]">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-[#8FB8A3]/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#8FB8A3] rounded-3xl p-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Ready to Partner?
            </h2>
            <p className="text-[#1A1A1A]/70 mb-8 max-w-xl mx-auto">
              If your company meets our criteria, we'd love to hear from you. 
              Submit your information for initial review.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:investments@terravest.co"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white rounded-xl font-medium hover:bg-[#2A2A2A] transition-colors"
              >
                <Users className="w-5 h-5" />
                Submit Your Company
              </a>
              <Link 
                to="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1A1A1A] rounded-xl font-medium hover:bg-[#F7F5F0] transition-colors"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

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
