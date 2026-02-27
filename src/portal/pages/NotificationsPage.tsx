import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { 
  Check, 
  Trash2, 
  Bell, 
  Info,
  AlertTriangle,
  CheckCircle2,
  X,
} from 'lucide-react';
import { formatRelativeTime } from '../data/store';
import { NavLink } from 'react-router-dom';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="w-5 h-5 text-green-400" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    case 'error':
      return <X className="w-5 h-5 text-red-400" />;
    default:
      return <Info className="w-5 h-5 text-blue-400" />;
  }
};

const getNotificationBg = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-500/10';
    case 'warning':
      return 'bg-yellow-500/10';
    case 'error':
      return 'bg-red-500/10';
    default:
      return 'bg-blue-500/10';
  }
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead, deleteNotification } = useData();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Notifications</h1>
          <p className="text-white/50">
            {unreadCount > 0 
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'All caught up! No new notifications'
            }
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#141414] border border-[#2A2A2A] rounded-lg p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-[#2A2A2A] text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-[#2A2A2A] text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="px-4 py-2 text-sm text-[#8FB8A3] hover:bg-[#8FB8A3]/10 rounded-lg transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No notifications</h3>
            <p className="text-white/50">
              {filter === 'unread' 
                ? 'You have no unread notifications'
                : 'Your notification history is empty'
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-[#141414] border rounded-xl p-4 transition-all ${
                notification.read 
                  ? 'border-[#2A2A2A] opacity-70' 
                  : 'border-[#8FB8A3]/30'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getNotificationBg(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`font-medium mb-1 ${notification.read ? 'text-white/70' : 'text-white'}`}>
                        {notification.title}
                      </h3>
                      <p className="text-sm text-white/50 mb-2">{notification.message}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-white/40">{formatRelativeTime(notification.createdAt)}</span>
                        {notification.actionUrl && (
                          <NavLink 
                            to={notification.actionUrl}
                            className="text-xs text-[#8FB8A3] hover:underline"
                          >
                            {notification.actionLabel || 'View'}
                          </NavLink>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {!notification.read && (
                        <button
                          onClick={() => markNotificationRead(notification.id)}
                          className="p-2 text-white/30 hover:text-[#8FB8A3] hover:bg-[#8FB8A3]/10 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
