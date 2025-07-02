import { useState, useEffect } from 'react';

const useWhatsAppNumber = () => {
  const [number, setNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWhatsAppNumber = async () => {
      try {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        const mockDatabaseResponse = 999240805;

        setNumber(mockDatabaseResponse);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar número do WhatsApp');
      } finally {
        setLoading(false);
      }
    };

    fetchWhatsAppNumber();
  }, []);

  return { number, loading, error };
};

export default useWhatsAppNumber;
