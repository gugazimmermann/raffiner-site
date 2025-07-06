import { slideIndicatorsPropTypes } from './propTypes/propTypes';

function SlideIndicators({ banners, currentSlide, goToSlide }) {
  return (
    <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20'>
      {banners.map((banner, index) => (
        <button
          key={banner.id}
          onClick={() => goToSlide(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
            index === currentSlide
              ? 'bg-white shadow-lg'
              : 'bg-white/50 hover:bg-white/70'
          }`}
          aria-label={`Ir para slide ${index + 1}`}
          aria-current={index === currentSlide ? 'true' : 'false'}
        />
      ))}
    </div>
  );
}

SlideIndicators.propTypes = slideIndicatorsPropTypes;

export default SlideIndicators;
