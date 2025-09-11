import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Checkbox = forwardRef(({ 
  label,
  description,
  error,
  className,
  containerClassName,
  size = 'default',
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    default: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const checkboxClasses = cn(
    'rounded border-gray-300 text-primaryBlue focus:ring-primaryBlue focus:ring-offset-0',
    sizeClasses[size],
    error && 'border-red-500',
    className
  );

  return (
    <div className={cn('space-y-1', containerClassName)}>
      <div className="flex items-start">
        <input
          ref={ref}
          type="checkbox"
          className={checkboxClasses}
          {...props}
        />
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
