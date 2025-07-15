import { useState, useEffect } from 'react';
import { publicApiClient } from '../api/publicApiClient';

const useContactData = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);

        const { config } = await publicApiClient.get('/config');

        if (config) {
          setContactData(config);
          setError(null);
        } else {
          setError('Dados de contato não encontrados na configuração');
        }
      } catch (err) {
        setError('Erro ao carregar dados de contato');
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  return { contactData, loading, error };
};

export default useContactData;
