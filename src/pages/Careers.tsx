import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowUpRight,
  Users,
  Heart,
  Globe,
  GraduationCap,
  Zap,
  CheckCircle2,
  X,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Compensation',
    description: 'Market-leading salaries with performance bonuses and carry participation.',
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health coverage for you and your family.',
  },
  {
    icon: GraduationCap,
    title: 'Learning & Development',
    description: 'Continuous learning budget and professional certification support.',
  },
  {
    icon: Globe,
    title: 'Global Exposure',
    description: 'Work across multiple African markets with international travel.',
  },
  {
    icon: Zap,
    title: 'Fast-Paced Environment',
    description: 'High-impact work with direct exposure to leadership.',
  },
  {
    icon: Users,
    title: 'Collaborative Culture',
    description: 'Work alongside industry experts and seasoned investors.',
  },
];

const openings = [
  {
    id: 1,
    title: 'Investment Associate',
    department: 'Investments',
    location: 'Douala, Cameroon',
    type: 'Full-time',
    experience: '2-4 years',
    description: 'Support the investment team in sourcing, evaluating, and executing transactions across our target sectors.',
    requirements: [
      'Bachelor\'s degree in Finance, Economics, or related field',
      '2-4 years experience in investment banking, private equity, or consulting',
      'Strong financial modeling and analysis skills',
      'Fluent in English and French',
    ],
  },
  {
    id: 2,
    title: 'Senior Analyst - Financial Services',
    department: 'Investments',
    location: 'Douala, Cameroon',
    type: 'Full-time',
    experience: '4-6 years',
    description: 'Lead sector research and due diligence for financial services investments.',
    requirements: [
      'Bachelor\'s degree; MBA or CFA preferred',
      '4-6 years experience in financial sector analysis',
      'Deep understanding of African banking and fintech landscape',
      'Strong network in the financial services industry',
    ],
  },
  {
    id: 3,
    title: 'Portfolio Operations Manager',
    department: 'Operations',
    location: 'Douala, Cameroon',
    type: 'Full-time',
    experience: '5-8 years',
    description: 'Work with portfolio companies to drive operational improvements and value creation.',
    requirements: [
      'MBA or equivalent advanced degree',
      '5-8 years in operations, consulting, or general management',
      'Experience in emerging markets preferred',
      'Strong project management and stakeholder management skills',
    ],
  },
  {
    id: 4,
    title: 'ESG & Impact Analyst',
    department: 'ESG',
    location: 'Douala, Cameroon',
    type: 'Full-time',
    experience: '3-5 years',
    description: 'Lead ESG due diligence and impact measurement across our investment portfolio.',
    requirements: [
      'Degree in Sustainability, Environmental Science, or related field',
      '3-5 years in ESG analysis or impact investing',
      'Knowledge of international ESG frameworks (SASB, GRI, etc.)',
      'Strong data analysis and reporting skills',
    ],
  },
  {
    id: 5,
    title: 'Investor Relations Associate',
    department: 'Investor Relations',
    location: 'Douala, Cameroon',
    type: 'Full-time',
    experience: '2-4 years',
    description: 'Support fundraising and ongoing communication with our investor base.',
    requirements: [
      'Bachelor\'s degree in Finance or related field',
      '2-4 years in investor relations, fundraising, or client service',
      'Excellent communication and presentation skills',
      'Experience with CRM systems and data rooms',
    ],
  },
];

const values = [
  {
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from investment decisions to portfolio support.',
  },
  {
    title: 'Integrity',
    description: 'We operate with the highest ethical standards and transparency in all our dealings.',
  },
  {
    title: 'Impact',
    description: 'We measure success not just in returns, but in the positive change we create.',
  },
  {
    title: 'Innovation',
    description: 'We embrace new ideas and approaches to solve complex challenges.',
  },
];

