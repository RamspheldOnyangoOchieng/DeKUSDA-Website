import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/helpers';
import { AiOutlineDown } from 'react-icons/ai';

const Dropdown = ({ 
  trigger,
  children,
  position = 'bottom-left',
  className,
  menuClassName,
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const positionClasses = {
    'top-left': 'bottom-full left-0 mb-1',
    'top-right': 'bottom-full right-0 mb-1',
    'bottom-left': 'top-full left-0 mt-1',
    'bottom-right': 'top-full right-0 mt-1',
    'left': 'right-full top-0 mr-1',
    'right': 'left-full top-0 ml-1'
  };

  return (
    <div className={cn('relative inline-block', className)} ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(disabled && 'opacity-50 cursor-not-allowed')}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg py-1',
            positionClasses[position],
            menuClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ 
  children,
  onClick,
  disabled = false,
  className,
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
        disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const DropdownDivider = ({ className }) => {
  return <div className={cn('border-t border-gray-200 my-1', className)} />;
};

export { Dropdown, DropdownItem, DropdownDivider };
