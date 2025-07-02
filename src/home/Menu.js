import PropTypes from 'prop-types';

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

function Logo() {
  return (
    <div className='mb-4 md:mb-0 flex items-center gap-3'>
      <img src='./logo.png' alt='Raffiner Logo' className='h-12' />
      <span className='text-xl font-semibold text-gray-800'>
        Raffiner Mesa Posta
      </span>
    </div>
  );
}

function NavItem({ title, href }) {
  return (
    <a
      href={`#${href}`}
      className='text-gray-700 hover:text-blue-600 font-medium transition-colors'
    >
      {title}
    </a>
  );
}

function Nav() {
  return (
    <nav className='flex flex-wrap justify-center gap-6'>
      <NavItem title='Home' href='home' />
      <NavItem title='Quem Somos' href='quem-somos' />
      <NavItem title='Alugue' href='alugue' />
      <NavItem title='Soluções' href='solucoes' />
      <NavItem title='Cursos' href='cursos' />
      <NavItem title='Galeria' href='galeria' />
    </nav>
  );
}

function Menu() {
  return (
    <div className='bg-white shadow-sm'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex flex-col md:flex-row items-center justify-between'>
          <Logo />
          <Nav />
        </div>
      </div>
    </div>
  );
}

export default Menu;
