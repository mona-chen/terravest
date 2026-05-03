import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { portalApi } from '@/lib/api';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Shield, 
  Eye, 
  EyeOff,
  Lock,
  Check,
  AlertCircle,
  Save,
  User,
  Monitor,
  Moon,
  Smartphone as DeviceIcon,
} from 'lucide-react';

export default function SettingsPage() {
  const { changePassword, isLoading, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'security' | 'appearance'>('account');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    portfolioUpdates: true,
    documentAlerts: true,
    dividendNotifications: true,
    marketNews: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [darkMode, setDarkMode] = useState(true);

  const handleNotificationChange = async (key: keyof typeof notificationSettings) => {
    const next = { ...notificationSettings, [key]: !notificationSettings[key] };
    setNotificationSettings(next);
    try {
      await portalApi.updateSettings(next);
      setSuccessMessage('Notification preferences updated');
    } catch {
      setSuccessMessage('Failed to update preferences');
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }
    
    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    
    if (result.success) {
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccessMessage('Password changed successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Monitor },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-1">Settings</h1>
        <p className="text-white/50">Manage your account settings and preferences</p>
      </div>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 animate-slideUp">
          <Check className="w-5 h-5 text-green-400" />
          <span className="text-green-400">{successMessage}</span>
        </div>
      )}

      <div className="flex gap-1 bg-[#141414] border border-[#2A2A2A] rounded-lg p-1 w-fit mb-6 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#8FB8A3] text-[#0A0A0A]'
                  : 'text-white/50 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'account' && (
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-6">Account Information</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-white/50 mb-2">Full Name</label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white/50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white/50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">Role</label>
              <input
                type="text"
                value={user?.role || ''}
                disabled
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white/50 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-6">Notification Preferences</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Email Notifications</h4>
                  <p className="text-sm text-white/50">Receive updates and alerts via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={() => handleNotificationChange('emailNotifications')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#2A2A2A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8FB8A3]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">SMS Notifications</h4>
                  <p className="text-sm text-white/50">Receive urgent alerts via SMS</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.smsNotifications}
                  onChange={() => handleNotificationChange('smsNotifications')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#2A2A2A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8FB8A3]"></div>
              </label>
            </div>

            <div className="border-t border-[#2A2A2A] pt-6">
              <h4 className="text-sm font-medium text-white/70 mb-4">Notification Types</h4>
              
              <div className="space-y-4">
                {[
                  { key: 'portfolioUpdates', label: 'Portfolio Updates', desc: 'Changes in your portfolio value and performance' },
                  { key: 'documentAlerts', label: 'Document Alerts', desc: 'New documents available in your vault' },
                  { key: 'dividendNotifications', label: 'Dividend Notifications', desc: 'Upcoming and received dividend payments' },
                  { key: 'marketNews', label: 'Market News', desc: 'Relevant market updates and insights' },
                  { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Product updates and promotional content' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-white">{item.label}</h5>
                      <p className="text-xs text-white/40">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                        onChange={() => handleNotificationChange(item.key as keyof typeof notificationSettings)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#2A2A2A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8FB8A3]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-6">Change Password</h3>
            
            <div className="space-y-4 max-w-md">
              <div>
                <label htmlFor="current-password" className="block text-sm text-white/50 mb-2">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    id="current-password"
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-12 py-3 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                  >
                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="new-password" className="block text-sm text-white/50 mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    id="new-password"
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-12 py-3 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm text-white/50 mb-2">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    id="confirm-password"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-12 py-3 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                  <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                )}
              </div>

              <button
                onClick={handlePasswordChange}
                disabled={
                  isLoading || 
                  !passwordData.currentPassword || 
                  !passwordData.newPassword || 
                  passwordData.newPassword !== passwordData.confirmPassword
                }
                className="px-6 py-3 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Change Password
              </button>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#8FB8A3]/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#8FB8A3]" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Two-Factor Authentication</h3>
                  <p className="text-sm text-white/50">Add an extra layer of security to your account</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-[#2A2A2A] text-white/70 rounded-lg text-sm hover:text-white hover:border-[#8FB8A3] transition-colors">
                Enable 2FA
              </button>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">Connected Devices</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg">
                <div className="flex items-center gap-3">
                  <DeviceIcon className="w-5 h-5 text-white/50" />
                  <div>
                    <p className="text-sm text-white">Current Browser</p>
                    <p className="text-xs text-white/40">Active now</p>
                  </div>
                </div>
                <span className="text-xs text-green-400">Current</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-400 mb-1">Security Tip</h4>
                <p className="text-sm text-white/50">Use a strong, unique password and enable two-factor authentication for maximum security.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'appearance' && (
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-6">Appearance</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-white/50" />
                <div>
                  <p className="text-sm font-medium text-white">Dark Mode</p>
                  <p className="text-xs text-white/40">Use dark theme across the platform</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => {
                    setDarkMode(!darkMode);
                    setSuccessMessage('Appearance updated');
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 3000);
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#2A2A2A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8FB8A3]"></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
