import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Select = forwardRef(({ 
  label,
  error,
  helperText,
  placeholder = 'Select an option...',
  options = [],
  className,
  containerClassName,
  size = 'default',
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    default: 'px-4 py-3',
    lg: 'px-4 py-4 text-lg'
  };

  const selectClasses = cn(
    'w-full rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white',
    sizeClasses[size],
    error 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:border-primaryBlue focus:ring-primaryBlue',
    props.disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed',
    className
  );

  return (
    <div className={cn('space-y-1', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        ref={ref}
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option 
            key={option.value || index} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export { Select };
