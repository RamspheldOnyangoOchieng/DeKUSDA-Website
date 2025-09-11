import { cn } from '../../utils/helpers';

const Avatar = ({ 
  src,
  alt,
  name,
  size = 'default',
  className,
  fallbackClassName,
  ...props 
}) => {
  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    default: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden',
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      
      <div
        className={cn(
          'flex items-center justify-center h-full w-full bg-primaryBlue text-white font-medium',
          !src ? 'flex' : 'hidden',
          fallbackClassName
        )}
      >
        {getInitials(name)}
      </div>
    </div>
  );
};

const AvatarGroup = ({ 
  children, 
  max = 5, 
  className,
  size = 'default' 
}) => {
  const avatarArray = Array.isArray(children) ? children : [children];
  const visibleAvatars = avatarArray.slice(0, max);
  const remainingCount = avatarArray.length - max;

  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    default: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl'
  };

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className="ring-2 ring-white rounded-full">
          {avatar}
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium ring-2 ring-white',
            sizes[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarGroup };
