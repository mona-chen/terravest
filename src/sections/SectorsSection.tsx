import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingUp, Building2, Zap, Cpu, Home, Heart, Wheat, Plane, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sectors = [
  { name: 'Finance & Fintech', icon: TrendingUp, description: 'Digital payment growth across unbanked populations', color: '#8FB8A3' },
  { name: 'Infrastructure & Logistics', icon: Building2, description: 'Long-term stability and reliable profit growth', color: '#7BA391' },
  { name: 'Energy & Utilities', icon: Zap, description: 'Demand growth translates to recurring profits', color: '#6B9A82' },
  { name: 'Technology & Digital', icon: Cpu, description: 'High growth potential and return multiples', color: '#5A8F73' },
  { name: 'Real Estate & Assets', icon: Home, description: 'Growing urban demand and capital appreciation', color: '#8FB8A3' },
  { name: 'Healthcare & Life Sciences', icon: Heart, description: 'Essential services with defensive returns', color: '#7BA391' },
  { name: 'Agriculture & Agri-processing', icon: Wheat, description: 'Food security demand; export potential', color: '#6B9A82' },
  { name: 'Hospitality & Tourism', icon: Plane, description: 'Tourism growth boosting local economies', color: '#5A8F73' },
  { name: 'Sustainability & Climate', icon: Leaf, description: 'Climate finance and impact investment flows', color: '#8FB8A3' },
];

export default function SectorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const scroll = scrollRef.current;
    const header = headerRef.current;

    if (!section || !trigger || !scroll || !header) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        header.querySelectorAll('.header-item'),
        { y: 60, opacity: 0 },
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

      // Horizontal scroll with smooth scrub
      const scrollWidth = scroll.scrollWidth - window.innerWidth;

      gsap.to(scroll, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => `+=${scrollWidth * 1.2}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Card entrance animations
      const cards = scroll.querySelectorAll('.sector-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, rotateY: -10 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: trigger,
              start: 'top 60%',
            },
            delay: index * 0.1,
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F0EDE6] relative" id="sectors">
      {/* Horizontal Scroll Container - Header + Cards together */}
      <div ref={triggerRef} className="h-screen flex flex-col py-8 lg:py-12">
        {/* Header - Fixed at top of pinned area */}
        <div ref={headerRef} className="container mb-6 flex-shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
            <div>
              <span className="header-item text-caption text-[#8FB8A3] mb-1 block">Investment Focus</span>
              <h2 className="header-item text-2xl lg:text-3xl font-semibold text-[#1A1A1A]">Our Sectors</h2>
            </div>
            <p className="header-item text-sm text-[#7A7A7A] max-w-sm">
              We invest where structural demand meets operational discipline across nine strategic sectors.
            </p>
          </div>
        </div>

        {/* Cards Container - takes remaining space */}
        <div 
          ref={scrollRef}
          className="flex items-center gap-4 lg:gap-6 px-6 lg:px-20 flex-1 min-h-0"
          style={{ perspective: '1000px' }}
        >
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            const isActive = activeIndex === index;
            
            return (
              <div 
                key={index}
                className="sector-card flex-shrink-0 w-[260px] lg:w-[300px] h-full max-h-[360px] bg-[#F7F5F0] p-5 lg:p-6 flex flex-col justify-between group cursor-pointer transition-all duration-700 relative"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: isActive ? 'translateZ(30px) scale(1.02)' : 'translateZ(0)',
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Card number */}
                <div className="absolute top-3 right-3 text-caption text-[#7A7A7A]/30">
                  0{index + 1}
                </div>
                
                <div>
                  {/* Icon with animated background */}
                  <div 
                    className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center mb-4 transition-all duration-500"
                    style={{ 
                      backgroundColor: isActive ? sector.color : `${sector.color}20`,
                    }}
                  >
                    <Icon 
                      className="w-4 h-4 lg:w-5 lg:h-5 transition-all duration-500"
                      style={{ color: isActive ? 'white' : sector.color }}
                    />
                  </div>
                  
                  {/* Title with hover color change */}
                  <h3 
                    className="text-base lg:text-lg font-semibold text-[#1A1A1A] mb-2 transition-colors duration-500"
                    style={{ color: isActive ? sector.color : '#1A1A1A' }}
                  >
                    {sector.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-[#7A7A7A] leading-relaxed">
                    {sector.description}
                  </p>
                </div>
                
                {/* CTA with animated arrow */}
                <div className="flex items-center gap-3 mt-4">
                  <span 
                    className="text-caption transition-colors duration-500"
                    style={{ color: isActive ? sector.color : '#1A1A1A' }}
                  >
                    Explore
                  </span>
                  <div 
                    className="w-6 h-6 flex items-center justify-center transition-all duration-500"
                    style={{ 
                      backgroundColor: isActive ? sector.color : 'transparent',
                    }}
                  >
                    <ArrowRight 
                      className="w-3.5 h-3.5 transition-all duration-500"
                      style={{ 
                        color: isActive ? 'white' : '#1A1A1A',
                        transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                      }}
                    />
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                  style={{ 
                    backgroundColor: sector.color,
                    width: isActive ? '100%' : '0%',
                  }}
                />
              </div>
            );
          })}
          
          {/* End CTA Card */}
          <div className="sector-card flex-shrink-0 w-[260px] lg:w-[300px] h-full max-h-[360px] bg-[#1A1A1A] p-5 lg:p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8FB8A3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <h3 className="text-base lg:text-lg font-semibold text-white mb-2">
                View All Criteria
              </h3>
              <p className="text-sm text-white/60 mb-4">
                Discover our investment methodology and selection process.
              </p>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white text-sm hover:bg-white hover:text-[#1A1A1A] transition-all duration-500 group/btn">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Progress indicator - at bottom */}
        <div className="container mt-4 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#1A1A1A]/10 relative overflow-hidden max-w-xs">
              <div className="absolute inset-y-0 left-0 bg-[#8FB8A3] w-1/3" />
            </div>
            <span className="text-caption text-[#7A7A7A]">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
