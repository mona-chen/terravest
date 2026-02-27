import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import IntroSection from './sections/IntroSection';
import SectorsSection from './sections/SectorsSection';
import ApproachSection from './sections/ApproachSection';
import GovernanceSection from './sections/GovernanceSection';
import PerformanceSection from './sections/PerformanceSection';
import SustainabilitySection from './sections/SustainabilitySection';
import PresenceSection from './sections/PresenceSection';
import TestimonialsSection from './sections/TestimonialsSection';
import TeamSection from './sections/TeamSection';
import NewsletterSection from './sections/NewsletterSection';
import FAQSection from './sections/FAQSection';
import PortalSection from './sections/PortalSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with premium settings for fluid scrolling
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

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker for smooth animation
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after content loads
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            lenis.scrollTo(target as HTMLElement, {
              offset: -80,
              duration: 1.5,
            });
          }
        }
      });
    });

    return () => {
      clearTimeout(refreshTimeout);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="bg-[#F7F5F0] min-h-screen relative">
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Grain overlay */}
      <div className="grain" />
      
      {/* Gradient mesh background */}
      <div className="gradient-mesh fixed inset-0 z-0" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
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
      
      {/* Back to top button */}
      <BackToTop />
    </div>
  );
}

export default App;
