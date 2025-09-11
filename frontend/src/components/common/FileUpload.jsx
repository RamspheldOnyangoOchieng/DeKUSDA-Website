import React, { useState, useRef } from 'react';

const FileUpload = ({
  onFileSelect,
  accept = "*/*",
  maxSize = 10, // in MB
  multiple = false,
  label = "Upload File",
  description = "Choose a file to upload",
  disabled = false
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  // File type configurations
  const fileTypes = {
    image: {
      accept: "image/*",
      maxSize: 5,
      description: "Upload images (JPG, PNG, GIF) up to 5MB"
    },
    audio: {
      accept: "audio/*",
      maxSize: 50,
      description: "Upload audio files (MP3, WAV, M4A) up to 50MB"
    },
    video: {
      accept: "video/*",
      maxSize: 200,
      description: "Upload video files (MP4, AVI, MOV) up to 200MB"
    },
    document: {
      accept: ".pdf,.doc,.docx,.txt",
      maxSize: 10,
      description: "Upload documents (PDF, DOC, DOCX, TXT) up to 10MB"
    }
  };

  const validateFile = (file) => {
    const maxSizeBytes = maxSize * 1024 * 1024;
    const errors = [];

    if (file.size > maxSizeBytes) {
      errors.push(`File size must be less than ${maxSize}MB`);
    }

    return errors;
  };

  const handleFiles = (files) => {
    const fileList = Array.from(files);
    const validFiles = [];
    const fileErrors = [];

    fileList.forEach((file, index) => {
      const validation = validateFile(file);
      if (validation.length === 0) {
        validFiles.push(file);
      } else {
        fileErrors.push(`${file.name}: ${validation.join(', ')}`);
      }
    });

    setErrors(fileErrors);
    
    if (validFiles.length > 0) {
      setSelectedFiles(multiple ? [...selectedFiles, ...validFiles] : validFiles);
      onFileSelect && onFileSelect(multiple ? validFiles : validFiles[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (disabled) return;
    
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFileSelect && onFileSelect(multiple ? newFiles : null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
      return '🖼️';
    } else if (['mp3', 'wav', 'm4a', 'aac'].includes(extension)) {
      return '🎵';
    } else if (['mp4', 'avi', 'mov', 'wmv'].includes(extension)) {
      return '🎬';
    } else if (['pdf'].includes(extension)) {
      return '📄';
    } else if (['doc', 'docx'].includes(extension)) {
      return '📝';
    } else {
      return '📁';
    }
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="space-y-2">
          <div className="text-4xl">📁</div>
          <div>
            <p className="text-lg font-medium text-gray-700">{label}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <p className="text-xs text-gray-400">
            {dragActive ? 'Drop files here...' : 'Click to browse or drag and drop'}
          </p>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <h4 className="text-sm font-medium text-red-800 mb-1">Upload Errors:</h4>
          <ul className="text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">
            Selected Files ({selectedFiles.length})
          </h4>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md border"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getFileIcon(file.name)}</span>
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              
              {uploadProgress[file.name] && (
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress[file.name]}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {uploadProgress[file.name]}% uploaded
                  </p>
                </div>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="text-red-500 hover:text-red-700 p-1"
                disabled={disabled}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
