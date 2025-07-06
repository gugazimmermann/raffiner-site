import { navigationButtonPropTypes } from './propTypes/propTypes';

function NavigationButton({ direction, onClick, ariaLabel }) {
  const isPrevious = direction === 'previous';

  return (
    <button
      onClick={onClick}
      className='absolute top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-20'
      style={{
        left: isPrevious ? '0.5rem' : 'auto',
        right: !isPrevious ? '0.5rem' : 'auto',
      }}
      aria-label={ariaLabel}
    >
      <svg
        className='w-5 h-5'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d={isPrevious ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
        />
      </svg>
    </button>
  );
}

NavigationButton.propTypes = navigationButtonPropTypes;

export default NavigationButton;
