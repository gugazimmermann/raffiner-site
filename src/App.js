import './App.css';
import Whatstapp from './home/Whatstapp';
import Menu from './home/Menu';
import Hero from './home/Hero';
import Colunas from './home/Colunas';
import Bazar from './home/Bazar';
import Footer from './home/Footer';

function App() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <header>
        <Whatstapp />

        <Menu />
      </header>

      <Hero />

      <Colunas />

      <Bazar />

      <Footer />
    </div>
  );
}

export default App;
