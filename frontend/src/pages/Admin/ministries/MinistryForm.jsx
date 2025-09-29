import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ministryService from '../../../services/ministryService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MinistryForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        mission_statement: '',
        leader_name: '',
        leader_email: '',
        leader_phone: '',
        meeting_schedule: '',
        meeting_location: '',
        featured_image: null,
        category: '',
        status: 'active',
        member_count: 0,
        requirements: '',
        contact_info: '',
        social_links: {
            facebook: '',
            instagram: '',
            twitter: '',
            youtube: ''
        }
    });

    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (isEditing) {
            fetchMinistry();
        }
    }, [id]);

    const fetchMinistry = async () => {
        try {
            const response = await ministryService.getMinistry(id);
            const ministry = response.data;
            setFormData({
                ...ministry,
                featured_image: null // Don't set the file input
            });
            if (ministry.featured_image) {
                setImagePreview(`${process.env.REACT_APP_API_URL}/storage/${ministry.featured_image}`);
            }
        } catch (error) {
            toast.error('Failed to fetch ministry details');
            navigate('/Admin/ministries');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
            // Create preview URL
            if (files[0]) {
                setImagePreview(URL.createObjectURL(files[0]));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSocialLinksChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            social_links: {
                ...prev.social_links,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing) {
                await ministryService.updateMinistry(id, formData);
                toast.success('Ministry updated successfully');
            } else {
                await ministryService.createMinistry(formData);
                toast.success('Ministry created successfully');
            }
            navigate('/Admin/ministries');
        } catch (error) {
            toast.error(isEditing ? 'Failed to update ministry' : 'Failed to create ministry');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">
                {isEditing ? 'Edit Ministry' : 'Create New Ministry'}
            </h1>

            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="space-y-6">
                    {/* Basic Information */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block mb-1">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Category *</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    rows="4"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Leadership */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Leadership</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Leader Name</label>
                                <input
                                    type="text"
                                    name="leader_name"
                                    value={formData.leader_name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Leader Email</label>
                                <input
                                    type="email"
                                    name="leader_email"
                                    value={formData.leader_email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Leader Phone</label>
                                <input
                                    type="text"
                                    name="leader_phone"
                                    value={formData.leader_phone}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Meetings */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Meetings</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Meeting Schedule</label>
                                <input
                                    type="text"
                                    name="meeting_schedule"
                                    value={formData.meeting_schedule}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Meeting Location</label>
                                <input
                                    type="text"
                                    name="meeting_location"
                                    value={formData.meeting_location}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Media</h2>
                        <div>
                            <label className="block mb-1">Featured Image</label>
                            <input
                                type="file"
                                name="featured_image"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                accept="image/*"
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mt-2 max-w-xs"
                                />
                            )}
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block mb-1">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1">Member Count</label>
                                <input
                                    type="number"
                                    name="member_count"
                                    value={formData.member_count}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Requirements</label>
                                <textarea
                                    name="requirements"
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Contact Information</label>
                                <textarea
                                    name="contact_info"
                                    value={formData.contact_info}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Social Links</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Facebook</label>
                                <input
                                    type="url"
                                    name="facebook"
                                    value={formData.social_links.facebook}
                                    onChange={handleSocialLinksChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Instagram</label>
                                <input
                                    type="url"
                                    name="instagram"
                                    value={formData.social_links.instagram}
                                    onChange={handleSocialLinksChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Twitter</label>
                                <input
                                    type="url"
                                    name="twitter"
                                    value={formData.social_links.twitter}
                                    onChange={handleSocialLinksChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">YouTube</label>
                                <input
                                    type="url"
                                    name="youtube"
                                    value={formData.social_links.youtube}
                                    onChange={handleSocialLinksChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/Admin/ministries')}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (isEditing ? 'Update Ministry' : 'Create Ministry')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MinistryForm;
