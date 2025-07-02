import { useState } from 'react';
import PropTypes from 'prop-types';
import useServicesData from '../hooks/useServicesData';

function ActionButton({
  text,
  onClick,
  variant = 'primary',
  disabled = false,
}) {
  const baseClasses =
    'px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    outline:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]}`}
      aria-label={text}
    >
      {text}
    </button>
  );
}

function Coluna({ image, title, description, buttons, onButtonClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleButtonClick = buttonText => {
    if (onButtonClick) {
      onButtonClick(buttonText, title);
    }
  };

  return (
    <div className='group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1'>
      <div className='relative overflow-hidden'>
        {!imageLoaded && !imageError && (
          <div className='w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center'>
            <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}
        <img
          src={image}
          alt={`${title} - ${description || 'Serviço'}`}
          className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading='lazy'
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent'></div>

        <div className='absolute bottom-4 left-0 right-0 px-4'>
          <h3 className='text-2xl font-bold text-white drop-shadow-lg'>
            {title}
          </h3>
          {description && (
            <p className='text-white/90 text-sm mt-1 drop-shadow-md'>
              {description}
            </p>
          )}
        </div>
      </div>

      <div className='p-6'>
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          {buttons.map((button, index) => (
            <ActionButton
              key={`${title}-${button.text}-${index}`}
              text={button.text}
              variant={button.variant || 'primary'}
              onClick={() => handleButtonClick(button.text)}
              disabled={button.disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Colunas() {
  const { services, loading, error } = useServicesData();

  const handleButtonClick = (buttonText, cardTitle) => {
    // eslint-disable-next-line no-console
    console.log(`Botão "${buttonText}" clicado no card "${cardTitle}"`);
  };

  if (loading) {
    return (
      <section className='py-4 bg-gradient-to-br from-gray-50 to-white'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[1, 2, 3].map(index => (
              <div
                key={`skeleton-${index}`}
                className='bg-white rounded-xl shadow-lg overflow-hidden'
              >
                <div className='w-full h-48 bg-gray-200 animate-pulse'></div>
                <div className='p-6'>
                  <div className='h-4 bg-gray-200 rounded animate-pulse mb-2'></div>
                  <div className='h-3 bg-gray-200 rounded animate-pulse mb-4'></div>
                  <div className='flex gap-3'>
                    <div className='h-10 bg-gray-200 rounded animate-pulse flex-1'></div>
                    <div className='h-10 bg-gray-200 rounded animate-pulse flex-1'></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='py-4 bg-gradient-to-br from-gray-50 to-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center py-8'>
            <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto'>
              <svg
                className='w-12 h-12 text-red-500 mx-auto mb-4'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
              </svg>
              <h3 className='text-lg font-semibold text-red-800 mb-2'>
                Erro ao carregar
              </h3>
              <p className='text-red-600'>{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-4 bg-gradient-to-br from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <Coluna
              key={`service-${service.id || index}`}
              {...service}
              onButtonClick={handleButtonClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  disabled: PropTypes.bool,
};

Coluna.propTypes = {
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

export default Colunas;
