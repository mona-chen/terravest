import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const governanceAreas = [
  {
    title: 'Board Oversight',
    items: [
      'Independent board majority',
      'Quarterly governance reviews',
      'Risk committee oversight',
    ],
  },
  {
    title: 'Transparency',
    items: [
      'Regular investor reporting',
      'Open communication channels',
      'Clear performance metrics',
    ],
  },
  {
    title: 'Compliance',
    items: [
      'Regulatory adherence',
      'Internal audit function',
      'Ethics code enforcement',
    ],
  },
];

export default function GovernanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeArea, setActiveArea] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    const ctx = gsap.context(() => {
      // Image reveal with diagonal clip
      gsap.fromTo(
        image,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        content.querySelectorAll('.content-item'),
        { x: 60, opacity: 0 },
        {
          x: 0,
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

      // Governance areas stagger
      gsap.fromTo(
        content.querySelectorAll('.governance-area'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 70%',
          },
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section bg-[#1A1A1A] relative overflow-hidden" 
      id="governance"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <span className="content-item text-caption text-[#8FB8A3] mb-6 block">
              Corporate Governance
            </span>
            
            <h2 className="content-item text-headline text-white mb-8">
              Built on Trust & Transparency
            </h2>
            
            <p className="content-item text-body-lg text-white/60 mb-12 leading-relaxed">
              Strong governance is the foundation of sustainable value creation. 
              We maintain the highest standards of corporate integrity across all operations.
            </p>

            {/* Governance Areas */}
            <div className="space-y-4">
              {governanceAreas.map((area, index) => (
                <div
                  key={index}
                  className="governance-area group"
                  onMouseEnter={() => setActiveArea(index)}
                >
                  <button 
                    className={`w-full flex items-center justify-between p-5 transition-all duration-500 ${
                      activeArea === index 
                        ? 'bg-[#8FB8A3]/20' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span className={`text-lg font-medium transition-colors duration-300 ${
                      activeArea === index ? 'text-[#8FB8A3]' : 'text-white'
                    }`}>
                      {area.title}
                    </span>
                    <ChevronRight 
                      className={`w-5 h-5 transition-all duration-300 ${
                        activeArea === index 
                          ? 'text-[#8FB8A3] rotate-90' 
                          : 'text-white/40'
                      }`}
                    />
                  </button>
                  
                  {/* Expandable content */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ${
                      activeArea === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-5 pt-0 space-y-3">
                      {area.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-[#8FB8A3] flex-shrink-0" />
                          <span className="text-body text-white/70">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div 
            ref={imageRef}
            className="order-1 lg:order-2 relative aspect-[4/5] overflow-hidden"
          >
            <img 
              src="/governance-facade.jpg" 
              alt="Professional handshake"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent" />
            
            {/* Stats overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-4">
                  <div className="text-2xl font-medium text-white mb-1">100%</div>
                  <p className="text-caption text-white/60">Compliance Rate</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4">
                  <div className="text-2xl font-medium text-white mb-1">A+</div>
                  <p className="text-caption text-white/60">ESG Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
