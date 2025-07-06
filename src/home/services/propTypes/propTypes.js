import PropTypes from 'prop-types';

export const columnPropTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
      disabled: PropTypes.bool,
    })
  ).isRequired,
  onButtonClick: PropTypes.func,
};

export const actionButtonPropTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  disabled: PropTypes.bool,
};
