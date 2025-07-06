import PropTypes from 'prop-types';

const LoadingSpinner = ({
  size = 'md',
  color = 'blue',
  className = '',
  text = 'Carregando...',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorClasses = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    white: 'text-white',
    red: 'text-red-600',
    green: 'text-green-600',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${sizeClasses[size]} ${colorClasses[color]}`}
      ></div>
      {text && <p className='mt-2 text-sm text-gray-600'>{text}</p>}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['blue', 'gray', 'white', 'red', 'green']),
  className: PropTypes.string,
  text: PropTypes.string,
};

export default LoadingSpinner;
