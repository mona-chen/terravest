import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && menuRef.current && linksRef.current) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: 'circle(0% at calc(100% - 40px) 40px)' },
        { 
          clipPath: 'circle(150% at calc(100% - 40px) 40px)', 
          duration: 0.8, 
          ease: 'power3.inOut' 
        }
      );
      
      gsap.fromTo(
        linksRef.current.children,
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.08, 
          delay: 0.3,
          ease: 'power3.out' 
        }
      );
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#intro' },
    { label: 'Sectors', href: '#sectors' },
    { label: 'Approach', href: '#approach' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];

  const aboutLinks = [
    { label: 'Leadership', to: '/leadership' },
    { label: 'Investment Criteria', to: '/investment-criteria' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'News', to: '/news' },
    { label: 'Careers', to: '/careers' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setIsAboutOpen(false);
  };

  const closeMenu = () => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at calc(100% - 40px) 40px)',
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => setIsMobileMenuOpen(false),
      });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F7F5F0]/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link
              to="/"
              className="magnetic relative z-50"
            >
              <span className="font-sora text-xl lg:text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                TerraVest
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* About Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-300 pb-4 -mb-4">
                  About
                  <ChevronDown className={`w-4 h-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div 
                  ref={aboutDropdownRef}
                  className={`absolute top-full left-0 w-56 bg-white rounded-xl shadow-lg border border-[#E5E5E5] py-2 transition-all duration-200 ${
                    isAboutOpen 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
                >
                  {/* Invisible bridge to prevent gap */}
                  <div className="absolute -top-4 left-0 right-0 h-4" />
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="block px-4 py-2 text-sm text-[#5A5A5A] hover:text-[#1A1A1A] hover:bg-[#F7F5F0] transition-colors"
                      onClick={() => setIsAboutOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.map((link, index) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="magnetic relative text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-300 group"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#8FB8A3] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="absolute -top-4 -right-3 text-[10px] text-[#8FB8A3] opacity-0 group-hover:opacity-100 transition-opacity">
                    0{index + 1}
                  </span>
                </button>
              ))}
              <a 
                href="./portal.html"
                className="magnetic ml-4 px-6 py-3 text-sm text-[#1A1A1A] border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-300 flex items-center gap-2"
              >
                Investor Portal
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => isMobileMenuOpen ? closeMenu() : setIsMobileMenuOpen(true)}
              aria-label="Toggle menu"
            >
              <span 
                className={`w-6 h-px bg-[#1A1A1A] transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
                }`} 
              />
              <span 
                className={`w-6 h-px bg-[#1A1A1A] transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : ''
                }`} 
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          ref={menuRef}
          className="fixed inset-0 z-40 bg-[#1A1A1A] lg:hidden"
          style={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
        >
          <div className="flex flex-col items-center justify-center h-full px-6">
            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* About Section */}
              <div className="text-center">
                <p className="text-[#8FB8A3] text-sm mb-3">About</p>
                <div className="flex flex-col gap-3">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="text-xl font-medium text-white/80 hover:text-[#8FB8A3] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="w-16 h-px bg-white/20 my-2" />
              
              {navLinks.map((link, index) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-sora font-medium text-white relative group"
                >
                  <span className="text-[#8FB8A3] text-sm absolute -left-8 top-1/2 -translate-y-1/2 opacity-50">
                    0{index + 1}
                  </span>
                  {link.label}
                </button>
              ))}
              <a 
                href="./portal.html"
                className="mt-8 px-10 py-4 text-lg font-medium text-[#1A1A1A] bg-[#8FB8A3] flex items-center gap-2"
              >
                Investor Portal
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
