import Nav from './Nav';
import Logo from '../../utils/Logo';

function Navbar() {
  return (
    <section className='bg-[#f7f7f7] shadow-sm sticky top-0 z-40'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          <Logo />
          <Nav />
        </div>
      </div>
    </section>
  );
}

export default Navbar;
