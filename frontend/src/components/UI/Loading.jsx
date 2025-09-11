import { cn } from '../../utils/helpers';

const Spinner = ({ 
  size = 'default',
  color = 'primary',
  className 
}) => {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colors = {
    primary: 'text-primaryBlue',
    secondary: 'text-gray-500',
    white: 'text-white',
    black: 'text-black'
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizes[size],
        colors[color],
        className
      )}
    />
  );
};

const LoadingSpinner = ({ 
  size = 'default',
  text = 'Loading...',
  color = 'primary',
  className,
  textClassName 
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center space-y-2', className)}>
      <Spinner size={size} color={color} />
      {text && (
        <p className={cn('text-sm text-gray-600', textClassName)}>
          {text}
        </p>
      )}
    </div>
  );
};

const SkeletonLoader = ({ 
  lines = 3,
  className,
  animate = true 
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className={cn(
            'h-4 bg-gray-200 rounded',
            animate && 'animate-pulse',
            index === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
};

const ProgressBar = ({ 
  value = 0,
  max = 100,
  size = 'default',
  color = 'primary',
  showLabel = false,
  label,
  className 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3'
  };

  const colors = {
    primary: 'bg-primaryBlue',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{label || 'Progress'}</span>
          {showLabel && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full transition-all duration-300 ease-out', colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export { Spinner, LoadingSpinner, SkeletonLoader, ProgressBar };
