import { useState, useEffect } from 'react';
import { cn } from '../../utils/helpers';
import { AiOutlineClose, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai';

const Alert = ({ 
  type = 'info',
  title,
  message,
  children,
  onClose,
  dismissible = true,
  className,
  autoClose,
  autoCloseDelay = 5000 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 150); // Allow animation to complete
    }
  };

  const alertConfig = {
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      icon: AiOutlineCheckCircle,
      iconColor: 'text-green-400'
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      icon: AiOutlineCloseCircle,
      iconColor: 'text-red-400'
    },
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      icon: AiOutlineWarning,
      iconColor: 'text-yellow-400'
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      icon: AiOutlineInfoCircle,
      iconColor: 'text-blue-400'
    }
  };

  const config = alertConfig[type];
  const IconComponent = config.icon;

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'rounded-lg border p-4 transition-all duration-150',
        config.bgColor,
        config.borderColor,
        config.textColor,
        isVisible ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95',
        className
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <IconComponent className={cn('h-5 w-5', config.iconColor)} />
        </div>
        
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          
          {message && (
            <div className={cn('text-sm', title ? 'mt-2' : '')}>
              {message}
            </div>
          )}
          
          {children && (
            <div className={cn('text-sm', (title || message) ? 'mt-2' : '')}>
              {children}
            </div>
          )}
        </div>
        
        {dismissible && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={handleClose}
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  config.textColor,
                  'hover:bg-opacity-20 hover:bg-current'
                )}
              >
                <AiOutlineClose className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Alert };
