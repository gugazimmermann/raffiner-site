import { useRef, useEffect } from 'react';
import { mobileMenuPropTypes } from './propTypes/propTypes';
import Logo from '../../utils/Logo';

function MobileMenu({ isOpen, onClose, children }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`
          fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
    >
      <div
        ref={menuRef}
        className={`
            absolute top-0 right-0 h-full w-80 max-w-[80vw] bg-white shadow-xl
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
      >
        <div className='p-6'>
          <div className='flex items-center justify-between mb-8'>
            <Logo />
            <button
              onClick={onClose}
              className='p-2 text-gray-500 hover:text-gray-700 focus:outline-none rounded-md'
              aria-label='Fechar menu'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <nav className='space-y-4'>{children}</nav>
        </div>
      </div>
    </div>
  );
}

MobileMenu.propTypes = mobileMenuPropTypes;

export default MobileMenu;
