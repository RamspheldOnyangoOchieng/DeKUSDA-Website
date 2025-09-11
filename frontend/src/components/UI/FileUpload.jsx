import { useState, useRef } from 'react';
import { cn } from '../../utils/helpers';
import { AiOutlineUpload, AiOutlineFile, AiOutlineClose } from 'react-icons/ai';

const FileUpload = ({ 
  onFileSelect,
  onFileRemove,
  accept = '*/*',
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
  className,
  disabled = false,
  preview = true,
  dragDrop = true
}) => {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const errors = [];

    if (maxSize && file.size > maxSize) {
      errors.push(`File "${file.name}" is too large. Maximum size is ${formatFileSize(maxSize)}.`);
    }

    if (accept !== '*/*') {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileType = file.type;
      const fileExtension = '.' + file.name.split('.').pop();
      
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension.toLowerCase() === type.toLowerCase();
        }
        return fileType.match(type.replace('*', '.*'));
      });

      if (!isAccepted) {
        errors.push(`File "${file.name}" type is not accepted.`);
      }
    }

    return errors;
  };

  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const newErrors = [];
    const validFiles = [];

    // Check max files limit
    if (maxFiles && files.length + fileArray.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed.`);
      setErrors(newErrors);
      return;
    }

    fileArray.forEach(file => {
      const fileErrors = validateFile(file);
      if (fileErrors.length === 0) {
        validFiles.push({
          file,
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
        });
      } else {
        newErrors.push(...fileErrors);
      }
    });

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(updatedFiles);
    setErrors(newErrors);

    if (onFileSelect) {
      onFileSelect(multiple ? updatedFiles : validFiles[0]);
    }
  };

  const handleFileRemove = (fileId) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);

    if (onFileRemove) {
      onFileRemove(fileId);
    }

    if (onFileSelect) {
      onFileSelect(multiple ? updatedFiles : null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled && dragDrop) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (!disabled && dragDrop) {
      const droppedFiles = e.dataTransfer.files;
      handleFileSelect(droppedFiles);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-6 transition-colors',
          isDragOver ? 'border-primaryBlue bg-blue-50' : 'border-gray-300',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={disabled}
          className="hidden"
        />

        <div className="text-center">
          <AiOutlineUpload className="mx-auto h-12 w-12 text-gray-400" />
          
          <div className="mt-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="font-medium text-primaryBlue hover:text-darkBlue focus:outline-none focus:underline"
            >
              Click to upload
            </button>
            {dragDrop && (
              <span className="text-gray-600"> or drag and drop</span>
            )}
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            {accept === '*/*' ? 'Any file type' : accept}
            {maxSize && ` • Max ${formatFileSize(maxSize)}`}
            {maxFiles && ` • Max ${maxFiles} files`}
          </p>
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* File Preview */}
      {preview && files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Selected Files:</h4>
          <div className="space-y-2">
            {files.map(file => (
              <FilePreview
                key={file.id}
                file={file}
                onRemove={() => handleFileRemove(file.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const FilePreview = ({ file, onRemove }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        {file.preview ? (
          <img
            src={file.preview}
            alt={file.name}
            className="h-10 w-10 object-cover rounded"
          />
        ) : (
          <AiOutlineFile className="h-10 w-10 text-gray-400" />
        )}
        
        <div>
          <p className="text-sm font-medium text-gray-900">{file.name}</p>
          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
        </div>
      </div>
      
      <button
        onClick={onRemove}
        className="p-1 text-gray-400 hover:text-red-500 focus:outline-none"
      >
        <AiOutlineClose className="h-4 w-4" />
      </button>
    </div>
  );
};

export { FileUpload };
