import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const lines = linesRef.current;
    const stats = statsRef.current;

    if (!section || !label || !lines || !stats) return;

    const ctx = gsap.context(() => {
      // Label reveal
      gsap.fromTo(
        label,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      // Line-by-line reveal with dramatic effect
      const lineElements = lines.querySelectorAll('.line');
      lineElements.forEach((line, index) => {
        gsap.fromTo(
          line,
          { 
            y: 80, 
            opacity: 0,
            rotateX: -15,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
            },
            delay: index * 0.15,
          }
        );
      });

      // Stats counter animation
      const statNumbers = stats.querySelectorAll('.stat-number');
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        const suffix = stat.getAttribute('data-suffix') || '';
        
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
            },
            onUpdate: function() {
              stat.textContent = Math.round(Number(stat.textContent || 0)) + suffix;
            },
          }
        );
      });

      // Stats reveal
      gsap.fromTo(
        stats.querySelectorAll('.stat-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stats,
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
      id="intro"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F0EDE6]/50 to-transparent pointer-events-none" />
      
      <div className="container relative">
        {/* Section label */}
        <span 
          ref={labelRef}
          className="text-caption text-[#8FB8A3] mb-12 block"
        >
          About TerraVest
        </span>

        {/* Main content with line reveals */}
        <div 
          ref={linesRef}
          className="max-w-5xl mb-20"
          style={{ perspective: '1000px' }}
        >
          <div className="line overflow-hidden mb-4">
            <p className="text-display text-[#1A1A1A] leading-tight">
              We are an investment holding
            </p>
          </div>
          <div className="line overflow-hidden mb-4">
            <p className="text-display text-[#1A1A1A] leading-tight">
              company headquartered in
            </p>
          </div>
          <div className="line overflow-hidden mb-4">
            <p className="text-display text-[#1A1A1A] leading-tight">
              <span className="text-gradient">Cameroon</span>, with a mission
            </p>
          </div>
          <div className="line overflow-hidden mb-4">
            <p className="text-display text-[#1A1A1A] leading-tight">
              to build and scale profitable
            </p>
          </div>
          <div className="line overflow-hidden">
            <p className="text-display text-[#1A1A1A] leading-tight">
              enterprises across Africa.
            </p>
          </div>
        </div>

        {/* Description paragraph */}
        <div className="max-w-2xl mb-20">
          <p className="text-body-lg text-[#7A7A7A] leading-relaxed">
            Our portfolio spans multiple high-growth sectors, from finance and infrastructure 
            to agriculture and technology. We combine patient capital with operational expertise 
            to create lasting value for our stakeholders and the communities we serve.
          </p>
        </div>

        {/* Stats */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          <div className="stat-item">
            <div className="text-headline text-[#1A1A1A] mb-2">
              <span className="stat-number" data-target="9" data-suffix="+">0</span>
            </div>
            <p className="text-body text-[#7A7A7A]">Portfolio Companies</p>
          </div>
          <div className="stat-item">
            <div className="text-headline text-[#1A1A1A] mb-2">
              <span className="stat-number" data-target="250" data-suffix="M">0</span>
              <span className="text-[#8FB8A3]">$</span>
            </div>
            <p className="text-body text-[#7A7A7A]">Assets Under Management</p>
          </div>
          <div className="stat-item">
            <div className="text-headline text-[#1A1A1A] mb-2">
              <span className="stat-number" data-target="12" data-suffix="">0</span>
            </div>
            <p className="text-body text-[#7A7A7A]">Years of Experience</p>
          </div>
          <div className="stat-item">
            <div className="text-headline text-[#1A1A1A] mb-2">
              <span className="stat-number" data-target="3" data-suffix="">0</span>
            </div>
            <p className="text-body text-[#7A7A7A]">Countries Present</p>
          </div>
        </div>
      </div>
    </section>
  );
}
