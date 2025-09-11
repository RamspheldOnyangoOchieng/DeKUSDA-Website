import { useState, createContext, useContext } from 'react';
import { cn } from '../../utils/helpers';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const AccordionContext = createContext();
const AccordionItemContext = createContext();

const Accordion = ({ 
  children, 
  type = 'single', // 'single' or 'multiple'
  collapsible = true,
  defaultValue,
  value,
  onValueChange,
  className 
}) => {
  const [openItems, setOpenItems] = useState(() => {
    if (type === 'single') {
      return defaultValue || value || '';
    } else {
      return defaultValue || value || [];
    }
  });

  const handleValueChange = (itemValue) => {
    let newValue;

    if (type === 'single') {
      newValue = openItems === itemValue ? (collapsible ? '' : itemValue) : itemValue;
    } else {
      const isOpen = openItems.includes(itemValue);
      if (isOpen) {
        newValue = openItems.filter(item => item !== itemValue);
      } else {
        newValue = [...openItems, itemValue];
      }
    }

    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setOpenItems(newValue);
    }
  };

  const currentValue = value !== undefined ? value : openItems;

  return (
    <div className={cn('space-y-2', className)}>
      <AccordionContext.Provider value={{
        currentValue,
        onValueChange: handleValueChange,
        type
      }}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
};

const AccordionItem = ({ 
  children, 
  value,
  className 
}) => {
  return (
    <div className={cn('border border-gray-200 rounded-lg', className)}>
      <AccordionItemContext.Provider value={{ value }}>
        {children}
      </AccordionItemContext.Provider>
    </div>
  );
};

const AccordionTrigger = ({ 
  children,
  className,
  iconPosition = 'right',
  hideIcon = false
}) => {
  const { currentValue, onValueChange, type } = useContext(AccordionContext);
  const { value } = useContext(AccordionItemContext);
  
  const isOpen = type === 'single' 
    ? currentValue === value 
    : currentValue.includes(value);

  return (
    <button
      onClick={() => onValueChange(value)}
      className={cn(
        'flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:ring-offset-2',
        isOpen && 'bg-gray-50',
        className
      )}
    >
      {iconPosition === 'left' && !hideIcon && (
        <div className="mr-3">
          {isOpen ? (
            <AiOutlineMinus className="h-4 w-4" />
          ) : (
            <AiOutlinePlus className="h-4 w-4" />
          )}
        </div>
      )}
      
      <div className="flex-1">{children}</div>
      
      {iconPosition === 'right' && !hideIcon && (
        <div className="ml-3">
          {isOpen ? (
            <AiOutlineMinus className="h-4 w-4" />
          ) : (
            <AiOutlinePlus className="h-4 w-4" />
          )}
        </div>
      )}
    </button>
  );
};

const AccordionContent = ({ 
  children,
  className 
}) => {
  const { currentValue, type } = useContext(AccordionContext);
  const { value } = useContext(AccordionItemContext);
  
  const isOpen = type === 'single' 
    ? currentValue === value 
    : currentValue.includes(value);

  if (!isOpen) return null;

  return (
    <div className={cn('px-4 pb-4 pt-0', className)}>
      {children}
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
