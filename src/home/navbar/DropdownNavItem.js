import { useRef, useCallback } from 'react';
import { dropdownNavItemPropTypes } from './propTypes/propTypes';

function DropdownNavItem({
  title,
  href,
  active = false,
  children,
  onToggle,
  isOpen,
}) {
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const handleKeyDown = useCallback(
    e => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          onToggle?.();
          break;
        case 'Escape':
          onToggle?.(false);
          triggerRef.current?.focus();
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            onToggle?.();
          }
          {
            const firstItem = dropdownRef.current?.querySelector('a');
            firstItem?.focus();
          }
          break;
      }
    },
    [isOpen, onToggle]
  );

  const handleClick = useCallback(
    e => {
      e.preventDefault();
      onToggle?.();
    },
    [onToggle]
  );

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        ref={triggerRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`
            flex items-center gap-1 px-3 py-2 text-gray-800 transition-all duration-200 
            hover:text-fuchsia-600 focus:outline-none rounded-md
            ${active ? 'font-bold text-fuchsia-600' : 'font-medium'}
          `}
        aria-expanded={isOpen}
        aria-haspopup='true'
        aria-current={active ? 'page' : undefined}
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      <div
        className={`
            absolute top-full left-0 mt-1 bg-white border border-gray-200 
            rounded-lg shadow-lg py-2 min-w-[200px] z-50 
            transition-all duration-200 ease-in-out
            ${
              isOpen
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible -translate-y-2'
            }
          `}
        role='menu'
        aria-orientation='vertical'
      >
        {children}
      </div>
    </div>
  );
}

DropdownNavItem.propTypes = dropdownNavItemPropTypes;

export default DropdownNavItem;
