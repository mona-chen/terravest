import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';
import BackToTop from '../components/BackToTop';
import Navigation from '../components/Navigation';
import HeroSection from '../sections/HeroSection';
import IntroSection from '../sections/IntroSection';
import SectorsSection from '../sections/SectorsSection';
import ApproachSection from '../sections/ApproachSection';
import GovernanceSection from '../sections/GovernanceSection';
import PerformanceSection from '../sections/PerformanceSection';
import SustainabilitySection from '../sections/SustainabilitySection';
import PresenceSection from '../sections/PresenceSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import TeamSection from '../sections/TeamSection';
import NewsletterSection from '../sections/NewsletterSection';
import FAQSection from '../sections/FAQSection';
import PortalSection from '../sections/PortalSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function LandingLayout() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target as HTMLElement, {
              offset: -80,
              duration: 1.5,
            });
          } else {
            const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      clearTimeout(refreshTimeout);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      if (lenis) {
        lenis.destroy();
        gsap.ticker.remove(lenis.raf);
      }
    };
  }, []);

  return (
    <div className="bg-[#F7F5F0] min-h-screen relative landing-page-custom-cursor">
      <CustomCursor />
      <ScrollProgress />
      <div className="grain" />
      <div className="gradient-mesh fixed inset-0 z-0" />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <IntroSection />
        <SectorsSection />
        <ApproachSection />
        <GovernanceSection />
        <PerformanceSection />
        <SustainabilitySection />
        <PresenceSection />
        <TestimonialsSection />
        <TeamSection />
        <NewsletterSection />
        <FAQSection />
        <PortalSection />
        <ContactSection />
        <Footer />
      </main>
      <BackToTop />
    </div>
  );
}
