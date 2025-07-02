import { useState, useEffect } from 'react';

const useServicesData = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        setLoading(true);

        // Simula delay de rede
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock do banco de dados - substitua por sua API real
        const mockDatabaseResponse = [
          {
            id: 1,
            image:
              'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
            title: 'Aluguel',
            description: 'Equipamentos profissionais para seu projeto',
            buttons: [{ text: 'Alugar Agora', variant: 'primary' }],
          },
          {
            id: 2,
            image:
              'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
            title: 'Soluções',
            description: 'Consultoria especializada e suporte técnico',
            buttons: [
              { text: 'Consultoria', variant: 'primary' },
              { text: 'Suporte', variant: 'secondary' },
            ],
          },
          {
            id: 3,
            image:
              'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
            title: 'Cursos',
            description: 'Formação profissional e capacitação',
            buttons: [
              { text: 'Ver Cursos', variant: 'primary' },
              { text: 'Inscrever-se', variant: 'outline' },
              { text: 'Mais Info', variant: 'secondary' },
            ],
          },
        ];

        setServices(mockDatabaseResponse);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados dos serviços');
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  return { services, loading, error };
};

export default useServicesData;
