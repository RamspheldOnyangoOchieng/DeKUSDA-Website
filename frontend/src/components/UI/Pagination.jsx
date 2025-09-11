import { useState } from 'react';
import { cn } from '../../utils/helpers';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const Pagination = ({ 
  currentPage = 1,
  totalPages,
  onPageChange,
  showPrevNext = true,
  showPageNumbers = true,
  maxVisiblePages = 5,
  className,
  size = 'default'
}) => {
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    default: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className={cn('flex items-center justify-center space-x-1', className)}>
      {/* Previous Button */}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'flex items-center rounded-lg border border-gray-300 bg-white font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primaryBlue disabled:opacity-50 disabled:cursor-not-allowed',
            sizes[size]
          )}
        >
          <AiOutlineLeft className="h-4 w-4 mr-1" />
          Previous
        </button>
      )}

      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="flex items-center space-x-1">
          {/* First page if not visible */}
          {visiblePages[0] > 1 && (
            <>
              <PageButton
                page={1}
                currentPage={currentPage}
                onPageChange={onPageChange}
                size={size}
              />
              {visiblePages[0] > 2 && (
                <span className="px-2 py-2 text-gray-500">...</span>
              )}
            </>
          )}

          {/* Visible pages */}
          {visiblePages.map(page => (
            <PageButton
              key={page}
              page={page}
              currentPage={currentPage}
              onPageChange={onPageChange}
              size={size}
            />
          ))}

          {/* Last page if not visible */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="px-2 py-2 text-gray-500">...</span>
              )}
              <PageButton
                page={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
                size={size}
              />
            </>
          )}
        </div>
      )}

      {/* Next Button */}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'flex items-center rounded-lg border border-gray-300 bg-white font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primaryBlue disabled:opacity-50 disabled:cursor-not-allowed',
            sizes[size]
          )}
        >
          Next
          <AiOutlineRight className="h-4 w-4 ml-1" />
        </button>
      )}
    </nav>
  );
};

const PageButton = ({ page, currentPage, onPageChange, size }) => {
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    default: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const isActive = page === currentPage;

  return (
    <button
      onClick={() => onPageChange(page)}
      className={cn(
        'rounded-lg border font-medium focus:outline-none focus:ring-2 focus:ring-primaryBlue',
        sizes[size],
        isActive
          ? 'border-primaryBlue bg-primaryBlue text-white'
          : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
      )}
    >
      {page}
    </button>
  );
};

const SimplePagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className 
}) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primaryBlue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <AiOutlineLeft className="h-4 w-4 mr-2" />
        Previous
      </button>

      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primaryBlue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <AiOutlineRight className="h-4 w-4 ml-2" />
      </button>
    </div>
  );
};

export { Pagination, SimplePagination };
