import PropTypes from 'prop-types';

const LoadingSkeleton = ({
  type = 'card',
  count = 1,
  className = '',
  height = 'h-48',
  showImage = true,
  showTitle = true,
  showDescription = true,
  showButtons = false,
  buttonHeight = 'h-16',
  buttonWidth = 'w-full',
}) => {
  const renderCardSkeleton = () => (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
    >
      {showImage && (
        <div className={`w-full ${height} bg-gray-200 animate-pulse`}></div>
      )}
      <div className='p-6'>
        {showTitle && (
          <div className='h-4 bg-gray-200 rounded animate-pulse mb-2'></div>
        )}
        {showDescription && (
          <div className='h-3 bg-gray-200 rounded animate-pulse mb-4'></div>
        )}
        {showButtons && (
          <div className='flex gap-3'>
            <div className='h-10 bg-gray-200 rounded animate-pulse flex-1'></div>
            <div className='h-10 bg-gray-200 rounded animate-pulse flex-1'></div>
          </div>
        )}
      </div>
    </div>
  );

  const renderTextSkeleton = () => (
    <div className={`animate-pulse ${className}`}>
      <div className='h-8 md:h-12 lg:h-16 bg-gray-400 rounded mb-3 max-w-2xl mx-auto'></div>
      <div className='h-4 md:h-6 bg-gray-400 rounded mb-6 max-w-xl mx-auto'></div>
      <div className='h-10 bg-gray-400 rounded w-32 mx-auto'></div>
    </div>
  );

  const renderButtonSkeleton = () => (
    <div className={`animate-pulse ${className}`}>
      <div
        className={`${buttonHeight} ${buttonWidth} bg-gray-300 rounded-lg flex items-center justify-center`}
      >
        <div className='flex items-center gap-3 px-4 py-2'>
          {/* Icon skeleton */}
          <div className='w-6 h-6 bg-gray-400 rounded-full'></div>
          {/* Text content skeleton */}
          <div className='flex flex-col gap-2'>
            <div className='h-4 bg-gray-400 rounded w-24'></div>
            <div className='h-3 bg-gray-400 rounded w-20'></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGridSkeleton = () => (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className='bg-white rounded-xl shadow-lg overflow-hidden'
        >
          {showImage && (
            <div className={`w-full ${height} bg-gray-200 animate-pulse`}></div>
          )}
          <div className='p-6'>
            {showTitle && (
              <div className='h-4 bg-gray-200 rounded animate-pulse mb-2'></div>
            )}
            {showDescription && (
              <div className='h-3 bg-gray-200 rounded animate-pulse mb-4'></div>
            )}
            {showButtons && (
              <div className='flex gap-3'>
                <div className='h-10 bg-gray-200 rounded animate-pulse flex-1'></div>
                <div className='h-10 bg-gray-200 rounded animate-pulse flex-1'></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  switch (type) {
    case 'text':
      return renderTextSkeleton();
    case 'grid':
      return renderGridSkeleton();
    case 'button':
      return renderButtonSkeleton();
    case 'card':
    default:
      return count === 1 ? renderCardSkeleton() : renderGridSkeleton();
  }
};

LoadingSkeleton.propTypes = {
  type: PropTypes.oneOf(['card', 'text', 'grid', 'button']),
  count: PropTypes.number,
  className: PropTypes.string,
  height: PropTypes.string,
  showImage: PropTypes.bool,
  showTitle: PropTypes.bool,
  showDescription: PropTypes.bool,
  showButtons: PropTypes.bool,
  buttonHeight: PropTypes.string,
  buttonWidth: PropTypes.string,
};

export default LoadingSkeleton;
