import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  Linkedin, 
  Mail, 
  Award, 
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const leaders = [
  {
    name: 'Jean-Pierre Moussa',
    role: 'Chief Executive Officer',
    image: '/team/ceo.jpg',
    bio: 'Jean-Pierre founded TerraVest in 2018 with a vision to build world-class enterprises across Africa. With over 20 years of experience in investment banking and private equity, he has led transactions totaling over $2 billion across the continent.',
    education: ['MBA, INSEAD', 'BSc Economics, University of Douala'],
    previous: ['Managing Director, Standard Chartered Cameroon', 'VP, Goldman Sachs London'],
    awards: ['African CEO of the Year 2023', 'Forbes Africa 30 Under 30 (Alumni)'],
    linkedin: '#',
    email: 'jp.moussa@terravest.co',
  },
  {
    name: 'Dr. Amara Okafor',
    role: 'Chief Investment Officer',
    image: '/team/cio.jpg',
    bio: 'Amara oversees TerraVest\'s investment strategy and portfolio management. She brings deep expertise in African markets and has structured some of the region\'s most innovative investment transactions.',
    education: ['PhD Finance, MIT', 'MBA, Harvard Business School'],
    previous: ['Partner, Actis', 'Investment Director, CDC Group'],
    awards: ['Emerging Markets Investor of the Year 2022'],
    linkedin: '#',
    email: 'amara.okafor@terravest.co',
  },
  {
    name: 'Sarah Johnson',
    role: 'Chief Operating Officer',
    image: '/team/coo.jpg',
    bio: 'Sarah leads TerraVest\'s operations and portfolio company value creation initiatives. She has extensive experience in operational transformation across emerging markets.',
    education: ['MBA, Stanford GSB', 'BEng, Imperial College London'],
    previous: ['Partner, McKinsey & Company', 'Operations Director, Diageo Africa'],
    awards: ['Women in Business Leadership Award 2023'],
    linkedin: '#',
    email: 'sarah.johnson@terravest.co',
  },
  {
    name: 'Michael Chen',
    role: 'Chief Financial Officer',
    image: '/team/cfo.jpg',
    bio: 'Michael manages TerraVest\'s financial operations, investor relations, and capital allocation. He brings a wealth of experience in financial structuring and risk management.',
    education: ['MBA, Wharton', 'CPA, CFA'],
    previous: ['CFO, Helios Investment Partners', 'Director, KPMG'],
    awards: ['CFO of the Year - Private Equity 2023'],
    linkedin: '#',
    email: 'michael.chen@terravest.co',
  },
];

const boardMembers = [
  {
    name: 'Prof. Fatima Al-Hassan',
    role: 'Independent Director',
    bio: 'Former Deputy Governor, Central Bank of Nigeria',
    image: '/team/board1.jpg',
  },
  {
    name: 'David Kimani',
    role: 'Independent Director',
    bio: 'Former CEO, Safaricom Investment Company',
    image: '/team/board2.jpg',
  },
  {
    name: 'Dr. Patricia Mensah',
    role: 'Independent Director',
    bio: 'Partner, African Legal Associates',
    image: '/team/board3.jpg',
  },
];

export default function Leadership() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.leadership-hero > *', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo('.leader-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.leaders-grid', start: 'top 80%' }
        }
      );

      gsap.fromTo('.board-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.board-grid', start: 'top 85%' }
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
      <section className="leadership-hero pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8FB8A3]/10 border border-[#8FB8A3]/20 rounded-full text-sm font-medium text-[#8FB8A3] mb-6">
            <Award className="w-4 h-4" />
            Our Team
          </span>
          <h1 className="text-4xl lg:text-6xl font-semibold text-[#1A1A1A] mb-6">
            Leadership Team
          </h1>
          <p className="text-lg lg:text-xl text-[#5A5A5A] max-w-2xl mx-auto leading-relaxed">
            Experienced professionals with deep expertise in African markets, 
            investment management, and value creation.
          </p>
        </div>
      </section>

      {/* Executive Team */}
      <section className="leaders-grid py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Executive Team
            </h2>
            <p className="text-[#5A5A5A] max-w-2xl mx-auto">
              Our leadership team brings together decades of experience in private equity, 
              investment banking, and operational management across Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {leaders.map((leader, index) => (
              <div key={index} className="leader-card bg-[#F7F5F0] rounded-3xl overflow-hidden">
                <div className="grid lg:grid-cols-5">
                  {/* Image */}
                  <div className="lg:col-span-2 h-64 lg:h-auto">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="lg:col-span-3 p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-1">{leader.name}</h3>
                      <p className="text-[#8FB8A3] font-medium">{leader.role}</p>
                    </div>
                    
                    <p className="text-[#5A5A5A] mb-6 leading-relaxed">{leader.bio}</p>
                    
                    {/* Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <GraduationCap className="w-5 h-5 text-[#8FB8A3] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-[#1A1A1A] mb-1">Education</p>
                          {leader.education.map((edu, i) => (
                            <p key={i} className="text-sm text-[#5A5A5A]">{edu}</p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 text-[#8FB8A3] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-[#1A1A1A] mb-1">Previous</p>
                          {leader.previous.map((prev, i) => (
                            <p key={i} className="text-sm text-[#5A5A5A]">{prev}</p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-[#8FB8A3] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-[#1A1A1A] mb-1">Recognition</p>
                          {leader.awards.map((award, i) => (
                            <p key={i} className="text-sm text-[#5A5A5A]">{award}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                      <a 
                        href={leader.linkedin}
                        className="w-10 h-10 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center hover:bg-[#8FB8A3]/20 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-[#1A1A1A]" />
                      </a>
                      <a 
                        href={`mailto:${leader.email}`}
                        className="w-10 h-10 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center hover:bg-[#8FB8A3]/20 transition-colors"
                      >
                        <Mail className="w-5 h-5 text-[#1A1A1A]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="board-grid py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Board of Directors
            </h2>
            <p className="text-[#5A5A5A] max-w-2xl mx-auto">
              Independent directors providing strategic oversight and governance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {boardMembers.map((member, index) => (
              <div key={index} className="board-card bg-white rounded-2xl p-6 text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">{member.name}</h3>
                <p className="text-[#8FB8A3] text-sm font-medium mb-2">{member.role}</p>
                <p className="text-[#5A5A5A] text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#8FB8A3] mb-2">80+</div>
              <div className="text-white/60">Combined Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#8FB8A3] mb-2">$2B+</div>
              <div className="text-white/60">Transactions Led</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#8FB8A3] mb-2">15+</div>
              <div className="text-white/60">Countries Worked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#8FB8A3] mb-2">50+</div>
              <div className="text-white/60">Companies Advised</div>
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
