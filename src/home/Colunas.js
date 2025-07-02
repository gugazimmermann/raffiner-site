function Coluna({ image, title, description, buttons }) {
  return (
    <div className='text-center'>
      <div className='relative rounded-lg mb-4 overflow-hidden'>
        <img src={image} alt='Serviços' className='w-full h-48 object-cover' />
        <div className='absolute top-2 left-0 right-0 flex justify-center'>
          <h3
            className='text-2xl font-bold text-black px-4'
            style={{
              textShadow:
                '2px 2px 4px white, -2px -2px 4px white, 2px -2px 4px white, -2px 2px 4px white',
            }}
          >
            {title}
          </h3>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 justify-center'>
        {buttons.map((button, index) => (
          <button
            key={index}
            className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
}

function Colunas() {
  return (
    <section className='py-8 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <Coluna
            image='https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
            title='Aluguel'
            buttons={[{ text: 'Alugar Agora' }]}
          />
          <Coluna
            image='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
            title='Soluções'
            buttons={[{ text: 'Consultoria' }, { text: 'Suporte' }]}
          />
          <Coluna
            image='https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop'
            title='Cursos'
            buttons={[
              { text: 'Ver Cursos' },
              { text: 'Inscrever-se' },
              { text: 'Mais Info' },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export default Colunas;
