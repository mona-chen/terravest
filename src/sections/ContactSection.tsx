import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Send, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Boulevard de la Liberté, Douala, Cameroon',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@terravest.cm',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+237 233 123 456',
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !header || !form || !info) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        header.querySelectorAll('.header-item'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
          },
        }
      );

      // Form reveal
      gsap.fromTo(
        form.querySelectorAll('.form-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
          },
        }
      );

      // Info reveal
      gsap.fromTo(
        info.querySelectorAll('.info-item'),
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: info,
            start: 'top 80%',
          },
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message. We will get back to you soon.');
  };

  return (
    <section 
      ref={sectionRef}
      className="section bg-[#1A1A1A] relative overflow-hidden" 
      id="contact"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="header-item text-caption text-[#8FB8A3] mb-4 block">
            Contact Us
          </span>
          <h2 className="header-item text-headline text-white mb-6">
            Let's Build Together
          </h2>
          <p className="header-item text-body-lg text-white/60 max-w-2xl mx-auto">
            Whether you're an entrepreneur seeking investment or an investor 
            looking for opportunities, we'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="form-item relative">
                <label className="text-caption text-white/50 mb-2 block">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#8FB8A3] transition-colors"
                  placeholder="John Doe"
                  required
                />
                <div 
                  className="absolute bottom-0 left-0 h-px bg-[#8FB8A3] transition-all duration-500"
                  style={{ width: focusedField === 'name' ? '100%' : '0%' }}
                />
              </div>

              {/* Email */}
              <div className="form-item relative">
                <label className="text-caption text-white/50 mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#8FB8A3] transition-colors"
                  placeholder="john@company.com"
                  required
                />
                <div 
                  className="absolute bottom-0 left-0 h-px bg-[#8FB8A3] transition-all duration-500"
                  style={{ width: focusedField === 'email' ? '100%' : '0%' }}
                />
              </div>
            </div>

            {/* Company */}
            <div className="form-item relative">
              <label className="text-caption text-white/50 mb-2 block">
                Company Name
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                onFocus={() => setFocusedField('company')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#8FB8A3] transition-colors"
                placeholder="Your Company Ltd"
              />
              <div 
                className="absolute bottom-0 left-0 h-px bg-[#8FB8A3] transition-all duration-500"
                style={{ width: focusedField === 'company' ? '100%' : '0%' }}
              />
            </div>

            {/* Message */}
            <div className="form-item relative">
              <label className="text-caption text-white/50 mb-2 block">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows={5}
                className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#8FB8A3] transition-colors resize-none"
                placeholder="Tell us about your project or inquiry..."
                required
              />
              <div 
                className="absolute bottom-0 left-0 h-px bg-[#8FB8A3] transition-all duration-500"
                style={{ width: focusedField === 'message' ? '100%' : '0%' }}
              />
            </div>

            {/* Submit */}
            <div className="form-item pt-4">
              <button 
                type="submit"
                className="magnetic inline-flex items-center gap-3 px-8 py-4 bg-[#8FB8A3] text-[#1A1A1A] font-medium hover:bg-white transition-colors duration-500 group"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div 
                  key={index}
                  className="info-item group flex items-start gap-4"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white/5 group-hover:bg-[#8FB8A3]/20 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-[#8FB8A3]" />
                  </div>
                  <div>
                    <div className="text-caption text-white/50 mb-1">{info.label}</div>
                    <div className="text-body text-white">{info.value}</div>
                  </div>
                </div>
              );
            })}

            {/* Social links */}
            <div className="info-item pt-8 border-t border-white/10">
              <div className="text-caption text-white/50 mb-4">Follow Us</div>
              <div className="flex gap-4">
                {['LinkedIn', 'Twitter', 'Instagram'].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center gap-2 text-white/70 hover:text-[#8FB8A3] transition-colors duration-300 group"
                  >
                    <span className="text-sm">{social}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
