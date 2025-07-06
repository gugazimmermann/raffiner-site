import { useEffect, useCallback } from 'react';

function useKeyboardNavigation(nextSlide, prevSlide, togglePause) {
  const handleKeyDown = useCallback(
    event => {
      switch (event.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
        case ' ':
          event.preventDefault();
          togglePause();
          break;
        default:
          break;
      }
    },
    [prevSlide, nextSlide, togglePause]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

export default useKeyboardNavigation;
