import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Building2, User, Phone, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();

  const validateForm = () => {
    if (!name.trim()) return 'Please enter your full name';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (!email.trim()) return 'Please enter your email';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email';
    if (!password) return 'Please enter a password';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const result = await register({
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim() || undefined,
      company: company.trim() || undefined,
    });

    if (!result.success) {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #8FB8A3 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8FB8A3]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#8FB8A3]/5 rounded-full blur-3xl" />

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
              Start Your<br />
              <span className="text-[#8FB8A3]">Investment Journey</span>
            </h1>
            <p className="text-lg text-white/60 max-w-md leading-relaxed">
              Join our community of investors and gain access to exclusive
              opportunities across high-growth sectors.
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

      
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0A0A0A] overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#8FB8A3] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#0A0A0A]" />
            </div>
            <span className="text-xl font-semibold text-white">TerraVest</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Create Account</h2>
            <p className="text-white/50">Fill in your details to get started</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-sm text-white/70 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
                />
              </div>
            </div>

            
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
                />
              </div>
            </div>

            
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
              <p className="mt-1.5 text-xs text-white/30">Must be at least 8 characters</p>
            </div>

            
            <div>
              <label className="block text-sm text-white/70 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg pl-12 pr-12 py-3.5 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            
            <div>
              <label className="block text-sm text-white/70 mb-2">Phone Number <span className="text-white/30">(optional)</span></label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-sm text-white/70 mb-2">Company <span className="text-white/30">(optional)</span></label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Inc."
                  className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
                />
              </div>
            </div>

            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8FB8A3] text-[#0A0A0A] font-medium py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#7BA391] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          
          <div className="mt-8 text-center">
            <p className="text-sm text-white/40">
              Already have an account?{' '}
              <Link to="/login" className="text-[#8FB8A3] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
