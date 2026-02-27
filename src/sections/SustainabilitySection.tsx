import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Users, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Leaf,
    title: 'Environmental',
    shortTitle: 'E',
    description: 'Carbon-neutral operations by 2030. Sustainable practices across all portfolio companies.',
    stats: [
      { value: '50%', label: 'Carbon Reduction' },
      { value: '100%', label: 'Renewable Energy' },
    ],
    color: '#8FB8A3',
  },
  {
    icon: Users,
    title: 'Social',
    shortTitle: 'S',
    description: 'Creating jobs, empowering communities, and promoting diversity in leadership.',
    stats: [
      { value: '2,500+', label: 'Jobs Created' },
      { value: '40%', label: 'Women in Leadership' },
    ],
    color: '#7BA391',
  },
  {
    icon: Lightbulb,
    title: 'Governance',
    shortTitle: 'G',
    description: 'Ethical business practices, transparency, and strong corporate governance.',
    stats: [
      { value: '100%', label: 'Compliance' },
      { value: 'A+', label: 'ESG Rating' },
    ],
    color: '#6B9A82',
  },
];

export default function SustainabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const pillarsEl = pillarsRef.current;

    if (!section || !header || !pillarsEl) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        header.querySelectorAll('.header-item'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
          },
        }
      );

      // Pillars reveal with rotation
      gsap.fromTo(
        pillarsEl.querySelectorAll('.pillar-card'),
        { y: 80, opacity: 0, rotateY: -20 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillarsEl,
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
      id="sustainability"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#8FB8A3]/5 to-transparent pointer-events-none" />
      
      <div className="container relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="header-item text-caption text-[#8FB8A3] mb-4 block">
            Sustainability
          </span>
          <h2 className="header-item text-headline text-[#1A1A1A] mb-6">
            ESG Commitment
          </h2>
          <p className="header-item text-body-lg text-[#7A7A7A] max-w-2xl mx-auto">
            We believe sustainable business practices create lasting value 
            for investors, communities, and the environment.
          </p>
        </div>

        {/* ESG Pillars */}
        <div 
          ref={pillarsRef}
          className="grid lg:grid-cols-3 gap-8"
          style={{ perspective: '1000px' }}
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isActive = activePillar === index;
            
            return (
              <div
                key={index}
                className="pillar-card group relative"
                style={{ transformStyle: 'preserve-3d' }}
                onMouseEnter={() => setActivePillar(index)}
                onMouseLeave={() => setActivePillar(null)}
              >
                <div 
                  className="bg-white p-8 lg:p-10 h-full transition-all duration-700"
                  style={{
                    transform: isActive ? 'translateZ(20px)' : 'translateZ(0)',
                    boxShadow: isActive 
                      ? '0 30px 60px rgba(0, 0, 0, 0.12)' 
                      : '0 4px 20px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {/* Large letter background */}
                  <div 
                    className="absolute top-4 right-4 text-[120px] font-bold leading-none opacity-5 transition-opacity duration-500"
                    style={{ color: pillar.color, opacity: isActive ? 0.1 : 0.05 }}
                  >
                    {pillar.shortTitle}
                  </div>

                  {/* Icon */}
                  <div 
                    className="w-16 h-16 flex items-center justify-center mb-8 transition-all duration-500"
                    style={{
                      backgroundColor: isActive ? pillar.color : `${pillar.color}20`,
                    }}
                  >
                    <Icon 
                      className="w-7 h-7 transition-colors duration-500"
                      style={{ color: isActive ? 'white' : pillar.color }}
                    />
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-title text-[#1A1A1A] mb-4 transition-colors duration-500"
                    style={{ color: isActive ? pillar.color : '#1A1A1A' }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body text-[#7A7A7A] mb-8 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#F0EDE6]">
                    {pillar.stats.map((stat, statIndex) => (
                      <div key={statIndex}>
                        <div 
                          className="text-2xl font-medium mb-1 transition-colors duration-500"
                          style={{ color: isActive ? pillar.color : '#1A1A1A' }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-sm text-[#7A7A7A]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom accent */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                    style={{ 
                      backgroundColor: pillar.color,
                      width: isActive ? '100%' : '0%',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-body text-[#7A7A7A] mb-6">
            Download our full ESG report to learn more about our sustainability initiatives.
          </p>
          <button className="magnetic btn-outline">
            <span>Download ESG Report</span>
          </button>
        </div>
      </div>
    </section>
  );
}
