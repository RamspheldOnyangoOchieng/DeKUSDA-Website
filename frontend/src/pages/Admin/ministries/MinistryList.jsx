import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ministryService from '../../../services/ministryService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MinistryList = () => {
    const [ministries, setMinistries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMinistries();
    }, []);

    const fetchMinistries = async () => {
        try {
            setLoading(true);
            const response = await ministryService.getAllMinistries();
            setMinistries(response.data);
        } catch (err) {
            setError('Failed to fetch ministries');
            toast.error('Error loading ministries');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this ministry?')) {
            try {
                await ministryService.deleteMinistry(id);
                toast.success('Ministry deleted successfully');
                fetchMinistries();
            } catch (err) {
                toast.error('Failed to delete ministry');
            }
        }
    };

    if (loading) return <div>Loading ministries...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Ministries Management</h1>
                <Link
                    to="/Admin/ministries/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add New Ministry
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Category</th>
                            <th className="px-4 py-2 border">Leader</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ministries.map((ministry) => (
                            <tr key={ministry.id}>
                                <td className="px-4 py-2 border">{ministry.name}</td>
                                <td className="px-4 py-2 border">{ministry.category}</td>
                                <td className="px-4 py-2 border">{ministry.leader_name || 'N/A'}</td>
                                <td className="px-4 py-2 border">
                                    <span className={`px-2 py-1 rounded ${
                                        ministry.status === 'active' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {ministry.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border">
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/Admin/ministries/edit/${ministry.id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(ministry.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MinistryList;
