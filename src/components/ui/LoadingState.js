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
}) => {
  if (loading) {
    return (
      <LoadingSkeleton
        type={skeletonType}
        count={skeletonCount}
        className={className}
        {...skeletonProps}
      />
    );
  }

  if (error) {
    return (
      <div className='text-center py-8'>
        <ErrorMessage
          error={error}
          title={errorTitle}
          showRetry={showRetry}
          onRetry={onRetry}
          variant='card'
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
  skeletonType: PropTypes.oneOf(['card', 'text', 'grid']),
  skeletonCount: PropTypes.number,
  skeletonProps: PropTypes.object,
  errorTitle: PropTypes.string,
  showRetry: PropTypes.bool,
  onRetry: PropTypes.func,
  className: PropTypes.string,
  fallback: PropTypes.node,
};

export default LoadingState;
