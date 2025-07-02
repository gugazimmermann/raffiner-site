import { useState, useEffect } from 'react';

const useGalleryItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        const imageIds = {
          casamentos: [
            '1519225421980-715cb0215aed',
            '1506744038136-46273834b3fb',
            '1465101046530-73398c7f28ca',
            '1504674900247-0877df9cc836',
            '1519864600265-abb23847ef2c',
            '1464983953574-0892a716854b',
            '1465101178521-c1a9136a3fdc',
            '1511795409834-ef04bbd61622',
          ],
          formaturas: [
            '1519864600265-abb23847ef2c',
            '1506744038136-46273834b3fb',
            '1465101046530-73398c7f28ca',
            '1465101178521-c1a9136a3fdc',
            '1519225421980-715cb0215aed',
            '1464983953574-0892a716854b',
            '1504674900247-0877df9cc836',
            '1511795409834-ef04bbd61622',
          ],
          batizados: [
            '1465101046530-73398c7f28ca',
            '1519225421980-715cb0215aed',
            '1464983953574-0892a716854b',
            '1504674900247-0877df9cc836',
            '1511795409834-ef04bbd61622',
          ],
        };

        const galleryItems = Object.entries(imageIds).flatMap(
          ([category, ids]) =>
            Array.from(
              {
                length:
                  category === 'casamentos'
                    ? 17
                    : category === 'formaturas'
                      ? 15
                      : 12,
              },
              (_, i) => ({
                id: `${category}-${i + 1}`,
                category,
                image: `https://images.unsplash.com/photo-${ids[i % ids.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
                thumbnail: `https://images.unsplash.com/photo-${ids[i % ids.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60`,
              })
            )
        );

        setItems(galleryItems);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar itens da galeria');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  return { items, loading, error };
};

export default useGalleryItems;
