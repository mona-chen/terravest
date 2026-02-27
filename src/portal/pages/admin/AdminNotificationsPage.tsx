import { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Trash2, 
  TrendingUp,
  FileText,
  User,
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'investment' | 'document' | 'user' | 'system';
  read: boolean;
  createdAt: string;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'New Investment', message: 'Jean-Pierre Moussa invested $250,000 in GreenEnergy Fund', type: 'investment', read: false, createdAt: '2 min ago' },
  { id: '2', title: 'Document Uploaded', message: 'Q4 Report 2024 has been uploaded by Sarah Johnson', type: 'document', read: false, createdAt: '15 min ago' },
  { id: '3', title: 'New User Registration', message: 'Amara Okafor has registered as a new investor', type: 'user', read: true, createdAt: '1 hour ago' },
  { id: '4', title: 'Portfolio Update', message: 'AfriCapital Finance valuation increased by 12%', type: 'investment', read: true, createdAt: '2 hours ago' },
  { id: '5', title: 'System Maintenance', message: 'Scheduled maintenance on Sunday 2:00 AM UTC', type: 'system', read: true, createdAt: '5 hours ago' },
];

const filters = ['All', 'Unread', 'Investment', 'Document', 'User', 'System'];

export default function AdminNotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications = notifications.filter(n => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Unread') return !n.read;
    return n.type.toLowerCase() === selectedFilter.toLowerCase();
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'investment': return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'document': return <FileText className="w-5 h-5 text-blue-400" />;
      case 'user': return <User className="w-5 h-5 text-purple-400" />;
      default: return <Bell className="w-5 h-5 text-orange-400" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'investment': return 'bg-green-500/10';
      case 'document': return 'bg-blue-500/10';
      case 'user': return 'bg-purple-500/10';
      default: return 'bg-orange-500/10';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Notifications</h1>
          <p className="text-white/50">Manage system notifications and alerts</p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Mark all as read</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilter === filter
                ? 'bg-[#8FB8A3] text-[#0A0A0A]'
                : 'bg-[#141414] border border-[#2A2A2A] text-white/70 hover:text-white hover:border-[#8FB8A3]'
            }`}
          >
            {filter}
            {filter === 'Unread' && unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No notifications</h3>
            <p className="text-white/50">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-[#2A2A2A]">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-6 flex items-start gap-4 hover:bg-[#1A1A1A] transition-colors ${!notification.read ? 'bg-[#8FB8A3]/5' : ''}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getBgColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">{notification.title}</p>
                      <p className="text-sm text-white/60 mt-1">{notification.message}</p>
                      <p className="text-xs text-white/40 mt-2">{notification.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-white/30 hover:text-[#8FB8A3] hover:bg-[#8FB8A3]/10 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-[#8FB8A3] rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
