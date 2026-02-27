import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.animate-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store in localStorage for demo
    const subscribers = JSON.parse(localStorage.getItem('terravest_newsletter') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('terravest_newsletter', JSON.stringify(subscribers));
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#1A1A1A] relative overflow-hidden" 
      id="newsletter"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #8FB8A3 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8FB8A3]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#8FB8A3]/5 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center">
          <span className="animate-item text-caption text-[#8FB8A3] mb-4 block">Stay Informed</span>
          <h2 className="animate-item text-headline text-white mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="animate-item text-body-lg text-white/60 mb-10">
            Get the latest insights on African markets, portfolio updates, 
            and investment opportunities delivered to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="animate-item">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white placeholder-white/30 focus:border-[#8FB8A3] focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success' || !email.trim()}
                className="px-8 py-4 bg-[#8FB8A3] text-[#1A1A1A] font-medium rounded-lg hover:bg-[#7BA391] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin" />
                ) : status === 'success' ? (
                  <>
                    <Check className="w-5 h-5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Subscribe
                  </>
                )}
              </button>
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Thank you for subscribing!</span>
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400">You're already subscribed!</span>
              </div>
            )}
          </form>

          {/* Trust indicators */}
          <div className="animate-item mt-10 flex flex-wrap items-center justify-center gap-6 text-white/40 text-sm">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#8FB8A3]" />
              No spam, ever
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#8FB8A3]" />
              Unsubscribe anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#8FB8A3]" />
              Monthly updates
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
