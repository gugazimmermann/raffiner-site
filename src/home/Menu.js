import PropTypes from 'prop-types';
import { useState, useRef, useEffect, useCallback } from 'react';

function Logo() {
  return (
    <div className='flex items-center gap-3'>
      <img
        src='./logo.png'
        alt='Raffiner Mesa Posta Logo'
        className='h-12 w-auto'
        loading='eager'
      />
      <span className='text-xl font-bold text-gray-800 hidden sm:block'>
        Raffiner Mesa Posta
      </span>
      <span className='text-lg font-bold text-gray-800 sm:hidden'>
        Raffiner
      </span>
    </div>
  );
}

function NavItem({ title, href, active = false, onClick }) {
  const handleClick = useCallback(
    e => {
      if (onClick) {
        onClick(e);
      }
    },
    [onClick]
  );

  return (
    <a
      href={`#${href}`}
      onClick={handleClick}
      className={`
        relative px-3 py-2 text-gray-800 transition-all duration-200 
        hover:text-blue-600 focus:outline-none rounded-md
        ${active ? 'font-bold text-blue-600' : 'font-medium'}
      `}
      aria-current={active ? 'page' : undefined}
    >
      {title}
      {active && (
        <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full' />
      )}
    </a>
  );
}

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
          hover:text-blue-600 focus:outline-none rounded-md
          ${active ? 'font-bold text-blue-600' : 'font-medium'}
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

function DropdownItem({ title, href, onClick }) {
  const handleKeyDown = useCallback(e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.target.click();
    }
  }, []);

  const handleClick = useCallback(
    e => {
      if (onClick) {
        onClick(e);
      }
    },
    [onClick]
  );

  return (
    <a
      href={`#${href}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className='
        block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 
        focus:bg-blue-50 focus:text-blue-600 focus:outline-none 
        transition-colors text-sm font-medium
      '
      role='menuitem'
    >
      {title}
    </a>
  );
}

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

function Nav() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownToggle = useCallback(dropdownId => {
    setOpenDropdown(prev => (prev === dropdownId ? null : dropdownId));
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleNavItemClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const navItems = (
    <>
      <NavItem
        title='Home'
        href='home'
        active={true}
        onClick={handleNavItemClick}
      />
      <NavItem
        title='Quem Somos'
        href='quem-somos'
        onClick={handleNavItemClick}
      />
      <DropdownNavItem
        title='Produtos'
        href='produtos'
        isOpen={openDropdown === 'produtos'}
        onToggle={() => handleDropdownToggle('produtos')}
      >
        <DropdownItem
          title='Alugue'
          href='alugue'
          onClick={handleNavItemClick}
        />
        <DropdownItem
          title='Soluções'
          href='solucoes'
          onClick={handleNavItemClick}
        />
        <DropdownItem
          title='Cursos'
          href='cursos'
          onClick={handleNavItemClick}
        />
      </DropdownNavItem>
      <NavItem title='Galeria' href='galeria' onClick={handleNavItemClick} />
    </>
  );

  return (
    <>
      <nav
        className='hidden md:flex flex-wrap justify-center gap-6'
        role='navigation'
        aria-label='Menu principal'
      >
        {navItems}
      </nav>

      <button
        onClick={handleMobileMenuToggle}
        className='md:hidden p-2 text-gray-600 hover:text-gray-800 focus:outline-none rounded-md'
        aria-label='Abrir menu'
        aria-expanded={isMobileMenuOpen}
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
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose}>
        {navItems}
      </MobileMenu>
    </>
  );
}

function Menu() {
  return (
    <header className='bg-white shadow-sm sticky top-0 z-40'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          <Logo />
          <Nav />
        </div>
      </div>
    </header>
  );
}

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

DropdownNavItem.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

DropdownItem.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Menu;
