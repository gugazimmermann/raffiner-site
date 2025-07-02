import { useState, useEffect } from 'react';

const useBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 800));

        const mockDatabaseResponse = [
          {
            id: 1,
            title: 'Bem-vindo à Raffiner',
            subtitle: 'Locação de louças e utensílios para eventos especiais',
            buttonText: 'Ver Catálogo',
            buttonLink: '/catalogo',
            gradient: 'from-amber-600 to-amber-800',
            backgroundImage:
              'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          },
          {
            id: 2,
            title: 'Montagem Completa de Eventos',
            subtitle:
              'Mesa posta profissional para casamentos, jantares e celebrações',
            buttonText: 'Solicitar Orçamento',
            buttonLink: '/orcamento',
            gradient: 'from-rose-600 to-rose-800',
            backgroundImage: null,
          },
          {
            id: 3,
            title: 'Cursos de Etiqueta',
            subtitle: 'Aprenda a arte da mesa posta e protocolo social',
            buttonText: 'Inscrever-se',
            buttonLink: '/cursos',
            gradient: null,
            backgroundImage: null,
          },
        ];

        setBanners(mockDatabaseResponse);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar banners');
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return { banners, loading, error };
};

export default useBanners;
