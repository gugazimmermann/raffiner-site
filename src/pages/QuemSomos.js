import PropTypes from 'prop-types';

function CheckIcon() {
  return (
    <svg
      className='w-5 h-5 mx-3'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M5 13l4 4L19 7'
      />
    </svg>
  );
}

function ContentLeft({ image, title, content }) {
  return (
    <div className='max-w-6xl px-6 mx-auto'>
      <main className='relative z-20 w-full md:flex md:items-center'>
        <div className='absolute w-full bg-fuchsia-600 -z-10 md:h-96 rounded-2xl'></div>

        <div className='w-full p-6 bg-fuchsia-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly'>
          <img
            className='h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl'
            src={image}
            alt={title}
          />

          <div className='mt-2 md:mx-6'>
            <div>
              <p className='text-2xl font-bold tracking-tight text-white'>
                {title}
              </p>
            </div>

            <p className='mt-4 text-lg leading-relaxed text-white md:text-xl'>
              {content}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

ContentLeft.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

function ContentRight({ image, title, content }) {
  return (
    <div className='max-w-6xl px-6 mx-auto'>
      <main className='relative z-20 w-full md:flex md:items-center'>
        <div className='absolute w-full bg-fuchsia-600 -z-10 md:h-96 rounded-2xl'></div>

        <div className='w-full p-6 bg-fuchsia-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly'>
          <img
            className='h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl order-2'
            src={image}
            alt={title}
          />

          <div className='mt-2 md:mx-6 order-1'>
            <div>
              <p className='text-2xl font-bold tracking-tight text-white'>
                {title}
              </p>
            </div>

            <p className='mt-4 text-lg leading-relaxed text-white md:text-xl'>
              {content}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

ContentRight.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default function QuemSomos() {
  const servicos = [
    'Aluguel de mesa posta',
    'Montagem e decoração',
    'Cursos de etiqueta',
    'Assessoria de eventos',
  ];

  return (
    <div className='m-4'>
      <div className='container flex flex-col px-8 mx-auto space-y-1 lg:flex-row lg:items-center'>
        <div className='w-full lg:w-1/2'>
          <div className='lg:max-w-lg'>
            <h1 className='text-3xl font-semibold tracking-wide text-gray-800 lg:text-4xl'>
              Conheça a Raffiner
            </h1>
            <p className='mt-4 text-gray-600'>
              Somos uma empresa especializada em serviços de mesa posta.
            </p>
            <div className='grid gap-6 mt-8 sm:grid-cols-2'>
              {servicos.map((servico, index) => (
                <div
                  key={index}
                  className='flex items-center text-gray-800 -px-3'
                >
                  <CheckIcon />
                  <span className='mx-3'>{servico}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center w-full h-80 lg:w-1/2'>
          <img
            className='object-cover w-full h-full max-w-2xl rounded-md'
            src='/images/quem-somos/1.jpg'
            alt='quem-somos'
          />
        </div>
      </div>
      <ContentLeft
        image='/images/quem-somos/3.jpg'
        title='Aluguel de mesa posta'
        content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda'
      />
      <ContentRight
        image='/images/quem-somos/2.jpg'
        title='Montagem e decoração'
        content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda'
      />
      <ContentLeft
        image='/images/quem-somos/5.jpg'
        title='Cursos de etiqueta'
        content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda'
      />
      <ContentRight
        image='/images/quem-somos/4.jpeg'
        title='Assessoria de eventos'
        content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda'
      />
    </div>
  );
}
