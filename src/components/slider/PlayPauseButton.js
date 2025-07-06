import { playPauseButtonPropTypes } from './propTypes/propTypes';

function PlayPauseButton({ isPaused, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className='absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-full transition-all duration-300 backdrop-blur-sm z-20'
      aria-label={isPaused ? 'Retomar slideshow' : 'Pausar slideshow'}
    >
      {isPaused ? (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M8 5v14l11-7z' />
        </svg>
      ) : (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
        </svg>
      )}
    </button>
  );
}

PlayPauseButton.propTypes = playPauseButtonPropTypes;

export default PlayPauseButton;
