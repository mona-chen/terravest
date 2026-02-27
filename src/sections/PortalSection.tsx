import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BarChart3, FileText, Shield, Download, Lock, Eye, Bell, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: BarChart3, text: 'Portfolio dashboards & KPIs', color: '#8FB8A3' },
  { icon: FileText, text: 'Document vault with version control', color: '#7BA391' },
  { icon: Shield, text: 'Risk register & ESG metrics', color: '#6B9A82' },
  { icon: Download, text: 'Structured reports (PDF/Excel)', color: '#5A8F73' },
];

const securityFeatures = [
  { icon: Lock, text: 'Bank-grade encryption' },
  { icon: Eye, text: 'Role-based access control' },
  { icon: Bell, text: 'Real-time notifications' },
];

export default function PortalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    const ctx = gsap.context(() => {
      // Image reveal with clip-path
      gsap.fromTo(
        image,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
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
        { x: -50, opacity: 0 },
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

      // Features stagger
      gsap.fromTo(
        content.querySelectorAll('.feature-item'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
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
      className="section bg-[#F7F5F0] relative overflow-hidden" 
      id="portal"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0EDE6] via-transparent to-[#8FB8A3]/5 pointer-events-none" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div ref={contentRef}>
            <span className="content-item text-caption text-[#8FB8A3] mb-6 block">
              Technology
            </span>
            
            <h2 className="content-item text-headline text-[#1A1A1A] mb-6">
              Investor Portal
            </h2>
            
            <p className="content-item text-body-lg text-[#7A7A7A] mb-10 leading-relaxed">
              A secure, transparent view into portfolio performance, documents, 
              and governance—designed for modern investors.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isHovered = hoveredFeature === index;
                
                return (
                  <div
                    key={index}
                    className="feature-item flex items-center gap-4 p-4 bg-white transition-all duration-500 group cursor-pointer"
                    style={{
                      transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                      boxShadow: isHovered ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
                    }}
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div 
                      className="w-12 h-12 flex items-center justify-center transition-all duration-500"
                      style={{
                        backgroundColor: isHovered ? feature.color : `${feature.color}20`,
                      }}
                    >
                      <Icon 
                        className="w-5 h-5 transition-colors duration-500"
                        style={{ color: isHovered ? 'white' : feature.color }}
                      />
                    </div>
                    <span className="text-body text-[#1A1A1A]">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Security features */}
            <div className="content-item flex flex-wrap gap-4 mb-10">
              {securityFeatures.map((security, index) => {
                const Icon = security.icon;
                return (
                  <div key={index} className="flex items-center gap-2 text-sm text-[#7A7A7A]">
                    <Icon className="w-4 h-4 text-[#8FB8A3]" />
                    <span>{security.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="content-item">
              <button className="magnetic btn-primary group">
                <span>Request Portal Access</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div 
            ref={imageRef}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <img 
              src="/portal-dashboard.jpg" 
              alt="Investor portal dashboard"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 to-transparent" />
            
            {/* Floating stats card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-caption text-[#7A7A7A] mb-1">Portfolio Value</div>
                  <div className="text-2xl font-medium text-[#1A1A1A]">$247.5M</div>
                </div>
                <div className="flex items-center gap-2 text-[#8FB8A3]">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">+18.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
