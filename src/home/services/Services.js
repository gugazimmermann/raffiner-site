import useServicesData from '../../hooks/useServicesData';
import Column from './Column';
import LoadingState from '../../components/ui/LoadingState';

function Services() {
  const { services, loading, error } = useServicesData();

  const handleButtonClick = (buttonText, cardTitle) => {
    // eslint-disable-next-line no-console
    console.log(`Botão "${buttonText}" clicado no card "${cardTitle}"`);
  };

  return (
    <section className='py-4 bg-gradient-to-br from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        <LoadingState
          loading={loading}
          error={error}
          skeletonType='grid'
          skeletonCount={3}
          skeletonProps={{
            showImage: true,
            showTitle: true,
            showDescription: true,
            showButtons: true,
          }}
          errorTitle='Erro ao carregar serviços'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {services.map((service, index) => (
              <Column
                key={`service-${service.id || index}`}
                {...service}
                onButtonClick={handleButtonClick}
              />
            ))}
          </div>
        </LoadingState>
      </div>
    </section>
  );
}

export default Services;
