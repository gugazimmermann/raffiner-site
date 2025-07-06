import PropTypes from 'prop-types';

const ErrorMessage = ({
  error,
  title = 'Erro ao carregar',
  showIcon = true,
  showRetry = false,
  onRetry,
  className = '',
  variant = 'default',
}) => {
  const variants = {
    default: {
      container: 'bg-red-50 border border-red-200 rounded-lg p-6',
      icon: 'text-red-500',
      title: 'text-red-800',
      message: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700 text-white',
    },
    inline: {
      container: 'text-red-600 text-sm',
      icon: 'text-red-500',
      title: 'text-red-800',
      message: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700 text-white',
    },
    card: {
      container:
        'bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto',
      icon: 'text-red-500',
      title: 'text-red-800',
      message: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700 text-white',
    },
  };

  const currentVariant = variants[variant];

  return (
    <div className={`${currentVariant.container} ${className}`}>
      {showIcon && (
        <div className='flex items-center justify-center gap-3 mb-4'>
          <svg
            className={`w-8 h-8 ${currentVariant.icon}`}
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
          </svg>
          <h3 className={`text-lg font-semibold ${currentVariant.title}`}>
            {title}
          </h3>
        </div>
      )}
      <p className={currentVariant.message}>{error}</p>
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className={`mt-4 px-4 py-2 rounded-lg transition-colors ${currentVariant.button}`}
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
  showIcon: PropTypes.bool,
  showRetry: PropTypes.bool,
  onRetry: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'inline', 'card']),
};

export default ErrorMessage;
