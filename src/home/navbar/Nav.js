import { useState, useCallback, useEffect, useRef } from 'react';
import NavItem from './NavItem';
import DropdownNavItem from './DropdownNavItem';
import DropdownItem from './DropdownItem';
import MobileMenu from './MobileMenu';

function Nav() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [openDropdown]);

  const navItems = (
    <>
      <NavItem
        title='Home'
        href='/'
        active={true}
        onClick={handleNavItemClick}
      />
      <NavItem
        title='Quem Somos'
        href='/quem-somos'
        onClick={handleNavItemClick}
      />
      <div ref={dropdownRef}>
        <DropdownNavItem
          title='Produtos'
          href='produtos'
          isOpen={openDropdown === 'produtos'}
          onToggle={() => handleDropdownToggle('produtos')}
        >
          <DropdownItem
            title='Alugue'
            href='/produtos/alugue'
            onClick={handleNavItemClick}
          />
          <DropdownItem
            title='Soluções'
            href='/produtos/solucoes'
            onClick={handleNavItemClick}
          />
          <DropdownItem
            title='Cursos'
            href='/produtos/cursos'
            onClick={handleNavItemClick}
          />
        </DropdownNavItem>
      </div>
      <NavItem title='Galeria' href='/galeria' onClick={handleNavItemClick} />
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

export default Nav;
