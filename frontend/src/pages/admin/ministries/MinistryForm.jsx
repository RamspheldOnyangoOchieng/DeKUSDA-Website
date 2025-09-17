import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminService } from '../../../services/admin';

const MinistryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [ministry, setMinistry] = useState({
    name: '',
    description: '',
    leader: '',
    email: '',
    meetingTime: '',
    location: '',
    category: 'general'
  });

  useEffect(() => {
    if (id) {
      loadMinistry();
    }
  }, [id]);

  const loadMinistry = async () => {
    try {
      setLoading(true);
      const response = await adminService.getDashboard();
      const ministryData = response.ministries.find(m => m.id.toString() === id);
      if (ministryData) {
        setMinistry(ministryData);
      } else {
        toast.error('Ministry not found');
        navigate('/admin/ministries');
      }
    } catch (error) {
      console.error('Error loading ministry:', error);
      toast.error('Failed to load ministry details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMinistry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await adminService.updateUserRole(id, ministry);
        toast.success('Ministry updated successfully');
      } else {
        await adminService.updateUserRole(null, ministry);
        toast.success('Ministry created successfully');
      }
      navigate('/admin/ministries');
    } catch (error) {
      console.error('Error saving ministry:', error);
      toast.error(error.message || 'Failed to save ministry');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Edit Ministry' : 'Create New Ministry'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ministry Name
          </label>
          <input
            type="text"
            name="name"
            value={ministry.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={ministry.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Leader Name
          </label>
          <input
            type="text"
            name="leader"
            value={ministry.leader}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={ministry.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meeting Time
          </label>
          <input
            type="text"
            name="meetingTime"
            value={ministry.meetingTime}
            onChange={handleChange}
            placeholder="e.g., Every Sunday at 2 PM"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={ministry.location}
            onChange={handleChange}
            placeholder="e.g., Room 101"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={ministry.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="general">General</option>
            <option value="youth">Youth</option>
            <option value="worship">Worship</option>
            <option value="outreach">Outreach</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/ministries')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (id ? 'Update Ministry' : 'Create Ministry')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MinistryForm;
