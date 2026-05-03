import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: 1,
    name: "Ndong Mebenga Octave Nérée",
    role: "Chief Executive Officer",
    bio: "Dynamic executive with a multidisciplinary background in Information & Communication Sciences, economics, and institutional engagement. Leads TerraVest's mission to deliver cutting-edge financial advisory solutions across Africa and global markets.",
    avatar: "/team/ndong-mebenga.jpg",
    linkedin: "#",
    twitter: "#",
    email: "ceo@terravest.cm",
  },
  {
    id: 2,
    name: "Achuo Anang Stanislaus",
    role: "Director, Project Finance Architecture & Design",
    bio: "Civil engineer and infrastructure specialist with a Master of Engineering from ENSTP Yaoundé. World Bank Transport Consultant contributing to the African Transport Policy Program (SSATP) across Côte d'Ivoire and beyond.",
    avatar: "https://ui-avatars.com/api/?name=Achuo+Anang+Stanislaus&background=7BA391&color=fff&size=256",
    linkedin: "#",
    twitter: "#",
    email: "projects@terravest.cm",
  },
  {
    id: 3,
    name: "Itoe Martin Ndobe",
    role: "Risk, Compliance & Validation Expert",
    bio: "Business law and regulatory compliance specialist with expertise in transaction structuring, land governance, customs facilitation, and tax compliance. Ensures all engagements meet the highest standards of legal integrity and risk mitigation.",
    avatar: "https://ui-avatars.com/api/?name=Itoe+Martin+Ndobe&background=6B9A82&color=fff&size=256",
    linkedin: "#",
    twitter: "#",
    email: "compliance@terravest.cm",
  },
  {
    id: 4,
    name: "Nanga Nku",
    role: "Finance & Healthcare Strategy",
    bio: "Public health leader with dual Master's degrees in Corporate Finance and Healthcare Administration. Oversees large-scale immunization programs and multi-million-dollar federal grant portfolios with a focus on data-driven decision-making and operational excellence.",
    avatar: "/team/nanga-nku.png",
    linkedin: "#",
    twitter: "#",
    email: "strategy@terravest.cm",
  },
  {
    id: 5,
    name: "Kelly Hopkins Afukeze",
    role: "Business Analyst – Junior Expert",
    bio: "Next-generation talent at the intersection of finance, technology, and policy. Certifications from Harvard (AI, Leadership), Yale (Negotiation, Psychology), and MIT (Cybersecurity). Supports analytical and innovation-driven advisory engagements.",
    avatar: "https://ui-avatars.com/api/?name=Kelly+Hopkins+Afukeze&background=4A8564&color=fff&size=256",
    linkedin: "#",
    twitter: "#",
    email: "analytics@terravest.cm",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.team-card'),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section bg-[#F7F5F0] relative overflow-hidden" 
      id="team"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#8FB8A3]/5 to-transparent pointer-events-none" />
      
      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-caption text-[#8FB8A3] mb-4 block">Our Team</span>
          <h2 className="text-headline text-[#1A1A1A] mb-6">
            Meet the Leaders
          </h2>
          <p className="text-body-lg text-[#7A7A7A] max-w-2xl mx-auto">
            A dedicated team of professionals committed to building Africa's future 
            through innovative finance, disciplined compliance, and data-driven advisory.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="team-card group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent transition-opacity duration-500 ${
                    hoveredId === member.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Social links */}
                <div 
                  className={`absolute bottom-4 left-0 right-0 flex justify-center gap-3 transition-all duration-500 ${
                    hoveredId === member.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <a 
                    href={member.linkedin}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#8FB8A3] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href={member.twitter}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#8FB8A3] transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a 
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#8FB8A3] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">{member.name}</h3>
                <p className="text-sm text-[#8FB8A3] mb-3">{member.role}</p>
                <p className="text-sm text-[#7A7A7A] line-clamp-4">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Join Us CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#7A7A7A] mb-4">Want to join our team?</p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white font-medium hover:bg-[#8FB8A3] hover:text-[#1A1A1A] transition-colors duration-300"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </section>
  );
}
