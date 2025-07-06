import { slidePropTypes } from './propTypes/propTypes';
import BannerContent from './BannerContent';

function Slide({ banner, index, currentSlide, getBackgroundStyle }) {
  return (
    <div
      className={`absolute inset-0 text-white transition-all duration-1000 ease-in-out ${
        index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
      } ${!banner.backgroundImage && banner.gradient ? `bg-gradient-to-br ${banner.gradient}` : ''}`}
      style={getBackgroundStyle(banner)}
      aria-hidden={index !== currentSlide}
    >
      <BannerContent banner={banner} />
    </div>
  );
}

Slide.propTypes = slidePropTypes;

export default Slide;
