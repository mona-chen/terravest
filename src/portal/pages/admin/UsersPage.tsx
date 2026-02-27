import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Download,
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: 'investor' | 'admin' | 'manager';
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
  investments: number;
  totalInvested: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Jean-Pierre Moussa', email: 'jp.moussa@email.com', phone: '+237 6XX XXX XXX', company: 'Moussa Holdings', role: 'investor', status: 'active', joinedDate: '2024-01-15', investments: 5, totalInvested: '$1.2M' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 555 XXX XXXX', company: 'Johnson Capital', role: 'investor', status: 'active', joinedDate: '2024-02-20', investments: 3, totalInvested: '$850K' },
  { id: '3', name: 'Michael Chen', email: 'm.chen@email.com', phone: '+86 138 XXXX XXXX', company: 'Chen Investments', role: 'manager', status: 'active', joinedDate: '2024-03-10', investments: 8, totalInvested: '$2.1M' },
  { id: '4', name: 'Amara Okafor', email: 'amara.o@email.com', phone: '+234 8XX XXX XXXX', company: 'Okafor Group', role: 'investor', status: 'pending', joinedDate: '2024-06-01', investments: 0, totalInvested: '$0' },
  { id: '5', name: 'David Kimani', email: 'd.kimani@email.com', phone: '+254 7XX XXX XXX', company: 'Kimani Ventures', role: 'investor', status: 'active', joinedDate: '2024-01-28', investments: 4, totalInvested: '$950K' },
  { id: '6', name: 'Fatima Al-Hassan', email: 'fatima.a@email.com', phone: '+212 6XX XXX XXX', company: 'Al-Hassan Holdings', role: 'investor', status: 'inactive', joinedDate: '2023-11-15', investments: 2, totalInvested: '$500K' },
];

const roles = ['All', 'Investor', 'Admin', 'Manager'];
const statuses = ['All', 'Active', 'Inactive', 'Pending'];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role.toLowerCase() === selectedRole.toLowerCase();
    const matchesStatus = selectedStatus === 'All' || user.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Users</h1>
          <p className="text-white/50">Manage platform users and permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white hover:border-[#8FB8A3] transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Export</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add User</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-12 pr-4 py-2.5 text-white placeholder-white/30 focus:border-[#8FB8A3] transition-colors"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
              showFilters 
                ? 'bg-[#8FB8A3]/10 border-[#8FB8A3] text-[#8FB8A3]' 
                : 'bg-[#1A1A1A] border-[#2A2A2A] text-white/70 hover:text-white'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-[#2A2A2A] grid sm:grid-cols-2 gap-4 animate-slideUp">
            <div>
              <label className="block text-sm text-white/50 mb-2">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors"
              >
                {roles.map(role => <option key={role} value={role}>{role}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors"
              >
                {statuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-3 p-3 bg-[#8FB8A3]/10 border border-[#8FB8A3]/30 rounded-lg">
          <span className="text-sm text-[#8FB8A3]">{selectedUsers.length} selected</span>
          <div className="flex-1" />
          <button className="px-3 py-1.5 text-sm text-white/70 hover:text-white bg-[#1A1A1A] rounded-lg transition-colors">
            Activate
          </button>
          <button className="px-3 py-1.5 text-sm text-white/70 hover:text-white bg-[#1A1A1A] rounded-lg transition-colors">
            Deactivate
          </button>
          <button className="px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            Delete
          </button>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A2A2A]">
              <th className="py-4 px-6 text-left">
                <input 
                  type="checkbox" 
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={selectAll}
                  className="w-4 h-4 rounded border-[#2A2A2A] bg-[#1A1A1A] text-[#8FB8A3] focus:ring-[#8FB8A3]"
                />
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-white/50">User</th>
              <th className="py-4 px-6 text-left text-sm font-medium text-white/50">Contact</th>
              <th className="py-4 px-6 text-left text-sm font-medium text-white/50">Role</th>
              <th className="py-4 px-6 text-left text-sm font-medium text-white/50">Status</th>
              <th className="py-4 px-6 text-left text-sm font-medium text-white/50">Investments</th>
              <th className="py-4 px-6 text-right text-sm font-medium text-white/50">Total</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors">
                <td className="py-4 px-6">
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    className="w-4 h-4 rounded border-[#2A2A2A] bg-[#1A1A1A] text-[#8FB8A3] focus:ring-[#8FB8A3]"
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#8FB8A3]/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-[#8FB8A3]">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-white/40">{user.company}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Mail className="w-3.5 h-3.5" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <Phone className="w-3.5 h-3.5" />
                      {user.phone}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-500/10 text-purple-400' :
                    user.role === 'manager' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-[#8FB8A3]/10 text-[#8FB8A3]'
                  }`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-500/10 text-green-400' :
                    user.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {user.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> :
                     user.status === 'inactive' ? <XCircle className="w-3 h-3" /> : null}
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-white">{user.investments}</p>
                  <p className="text-xs text-white/40">Since {user.joinedDate}</p>
                </td>
                <td className="py-4 px-6 text-right">
                  <p className="text-sm font-medium text-white">{user.totalInvested}</p>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <button className="p-2 text-white/30 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-white/30 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No users found</h3>
            <p className="text-white/50">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">
          Showing {filteredUsers.length} of {mockUsers.length} users
        </p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white/50 hover:text-white transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white/50 hover:text-white transition-colors">
            Next
          </button>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-[#141414] border border-[#2A2A2A] rounded-xl w-full max-w-md p-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-white mb-4">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/50 mb-2">Full Name</label>
                <input type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors" placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Email</label>
                <input type="email" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors" placeholder="Enter email" />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Role</label>
                <select className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white focus:border-[#8FB8A3] transition-colors">
                  <option>Investor</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#7BA391] transition-colors"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
