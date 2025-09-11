import { useState, useEffect } from 'react';
import { adminService } from '../../services/admin';
import { useAdmin } from '../../context/AdminContext';
import { formatDate, capitalizeFirst } from '../../utils/helpers';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';
import { 
  AiOutlineUser, 
  AiOutlineEye, 
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineFilter
} from 'react-icons/ai';

const UserManagement = () => {
  const { users, updateUserRole } = useAdmin();
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [allUsers, searchTerm, roleFilter]);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllUsers();
      setAllUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = allUsers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await adminService.deleteUser(selectedUser.id);
      setAllUsers(prev => prev.filter(u => u.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      moderator: 'bg-blue-100 text-blue-800',
      member: 'bg-green-100 text-green-800',
      guest: 'bg-gray-100 text-gray-800'
    };
    return colors[role] || colors.guest;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryBlue"></div>
        <span className="ml-3 text-gray-600">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="user-management space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-darkBlue mb-2">User Management</h2>
            <p className="text-gray-600">Manage church members and their roles</p>
          </div>
          <Button className="flex items-center px-4 py-2 bg-primaryBlue text-white rounded-lg hover:bg-darkBlue">
            <AiOutlinePlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <AiOutlineSearch className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <AiOutlineFilter className="w-4 h-4 text-gray-500" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="moderator">Moderators</option>
              <option value="member">Members</option>
              <option value="guest">Guests</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid gap-4 md:gap-6">
        {filteredUsers.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <AiOutlineUser className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))
        )}
      </div>

      {/* Edit User Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit User"
      >
        {selectedUser && (
          <EditUserForm
            user={selectedUser}
            onSave={(updatedUser) => {
              setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
              setShowEditModal(false);
              setSelectedUser(null);
            }}
            onCancel={() => setShowEditModal(false)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete User"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete <strong>{selectedUser?.name}</strong>? 
            This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-3">
            <Button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDeleteUser}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete User
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// User Card Component
const UserCard = ({ user, onEdit, onDelete }) => {
  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      moderator: 'bg-blue-100 text-blue-800',
      member: 'bg-green-100 text-green-800',
      guest: 'bg-gray-100 text-gray-800'
    };
    return colors[role] || colors.guest;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primaryBlue rounded-full flex items-center justify-center text-white font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                {capitalizeFirst(user.role)}
              </span>
              <span className="text-xs text-gray-500">
                Joined {formatDate(user.created_at)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => onEdit(user)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <AiOutlineEdit className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => onDelete(user)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <AiOutlineDelete className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Edit User Form Component
const EditUserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    is_active: user.is_active
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await adminService.updateUser(user.id, formData);
      onSave(response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
        >
          <option value="guest">Guest</option>
          <option value="member">Member</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
          className="mr-2"
        />
        <label htmlFor="is_active" className="text-sm text-gray-700">Active User</label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primaryBlue text-white rounded-lg hover:bg-darkBlue disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};

export default UserManagement;
