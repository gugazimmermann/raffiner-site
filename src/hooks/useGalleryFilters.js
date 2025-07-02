import { useState, useEffect } from 'react';

const useGalleryFilters = () => {
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 300));

        const mockDatabaseResponse = [
          { id: 'casamentos', label: 'Casamentos' },
          { id: 'formaturas', label: 'Formaturas' },
          { id: 'batizados', label: 'Batizados' },
        ];

        setFilters(mockDatabaseResponse);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar filtros da galeria');
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return { filters, loading, error };
};

export default useGalleryFilters;
