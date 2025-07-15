import { useState, useEffect } from 'react';
import { publicApiClient } from '../api/publicApiClient';

const useWhatsappData = () => {
  const [number, setNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWhatsappNumber = async () => {
      try {
        setLoading(true);

        const { config } = await publicApiClient.get('/config');

        if (config.whatsapp) {
          setNumber(config.whatsapp);
          setError(null);
        } else {
          setError('Número do WhatsApp não encontrado na configuração');
        }
      } catch (err) {
        setError('Erro ao carregar número do WhatsApp');
      } finally {
        setLoading(false);
      }
    };

    fetchWhatsappNumber();
  }, []);

  return { number, loading, error };
};

export default useWhatsappData;
