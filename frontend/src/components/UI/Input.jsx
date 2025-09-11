import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Input = forwardRef(({ 
  type = 'text',
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconClick,
  className,
  containerClassName,
  size = 'default',
  variant = 'default',
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    default: 'px-4 py-3',
    lg: 'px-4 py-4 text-lg'
  };

  const variantClasses = {
    default: 'border-gray-300 focus:border-primaryBlue focus:ring-primaryBlue',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500'
  };

  const inputClasses = cn(
    'w-full rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50',
    sizeClasses[size],
    error ? variantClasses.error : variantClasses[variant],
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
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
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {rightIcon}
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
