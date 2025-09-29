import React, { useState, useEffect } from 'react';
import churchService from '../../services/churchService';
import Loading from '../../components/common/Loading';
import FileUpload from '../../components/common/FileUpload';

const ManageGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Events',
    date_taken: '',
    is_featured: false
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const categories = [
    { value: 'Services', label: 'Services' },
    { value: 'Events', label: 'Events' },
    { value: 'Outreach', label: 'Outreach' },
    { value: 'Youth', label: 'Youth' },
    { value: 'Other', label: 'Other' }
  ];

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setIsLoading(true);
      const response = await churchService.getGalleryItems();
      if (response.success) {
        setGalleryItems(response.data);
      }
    } catch (err) {
      setError('Failed to load gallery items');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploadingFile(true);
      let galleryResponse;
      
      if (editingItem) {
        galleryResponse = await churchService.updateGalleryItem(editingItem.id, formData);
        
        // Upload file if selected for update
        if (selectedFile && galleryResponse.success) {
          const fileFormData = new FormData();
          fileFormData.append('file', selectedFile);
          await churchService.uploadGalleryFile(galleryResponse.data.id, fileFormData);
        }
      } else {
        // For new items, include the file in the form data
        const submitFormData = new FormData();
        Object.keys(formData).forEach(key => {
          submitFormData.append(key, formData[key]);
        });
        
        if (selectedFile) {
          submitFormData.append('image', selectedFile);
        }
        
        galleryResponse = await churchService.createGalleryItem(submitFormData);
      }
      
      setShowModal(false);
      setEditingItem(null);
      setSelectedFile(null);
      setFormData({
        title: '',
        description: '',
        category: 'Events',
        date_taken: '',
        is_featured: false
      });
      fetchGalleryItems();
    } catch (err) {
      setError('Failed to save gallery item');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category || 'Events',
      date_taken: item.date_taken || '',
      is_featured: item.is_featured
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await churchService.deleteGalleryItem(id);
        fetchGalleryItems();
      } catch (err) {
        setError('Failed to delete gallery item');
      }
    }
  };

  const handleDownload = async (item) => {
    try {
      await churchService.downloadGalleryFile(item.id);
    } catch (err) {
      setError('Failed to download file');
    }
  };

  // Filter items by category
  const filteredItems = categoryFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === categoryFilter);

  const getFileIcon = (fileName) => {
    if (!fileName) return '🖼️';
    
    const extension = fileName.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
      return '🖼️';
    } else if (['mp4', 'avi', 'mov', 'wmv'].includes(extension)) {
      return '🎬';
    } else {
      return '📁';
    }
  };

  if (isLoading) {
    return <Loading fullScreen text="Loading gallery..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Gallery</h1>
            <p className="text-gray-600 mt-2">Upload and manage church photos and videos</p>
          </div>
          <button
            onClick={() => {
              setEditingItem(null);
              setSelectedFile(null);
              setFormData({
                title: '',
                description: '',
                category: 'Events',
                date_taken: '',
                is_featured: false
              });
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add New Item
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Category Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter by category:</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <span className="text-sm text-gray-500">
              {filteredItems.length} of {galleryItems.length} items
            </span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">🖼️</span>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No gallery items found</h3>
              <p className="text-gray-500">
                {categoryFilter !== 'all' 
                  ? 'No items in this category. Try selecting a different category.' 
                  : 'Upload your first photo or video to get started.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
                  {/* Item Preview */}
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl">{getFileIcon(item.file_path)}</span>
                  </div>
                  
                  {/* Item Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900 truncate">{item.title}</h4>
                          {item.is_featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="capitalize">{item.category}</span>
                          {item.date_taken && (
                            <span>{new Date(item.date_taken).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t">
                      {item.file_path && (
                        <button
                          onClick={() => handleDownload(item)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Download file"
                        >
                          📥
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit item"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter item title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter item description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Taken
                    </label>
                    <input
                      type="date"
                      name="date_taken"
                      value={formData.date_taken}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_featured"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
                    Featured Item
                  </label>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File
                  </label>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    accept="image/*,video/*"
                    maxSize={200 * 1024 * 1024}
                    label="Upload Photo or Video"
                    description="Upload images up to 10MB or videos up to 200MB"
                    disabled={uploadingFile}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    disabled={uploadingFile}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={uploadingFile}
                  >
                    {uploadingFile ? 'Uploading...' : editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageGallery;
