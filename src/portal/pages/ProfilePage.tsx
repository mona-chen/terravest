import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Camera,
  Save,
  Check,
  AlertCircle,
} from 'lucide-react';
import { formatDate } from '../data/store';

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    const result = await updateProfile({
      name: formData.name,
      phone: formData.phone,
      company: formData.company,
    });
    
    if (result.success) {
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload the file and get the URL
      // For demo, we'll just show a success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-1">Profile</h1>
        <p className="text-white/50">Manage your personal information and preferences</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 animate-slideUp">
          <Check className="w-5 h-5 text-green-400" />
          <span className="text-green-400">Profile updated successfully</span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Avatar & Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="relative mb-4">
                <img 
                  src={user?.avatar} 
                  alt={user?.name}
                  className="w-24 h-24 rounded-full"
                />
                <button 
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-[#8FB8A3] rounded-full flex items-center justify-center hover:bg-[#7BA391] transition-colors"
                >
                  <Camera className="w-4 h-4 text-[#0A0A0A]" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <h2 className="text-lg font-semibold text-white mb-1">{user?.name}</h2>
              <p className="text-sm text-white/50 mb-4">{user?.email}</p>

              <div className="w-full pt-4 border-t border-[#2A2A2A]">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/50">Member since</span>
                  <span className="text-white">{user?.joinedAt ? formatDate(user.joinedAt) : '-'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Last login</span>
                  <span className="text-white">{user?.lastLogin ? formatDate(user.lastLogin) : '-'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6 mt-4">
            <h3 className="text-sm font-medium text-white mb-4">Account Status</h3>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white">Active</span>
            </div>
            <p className="text-xs text-white/50 mt-2">
              Your account is in good standing with full access to all features.
            </p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2">
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">Personal Information</h3>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg text-sm font-medium hover:bg-[#7BA391] transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        phone: user?.phone || '',
                        company: user?.company || '',
                      });
                    }}
                    className="px-4 py-2 border border-[#2A2A2A] text-white/70 rounded-lg text-sm hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-4 py-2 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg text-sm font-medium hover:bg-[#7BA391] disabled:opacity-50 transition-colors flex items-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm text-white/50 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-white/50 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-3 text-white/50 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-white/40 mt-1">Email cannot be changed. Contact support for assistance.</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-white/50 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="+237 677 123 456"
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm text-white/50 mb-2">Company (Optional)</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Your company name"
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6 mt-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-1">Security Notice</h3>
                <p className="text-sm text-white/50">
                  Your account information is protected with industry-standard encryption. 
                  Never share your login credentials with anyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
