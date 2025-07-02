function Logo() {
  return (
    <div className='flex items-center gap-3 mb-6'>
      <img
        src='./logo.png'
        alt='Raffiner Logo'
        className='h-12 w-auto transition-transform hover:scale-105'
        loading='lazy'
      />
      <span className='text-xl font-bold text-gray-800'>Raffiner</span>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className='text-gray-700 space-y-3'>
      <h3 className='font-semibold text-lg mb-4 text-gray-800'>Contato</h3>

      <div className='space-y-3'>
        <a
          href='https://maps.google.com/?q=Alexandre+Fleming,+289,+Centro,+Itajai+-+SC,+88303-030'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-start gap-3 group hover:text-amber-600 transition-colors duration-200'
        >
          <svg
            className='w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          <address className='not-italic group-hover:underline cursor-pointer'>
            Alexandre Fleming, 289
            <br />
            Centro / Itajai - SC
            <br />
            CEP: 88.303-030
          </address>
        </a>

        <a
          href='tel:+5547999240805'
          className='flex items-center gap-3 group hover:text-amber-600 transition-colors duration-200'
        >
          <svg
            className='w-5 h-5 text-amber-600 flex-shrink-0'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
            />
          </svg>
          <span className='group-hover:underline'>(47) 99924-0805</span>
        </a>

        <a
          href='mailto:contato@raffiner.com.br'
          className='flex items-center gap-3 group hover:text-amber-600 transition-colors duration-200'
        >
          <svg
            className='w-5 h-5 text-amber-600 flex-shrink-0'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            />
          </svg>
          <span className='group-hover:underline break-all'>
            contato@raffiner.com.br
          </span>
        </a>
      </div>
    </div>
  );
}

function SocialLinks() {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/raffiner.mesaposta',
      icon: (
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
        </svg>
      ),
      color: 'text-pink-600 hover:text-pink-700',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@raffiner.mesaposta',
      icon: (
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
        </svg>
      ),
      color: 'text-red-600 hover:text-red-700',
    },
  ];

  return (
    <div className='text-center md:text-left'>
      <h3 className='font-semibold text-lg mb-4 text-gray-800'>
        Redes Sociais
      </h3>
      <div className='flex justify-center md:justify-start gap-4'>
        {socialLinks.map(social => (
          <a
            key={social.name}
            href={social.url}
            target='_blank'
            rel='noopener noreferrer'
            className={`${social.color} transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-gray-100`}
            aria-label={`Siga-nos no ${social.name}`}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

function QuickLinks() {
  const links = [
    { name: 'Sobre Nós', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Orçamento', href: '#orcamento' },
  ];

  return (
    <div className='text-center md:text-left'>
      <h3 className='font-semibold text-lg mb-4 text-gray-800'>
        Links Rápidos
      </h3>
      <ul className='space-y-2'>
        {links.map(link => (
          <li key={link.name}>
            <a
              href={link.href}
              className='text-gray-700 hover:text-amber-600 transition-colors duration-200 hover:underline'
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gradient-to-b from-amber-50 to-amber-100 text-gray-800 py-8 border-t border-amber-200'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          <div className='lg:col-span-1'>
            <Logo />
            <p className='text-gray-600 text-sm leading-relaxed'>
              Soluções completas para eventos especiais. Transformamos momentos
              em experiências inesquecíveis.
            </p>
          </div>
          <div>
            <ContactInfo />
          </div>
          <div>
            <QuickLinks />
          </div>
          <div>
            <SocialLinks />
          </div>
        </div>

        <div className='border-t border-amber-200 pt-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-gray-600 text-center md:text-left'>
              &copy; {currentYear} Raffiner Soluções para Eventos. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
