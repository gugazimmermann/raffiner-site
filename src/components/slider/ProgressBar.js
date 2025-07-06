import { progressBarPropTypes } from './propTypes/propTypes';

function ProgressBar({ currentSlide, totalSlides }) {
  return (
    <div className='absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20'>
      <div
        className='h-full bg-white transition-all duration-100 ease-linear'
        style={{
          width: `${((currentSlide + 1) / totalSlides) * 100}%`,
        }}
      />
    </div>
  );
}

ProgressBar.propTypes = progressBarPropTypes;

export default ProgressBar;
