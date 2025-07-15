import Logo from '../../utils/Logo';
import ContactInfo from './ContactInfo';
import QuickLinks from './QuickLinks';
import SocialLinks from './SocialLinks';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gradient-to-b from-[#f7f7f7] to-gray-200 text-gray-800 py-4 border-t border-gray-600'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4'>
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

        <div className='border-t border-gray-600 pt-2'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-sm text-gray-600 text-center md:text-left'>
              &copy; {currentYear} Raffiner Soluções e Serviços para Eventos
              Ltda (30.584.233/0001-40). Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
