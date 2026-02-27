import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Shield, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    icon: Target,
    title: 'Strategic Focus',
    description: 'We concentrate on sectors where we have deep expertise and can add operational value beyond capital.',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Every investment undergoes rigorous due diligence with clear risk mitigation strategies.',
  },
  {
    icon: TrendingUp,
    title: 'Value Creation',
    description: 'We actively work with portfolio companies to drive growth, efficiency, and market expansion.',
  },
  {
    icon: Users,
    title: 'Partnership Model',
    description: 'We align interests with management teams, sharing both risks and rewards transparently.',
  },
];

export default function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const cards = cardsRef.current;

    if (!section || !image || !content || !cards) return;

    const ctx = gsap.context(() => {
      // Image clip-path reveal
      gsap.fromTo(
        image,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );

      // Parallax on image
      gsap.to(image.querySelector('img'), {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Content reveal
      gsap.fromTo(
        content.querySelectorAll('.content-item'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
          },
        }
      );

      // Cards stagger reveal
      gsap.fromTo(
        cards.querySelectorAll('.principle-card'),
        { y: 80, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
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
      id="approach"
    >
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#F0EDE6] to-transparent pointer-events-none" />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          {/* Left - Image with clip reveal */}
          <div 
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img 
              src="/approach-aerial.jpg" 
              alt="Team collaboration"
              className="w-full h-full object-cover scale-110"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 to-transparent" />
            
            {/* Floating badge */}
            <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm p-6">
              <div className="text-headline text-[#1A1A1A] mb-1">12+</div>
              <p className="text-body text-[#7A7A7A]">Years of Excellence</p>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="lg:pt-12">
            <span className="content-item text-caption text-[#8FB8A3] mb-6 block">
              Our Approach
            </span>
            
            <h2 className="content-item text-headline text-[#1A1A1A] mb-8">
              Disciplined Investment Philosophy
            </h2>
            
            <p className="content-item text-body-lg text-[#7A7A7A] mb-8 leading-relaxed">
              We believe in building businesses that matter. Our approach combines 
              rigorous financial analysis with deep operational expertise to create 
              sustainable value for all stakeholders.
            </p>
            
            <p className="content-item text-body text-[#7A7A7A] mb-10 leading-relaxed">
              Every investment decision is guided by our core principles: strategic focus, 
              prudent risk management, active value creation, and transparent partnerships 
              with the teams we back.
            </p>

            <div className="content-item flex items-center gap-6">
              <div className="w-16 h-px bg-[#8FB8A3]" />
              <span className="text-caption text-[#7A7A7A]">Learn more about our process</span>
            </div>
          </div>
        </div>

        {/* Principle Cards */}
        <div 
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: '1000px' }}
        >
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={index}
                className="principle-card group relative bg-white p-8 transition-all duration-500"
                style={{
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: isHovered 
                    ? '0 20px 40px rgba(0, 0, 0, 0.1)' 
                    : '0 4px 20px rgba(0, 0, 0, 0.05)',
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Number */}
                <div className="absolute top-4 right-4 text-caption text-[#7A7A7A]/20">
                  0{index + 1}
                </div>
                
                {/* Icon */}
                <div 
                  className="w-14 h-14 flex items-center justify-center mb-6 transition-all duration-500"
                  style={{
                    backgroundColor: isHovered ? '#8FB8A3' : '#8FB8A320',
                  }}
                >
                  <Icon 
                    className="w-6 h-6 transition-colors duration-500"
                    style={{ color: isHovered ? 'white' : '#8FB8A3' }}
                  />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-medium text-[#1A1A1A] mb-3">
                  {principle.title}
                </h3>
                <p className="text-body text-[#7A7A7A] leading-relaxed">
                  {principle.description}
                </p>
                
                {/* Bottom accent */}
                <div 
                  className="absolute bottom-0 left-0 h-0.5 bg-[#8FB8A3] transition-all duration-500"
                  style={{ width: isHovered ? '100%' : '0%' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
