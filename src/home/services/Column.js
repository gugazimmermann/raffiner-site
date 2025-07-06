import { useState } from 'react';
import ActionButton from './ActionButton';
import { columnPropTypes } from './propTypes/propTypes';

function Column({ image, title, description, buttons, onButtonClick }) {
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

Column.propTypes = columnPropTypes;

export default Column;
