import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Archive, 
  Trash2, 
  Star,
  ChevronLeft,
  Clock,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { formatDateTime, formatRelativeTime } from '../data/store';

export default function MessagesPage() {
  const { user } = useAuth();
  const { messages, markMessageRead } = useData();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyContent, setReplyContent] = useState('');

  const filteredMessages = messages.filter(msg => 
    msg.recipientId === user?.id || msg.senderId === user?.id
  ).filter(msg => 
    msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessage = messages.find(m => m.id === selectedMessage);

  const handleSelectMessage = (id: string) => {
    setSelectedMessage(id);
    const msg = messages.find(m => m.id === id);
    if (msg && !msg.read && msg.recipientId === user?.id) {
      markMessageRead(id);
    }
  };

  const handleSendReply = () => {
    if (!replyContent.trim()) return;
    // For demo, just clear the input
    setReplyContent('');
    alert('Reply sent! (Demo mode)');
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
      <div className="flex h-full">
        {/* Message List */}
        <div className={`w-full lg:w-80 border-r border-[#2A2A2A] flex flex-col ${selectedMessage ? 'hidden lg:flex' : 'flex'}`}>
          {/* Header */}
          <div className="p-4 border-b border-[#2A2A2A]">
            <h2 className="text-lg font-semibold text-white mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto">
            {filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-white/40">
                <Mail className="w-12 h-12 mb-4" />
                <p>No messages found</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => handleSelectMessage(message.id)}
                  className={`w-full p-4 text-left border-b border-[#2A2A2A] transition-colors ${
                    selectedMessage === message.id 
                      ? 'bg-[#8FB8A3]/10' 
                      : 'hover:bg-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img 
                      src={message.senderAvatar} 
                      alt={message.senderName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-white truncate">{message.senderName}</span>
                        <span className="text-xs text-white/40">{formatRelativeTime(message.sentAt)}</span>
                      </div>
                      <p className="text-sm text-white/70 truncate mb-1">{message.subject}</p>
                      <p className="text-xs text-white/40 truncate">{message.content.substring(0, 60)}...</p>
                    </div>
                    {!message.read && message.recipientId === user?.id && (
                      <div className="w-2 h-2 bg-[#8FB8A3] rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className={`flex-1 flex flex-col ${selectedMessage ? 'flex' : 'hidden lg:flex'}`}>
          {currentMessage ? (
            <>
              {/* Message Header */}
              <div className="p-4 border-b border-[#2A2A2A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedMessage(null)}
                    className="lg:hidden p-2 text-white/50 hover:text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <img 
                    src={currentMessage.senderAvatar} 
                    alt={currentMessage.senderName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-white">{currentMessage.senderName}</h3>
                    <p className="text-xs text-white/40">{currentMessage.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-white/40 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors">
                    <Star className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-white/40 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors">
                    <Archive className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-white/40 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 overflow-auto p-6">
                <div className="flex items-center gap-2 text-xs text-white/40 mb-6">
                  <Clock className="w-3 h-3" />
                  {formatDateTime(currentMessage.sentAt)}
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 whitespace-pre-wrap">{currentMessage.content}</p>
                </div>
              </div>

              {/* Reply */}
              <div className="p-4 border-t border-[#2A2A2A]">
                <div className="flex items-end gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      rows={3}
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="p-3 text-white/40 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleSendReply}
                      disabled={!replyContent.trim()}
                      className="p-3 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg hover:bg-[#7BA391] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white/40">
              <MessageSquare className="w-16 h-16 mb-4" />
              <p className="text-lg mb-2">Select a message to read</p>
              <p className="text-sm">Choose from your inbox on the left</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
