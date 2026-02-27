import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Building2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    const result = await login(email);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#1A1A1A] relative overflow-hidden">
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8FB8A3]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#8FB8A3]/5 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#8FB8A3] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#0A0A0A]" />
              </div>
              <span className="text-xl font-semibold text-white tracking-tight">TerraVest</span>
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl font-semibold text-white mb-6 leading-tight">
              Welcome to the<br />
              <span className="text-[#8FB8A3]">Investor Portal</span>
            </h1>
            <p className="text-lg text-white/60 max-w-md leading-relaxed">
              Access your portfolio performance, documents, and investment insights 
              in one secure place.
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <div>
              <div className="text-3xl font-semibold text-white mb-1">$247.5M</div>
              <div className="text-sm text-white/40">Assets Under Management</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="text-3xl font-semibold text-white mb-1">9+</div>
              <div className="text-sm text-white/40">Portfolio Companies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0A0A0A]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#8FB8A3] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#0A0A0A]" />
            </div>
            <span className="text-xl font-semibold text-white">TerraVest</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Sign in</h2>
            <p className="text-white/50">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm text-white/70 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investor@terravest.cm"
                  className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-white/70 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg pl-12 pr-12 py-3.5 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#2A2A2A] bg-[#141414] text-[#8FB8A3] focus:ring-[#8FB8A3] focus:ring-offset-0"
                />
                <span className="text-sm text-white/50">Remember me</span>
              </label>
              <button type="button" className="text-sm text-[#8FB8A3] hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8FB8A3] text-[#0A0A0A] font-medium py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#7BA391] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 p-4 bg-[#141414] rounded-lg border border-[#2A2A2A]">
            <p className="text-xs text-white/40 mb-2">Demo Credentials</p>
            <p className="text-sm text-white/60">Email: investor@terravest.cm</p>
            <p className="text-sm text-white/60">Password: any password works</p>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-sm text-white/40">
              Need help?{' '}
              <button className="text-[#8FB8A3] hover:underline">Contact support</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
