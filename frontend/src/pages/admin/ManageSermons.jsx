import React, { useState, useEffect } from 'react';
import churchService from '../../services/churchService';
import Loading from '../../components/common/Loading';
import FileUpload from '../../components/common/FileUpload';

const ManageSermons = () => {
  const [sermons, setSermons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSermon, setEditingSermon] = useState(null);
  const [error, setError] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    speaker: '',
    sermon_date: '',
    series: '',
    is_featured: false
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      setIsLoading(true);
      const response = await churchService.getSermons();
      if (response.success) {
        setSermons(response.data);
      }
    } catch (err) {
      setError('Failed to load sermons');
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
      let sermonResponse;
      
      if (editingSermon) {
        sermonResponse = await churchService.updateSermon(editingSermon.id, formData);
      } else {
        sermonResponse = await churchService.createSermon(formData);
      }

      // Upload file if selected
      if (selectedFile && sermonResponse.success) {
        setUploadingFile(true);
        const fileFormData = new FormData();
        fileFormData.append('file', selectedFile);
        await churchService.uploadSermonFile(sermonResponse.data.id, fileFormData);
      }
      
      setShowModal(false);
      setEditingSermon(null);
      setSelectedFile(null);
      setFormData({
        title: '',
        description: '',
        speaker: '',
        sermon_date: '',
        series: '',
        is_featured: false
      });
      fetchSermons();
    } catch (err) {
      setError('Failed to save sermon');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleEdit = (sermon) => {
    setEditingSermon(sermon);
    setFormData({
      title: sermon.title,
      description: sermon.description,
      speaker: sermon.speaker,
      sermon_date: sermon.sermon_date,
      series: sermon.series || '',
      is_featured: sermon.is_featured
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sermon?')) {
      try {
        await churchService.deleteSermon(id);
        fetchSermons();
      } catch (err) {
        setError('Failed to delete sermon');
      }
    }
  };

  const handleDownload = async (sermon) => {
    try {
      await churchService.downloadSermonFile(sermon.id);
    } catch (err) {
      setError('Failed to download sermon file');
    }
  };

  if (isLoading) {
    return <Loading fullScreen text="Loading sermons..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Sermons</h1>
            <p className="text-gray-600 mt-2">Upload and manage church sermons</p>
          </div>
          <button
            onClick={() => {
              setEditingSermon(null);
              setSelectedFile(null);
              setFormData({
                title: '',
                description: '',
                speaker: '',
                sermon_date: '',
                series: '',
                is_featured: false
              });
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Upload New Sermon
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Sermons List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">All Sermons ({sermons.length})</h3>
          </div>
          
          {sermons.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">🎤</span>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sermons yet</h3>
              <p className="text-gray-500">Upload your first sermon to get started.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sermons.map((sermon) => (
                <div key={sermon.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-medium text-gray-900">{sermon.title}</h4>
                        {sermon.is_featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                        {sermon.file_path && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Audio Available
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">{sermon.description}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span>👤 {sermon.speaker}</span>
                        <span>📅 {new Date(sermon.sermon_date).toLocaleDateString()}</span>
                        {sermon.series && <span>📚 {sermon.series}</span>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {sermon.file_path && (
                        <button
                          onClick={() => handleDownload(sermon)}
                          className="text-green-600 hover:text-green-800 p-2"
                          title="Download audio"
                        >
                          📥
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(sermon)}
                        className="text-blue-600 hover:text-blue-800 p-2"
                        title="Edit sermon"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(sermon.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Delete sermon"
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
                  {editingSermon ? 'Edit Sermon' : 'Upload New Sermon'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sermon Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter sermon title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Speaker *
                    </label>
                    <input
                      type="text"
                      name="speaker"
                      value={formData.speaker}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter speaker name"
                    />
                  </div>
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
                    placeholder="Enter sermon description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sermon Date *
                    </label>
                    <input
                      type="date"
                      name="sermon_date"
                      value={formData.sermon_date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Series (Optional)
                    </label>
                    <input
                      type="text"
                      name="series"
                      value={formData.series}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter sermon series"
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
                    Featured Sermon
                  </label>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audio File
                  </label>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    accept="audio/*"
                    maxSize={50}
                    label="Upload Sermon Audio"
                    description="Upload MP3, WAV, or M4A files up to 50MB"
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
                    {uploadingFile ? 'Uploading...' : editingSermon ? 'Update Sermon' : 'Create Sermon'}
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

export default ManageSermons;
