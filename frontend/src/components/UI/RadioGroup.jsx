import { useState } from 'react';
import { cn } from '../../utils/helpers';

const RadioGroup = ({ 
  name,
  value,
  onChange,
  options = [],
  label,
  error,
  helperText,
  direction = 'vertical',
  size = 'default',
  className,
  containerClassName 
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    default: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const directionClasses = {
    vertical: 'flex-col space-y-2',
    horizontal: 'flex-row space-x-4'
  };

  return (
    <div className={cn('space-y-2', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className={cn('flex', directionClasses[direction])}>
        {options.map((option, index) => (
          <div key={option.value || index} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value || index}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              disabled={option.disabled}
              className={cn(
                'border-gray-300 text-primaryBlue focus:ring-primaryBlue',
                sizeClasses[size],
                error && 'border-red-500',
                className
              )}
            />
            <label 
              htmlFor={`${name}-${option.value || index}`}
              className={cn(
                'ml-2 text-sm text-gray-700 cursor-pointer',
                option.disabled && 'text-gray-400 cursor-not-allowed'
              )}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export { RadioGroup };
