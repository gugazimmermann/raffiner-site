import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useBazarData from '../hooks/useBazarData';

InstagramIcon.propTypes = {
  className: PropTypes.string,
};

Bazar.propTypes = {
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  instagramUrl: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonText: PropTypes.string,
};

function InstagramIcon({ className = 'w-6 h-6' }) {
  return (
    <svg
      className={className}
      fill='currentColor'
      viewBox='0 0 24 24'
      aria-hidden='true'
    >
      <path
        fillRule='evenodd'
        d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
        clipRule='evenodd'
      />
    </svg>
  );
}

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

export default Bazar;
