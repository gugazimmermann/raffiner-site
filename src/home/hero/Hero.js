import useBanners from '../../hooks/useBanners';
import useSlideshow from '../../components/slider/hooks/useSlideshow';
import useKeyboardNavigation from '../../components/slider/hooks/useKeyboardNavigation';
import Slide from '../../components/slider/Slide';
import NavigationButton from '../../components/slider/NavigationButton';
import SlideIndicators from '../../components/slider/SlideIndicators';
import PlayPauseButton from '../../components/slider/PlayPauseButton';
import ProgressBar from '../../components/slider/ProgressBar';
import getBackgroundStyle from '../../components/slider/utils/getBackgroundStyle';
import { LoadingState } from '../../components/ui';

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

  const handleRetry = () => {
    window.location.reload();
  };

  const emptyStateFallback = (
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

  return (
    <LoadingState
      loading={loading}
      error={error}
      skeletonType='text'
      skeletonCount={1}
      skeletonProps={{
        className:
          'relative h-96 min-h-[300px] max-h-[500px] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center',
      }}
      errorTitle='Erro ao carregar banners'
      showRetry={true}
      onRetry={handleRetry}
      fallback={!banners || banners.length === 0 ? emptyStateFallback : null}
    >
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
    </LoadingState>
  );
}

export default Hero;
