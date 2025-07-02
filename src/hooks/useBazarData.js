import { useState, useEffect } from 'react';

const useBazarData = () => {
  const [bazarData, setBazarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBazarData = async () => {
      try {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 800));

        const mockDatabaseResponse = {
          imageUrl:
            'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80',
          imageAlt: 'Bazar Raffiner Mesa Posta - Produtos exclusivos',
          instagramUrl: 'https://www.instagram.com/raffiner.mesaposta',
          title: 'Bazar',
          subtitle: 'Produtos exclusivos no nosso Instagram',
          buttonText: 'Visitar Bazar',
          isActive: true,
          lastUpdated: new Date().toISOString(),
        };

        setBazarData(mockDatabaseResponse);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados do Bazar');
      } finally {
        setLoading(false);
      }
    };

    fetchBazarData();
  }, []);

  return { bazarData, loading, error };
};

export default useBazarData;
