import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import DropdownNavItem from './DropdownNavItem';
import DropdownItem from './DropdownItem';
import MobileMenu from './MobileMenu';

function Nav() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

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

  const isActive = useCallback(
    href => {
      if (href === '/') {
        return location.pathname === '/';
      }
      return (
        location.pathname === href || location.pathname.startsWith(`${href}/`)
      );
    },
    [location.pathname]
  );

  const isProdutosActive = useCallback(() => {
    return location.pathname.startsWith('/produtos/');
  }, [location.pathname]);

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
        active={isActive('/')}
        onClick={handleNavItemClick}
      />
      <NavItem
        title='Quem Somos'
        href='/quem-somos'
        active={isActive('/quem-somos')}
        onClick={handleNavItemClick}
      />
      <div ref={dropdownRef}>
        <DropdownNavItem
          title='Produtos'
          href='produtos'
          isOpen={openDropdown === 'produtos'}
          active={isProdutosActive()}
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
      <NavItem
        title='Galeria'
        href='/galeria'
        active={isActive('/galeria')}
        onClick={handleNavItemClick}
      />
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
