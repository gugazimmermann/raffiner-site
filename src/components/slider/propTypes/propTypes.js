import PropTypes from 'prop-types';

export const bannerShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string,
  gradient: PropTypes.string,
  backgroundImage: PropTypes.string,
});

export const slidePropTypes = {
  banner: bannerShape.isRequired,
  index: PropTypes.number.isRequired,
  currentSlide: PropTypes.number.isRequired,
  getBackgroundStyle: PropTypes.func.isRequired,
};

export const slideIndicatorsPropTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentSlide: PropTypes.number.isRequired,
  goToSlide: PropTypes.func.isRequired,
};

export const navigationButtonPropTypes = {
  direction: PropTypes.oneOf(['previous', 'next']).isRequired,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

export const progressBarPropTypes = {
  currentSlide: PropTypes.number.isRequired,
  totalSlides: PropTypes.number.isRequired,
};

export const bannerContentPropTypes = {
  banner: bannerShape.isRequired,
};

export const playPauseButtonPropTypes = {
  isPaused: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
