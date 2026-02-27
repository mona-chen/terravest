import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  company: [
    { label: 'About Us', href: '#intro' },
    { label: 'Our Team', to: '/leadership' },
    { label: 'Careers', to: '/careers' },
    { label: 'News', to: '/news' },
  ],
  investments: [
    { label: 'Portfolio', href: '#holdings' },
    { label: 'Sectors', href: '#sectors' },
    { label: 'Approach', href: '#approach' },
    { label: 'Performance', href: '#performance' },
  ],
  resources: [
    { label: 'Investor Portal', href: '#portal' },
    { label: 'Investment Criteria', to: '/investment-criteria' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'Contact', href: '#contact' },
  ],
};

interface FooterLink {
  label: string;
  href?: string;
  to?: string;
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.querySelectorAll('.footer-item'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderLink = (link: FooterLink) => {
    if (link.to) {
      return (
        <Link
          to={link.to}
          className="text-body text-white/50 hover:text-white transition-colors duration-300"
        >
          {link.label}
        </Link>
      );
    }
    return (
      <button
        onClick={() => link.href && scrollToSection(link.href)}
        className="text-body text-white/50 hover:text-white transition-colors duration-300"
      >
        {link.label}
      </button>
    );
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-[#0F0F0F] pt-20 pb-8 relative overflow-hidden"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8FB8A3]/50 to-transparent" />

      <div ref={contentRef} className="container">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand column */}
          <div className="lg:col-span-4 footer-item">
            <Link 
              to="/"
              className="inline-block mb-6"
            >
              <span className="font-sora text-2xl font-semibold text-white tracking-tight">
                TerraVest
              </span>
            </Link>
            <p className="text-body text-white/50 mb-8 max-w-sm leading-relaxed">
              Building profitable enterprises across Africa through disciplined 
              investment and operational excellence.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#8FB8A3] rounded-full animate-pulse" />
              <span className="text-caption text-white/40">
                Cameroon · Ghana · Kenya · Nigeria
              </span>
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-2 footer-item">
            <h4 className="text-caption text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  {renderLink(link)}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 footer-item">
            <h4 className="text-caption text-white mb-6">Investments</h4>
            <ul className="space-y-3">
              {footerLinks.investments.map((link, index) => (
                <li key={index}>
                  {renderLink(link)}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 footer-item">
            <h4 className="text-caption text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  {renderLink(link)}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2 footer-item">
            <h4 className="text-caption text-white mb-6">Stay Updated</h4>
            <p className="text-sm text-white/50 mb-4">
              Subscribe to our newsletter for insights and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#8FB8A3] transition-colors"
              />
              <button className="px-4 bg-[#8FB8A3] text-[#1A1A1A] hover:bg-white transition-colors duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-item pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} TerraVest Holdings. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-white/40 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-white/40 hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-sm text-white/40 hover:text-white transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
