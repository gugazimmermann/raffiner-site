import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to='/' className='flex items-center gap-3' aria-current='page'>
      <img
        src='/logo_sm.png'
        alt='Raffiner Mesa Posta Logo'
        className='h-12 w-auto'
        loading='eager'
      />
      <span className='text-xl font-bold text-gray-800 hidden sm:block'>
        Raffiner Mesa Posta
      </span>
      <span className='text-lg font-bold text-gray-800 sm:hidden'>
        Raffiner
      </span>
    </Link>
  );
}

export default Logo;
