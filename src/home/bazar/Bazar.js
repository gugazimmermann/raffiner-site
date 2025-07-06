import { useState, useCallback } from 'react';
import useBazarData from '../../hooks/useBazarData';
import InstagramIcon from '../../utils/InstagramIcon';
import { bazarPropTypes } from './propTypes/propTypes';
function Bazar() {
  const { bazarData, loading, error } = useBazarData();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleInstagramClick = useCallback(() => {
    if (bazarData?.instagramUrl) {
      window.open(bazarData.instagramUrl, '_blank', 'noopener,noreferrer');
    }
  }, [bazarData?.instagramUrl]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  if (loading) {
    return (
      <section className='container mx-auto px-4 pb-8'>
        <div className='w-full h-64 md:h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
            <p className='text-gray-600 font-medium'>Carregando Bazar...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='container mx-auto px-4 pb-8'>
        <div className='w-full h-64 md:h-96 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center'>
          <div className='text-center'>
            <svg
              className='w-12 h-12 mx-auto text-red-400 mb-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
            <p className='text-red-600 font-medium'>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!bazarData || !bazarData.isActive) {
    return null;
  }

  const { imageUrl, imageAlt, title, subtitle, buttonText } = bazarData;

  return (
    <section
      className='container mx-auto px-4 pb-8'
      aria-labelledby='bazar-title'
    >
      <div className='relative group'>
        {!imageLoaded && !imageError && (
          <div className='w-full h-64 md:h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center'>
            <div className='w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}
        {imageError && (
          <div className='w-full h-64 md:h-96 bg-gradient-to-br from-pink-100 to-orange-100 rounded-lg flex items-center justify-center'>
            <div className='text-center'>
              <svg
                className='w-12 h-12 mx-auto text-gray-400 mb-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              <p className='text-gray-600 font-medium'>Imagem não disponível</p>
            </div>
          </div>
        )}
        <img
          src={imageUrl}
          alt={imageAlt}
          className={`
            w-full h-64 md:h-96 object-cover rounded-lg shadow-lg transition-all duration-500
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            ${isHovered ? 'scale-105' : 'scale-100'}
          `}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading='lazy'
        />
        <div
          className='absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50 rounded-lg flex items-center justify-center transition-all duration-300'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className='text-center px-4'>
            <h2
              id='bazar-title'
              className='text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg'
            >
              {title}
            </h2>
            {subtitle && (
              <p className='text-white/90 text-sm md:text-base mb-6 drop-shadow-md max-w-md mx-auto'>
                {subtitle}
              </p>
            )}
            <button
              onClick={handleInstagramClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`
                px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg 
                bg-gradient-to-r from-pink-500 to-orange-500 text-white 
                transition-all duration-300 shadow-lg hover:shadow-xl 
                flex items-center gap-3 mx-auto transform
                hover:scale-105 focus:outline-none focus:ring-2 
                focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black/20
                ${isHovered ? 'scale-105' : 'scale-100'}
              `}
              aria-label={`${buttonText} - Abrir Instagram da Raffiner Mesa Posta`}
            >
              <InstagramIcon className='w-5 h-5 md:w-6 md:h-6' />
              <span>{buttonText}</span>
            </button>
          </div>
        </div>
        <div className='absolute top-4 right-4 hidden md:block'>
          <div className='w-2 h-2 bg-pink-400 rounded-full animate-pulse'></div>
        </div>
        <div className='absolute bottom-4 left-4 hidden md:block'>
          <div className='w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-300'></div>
        </div>
      </div>
    </section>
  );
}

Bazar.propTypes = bazarPropTypes;

export default Bazar;
