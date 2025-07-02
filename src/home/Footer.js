function Logo() {
  return (
    <div className='flex items-center gap-3 mb-4'>
      <img src='./logo.png' alt='Raffiner Logo' className='h-12' />
      <span className='text-xl font-semibold text-gray-800'>Raffiner</span>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className='text-gray-700 space-y-2'>
      <p>
        Alexandre Fleming, 289 <br />
        Centro / Itajai - SC - 88.303-030
      </p>
      <p>Telefone: (47) 99924-0805</p>
      <p>Email: contato@raffiner.com.br</p>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className='flex justify-center gap-4'>
      <a
        href='https://www.instagram.com/raffiner.mesaposta'
        target='_blank'
        rel='noopener noreferrer'
        className='text-pink-600 hover:text-pink-700 transition-colors'
      >
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
        </svg>
      </a>
      <a
        href='https://www.youtube.com/@raffiner.mesaposta'
        target='_blank'
        rel='noopener noreferrer'
        className='text-red-600 hover:text-red-700 transition-colors'
      >
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
        </svg>
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className='bg-amber-50 text-gray-800 py-4'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-6'>
          <div className='text-center md:text-left'>
            <Logo />
          </div>
          <div className='text-center md:text-left'>
            <ContactInfo />
          </div>
          <div className='text-center md:text-left'>
            <SocialLinks />
          </div>
        </div>
        <div className='border-t border-amber-200 pt-2 text-center text-sm'>
          <p>
            &copy; 2025 Raffiner Soluções para Eventos. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
