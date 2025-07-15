import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Config from './Config';
import Banner from './Banner';

function Dashboard() {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/admin/config':
        return <Config />;
      case '/admin/banners':
        return <Banner />;
      case '/admin/dashboard':
      default:
        return (
          <div className='max-w-4xl p-6 mt-4 mx-auto bg-white rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Dashboard
            </h2>
            <p className='text-gray-600'>
              Bem-vindo ao painel administrativo. Selecione uma opção no menu
              acima.
            </p>
          </div>
        );
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        <Navbar />
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
