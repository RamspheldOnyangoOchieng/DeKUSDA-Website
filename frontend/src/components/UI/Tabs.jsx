import { useState, createContext, useContext } from 'react';
import { cn } from '../../utils/helpers';

const TabsContext = createContext();

const Tabs = ({ 
  children,
  defaultValue,
  value,
  onValueChange,
  className,
  variant = 'default' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue || value);

  const handleTabChange = (tabValue) => {
    if (onValueChange) {
      onValueChange(tabValue);
    } else {
      setActiveTab(tabValue);
    }
  };

  const currentValue = value !== undefined ? value : activeTab;

  const variants = {
    default: 'border-b border-gray-200',
    pills: '',
    underline: ''
  };

  return (
    <div className={cn('w-full', className)}>
      <TabsContext.Provider value={{ 
        currentValue, 
        onValueChange: handleTabChange,
        variant 
      }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
};

const TabsList = ({ children, className }) => {
  const { variant } = useContext(TabsContext);

  const variantClasses = {
    default: 'border-b border-gray-200',
    pills: 'bg-gray-100 p-1 rounded-lg',
    underline: ''
  };

  return (
    <div
      className={cn(
        'flex',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

const TabsTrigger = ({ 
  children, 
  value, 
  disabled = false,
  className 
}) => {
  const { currentValue, onValueChange, variant } = useContext(TabsContext);
  const isActive = currentValue === value;

  const variantClasses = {
    default: {
      base: 'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
      active: 'border-primaryBlue text-primaryBlue',
      inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    },
    pills: {
      base: 'px-3 py-1.5 text-sm font-medium rounded transition-colors',
      active: 'bg-white text-primaryBlue shadow-sm',
      inactive: 'text-gray-500 hover:text-gray-700'
    },
    underline: {
      base: 'px-4 py-2 text-sm font-medium relative transition-colors',
      active: 'text-primaryBlue after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primaryBlue',
      inactive: 'text-gray-500 hover:text-gray-700'
    }
  };

  const classes = variantClasses[variant];

  return (
    <button
      onClick={() => !disabled && onValueChange(value)}
      disabled={disabled}
      className={cn(
        classes.base,
        isActive ? classes.active : classes.inactive,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ 
  children, 
  value,
  className 
}) => {
  const { currentValue } = useContext(TabsContext);

  if (currentValue !== value) {
    return null;
  }

  return (
    <div className={cn('mt-4', className)}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
