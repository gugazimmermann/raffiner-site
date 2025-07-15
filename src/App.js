import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Whatstapp from './home/topbar/Whatstapp';
import Navbar from './home/navbar/Navbar';
import Hero from './home/hero/Hero';
import Services from './home/services/Services';
import Bazar from './home/bazar/Bazar';
import Gallery from './home/Galeria';
import Footer from './home/footer/Footer';

import QuemSomos from './pages/QuemSomos';
import ProdutosAlugue from './pages/ProdutosAlugue';
import ProdutosSolucoes from './pages/ProdutosSolucoes';
import ProdutosCursos from './pages/ProdutosCursos';
import Servicos from './pages/Servicos';
import Portifolio from './pages/Portifolio';
import Orcamento from './pages/Orcamento';
import Contato from './pages/Contato';
import Galeria from './pages/Galeria';

import ProtectedRoute from './routes/ProtectedRoute';
import AdminRedirect from './admin/AdminRedirect';
import Dashboard from './admin/Dashboard';

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Bazar />
      <Gallery />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      {!isAdminPage && (
        <header className='sticky top-0 z-50'>
          <Whatstapp />
          <Navbar />
        </header>
      )}
      <main className='flex-1'>
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
          <Route path='/admin' element={<AdminRedirect />} />
          {/* Rota protegida para o dashboard administrativo */}
          <Route
            path='/admin/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/config'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/banners'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
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
