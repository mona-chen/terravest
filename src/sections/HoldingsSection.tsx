import ScrollReveal from '../components/ScrollReveal';
import StaggerReveal from '../components/StaggerReveal';

export default function HoldingsSection() {
  const pillars = [
    {
      title: 'Portfolio Construction',
      description: 'Multi-sector, stage-agnostic approach',
    },
    {
      title: 'Active Ownership',
      description: 'Board-level oversight and operational support',
    },
    {
      title: 'Risk Management',
      description: 'Integrated compliance, ESG, and controls',
    },
  ];

  return (
    <section className="section bg-[#F5F3EE]" id="holdings">
      <div className="container">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <span className="text-label text-[#6B6B6B] mb-4 block">Our Model</span>
          <h2 className="text-headline text-[#1A1A1A] mb-6">Holdings</h2>
          <p className="text-[#6B6B6B] leading-relaxed max-w-2xl mx-auto">
            We originate, structure, and oversee investments across Cameroon and 
            select African markets—with governance, transparency, and long-term 
            discipline at the core.
          </p>
        </ScrollReveal>

        <StaggerReveal 
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.15}
        >
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className="p-6 lg:p-8 border border-[#1A1A1A]/10 hover:border-[#8FB8A3] transition-colors"
            >
              <div className="w-10 h-10 bg-[#8FB8A3]/20 flex items-center justify-center mb-4">
                <span className="font-sora font-semibold text-[#8FB8A3]">{index + 1}</span>
              </div>
              <h3 className="font-sora font-semibold text-lg text-[#1A1A1A] mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-[#6B6B6B]">{pillar.description}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
