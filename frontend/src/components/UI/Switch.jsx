import { useState } from 'react';
import { cn } from '../../utils/helpers';

const Switch = ({ 
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'default',
  className,
  containerClassName 
}) => {
  const sizeClasses = {
    sm: {
      switch: 'h-5 w-9',
      thumb: 'h-3 w-3',
      translate: 'translate-x-4'
    },
    default: {
      switch: 'h-6 w-11',
      thumb: 'h-4 w-4',
      translate: 'translate-x-5'
    },
    lg: {
      switch: 'h-7 w-12',
      thumb: 'h-5 w-5',
      translate: 'translate-x-5'
    }
  };

  const sizes = sizeClasses[size];

  return (
    <div className={cn('flex items-center justify-between', containerClassName)}>
      <div className="flex-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={cn(
          'relative inline-flex flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:ring-offset-2',
          sizes.switch,
          checked ? 'bg-primaryBlue' : 'bg-gray-200',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out',
            sizes.thumb,
            checked ? sizes.translate : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
};

export { Switch };
