import { useState, useEffect } from 'react';

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      title: 'Bem-vindo à Raffiner',
      subtitle: 'Locação de louças e utensílios para eventos especiais',
      buttonText: 'Ver Catálogo',
      gradient: 'from-amber-600 to-amber-800',
      backgroundImage:
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      title: 'Montagem Completa de Eventos',
      subtitle:
        'Mesa posta profissional para casamentos, jantares e celebrações',
      buttonText: 'Solicitar Orçamento',
      gradient: 'from-rose-600 to-rose-800',
      backgroundImage: null,
    },
    {
      title: 'Cursos de Etiqueta',
      subtitle: 'Aprenda a arte da mesa posta e protocolo social',
      buttonText: 'Inscrever-se',
      gradient: null,
      backgroundImage: null,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const getBackgroundStyle = banner => {
    if (banner.backgroundImage) {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${banner.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    } else if (banner.gradient) {
      return {
        background: `linear-gradient(to right, var(--tw-gradient-stops))`,
      };
    } else {
      // Gradiente pre-definido padrão
      return {
        background: 'linear-gradient(to right, #667eea 0%, #764ba2 100%)',
      };
    }
  };

  return (
    <section className='relative h-96 overflow-hidden'>
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 text-white transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          } ${!banner.backgroundImage && banner.gradient ? `bg-gradient-to-r ${banner.gradient}` : ''}`}
          style={getBackgroundStyle(banner)}
        >
          <div className='flex items-center justify-center h-full'>
            <div className='container mx-auto px-4 text-center'>
              <h1 className='text-3xl md:text-5xl font-bold mb-4'>
                {banner.title}
              </h1>
              <p className='text-lg md:text-xl mb-6'>{banner.subtitle}</p>
              <button className='bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors'>
                {banner.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Indicadores de slide */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10'>
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
