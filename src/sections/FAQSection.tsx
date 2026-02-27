import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is TerraVest's investment focus?",
    answer: "TerraVest focuses on high-growth sectors across Africa including fintech, infrastructure, renewable energy, technology, healthcare, and agriculture. We look for companies with strong management teams, scalable business models, and the potential to create significant social and economic impact.",
  },
  {
    question: "How can I become an investor?",
    answer: "To become an investor, you can start by filling out the contact form on our website or reaching out directly to our investor relations team. We work with accredited investors, family offices, and institutional investors who share our vision for Africa's growth.",
  },
  {
    question: "What is the minimum investment amount?",
    answer: "Our minimum investment threshold varies by fund and investment vehicle. Typically, our direct investment opportunities start at $100,000, while our fund investments may have higher minimums. Please contact us for specific details about current opportunities.",
  },
  {
    question: "How do you measure impact?",
    answer: "We measure impact through a comprehensive framework that tracks job creation, revenue growth, environmental sustainability metrics, and social outcomes. All our portfolio companies report on key performance indicators quarterly, and we publish an annual impact report.",
  },
  {
    question: "What is your typical investment horizon?",
    answer: "Our investment horizon typically ranges from 5 to 10 years, depending on the sector and company stage. We are patient capital partners who work closely with management teams to build sustainable, long-term value.",
  },
  {
    question: "Do you provide operational support?",
    answer: "Yes, we provide extensive operational support to our portfolio companies. This includes strategic guidance, access to our network, talent acquisition support, financial planning assistance, and connections to potential customers and partners.",
  },
  {
    question: "How can entrepreneurs pitch to TerraVest?",
    answer: "Entrepreneurs can submit their business plans through our website contact form or reach out to our investment team directly. We review all submissions and typically respond within 2-4 weeks. We look for companies with proven traction, strong teams, and significant growth potential.",
  },
  {
    question: "What regions do you invest in?",
    answer: "While our headquarters is in Cameroon, we invest across Central, West, and East Africa. Our current portfolio spans Cameroon, Gabon, and Nigeria, with plans to expand to additional markets in the coming years.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className="section bg-[#F7F5F0] relative overflow-hidden" 
      id="faq"
    >
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="animate-item text-caption text-[#8FB8A3] mb-4 block">FAQ</span>
            <h2 className="animate-item text-headline text-[#1A1A1A] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="animate-item text-body-lg text-[#7A7A7A] mb-8">
              Find answers to common questions about investing with TerraVest, 
              our approach, and how we work with entrepreneurs.
            </p>
            
            {/* Contact CTA */}
            <div className="animate-item bg-[#1A1A1A] p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#8FB8A3]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#8FB8A3]" />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Still have questions?</h4>
                  <p className="text-sm text-white/50 mb-4">
                    Can't find the answer you're looking for? Please chat with our friendly team.
                  </p>
                  <a 
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm text-[#8FB8A3] hover:underline"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - FAQs */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="animate-item bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FAFAFA] transition-colors"
                >
                  <span className="font-medium text-[#1A1A1A] pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#8FB8A3] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-[#7A7A7A] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
