import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Building2, Users, TrendingUp, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const countries = [
  {
    name: 'Cameroon',
    cities: ['Douala', 'Yaoundé'],
    role: 'Headquarters',
    stats: { companies: 7, employees: 570, investments: '$85M' },
    description: 'Primary operations hub with strong government partnerships',
  },
  {
    name: 'Ghana',
    cities: ['Accra'],
    role: 'West Africa Hub',
    stats: { companies: 4, employees: 320, investments: '$52M' },
    description: 'Gateway to West African markets',
  },
  {
    name: 'Kenya',
    cities: ['Nairobi'],
    role: 'East Africa Hub',
    stats: { companies: 3, employees: 240, investments: '$41M' },
    description: 'Technology and innovation center',
  },
  {
    name: 'Nigeria',
    cities: ['Lagos', 'Abuja'],
    role: 'Expansion Market',
    stats: { companies: 2, employees: 180, investments: '$28M' },
    description: 'Largest economy in Africa',
  },
];

const regionStats = [
  { label: 'Countries', value: '4', icon: Globe },
  { label: 'Portfolio Companies', value: '16', icon: Building2 },
  { label: 'Team Members', value: '1,310', icon: Users },
  { label: 'Capital Deployed', value: '$206M', icon: TrendingUp },
];

export default function PresenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCountry, setActiveCountry] = useState<number | null>(null);
  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.presence-header > *', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.presence-header', start: 'top 85%' }
        }
      );

      // Stats animation
      ScrollTrigger.create({
        trigger: '.region-stats',
        start: 'top 85%',
        onEnter: () => {
          regionStats.forEach((stat, index) => {
            const targetValue = parseInt(stat.value.replace(/[^0-9]/g, '')) || 0;
            gsap.to({}, { duration: 1.5, delay: index * 0.1, ease: 'power2.out',
              onUpdate: function() {
                setAnimatedStats(prev => {
                  const newStats = [...prev];
                  newStats[index] = Math.round(targetValue * this.progress());
                  return newStats;
                });
              }
            });
          });
        },
        once: true
      });

      // Map animation
      gsap.fromTo('.africa-map',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.africa-map', start: 'top 80%' }
        }
      );

      // Country markers
      gsap.fromTo('.country-marker',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.africa-map', start: 'top 70%' }
        }
      );

      // Country cards
      gsap.fromTo('.country-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.country-cards', start: 'top 85%' }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden" id="presence">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#111] to-[#0A0A0A]" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(143, 184, 163, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(143, 184, 163, 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="presence-header text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8FB8A3]/10 border border-[#8FB8A3]/20 rounded-full text-sm font-medium text-[#8FB8A3] mb-6">
            <Globe className="w-4 h-4" />
            Our Presence
          </span>
          <h2 className="text-4xl lg:text-6xl font-semibold text-white mb-6">
            Across <span className="text-[#8FB8A3]">Central Africa</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Strategic presence in key markets enabling local insights, regional partnerships, 
            and sustainable growth opportunities across the continent.
          </p>
        </div>

        {/* Region Stats */}
        <div className="region-stats grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {regionStats.map((stat, index) => (
            <div key={index} className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.05] hover:border-[#8FB8A3]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#8FB8A3]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-[#8FB8A3]" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                {index === 3 ? '$' : ''}{animatedStats[index]}{index === 2 ? '' : index === 3 ? 'M' : ''}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Map and Countries Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Africa Map */}
          <div className="africa-map relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-8 border border-white/5">
            <div className="absolute top-6 left-6">
              <h3 className="text-lg font-medium text-white mb-1">Regional Map</h3>
              <p className="text-sm text-white/40">Click markers for details</p>
            </div>

            {/* SVG Africa Map */}
            <svg viewBox="0 0 400 450" className="w-full h-auto max-h-[400px] mt-12">
              {/* Base Africa continent */}
              <path
                d="M180,30 Q220,25 250,35 Q290,45 310,70 Q330,95 335,125 Q340,155 330,185 Q325,215 310,245 Q295,275 275,305 Q255,335 230,360 Q205,385 180,400 Q155,385 130,360 Q105,335 85,305 Q65,275 50,245 Q35,215 30,185 Q25,155 30,125 Q35,95 55,70 Q75,45 110,35 Q140,25 180,30Z"
                fill="#1f1f1f"
                stroke="#333"
                strokeWidth="1"
              />
              
              {/* Highlighted countries */}
              {/* Cameroon */}
              <path
                d="M155,145 Q175,140 195,145 Q210,150 215,165 Q220,180 215,195 Q210,210 195,215 Q180,220 165,215 Q150,210 145,195 Q140,180 145,165 Q148,150 155,145Z"
                fill={activeCountry === 0 ? "#8FB8A3" : "#2a3a32"}
                stroke={activeCountry === 0 ? "#8FB8A3" : "#3a4a42"}
                strokeWidth="1"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setActiveCountry(0)}
                onMouseLeave={() => setActiveCountry(null)}
              />
              
              {/* Ghana */}
              <path
                d="M95,155 Q110,150 125,155 Q135,160 138,175 Q140,190 135,200 Q130,210 115,212 Q100,210 92,200 Q85,190 88,175 Q90,160 95,155Z"
                fill={activeCountry === 1 ? "#8FB8A3" : "#2a3a32"}
                stroke={activeCountry === 1 ? "#8FB8A3" : "#3a4a42"}
                strokeWidth="1"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setActiveCountry(1)}
                onMouseLeave={() => setActiveCountry(null)}
              />
              
              {/* Nigeria */}
              <path
                d="M130,130 Q155,125 175,130 Q190,135 195,155 Q198,175 192,190 Q185,205 165,208 Q145,205 132,190 Q120,175 122,155 Q125,135 130,130Z"
                fill={activeCountry === 3 ? "#8FB8A3" : "#2a3a32"}
                stroke={activeCountry === 3 ? "#8FB8A3" : "#3a4a42"}
                strokeWidth="1"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setActiveCountry(3)}
                onMouseLeave={() => setActiveCountry(null)}
              />
              
              {/* Kenya */}
              <path
                d="M280,200 Q300,195 315,200 Q325,205 328,220 Q330,235 325,248 Q320,260 305,262 Q290,260 282,248 Q275,235 277,220 Q278,205 280,200Z"
                fill={activeCountry === 2 ? "#8FB8A3" : "#2a3a32"}
                stroke={activeCountry === 2 ? "#8FB8A3" : "#3a4a42"}
                strokeWidth="1"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setActiveCountry(2)}
                onMouseLeave={() => setActiveCountry(null)}
              />

              {/* Country Labels */}
              <text x="175" y="185" fill="white" fontSize="10" textAnchor="middle" opacity={activeCountry === 0 ? 1 : 0.6}>Cameroon</text>
              <text x="110" y="190" fill="white" fontSize="9" textAnchor="middle" opacity={activeCountry === 1 ? 1 : 0.6}>Ghana</text>
              <text x="300" y="235" fill="white" fontSize="9" textAnchor="middle" opacity={activeCountry === 2 ? 1 : 0.6}>Kenya</text>
              <text x="158" y="175" fill="white" fontSize="9" textAnchor="middle" opacity={activeCountry === 3 ? 1 : 0.6}>Nigeria</text>

              {/* Pulsing Markers */}
              {[
                { cx: 175, cy: 175, index: 0 },
                { cx: 110, cy: 185, index: 1 },
                { cx: 300, cy: 230, index: 2 },
                { cx: 158, cy: 170, index: 3 },
              ].map((marker, i) => (
                <g key={i} className="country-marker cursor-pointer" 
                   onMouseEnter={() => setActiveCountry(marker.index)}
                   onMouseLeave={() => setActiveCountry(null)}>
                  <circle cx={marker.cx} cy={marker.cy} r="12" fill="#8FB8A3" opacity="0.3">
                    <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle 
                    cx={marker.cx} 
                    cy={marker.cy} 
                    r="6" 
                    fill={activeCountry === marker.index ? "#fff" : "#8FB8A3"}
                    stroke="#fff"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                </g>
              ))}
            </svg>

            {/* Map Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#8FB8A3]" />
                <span className="text-white/60">Active Markets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2a3a32] border border-[#3a4a42]" />
                <span className="text-white/60">Potential Markets</span>
              </div>
            </div>
          </div>

          {/* Country Cards */}
          <div className="country-cards space-y-4">
            <h3 className="text-xl font-medium text-white mb-6">Operating Markets</h3>
            {countries.map((country, index) => (
              <div
                key={index}
                className={`country-card group bg-white/[0.03] backdrop-blur-sm border rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                  activeCountry === index 
                    ? 'bg-[#8FB8A3]/10 border-[#8FB8A3]/40' 
                    : 'border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                }`}
                onMouseEnter={() => setActiveCountry(index)}
                onMouseLeave={() => setActiveCountry(null)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      activeCountry === index ? 'bg-[#8FB8A3]' : 'bg-[#8FB8A3]/10'
                    }`}>
                      <MapPin className={`w-5 h-5 transition-colors ${activeCountry === index ? 'text-[#0A0A0A]' : 'text-[#8FB8A3]'}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{country.name}</h4>
                      <p className="text-sm text-white/50">{country.cities.join(', ')}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    index === 0 ? 'bg-[#8FB8A3]/20 text-[#8FB8A3]' : 'bg-white/10 text-white/60'
                  }`}>
                    {country.role}
                  </span>
                </div>

                <p className="text-sm text-white/50 mb-4">{country.description}</p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-lg font-semibold text-white">{country.stats.companies}</div>
                    <div className="text-xs text-white/40">Companies</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">{country.stats.employees}</div>
                    <div className="text-xs text-white/40">Employees</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[#8FB8A3]">{country.stats.investments}</div>
                    <div className="text-xs text-white/40">Invested</div>
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
