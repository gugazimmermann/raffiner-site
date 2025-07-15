import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='bg-[#f7f7f7] shadow'>
      <div className='container px-6 py-4 mx-auto'>
        <div className='lg:flex lg:items-center'>
          <div className='flex items-center gap-3'>
            <img
              src='/logo_sm.png'
              alt='Raffiner Mesa Posta Logo'
              className='h-8 w-auto'
              loading='eager'
            />
            <span className='text-xl font-bold text-gray-800'>
              Raffiner Mesa Posta
            </span>
          </div>

          <div className='absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between opacity-0 -translate-x-full'>
            <div className='flex flex-col text-gray-600 capitalize lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center'>
              <Link
                to='/admin/config'
                className='mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 bg-transparent border-none p-0 text-left cursor-pointer'
              >
                configurações
              </Link>
              <Link
                to='/admin/banners'
                className='mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 bg-transparent border-none p-0 text-left'
              >
                banners
              </Link>
              <Link
                to='/admin/servicos'
                className='mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 bg-transparent border-none p-0 text-left'
              >
                serviços
              </Link>
              <Link
                to='/admin/bazar'
                className='mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 bg-transparent border-none p-0 text-left'
              >
                bazar
              </Link>
              <Link
                to='/admin/galeria'
                className='mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 bg-transparent border-none p-0 text-left'
              >
                galeria
              </Link>
            </div>

            <div className='flex justify-end items-center gap-2'>
              <span className='text-gray-600'>Bem-vindo, {user?.name}</span>
              <button
                onClick={handleLogoutClick}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors'
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
