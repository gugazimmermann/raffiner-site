import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import useBanners from '../hooks/useBanners';

function BannerContent({ banner }) {
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='container mx-auto px-4 text-center max-w-4xl'>
        <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight animate-fade-in'>
          {banner.title}
        </h1>
        <p className='text-lg md:text-xl mb-6 leading-relaxed opacity-90 animate-fade-in-delay'>
          {banner.subtitle}
        </p>
        <button
          className='bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl transform'
          onClick={() => {
            if (banner.buttonLink) {
              window.location.href = banner.buttonLink;
            }
          }}
          aria-label={`${banner.buttonText} - ${banner.title}`}
        >
          {banner.buttonText}
        </button>
      </div>
    </div>
  );
}

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

function PlayPauseButton({ isPaused, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className='absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-full transition-all duration-300 backdrop-blur-sm z-20'
      aria-label={isPaused ? 'Retomar slideshow' : 'Pausar slideshow'}
    >
      {isPaused ? (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M8 5v14l11-7z' />
        </svg>
      ) : (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
        </svg>
      )}
    </button>
  );
}

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

function useSlideshow(banners) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  const goToSlide = useCallback(index => {
    setCurrentSlide(index);
  }, []);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 5000);
  }, [nextSlide, isPaused]);

  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeAutoPlay = useCallback(() => {
    setIsPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoPlay]);

  return {
    currentSlide,
    isPaused,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    togglePause,
  };
}

function useKeyboardNavigation(nextSlide, prevSlide, togglePause) {
  const handleKeyDown = useCallback(
    event => {
      switch (event.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
        case ' ':
          event.preventDefault();
          togglePause();
          break;
        default:
          break;
      }
    },
    [prevSlide, nextSlide, togglePause]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

function getBackgroundStyle(banner) {
  if (banner.backgroundImage) {
    return {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  } else if (banner.gradient) {
    return {
      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
    };
  } else {
    return {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    };
  }
}

function Hero() {
  const { banners, loading, error } = useBanners();

  const {
    currentSlide,
    isPaused,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    togglePause,
  } = useSlideshow(banners || []);

  useKeyboardNavigation(nextSlide, prevSlide, togglePause);

  if (loading) {
    return (
      <section className='relative h-96 min-h-[300px] max-h-[500px] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300'>
        <div className='flex items-center justify-center h-full'>
          <div className='container mx-auto px-4 text-center max-w-4xl'>
            <div className='animate-pulse'>
              <div className='h-8 md:h-12 lg:h-16 bg-gray-400 rounded mb-3 max-w-2xl mx-auto'></div>
              <div className='h-4 md:h-6 bg-gray-400 rounded mb-6 max-w-xl mx-auto'></div>
              <div className='h-10 bg-gray-400 rounded w-32 mx-auto'></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='relative h-96 min-h-[300px] max-h-[500px] overflow-hidden bg-gradient-to-br from-red-100 to-red-200'>
        <div className='flex items-center justify-center h-full'>
          <div className='container mx-auto px-4 text-center max-w-4xl'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <svg
                className='w-8 h-8 text-red-600'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
              </svg>
              <h2 className='text-xl md:text-2xl font-bold text-red-800'>
                Erro ao carregar banners
              </h2>
            </div>
            <p className='text-red-600 mb-4'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!banners || banners.length === 0) {
    return (
      <section className='relative h-96 min-h-[300px] max-h-[500px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200'>
        <div className='flex items-center justify-center h-full'>
          <div className='container mx-auto px-4 text-center max-w-4xl'>
            <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-4'>
              Nenhum banner disponível
            </h2>
            <p className='text-gray-600'>
              Não há banners para exibir no momento.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className='relative h-96 min-h-[300px] max-h-[500px] overflow-hidden'
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      onFocus={pauseAutoPlay}
      onBlur={resumeAutoPlay}
      aria-label='Banner principal'
    >
      {banners.map((banner, index) => (
        <Slide
          key={banner.id}
          banner={banner}
          index={index}
          currentSlide={currentSlide}
          getBackgroundStyle={getBackgroundStyle}
        />
      ))}

      <NavigationButton
        direction='previous'
        onClick={prevSlide}
        ariaLabel='Slide anterior'
      />

      <NavigationButton
        direction='next'
        onClick={nextSlide}
        ariaLabel='Próximo slide'
      />

      <SlideIndicators
        banners={banners}
        currentSlide={currentSlide}
        goToSlide={goToSlide}
      />

      <PlayPauseButton isPaused={isPaused} onToggle={togglePause} />

      <ProgressBar currentSlide={currentSlide} totalSlides={banners.length} />
    </section>
  );
}

BannerContent.propTypes = {
  banner: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    buttonLink: PropTypes.string,
    gradient: PropTypes.string,
    backgroundImage: PropTypes.string,
  }).isRequired,
};

Slide.propTypes = {
  banner: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    buttonLink: PropTypes.string,
    gradient: PropTypes.string,
    backgroundImage: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  currentSlide: PropTypes.number.isRequired,
  getBackgroundStyle: PropTypes.func.isRequired,
};

NavigationButton.propTypes = {
  direction: PropTypes.oneOf(['previous', 'next']).isRequired,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

SlideIndicators.propTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentSlide: PropTypes.number.isRequired,
  goToSlide: PropTypes.func.isRequired,
};

PlayPauseButton.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

ProgressBar.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  totalSlides: PropTypes.number.isRequired,
};

export default Hero;
