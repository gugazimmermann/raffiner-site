import PropTypes from 'prop-types';

export const navItemPropTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export const dropdownNavItemPropTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export const dropdownItemPropTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export const mobileMenuPropTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
