import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const tagline = taglineRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const cta = ctaRef.current;
    const decor = decorRef.current;
    const stats = statsRef.current;

    if (!section || !title || !subtitle || !tagline || !image || !overlay || !cta || !decor || !stats) return;

    const ctx = gsap.context(() => {
      // Initial states - more dramatic
      gsap.set(title.querySelectorAll('.char'), { y: '150%', rotateX: -90, opacity: 0 });
      gsap.set(subtitle.querySelectorAll('.word'), { y: 50, opacity: 0, filter: 'blur(10px)' });
      gsap.set(tagline.children, { x: -50, opacity: 0 });
      gsap.set(image, { scale: 1.4, opacity: 0, filter: 'blur(20px)' });
      gsap.set(overlay, { opacity: 1 });
      gsap.set(cta.children, { y: 40, opacity: 0 });
      gsap.set(decor.children, { scale: 0, opacity: 0 });
      gsap.set(stats.children, { y: 30, opacity: 0 });

      // Dramatic entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Image reveal with blur effect
      tl.to(image, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'power3.out',
      })
      // Overlay fade
      .to(overlay, {
        opacity: 0.6,
        duration: 1.5,
        ease: 'power2.out',
      }, '-=1.6')
      // Title characters with 3D rotation
      .to(title.querySelectorAll('.char'), {
        y: '0%',
        rotateX: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: 'power3.out',
      }, '-=1.2')
      // Subtitle words with blur reveal
      .to(subtitle.querySelectorAll('.word'), {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.8')
      // Tagline
      .to(tagline.children, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }, '-=0.6')
      // CTA buttons
      .to(cta.children, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      }, '-=0.4')
      // Decorative elements
      .to(decor.children, {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }, '-=0.6')
      // Stats
      .to(stats.children, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.4');

      // Scroll parallax for image
      gsap.to(image.querySelector('img'), {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Title parallax (slower)
      gsap.to(title, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Fade out on scroll
      gsap.to([title, subtitle, tagline, cta], {
        opacity: 0,
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '50% top',
          end: 'bottom top',
          scrub: 1,
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToIntro = () => {
    const element = document.querySelector('#intro');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split text into characters with 3D wrapper
  const titleText = 'TerraVest';
  const chars = titleText.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ perspective: '1000px' }}>
      <span className="inline-block" style={{ transformStyle: 'preserve-3d' }}>
        {char}
      </span>
    </span>
  ));

  // Split subtitle into words
  const subtitleText = 'Structured Capital. Disciplined Growth. Enduring Value.';
  const words = subtitleText.split(' ').map((word, i) => (
    <span key={i} className="word inline-block mr-[0.3em]">
      {word}
    </span>
  ));

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative flex items-center overflow-hidden" 
      id="hero"
    >
      {/* Background Image with dramatic scale and parallax */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <img 
          src="/hero-building.jpg" 
          alt="Modern architecture"
          className="w-full h-full object-cover"
        />
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-r from-[#F7F5F0] via-[#F7F5F0]/95 to-[#F7F5F0]/50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F5F0]/80 via-transparent to-[#F7F5F0]/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7F5F0]/70 via-transparent to-transparent" />
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x}% ${50 + mousePos.y}%, rgba(143, 184, 163, 0.3) 0%, transparent 50%)`,
            transition: 'background 0.5s ease-out',
          }}
        />
      </div>

      {/* Decorative floating elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none z-[5]">
        <div 
          className="absolute top-[20%] right-[20%] w-4 h-4 bg-[#8FB8A3] rounded-full"
          style={{
            transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)`,
            transition: 'transform 0.5s ease-out',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute top-[30%] right-[30%] w-2 h-2 bg-[#8FB8A3]/60 rounded-full"
          style={{
            transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)`,
            transition: 'transform 0.5s ease-out',
            animation: 'float 6s ease-in-out infinite 1s',
          }}
        />
        <div 
          className="absolute bottom-[35%] right-[25%] w-6 h-6 border border-[#8FB8A3]/40 rounded-full"
          style={{
            transform: `translate(${mousePos.x * -0.8}px, ${mousePos.y * -0.8}px)`,
            transition: 'transform 0.5s ease-out',
            animation: 'float 6s ease-in-out infinite 2s',
          }}
        />
        <div 
          className="absolute top-[55%] left-[5%] w-24 h-px bg-gradient-to-r from-[#8FB8A3] to-transparent"
          style={{
            transform: `translateX(${mousePos.x * 0.3}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div 
          className="absolute top-[58%] left-[5%] w-16 h-px bg-gradient-to-r from-[#8FB8A3]/60 to-transparent"
          style={{
            transform: `translateX(${mousePos.x * 0.2}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        {/* Grid pattern */}
        <div 
          className="absolute bottom-[20%] right-[10%] w-32 h-32 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #8FB8A3 1px, transparent 1px),
              linear-gradient(to bottom, #8FB8A3 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div ref={taglineRef} className="mb-8">
            <span 
              className="text-caption text-[#4A4A4A] block mb-3 font-medium"
              style={{ textShadow: '0 1px 15px rgba(247, 245, 240, 1), 0 0 30px rgba(247, 245, 240, 0.8)' }}
            >
              Cameroon · Africa · Global
            </span>
            <div className="flex items-center gap-4">
              <div className="w-16 h-px bg-[#8FB8A3]" />
              <span 
                className="text-caption text-[#5A8A72] font-semibold"
                style={{ textShadow: '0 1px 15px rgba(247, 245, 240, 1), 0 0 30px rgba(247, 245, 240, 0.8)' }}
              >
                Institutional Investment Holding
              </span>
            </div>
          </div>

          {/* Main Title with 3D effect */}
          <h1 
            ref={titleRef}
            className="text-hero text-[#0A0A0A] mb-10 overflow-hidden"
            style={{ 
              perspective: '1000px',
              textShadow: '0 2px 30px rgba(247, 245, 240, 1), 0 0 60px rgba(247, 245, 240, 0.9), 0 0 100px rgba(247, 245, 240, 0.6)'
            }}
          >
            {chars}
          </h1>

          {/* Subtitle with word animation */}
          <p 
            ref={subtitleRef}
            className="text-title text-[#1A1A1A] max-w-2xl mb-14 leading-relaxed overflow-hidden font-medium"
            style={{ 
              textShadow: '0 2px 25px rgba(247, 245, 240, 1), 0 0 50px rgba(247, 245, 240, 0.9), 0 0 80px rgba(247, 245, 240, 0.7)'
            }}
          >
            {words}
          </p>

          {/* CTA with magnetic effect */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 mb-16">
            <button 
              onClick={scrollToIntro}
              className="magnetic btn-primary group"
            >
              <span>Explore Our Approach</span>
              <ArrowDownRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            </button>
            <a 
              href="./portal.html"
              className="magnetic btn-outline group"
            >
              <span>Investor Portal</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Stats */}
          <div 
            ref={statsRef} 
            className="flex flex-wrap gap-8 lg:gap-12 pt-8 border-t border-[#1A1A1A]/20"
            style={{ textShadow: '0 1px 15px rgba(247, 245, 240, 1), 0 0 30px rgba(247, 245, 240, 0.8)' }}
          >
            {[
              { value: '$247M', label: 'Assets Under Management' },
              { value: '9+', label: 'Portfolio Companies' },
              { value: '24%', label: 'Average IRR' },
              { value: '3', label: 'Countries' },
            ].map((stat, index) => (
              <div key={index} className="group cursor-default">
                <div 
                  className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-1 group-hover:text-[#6B9A82] transition-colors duration-300"
                  style={{ textShadow: '0 2px 25px rgba(247, 245, 240, 1), 0 0 50px rgba(247, 245, 240, 0.9)' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[#4A4A4A] font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A1A1A]/10 to-transparent" />
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={scrollToIntro}
      >
        <span className="text-caption text-[#7A7A7A]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#8FB8A3] to-transparent relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full bg-[#8FB8A3]"
            style={{
              height: '20px',
              animation: 'scrollIndicator 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes scrollIndicator {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(600%); }
        }
      `}</style>
    </section>
  );
}