export default function Careers() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedJob, setSelectedJob] = useState<typeof openings[0] | null>(null);
  const [filter, setFilter] = useState('All');

  const departments = ['All', ...Array.from(new Set(openings.map(o => o.department)))];
  const filteredJobs = filter === 'All' ? openings : openings.filter(o => o.department === filter);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.careers-hero > *', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo('.benefit-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.benefits-grid', start: 'top 85%' }
        }
      );

      gsap.fromTo('.job-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.jobs-grid', start: 'top 85%' }
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
      <section className="careers-hero pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8FB8A3]/10 border border-[#8FB8A3]/20 rounded-full text-sm font-medium text-[#8FB8A3] mb-6">
            <Briefcase className="w-4 h-4" />
            Join Our Team
          </span>
          <h1 className="text-4xl lg:text-6xl font-semibold text-[#1A1A1A] mb-6">
            Build the Future of <span className="text-[#8FB8A3]">African Enterprise</span>
          </h1>
          <p className="text-lg lg:text-xl text-[#5A5A5A] max-w-2xl mx-auto leading-relaxed mb-8">
            Join a team of passionate professionals building profitable, sustainable 
            businesses across Central Africa.
          </p>
          <a 
            href="#openings"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#8FB8A3] text-[#1A1A1A] rounded-xl font-medium hover:bg-[#7BA391] transition-colors"
          >
            View Open Positions
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#8FB8A3] mb-2">50+</div>
              <div className="text-white/60">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#8FB8A3] mb-2">4</div>
              <div className="text-white/60">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#8FB8A3] mb-2">16</div>
              <div className="text-white/60">Portfolio Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#8FB8A3] mb-2">$247M</div>
              <div className="text-white/60">AUM</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-grid py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Why Work at TerraVest?
            </h2>
            <p className="text-[#5A5A5A] max-w-2xl mx-auto">
              We offer a dynamic work environment with opportunities for growth, 
              learning, and making a real impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card p-6 bg-[#F7F5F0] rounded-2xl">
                <div className="w-12 h-12 bg-[#8FB8A3]/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#8FB8A3]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{benefit.title}</h3>
                <p className="text-[#5A5A5A] text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Our Values
            </h2>
            <p className="text-[#5A5A5A] max-w-2xl mx-auto">
              The principles that guide how we work and make decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{value.title}</h3>
                <p className="text-[#5A5A5A] text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="jobs-grid py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-2">
                Open Positions
              </h2>
              <p className="text-[#5A5A5A]">
                {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} available
              </p>
            </div>
            
            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setFilter(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === dept
                      ? 'bg-[#8FB8A3] text-[#1A1A1A]'
                      : 'bg-[#F7F5F0] text-[#5A5A5A] hover:bg-[#8FB8A3]/10'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="job-card group bg-[#F7F5F0] rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1 group-hover:text-[#8FB8A3] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-[#5A5A5A] mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-[#7A7A7A]">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="px-2 py-0.5 bg-[#8FB8A3]/10 text-[#8FB8A3] rounded-full text-xs">
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#8FB8A3] font-medium group-hover:gap-3 transition-all">
                    View Details <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#7A7A7A]">No open positions in this department.</p>
            </div>
          )}
        </div>
      </section>

      {/* Job Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedJob(null)}
          />
          <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#F7F5F0] rounded-full flex items-center justify-center hover:bg-[#E5E5E5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-[#8FB8A3]/10 text-[#8FB8A3] rounded-full text-sm">
                  {selectedJob.department}
                </span>
                <span className="px-3 py-1 bg-[#F7F5F0] text-[#5A5A5A] rounded-full text-sm">
                  {selectedJob.experience}
                </span>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#1A1A1A] mb-4">
                {selectedJob.title}
              </h2>
              
              <div className="flex flex-wrap gap-4 text-sm text-[#7A7A7A] mb-6">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {selectedJob.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedJob.type}
                </span>
              </div>
              
              <p className="text-[#5A5A5A] mb-6">{selectedJob.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#8FB8A3] flex-shrink-0 mt-0.5" />
                      <span className="text-[#5A5A5A]">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-4 pt-6 border-t border-[#E5E5E5]">
                <a 
                  href={`mailto:careers@terravest.co?subject=Application: ${selectedJob.title}`}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#8FB8A3] text-[#1A1A1A] rounded-xl font-medium hover:bg-[#7BA391] transition-colors"
                >
                  Apply Now
                  <ArrowUpRight className="w-5 h-5" />
                </a>
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
