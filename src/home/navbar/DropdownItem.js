import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { dropdownItemPropTypes } from './propTypes/propTypes';

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
    <Link
      to={href}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className='
          block px-4 py-2 text-gray-800 hover:bg-fuchsia-50 hover:text-fuchsia-600 
          focus:bg-fuchsia-50 focus:text-fuchsia-600 focus:outline-none 
          transition-colors text-sm font-medium
        '
      role='menuitem'
    >
      {title}
    </Link>
  );
}

DropdownItem.propTypes = dropdownItemPropTypes;

export default DropdownItem;
