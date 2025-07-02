import React, { useState, useEffect } from 'react';

const videos = [
  { title: 'Tell It Over Once Again', id: 'Y-vQpYOlSxc' },
  { title: 'Tazama Ishi Sasa', id: 'evYXMIWtMU4' },
  { title: 'Yesu Unipendaye', id: 'K4OO7j_GDPs' },
  { title: 'O for a Thousand Tongues', id: 'oso9qEXc39w' },
  { title: 'Rainbow of Perfect Love', id: 'KvfUW3-dZq8' },
];

const ChurchChoir = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
        setShowModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Open modal with slight delay to trigger transition
  const openModal = (video) => {
    setSelectedVideo(video);
    setTimeout(() => setShowModal(true), 10);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  return (
    <section className="px-6 py-12 bg-white lg:px-24">
      {/* Intro Section */}
      <div className="grid gap-10 items-center md:grid-cols-2">
        <div>
          <img
            src="/images/choir-group.jpg"
            alt="Church Choir"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
        <div>
          <h2 className="mb-4 text-4xl font-bold text-blue-800">Church Choir</h2>
          <p className="leading-relaxed text-gray-700">
            The DEKUSDA Church Choir is committed to glorifying God through sacred music.
            Our harmonies are rooted in faith and tradition, designed to uplift and inspire both
            in worship and in mission.
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-600">
            <li>Campus worship services</li>
            <li>Community missions and revivals</li>
            <li>Annual music festivals</li>
          </ul>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-12 text-center">
        <input
          type="text"
          placeholder="Search songs..."
          className="px-4 py-2 w-full max-w-md rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Video Gallery */}
      <div className="mt-8">
        <h3 className="mb-6 text-2xl font-semibold text-center text-blue-700">
          Choir Ministry Videos
        </h3>
        {filteredVideos.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video, index) => (
              <div
                key={index}
                className="cursor-pointer group"
                onClick={() => openModal(video)}
              >
                <div className="relative">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
                    alt={video.title}
                    className="w-full rounded-lg shadow-md transition-transform group-hover:scale-105"
                  />
                  <div className="flex absolute inset-0 justify-center items-center bg-black bg-opacity-50 rounded-lg opacity-0 transition group-hover:opacity-100">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 font-medium text-center text-blue-800">{video.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-center text-gray-500">No videos match your search.</p>
        )}
      </div>

      {/* Modal Lightbox with Animation */}
      {selectedVideo && (
        <div
          className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-70"
          onClick={closeModal}
        >
          <div
            className={`relative bg-white rounded-lg overflow-hidden max-w-4xl w-full transform transition-all duration-300 ${
              showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="w-full aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                title={selectedVideo.title}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ChurchChoir;