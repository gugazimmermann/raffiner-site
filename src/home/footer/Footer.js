import Logo from '../../utils/Logo';
import ContactInfo from './ContactInfo';
import QuickLinks from './QuickLinks';
import SocialLinks from './SocialLinks';

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
