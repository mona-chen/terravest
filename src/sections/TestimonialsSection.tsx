import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote: "TerraVest has been instrumental in helping us scale our operations across Central Africa. Their strategic guidance and patient capital approach have been invaluable to our growth journey.",
    author: "Dr. Emmanuel Nkono",
    role: "CEO, Africapital Finance",
    company: "Portfolio Company since 2019",
    avatar: "https://ui-avatars.com/api/?name=Emmanuel+Nkono&background=8FB8A3&color=fff",
    rating: 5,
  },
  {
    id: 2,
    quote: "As an investor, I appreciate the transparency and regular communication. The portal gives me real-time insights into my portfolio performance. It's been a rewarding partnership.",
    author: "Jean-Pierre Moussa",
    role: "Private Investor",
    company: "Investor since 2021",
    avatar: "https://ui-avatars.com/api/?name=Jean+Pierre+Moussa&background=7BA391&color=fff",
    rating: 5,
  },
  {
    id: 3,
    quote: "The TerraVest team truly understands the African market. Their operational expertise combined with financial backing helped us expand from Cameroon to Gabon and beyond.",
    author: "Amara Diallo",
    role: "Founder, GreenPower Cameroon",
    company: "Portfolio Company since 2020",
    avatar: "https://ui-avatars.com/api/?name=Amara+Diallo&background=6B9A82&color=fff",
    rating: 5,
  },
  {
    id: 4,
    quote: "What sets TerraVest apart is their commitment to sustainable growth. They don't just provide capital; they become true partners in building businesses that matter.",
    author: "Fatima Nkrumah",
    role: "Managing Director",
    company: "Douala Logistics Hub",
    avatar: "https://ui-avatars.com/api/?name=Fatima+Nkrumah&background=5A8F73&color=fff",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.animate-item'),
        { y: 60, opacity: 0 },
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

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section 
      ref={sectionRef}
      className="section bg-[#F0EDE6] relative overflow-hidden" 
      id="testimonials"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#8FB8A3]/5 to-transparent pointer-events-none" />
      
      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="animate-item text-caption text-[#8FB8A3] mb-4 block">Testimonials</span>
          <h2 className="animate-item text-headline text-[#1A1A1A] mb-6">
            What Our Partners Say
          </h2>
          <p className="animate-item text-body-lg text-[#7A7A7A] max-w-2xl mx-auto">
            Hear from the entrepreneurs and investors who have partnered with us 
            to build lasting value across Africa.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="animate-item max-w-4xl mx-auto">
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg relative">
            {/* Quote icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-[#8FB8A3] rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="pt-4">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote 
                className="text-xl lg:text-2xl text-[#1A1A1A] leading-relaxed mb-8 transition-opacity duration-500"
                style={{ opacity: isAnimating ? 0 : 1 }}
              >
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author */}
              <div 
                className="flex items-center gap-4 transition-opacity duration-500"
                style={{ opacity: isAnimating ? 0 : 1 }}
              >
                <img 
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.author}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <p className="font-medium text-[#1A1A1A]">{currentTestimonial.author}</p>
                  <p className="text-sm text-[#7A7A7A]">{currentTestimonial.role}</p>
                  <p className="text-xs text-[#8FB8A3]">{currentTestimonial.company}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#F0EDE6]">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setActiveIndex(index);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-8 bg-[#8FB8A3]' 
                        : 'bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={goToPrev}
                  className="w-10 h-10 border border-[#E5E7EB] rounded-full flex items-center justify-center text-[#6B7280] hover:border-[#8FB8A3] hover:text-[#8FB8A3] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="w-10 h-10 border border-[#E5E7EB] rounded-full flex items-center justify-center text-[#6B7280] hover:border-[#8FB8A3] hover:text-[#8FB8A3] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="animate-item grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-16 border-t border-[#E5E7EB]">
          {[
            { value: '95%', label: 'Partner Satisfaction' },
            { value: '12+', label: 'Years of Experience' },
            { value: '9', label: 'Portfolio Companies' },
            { value: '3', label: 'Countries' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-2">{stat.value}</p>
              <p className="text-sm text-[#7A7A7A]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
