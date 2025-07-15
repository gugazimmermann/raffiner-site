import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { navItemPropTypes } from './propTypes/propTypes';

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
    <Link
      to={href}
      onClick={handleClick}
      className={`
          relative px-3 py-2 text-gray-800 transition-all duration-200 
          hover:text-fuchsia-600 focus:outline-none rounded-md
          ${active ? 'font-bold text-fuchsia-600' : 'font-medium'}
        `}
      aria-current={active ? 'page' : undefined}
    >
      {title}
      {active && (
        <span className='absolute bottom-0 left-0 w-full h-0.5 bg-fuchsia-600 rounded-full' />
      )}
    </Link>
  );
}

NavItem.propTypes = navItemPropTypes;

export default NavItem;
