import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: 1,
    name: "Dr. Paul Biya Jr.",
    role: "Chief Executive Officer",
    bio: "Former investment banker with 20+ years experience in African markets. Led multiple successful exits across fintech and infrastructure sectors.",
    avatar: "https://ui-avatars.com/api/?name=Paul+Biya&background=8FB8A3&color=fff&size=256",
    linkedin: "#",
    twitter: "#",
    email: "paul.biya@terravest.cm",
  },
  {
    id: 2,
    name: "Marie-Claire Fouda",
    role: "Chief Investment Officer",
    bio: "Ex-McKinsey consultant specializing in emerging market investments. MBA from INSEAD with deep expertise in African private equity.",
    avatar: "https://ui-avatars.com/api/?name=Marie+Claire+Fouda&background=7BA391&color=fff&size=256",
    linkedin: "#",
    twitter: "#",
    email: "marie-claire@terravest.cm",
  },
  {
    id: 3,
    name: "Kofi Annan Mensah",
    role: "Head of Operations",
    bio: "Operations expert with experience scaling businesses across West and Central Africa. Previously led operations at Jumia Cameroon.",
    avatar: "https://ui-avatars.com/api/?name=Kofi+Annan+Mensah&background=6B9A82&color=fff&size=256",
    linkedin: "#",
    twitter: "#",
    email: "kofi@terravest.cm",
  },
  {
    id: 4,
    name: "Aïcha Bako",
    role: "Chief Financial Officer",
    bio: "Chartered accountant with expertise in cross-border transactions. Previously CFO at two successful African startups.",
    avatar: "https://ui-avatars.com/api/?name=Aicha+Bako&background=5A8F73&color=fff&size=256",
    linkedin: "#",
    twitter: "#",
    email: "aicha@terravest.cm",
  },
];

const advisors = [
  {
    id: 5,
    name: "Prof. Joseph Stiglitz",
    role: "Economic Advisor",
    bio: "Nobel laureate in Economics, advising on macroeconomic strategy and impact investment frameworks.",
    avatar: "https://ui-avatars.com/api/?name=Joseph+Stiglitz&background=4A8564&color=fff&size=256",
    linkedin: "#",
  },
  {
    id: 6,
    name: "Ngozi Okonjo-Iweala",
    role: "Strategic Advisor",
    bio: "Former Finance Minister of Nigeria and WTO Director-General, providing strategic guidance on African trade.",
    avatar: "https://ui-avatars.com/api/?name=Ngozi+Okonjo&background=3A7B55&color=fff&size=256",
    linkedin: "#",
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
            A diverse team of investment professionals, operators, and advisors 
            committed to building Africa's future.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
                <p className="text-sm text-[#7A7A7A] line-clamp-3">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Advisors */}
        <div className="border-t border-[#E5E7EB] pt-16">
          <h3 className="text-xl font-semibold text-[#1A1A1A] text-center mb-10">Strategic Advisors</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {advisors.map((advisor) => (
              <div
                key={advisor.id}
                className="team-card flex gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <img 
                  src={advisor.avatar}
                  alt={advisor.name}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">{advisor.name}</h4>
                  <p className="text-sm text-[#8FB8A3] mb-2">{advisor.role}</p>
                  <p className="text-sm text-[#7A7A7A]">{advisor.bio}</p>
                </div>
              </div>
            ))}
          </div>
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
