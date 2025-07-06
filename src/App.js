import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Whatstapp from './home/topbar/Whatstapp';
import Navbar from './home/navbar/Navbar';
import Footer from './home/footer/Footer';

import QuemSomos from './pages/QuemSomos';
import ProdutosAlugue from './pages/ProdutosAlugue';
import ProdutosSolucoes from './pages/ProdutosSolucoes';
import ProdutosCursos from './pages/ProdutosCursos';
import Galeria from './pages/Galeria';
import Servicos from './pages/Servicos';
import Portifolio from './pages/Portifolio';
import Orcamento from './pages/Orcamento';
import Contato from './pages/Contato';
import Admin from './pages/Admin';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

import Hero from './home/hero/Hero';
import Services from './home/services/Services';
import Bazar from './home/bazar/Bazar';

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Bazar />
    </>
  );
}

function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white shadow rounded-lg p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Painel Administrativo
            </h1>
            <div className='flex items-center space-x-4'>
              <span className='text-gray-600'>Bem-vindo, {user?.name}</span>
              <button
                onClick={logout}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors'
              >
                Sair
              </button>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='bg-blue-50 p-6 rounded-lg'>
              <h3 className='text-lg font-semibold text-blue-900 mb-2'>
                Usuários
              </h3>
              <p className='text-blue-700'>Gerenciar usuários do sistema</p>
            </div>

            <div className='bg-green-50 p-6 rounded-lg'>
              <h3 className='text-lg font-semibold text-green-900 mb-2'>
                Produtos
              </h3>
              <p className='text-green-700'>Gerenciar produtos e serviços</p>
            </div>

            <div className='bg-purple-50 p-6 rounded-lg'>
              <h3 className='text-lg font-semibold text-purple-900 mb-2'>
                Relatórios
              </h3>
              <p className='text-purple-700'>
                Visualizar relatórios e estatísticas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className='min-h-screen bg-gray-50'>
      {!isAdminPage && (
        <header>
          <Whatstapp />
          <Navbar />
        </header>
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quem-somos' element={<QuemSomos />} />
        <Route path='/produtos/alugue' element={<ProdutosAlugue />} />
        <Route path='/produtos/solucoes' element={<ProdutosSolucoes />} />
        <Route path='/produtos/cursos' element={<ProdutosCursos />} />
        <Route path='/galeria' element={<Galeria />} />
        <Route path='/servicos' element={<Servicos />} />
        <Route path='/portifolio' element={<Portifolio />} />
        <Route path='/orcamento' element={<Orcamento />} />
        <Route path='/contato' element={<Contato />} />
        <Route path='/admin' element={<Admin />} />
        {/* Rota protegida para o dashboard administrativo */}
        <Route
          path='/admin/dashboard'
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
