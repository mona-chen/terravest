import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: 'Portfolio IRR', value: 24, suffix: '%', trend: 'up', change: '+3.2%', description: 'Internal rate of return' },
  { label: 'AUM Growth', value: 45, suffix: '%', trend: 'up', change: '+12%', description: 'Year-over-year growth' },
  { label: 'Active Investments', value: 12, suffix: '', trend: 'neutral', change: '—', description: 'Portfolio companies' },
  { label: 'Capital Deployed', value: 180, suffix: 'M', prefix: '$', trend: 'up', change: '+28M', description: 'Total invested' },
];

const quarterlyData = [
  { quarter: 'Q1 2024', terraVest: 18, benchmark: 12 },
  { quarter: 'Q2 2024', terraVest: 22, benchmark: 14 },
  { quarter: 'Q3 2024', terraVest: 26, benchmark: 15 },
  { quarter: 'Q4 2024', terraVest: 24, benchmark: 13 },
];

const sectorAllocation = [
  { name: 'Finance', value: 31, color: '#8FB8A3' },
  { name: 'Infrastructure', value: 22, color: '#6B9A82' },
  { name: 'Energy', value: 19, color: '#A8C9B8' },
  { name: 'Technology', value: 15, color: '#4A7A68' },
  { name: 'Healthcare', value: 13, color: '#B8D4C4' },
];

export default function PerformanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedValues, setAnimatedValues] = useState<number[]>(metrics.map(() => 0));
  const [barHeights, setBarHeights] = useState<number[]>(quarterlyData.map(() => 0));
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate metrics
      ScrollTrigger.create({
        trigger: '.metrics-grid',
        start: 'top 85%',
        onEnter: () => {
          setShowContent(true);
          metrics.forEach((metric, index) => {
            gsap.to({}, { duration: 1.5, ease: 'power2.out',
              onUpdate: function() {
                const progress = this.progress();
                setAnimatedValues(prev => { 
                  const newValues = [...prev]; 
                  newValues[index] = Math.round(metric.value * progress); 
                  return newValues; 
                });
              }
            });
          });
        },
        once: true
      });

      // Animate chart bars
      ScrollTrigger.create({
        trigger: '.chart-section',
        start: 'top 80%',
        onEnter: () => {
          quarterlyData.forEach((_, index) => {
            gsap.to({}, { 
              duration: 1, 
              delay: index * 0.15,
              ease: 'power3.out',
              onUpdate: function() {
                const progress = this.progress();
                setBarHeights(prev => {
                  const newHeights = [...prev];
                  newHeights[index] = progress;
                  return newHeights;
                });
              }
            });
          });
        },
        once: true
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#F0EDE6]" id="performance">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#8FB8A3] uppercase tracking-wider mb-4">
            Performance
          </span>
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-6">
            Track Record of Excellence
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Consistent outperformance through disciplined investment selection and active portfolio management.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="metrics-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-500' : 'text-[#7A7A7A]'
                }`}>
                  {getTrendIcon(metric.trend)}
                  {metric.change}
                </span>
              </div>
              <div className="text-4xl font-bold text-[#1A1A1A] mb-1">
                {metric.prefix}{animatedValues[index]}{metric.suffix}
              </div>
              <div className="text-sm font-medium text-[#1A1A1A] mb-1">{metric.label}</div>
              <div className="text-sm text-[#7A7A7A]">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quarterly Performance Chart */}
          <div className="chart-section bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1">Quarterly Performance</h3>
                <p className="text-sm text-[#7A7A7A]">Returns vs Benchmark (%)</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#8FB8A3]" />
                  <span className="text-[#5A5A5A]">TerraVest</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#D1D5DB]" />
                  <span className="text-[#5A5A5A]">Benchmark</span>
                </div>
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="h-64 flex items-end justify-between gap-4">
              {quarterlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-end justify-center gap-1 h-48 mb-3">
                    {/* TerraVest Bar */}
                    <div className="relative w-8 group">
                      <div 
                        className="w-full bg-[#8FB8A3] rounded-t-lg transition-all duration-700"
                        style={{ height: `${barHeights[index] * (data.terraVest / 30) * 100}%` }}
                      />
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-[#1A1A1A]">
                        {data.terraVest}%
                      </div>
                    </div>
                    {/* Benchmark Bar */}
                    <div className="relative w-8 group">
                      <div 
                        className="w-full bg-[#D1D5DB] rounded-t-lg transition-all duration-700"
                        style={{ height: `${barHeights[index] * (data.benchmark / 30) * 100}%` }}
                      />
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-[#7A7A7A]">
                        {data.benchmark}%
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-[#5A5A5A] font-medium">{data.quarter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Allocation */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1">Sector Allocation</h3>
                <p className="text-sm text-[#7A7A7A]">Portfolio by sector</p>
              </div>
              <button className="flex items-center gap-1 text-sm text-[#8FB8A3] hover:underline">
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              {sectorAllocation.map((sector, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#1A1A1A]">{sector.name}</span>
                    <span className="text-sm text-[#5A5A5A]">{sector.value}%</span>
                  </div>
                  <div className="h-2.5 bg-[#F0EDE6] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: showContent ? `${sector.value}%` : '0%',
                        backgroundColor: sector.color,
                        transitionDelay: `${500 + index * 100}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#7A7A7A] mb-1">Total Sectors</p>
                  <p className="text-2xl font-semibold text-[#1A1A1A]">5</p>
                </div>
                <div>
                  <p className="text-sm text-[#7A7A7A] mb-1">Diversification</p>
                  <p className="text-2xl font-semibold text-[#8FB8A3]">High</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
