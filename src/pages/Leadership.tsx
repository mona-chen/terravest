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
    name: 'Ndong Mebenga Octave Nérée',
    role: 'Chief Executive Officer',
    image: '/team/ndong-mebenga.jpg',
    bio: 'Dynamic executive serving as the Chief Executive Officer of TerraVest Holdings. With a multidisciplinary foundation at the intersection of communication, economic systems, and institutional engagement, he leads the firm\'s mission to deliver cutting-edge financial advisory solutions across Africa and global markets. His leadership is defined by a commitment to unlocking capital flows, structuring transformative projects, and bridging opportunities between Africa and global markets.',
    education: [
      "Master's Degree, Information and Communication Sciences (research-oriented)",
      'Studies in Economics, Marketing, and Commercial Strategy'
    ],
    previous: [
      'Supported implementation of information systems at national development structures',
      'Produced communication platforms on decentralised governance and territorial development',
      'Engaged with ministries and national agencies in Cameroon'
    ],
    awards: [
      'Strategic representation across emerging and frontier markets',
      'Infrastructure and project finance advisory',
      'Innovative and blended finance solutions'
    ],
    linkedin: '#',
    email: 'ceo@terravest.cm',
  },
  {
    name: 'Achuo Anang Stanislaus',
    role: 'Director, Project Finance Architecture & Design',
    image: '/team/achuo.jpg',
    bio: 'Civil engineer and infrastructure specialist serving as Director of Project Finance Architecture & Design. He leads the integration of engineering design with financial structuring, ensuring infrastructure projects meet the rigorous standards required by global investors, development finance institutions, and sovereign stakeholders. He is a Transport Consultant with the World Bank Group, contributing to the African Transport Policy Program (SSATP).',
    education: [
      "Master of Engineering (MEng) in Civil Engineering – ENSTP, Yaoundé",
      'Research focus: Urban stormwater management and resilient drainage systems'
    ],
    previous: [
      'World Bank Group – Transport Consultant, African Transport Policy Program (SSATP)',
      'Urban mobility systems and BRT corridors in Côte d\'Ivoire',
      'Railway rehabilitation and resilient rural infrastructure development'
    ],
    awards: [
      'Infrastructure project design and engineering optimisation',
      'Project finance alignment and investment readiness',
      'Climate-resilient transport infrastructure advisory'
    ],
    linkedin: '#',
    email: 'projects@terravest.cm',
  },
  {
    name: 'Itoe Martin Ndobe',
    role: 'Risk, Compliance & Validation Expert',
    image: '/team/compliance.jpg',
    bio: 'Risk, Compliance, and Validation Expert bringing a strong foundation in business law, regulatory compliance, and transaction structuring within complex institutional and commercial environments. He plays a critical role in strengthening TerraVest\'s ability to deliver credible, compliant, and execution-ready financial and investment solutions across Africa and international markets.',
    education: [
      "Master's Level (in progress) – Intellectual Property Law",
      "Maîtrise (Master's equivalent) – Business Law",
      "Bachelor's Degree – University of Yaoundé II, Soa"
    ],
    previous: [
      'Land administration and regulatory compliance',
      'Business transaction support and negotiation facilitation',
      'Customs and trade facilitation coordination',
      'Tax and fiscal compliance advisory'
    ],
    awards: [
      'Expertise in intellectual property rights protection',
      'Regulatory conformity and documentation integrity',
      'Governance and public sector interface'
    ],
    linkedin: '#',
    email: 'compliance@terravest.cm',
  },
  {
    name: 'Nanga Nku',
    role: 'Finance & Healthcare Strategy',
    image: '/team/nanga-nku.png',
    bio: 'Public health leader specializing in immunization program strategy, operations, and performance optimization. She brings a strong background in financial and operational management, having led high-value portfolios, overseen multi-million-dollar reconciliations, and managed teams in complex, performance-driven environments. Her leadership emphasizes data-driven decision-making, regulatory compliance, and operational excellence.',
    education: [
      "Master's degree in Corporate Finance",
      "Master's degree in Healthcare Administration"
    ],
    previous: [
      'Oversaw large-scale immunization program with multi-million-dollar budget',
      'Managed multi-million-dollar federal grant portfolio',
      'Led high-value portfolio reconciliations and performance-driven teams',
      'Strengthened partnerships with healthcare systems and educational institutions'
    ],
    awards: [
      'Data-driven decision-making and strategic initiative leadership',
      'Operational excellence in complex regulatory environments',
      'Cross-sector expertise in finance and healthcare administration'
    ],
    linkedin: '#',
    email: 'strategy@terravest.cm',
  },
  {
    name: 'Kelly Hopkins Afukeze',
    role: 'Business Analyst – Junior Expert',
    image: '/team/analyst.jpg',
    bio: 'Business Analyst – Junior Expert representing a new generation of analytically driven, technology-oriented talent at the intersection of finance, innovation, and policy. With advanced exposure to artificial intelligence, cybersecurity, leadership, and negotiation through globally recognised institutions, he contributes to TerraVest\'s mission of delivering innovative, data-driven, and future-oriented financial advisory solutions.',
    education: [
      'Advanced Secondary Education (A-Level Track – Social Sciences), Yaoundé',
      'Harvard University – Artificial Intelligence, Leadership',
      'Yale University – Negotiation, Psychology, Resilience',
      'MIT – Cybersecurity'
    ],
    previous: [
      'Prima Finance and Investment – Microfinance operations and client data analysis',
      'Mountain Hub (IT Company) – Digital solutions and cybersecurity protocols',
      'Fintech & Business Development Incubator – Market research and competitive analysis'
    ],
    awards: [
      'Active participant in Model United Nations (MUN) simulations',
      'Leadership and entrepreneurship initiatives',
      'Conferences on AI, digital finance, and innovation'
    ],
    linkedin: '#',
    email: 'analytics@terravest.cm',
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

      gsap.fromTo('.value-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.values-grid', start: 'top 85%' }
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
            investment management, regulatory compliance, and technology-driven advisory.
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
              Our leadership team brings together expertise in finance, law, compliance, 
              infrastructure, and technology to deliver value across Africa and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <div key={index} className="leader-card bg-[#F7F5F0] rounded-3xl overflow-hidden">
                <div className="h-64 lg:h-72 overflow-hidden">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=8FB8A3&color=fff&size=512`;
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1">{leader.name}</h3>
                    <p className="text-[#8FB8A3] font-medium">{leader.role}</p>
                  </div>
                  
                  <p className="text-[#5A5A5A] mb-6 leading-relaxed text-sm">{leader.bio}</p>
                  
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
                        <p className="text-sm font-medium text-[#1A1A1A] mb-1">Experience</p>
                        {leader.previous.map((prev, i) => (
                          <p key={i} className="text-sm text-[#5A5A5A]">{prev}</p>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-[#8FB8A3] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-[#1A1A1A] mb-1">Focus Areas</p>
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
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-grid py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Our Collective Expertise
            </h2>
            <p className="text-[#5A5A5A] max-w-2xl mx-auto">
              The combined strengths that drive TerraVest's advisory and investment capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Strategic Advisory', desc: 'Government and institutional advisory across emerging markets' },
              { title: 'Infrastructure & Design', desc: 'Bankable, climate-resilient infrastructure project structuring' },
              { title: 'Risk & Compliance', desc: 'End-to-end regulatory validation and transaction structuring' },
              { title: 'Technology & Innovation', desc: 'AI, cybersecurity, and fintech integration into finance' },
            ].map((item, index) => (
              <div key={index} className="value-card bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#5A5A5A]">{item.desc}</p>
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
