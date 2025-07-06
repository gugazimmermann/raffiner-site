function Logo() {
  return (
    <div className='flex items-center gap-3'>
      <img
        src='./logo.png'
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
    </div>
  );
}

export default Logo;
