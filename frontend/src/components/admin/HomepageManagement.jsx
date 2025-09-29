import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { homepageService } from '../../services/homepage';

const HomepageManagement = () => {
    const [homepageData, setHomepageData] = useState({
        slides: [],
        contents: {},
        featured_projects: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('slides');
    const [editingItem, setEditingItem] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState('');

    // Form states
    const [slideForm, setSlideForm] = useState({
        title: '',
        content: '',
        image_url: '',
        cta_text: '',
        cta_link: '',
        is_active: true
    });

    const [contentForm, setContentForm] = useState({
        section_key: '',
        title: '',
        content: '',
        subtitle: '',
        image_url: '',
        button_text: '',
        button_link: '',
        is_active: true
    });

    // Content sections available
    const contentSections = [
        { key: 'about_us', label: 'About Us Section' },
        { key: 'welcome_message', label: 'Welcome Message' },
        { key: 'prayer_verse', label: 'Prayer Verse' },
        { key: 'pastor_message', label: 'Pastor Message' },
        { key: 'elder_message', label: 'Elder Message' },
        { key: 'mission_statement', label: 'Mission Statement' },
        { key: 'upcoming_events', label: 'Upcoming Events' },
        { key: 'announcements', label: 'Announcements' }
    ];

    useEffect(() => {
        loadHomepageData();
    }, []);

    const loadHomepageData = async () => {
        try {
            setIsLoading(true);
            const data = await homepageService.getHomepageData();
            // Ensure the data structure is safe
            setHomepageData({
                slides: data?.slides || [],
                contents: data?.contents || {},
                featured_projects: data?.featured_projects || []
            });
            setMessage('Homepage data loaded successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error loading homepage data:', error);
            // Keep the default safe structure on error
            setHomepageData({
                slides: [],
                contents: {},
                featured_projects: []
            });
            setMessage('Failed to load homepage data');
            setTimeout(() => setMessage(''), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSlideSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingItem) {
                response = await homepageService.admin.updateSlide(editingItem.id, slideForm);
                setMessage('Slide updated successfully');
            } else {
                response = await homepageService.admin.createSlide(slideForm);
                setMessage('Slide created successfully');
            }
            
            resetSlideForm();
            loadHomepageData();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving slide:', error);
            setMessage('Failed to save slide');
            setTimeout(() => setMessage(''), 5000);
        }
    };

    const handleContentSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingItem) {
                response = await homepageService.admin.updateContent(editingItem.id, contentForm);
                setMessage('Content updated successfully');
            } else {
                response = await homepageService.admin.createContent(contentForm);
                setMessage('Content created successfully');
            }
            
            resetContentForm();
            loadHomepageData();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving content:', error);
            setMessage('Failed to save content');
            setTimeout(() => setMessage(''), 5000);
        }
    };

    const handleDeleteSlide = async (id) => {
        if (window.confirm('Are you sure you want to delete this slide?')) {
            try {
                await homepageService.admin.deleteSlide(id);
                setMessage('Slide deleted successfully');
                loadHomepageData();
                setTimeout(() => setMessage(''), 3000);
            } catch (error) {
                console.error('Error deleting slide:', error);
                setMessage('Failed to delete slide');
                setTimeout(() => setMessage(''), 5000);
            }
        }
    };

    const handleDeleteContent = async (id) => {
        if (window.confirm('Are you sure you want to delete this content?')) {
            try {
                await homepageService.admin.deleteContent(id);
                setMessage('Content deleted successfully');
                loadHomepageData();
                setTimeout(() => setMessage(''), 3000);
            } catch (error) {
                console.error('Error deleting content:', error);
                setMessage('Failed to delete content');
                setTimeout(() => setMessage(''), 5000);
            }
        }
    };

    const startEditingSlide = (slide) => {
        setSlideForm({
            title: slide.title || '',
            content: slide.content || '',
            image_url: slide.image_url || '',
            cta_text: slide.cta_text || '',
            cta_link: slide.cta_link || '',
            is_active: slide.is_active
        });
        setEditingItem(slide);
        setActiveSection('slides');
        setShowForm(true);
    };

    const startEditingContent = (content) => {
        setContentForm({
            section_key: content.section_key || '',
            title: content.title || '',
            content: content.content || '',
            subtitle: content.subtitle || '',
            image_url: content.image_url || '',
            button_text: content.button_text || '',
            button_link: content.button_link || '',
            is_active: content.is_active
        });
        setEditingItem(content);
        setActiveSection('content');
        setShowForm(true);
    };

    const resetSlideForm = () => {
        setSlideForm({
            title: '',
            content: '',
            image_url: '',
            cta_text: '',
            cta_link: '',
            is_active: true
        });
        setEditingItem(null);
        setShowForm(false);
    };

    const resetContentForm = () => {
        setContentForm({
            section_key: '',
            title: '',
            content: '',
            subtitle: '',
            image_url: '',
            button_text: '',
            button_link: '',
            is_active: true
        });
        setEditingItem(null);
        setShowForm(false);
    };

    const renderSlideForm = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
                {editingItem ? 'Edit Slide' : 'Add New Slide'}
            </h3>
            <form onSubmit={handleSlideSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={slideForm.title}
                            onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                        </label>
                        <input
                            type="url"
                            value={slideForm.image_url}
                            onChange={(e) => setSlideForm({ ...slideForm, image_url: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content *
                    </label>
                    <textarea
                        value={slideForm.content}
                        onChange={(e) => setSlideForm({ ...slideForm, content: e.target.value })}
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Call-to-Action Text
                        </label>
                        <input
                            type="text"
                            value={slideForm.cta_text}
                            onChange={(e) => setSlideForm({ ...slideForm, cta_text: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Call-to-Action Link
                        </label>
                        <input
                            type="text"
                            value={slideForm.cta_link}
                            onChange={(e) => setSlideForm({ ...slideForm, cta_link: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="slide-active"
                        checked={slideForm.is_active}
                        onChange={(e) => setSlideForm({ ...slideForm, is_active: e.target.checked })}
                        className="mr-2"
                    />
                    <label htmlFor="slide-active" className="text-sm font-medium text-gray-700">
                        Active
                    </label>
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {editingItem ? 'Update Slide' : 'Add Slide'}
                    </button>
                    <button
                        type="button"
                        onClick={resetSlideForm}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );

    const renderContentForm = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
                {editingItem ? 'Edit Content Section' : 'Add New Content Section'}
            </h3>
            <form onSubmit={handleContentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section *
                        </label>
                        <select
                            value={contentForm.section_key}
                            onChange={(e) => setContentForm({ ...contentForm, section_key: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select Section</option>
                            {contentSections.map(section => (
                                <option key={section.key} value={section.key}>
                                    {section.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={contentForm.title}
                            onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content *
                    </label>
                    <textarea
                        value={contentForm.content}
                        onChange={(e) => setContentForm({ ...contentForm, content: e.target.value })}
                        rows="6"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subtitle
                        </label>
                        <input
                            type="text"
                            value={contentForm.subtitle}
                            onChange={(e) => setContentForm({ ...contentForm, subtitle: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                        </label>
                        <input
                            type="url"
                            value={contentForm.image_url}
                            onChange={(e) => setContentForm({ ...contentForm, image_url: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Button Text
                        </label>
                        <input
                            type="text"
                            value={contentForm.button_text}
                            onChange={(e) => setContentForm({ ...contentForm, button_text: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Button Link
                        </label>
                        <input
                            type="text"
                            value={contentForm.button_link}
                            onChange={(e) => setContentForm({ ...contentForm, button_link: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="content-active"
                        checked={contentForm.is_active}
                        onChange={(e) => setContentForm({ ...contentForm, is_active: e.target.checked })}
                        className="mr-2"
                    />
                    <label htmlFor="content-active" className="text-sm font-medium text-gray-700">
                        Active
                    </label>
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {editingItem ? 'Update Content' : 'Add Content'}
                    </button>
                    <button
                        type="button"
                        onClick={resetContentForm}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Homepage Content Management</h2>
                
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-lg mb-4 ${
                            message.includes('Failed') || message.includes('Error')
                                ? 'bg-red-100 text-red-700 border border-red-300'
                                : 'bg-green-100 text-green-700 border border-green-300'
                        }`}
                    >
                        {message}
                    </motion.div>
                )}

                {/* Section Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => {
                            setActiveSection('slides');
                            setShowForm(false);
                        }}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            activeSection === 'slides'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Carousel Slides ({homepageData?.slides?.length || 0})
                    </button>
                    <button
                        onClick={() => {
                            setActiveSection('content');
                            setShowForm(false);
                        }}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            activeSection === 'content'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Content Sections ({Object.keys(homepageData?.contents || {}).length})
                    </button>
                </div>

                {/* Add New Button */}
                <button
                    onClick={() => setShowForm(true)}
                    className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    {activeSection === 'slides' ? '+ Add New Slide' : '+ Add New Content Section'}
                </button>
            </div>

            {/* Forms */}
            <AnimatePresence>
                {showForm && activeSection === 'slides' && renderSlideForm()}
                {showForm && activeSection === 'content' && renderContentForm()}
            </AnimatePresence>

            {/* Slides Section */}
            {activeSection === 'slides' && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-blue-800">Carousel Slides</h3>
                    {(!homepageData?.slides || homepageData.slides.length === 0) ? (
                        <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
                            No slides found. Add your first slide to get started.
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {homepageData.slides.map((slide) => (
                                <motion.div
                                    key={slide.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-6 rounded-lg shadow-md"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-blue-800">
                                                {slide.title}
                                            </h4>
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                                slide.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {slide.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => startEditingSlide(slide)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSlide(slide.id)}
                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600 mb-2">{slide.content}</p>
                                            {slide.cta_text && (
                                                <p className="text-sm text-blue-600">
                                                    Button: {slide.cta_text} → {slide.cta_link}
                                                </p>
                                            )}
                                        </div>
                                        {slide.image_url && (
                                            <div>
                                                <img
                                                    src={slide.image_url}
                                                    alt={slide.title}
                                                    className="w-full h-32 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Content Sections */}
            {activeSection === 'content' && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-blue-800">Content Sections</h3>
                    {(!homepageData?.contents || Object.keys(homepageData.contents).length === 0) ? (
                        <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
                            No content sections found. Add your first content section to get started.
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {Object.entries(homepageData.contents || {}).map(([sectionKey, content]) => (
                                <motion.div
                                    key={content.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-6 rounded-lg shadow-md"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-blue-800">
                                                {sectionKey.replace(/_/g, ' ').toUpperCase()}
                                            </h4>
                                            {content.title && (
                                                <p className="text-gray-700 font-medium">{content.title}</p>
                                            )}
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                                content.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {content.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => startEditingContent(content)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteContent(content.id)}
                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600 mb-2">
                                                {content.content.length > 200 
                                                    ? content.content.substring(0, 200) + '...'
                                                    : content.content
                                                }
                                            </p>
                                            {content.button_text && (
                                                <p className="text-sm text-blue-600">
                                                    Button: {content.button_text} → {content.button_link}
                                                </p>
                                            )}
                                        </div>
                                        {content.image_url && (
                                            <div>
                                                <img
                                                    src={content.image_url}
                                                    alt={content.title}
                                                    className="w-full h-32 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomepageManagement;