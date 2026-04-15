import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Mail,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Download,
} from 'lucide-react';

const roles = ['All', 'Investor', 'Admin'];
const statuses = ['All', 'Active', 'Inactive'];

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminApi.getUsers();
        setUsers(data);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user: any) => {
    const name = user?.name || '';
    const email = user?.email || '';
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role?.toLowerCase() === selectedRole.toLowerCase();
    const matchesStatus = selectedStatus === 'All' || user.status?.toLowerCase() === selectedStatus.toLowerCase();
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
      setSelectedUsers(filteredUsers.map((u: any) => u.id));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-[#8FB8A3]/30 border-t-[#8FB8A3] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
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
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: any) => (
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
                        {(user.name || user.email || 'U').split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{user.name || 'Unnamed'}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Mail className="w-3.5 h-3.5" />
                      {user.email}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-[#8FB8A3]/10 text-[#8FB8A3]'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {user.status === 'ACTIVE' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {user.status}
                  </span>
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

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-[#141414] border border-[#2A2A2A] rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Add New User</h3>
            <div className="space-y-4">
              <input type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white" placeholder="Full Name" />
              <input type="email" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white" placeholder="Email" />
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 border border-[#2A2A2A] rounded-lg text-white/70 hover:text-white">Cancel</button>
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 bg-[#8FB8A3] text-[#0A0A0A] rounded-lg font-medium">Add User</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
