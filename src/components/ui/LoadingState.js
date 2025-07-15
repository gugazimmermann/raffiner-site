import PropTypes from 'prop-types';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorMessage from './ErrorMessage';

const LoadingState = ({
  loading,
  error,
  children,
  skeletonType = 'card',
  skeletonCount = 3,
  skeletonProps = {},
  errorTitle = 'Erro ao carregar',
  showRetry = true,
  onRetry,
  className = '',
  fallback = null,
  errorVariant = 'card',
  errorClassName = '',
  skeletonClassName = '',
  customError = null,
}) => {
  if (loading) {
    return (
      <LoadingSkeleton
        type={skeletonType}
        count={skeletonCount}
        className={`${className} ${skeletonClassName}`}
        {...skeletonProps}
      />
    );
  }

  if (error) {
    // If custom error component is provided, use it
    if (customError) {
      return customError;
    }

    // For WhatsApp-style components, render a more appropriate error state
    if (errorVariant === 'whatsapp') {
      return (
        <section className='bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 shadow-lg'>
          <div className='container mx-auto flex items-center justify-center'>
            <div className='flex items-center gap-3 px-4 py-2 rounded-lg bg-white/10'>
              <svg
                className='w-6 h-6 flex-shrink-0'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
              </svg>
              <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
                <span className='font-semibold text-sm sm:text-base'>
                  {errorTitle}
                </span>
                <span className='text-xs sm:text-sm opacity-90'>{error}</span>
              </div>
              {showRetry && onRetry && (
                <button
                  onClick={onRetry}
                  className='ml-4 px-3 py-1 rounded bg-white/20 hover:bg-white/30 transition-colors text-xs font-medium'
                >
                  Tentar
                </button>
              )}
            </div>
          </div>
        </section>
      );
    }

    // Default error handling
    return (
      <div className={`text-center py-8 ${errorClassName}`}>
        <ErrorMessage
          error={error}
          title={errorTitle}
          showRetry={showRetry}
          onRetry={onRetry}
          variant={errorVariant}
        />
      </div>
    );
  }

  if (fallback) {
    return fallback;
  }

  return children;
};

LoadingState.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  children: PropTypes.node,
  skeletonType: PropTypes.oneOf(['card', 'text', 'grid', 'button']),
  skeletonCount: PropTypes.number,
  skeletonProps: PropTypes.object,
  errorTitle: PropTypes.string,
  showRetry: PropTypes.bool,
  onRetry: PropTypes.func,
  className: PropTypes.string,
  fallback: PropTypes.node,
  errorVariant: PropTypes.oneOf(['default', 'inline', 'card', 'whatsapp']),
  errorClassName: PropTypes.string,
  skeletonClassName: PropTypes.string,
  customError: PropTypes.node,
};

export default LoadingState;
