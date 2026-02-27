import { Building2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-[#8FB8A3] flex items-center justify-center animate-pulse">
          <Building2 className="w-6 h-6 text-[#0A0A0A]" />
        </div>
        <div className="w-32 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
          <div className="h-full bg-[#8FB8A3] animate-[shimmer_1.5s_infinite]" 
            style={{
              background: 'linear-gradient(90deg, transparent, #8FB8A3, transparent)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
