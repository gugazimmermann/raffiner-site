import PropTypes from 'prop-types';

const BlogCard = ({ mainImage, title, description }) => (
  <div>
    <div className='relative'>
      <img
        className='object-cover object-center w-full h-64 rounded-lg'
        src={mainImage}
        alt=''
      />
    </div>

    <h1 className='mt-6 text-xl font-semibold text-gray-800'>{title}</h1>

    <hr className='w-32 my-6 text-blue-500' />

    <p className='text-sm text-gray-500'>{description}</p>

    <button className='inline-block mt-4 text-blue-500 underline hover:text-blue-400 bg-transparent border-none cursor-pointer'>
      Conheça mais
    </button>
  </div>
);

BlogCard.propTypes = {
  mainImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const blogPosts = [
  {
    mainImage: '/images/produtos/solucoes/1.jpg',
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fugit dolorum amet dolores praesentium, alias nam? Tempore',
  },
  {
    mainImage: '/images/produtos/solucoes/2.jpg',
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fugit dolorum amet dolores praesentium, alias nam? Tempore',
  },
  {
    mainImage: '/images/produtos/solucoes/3.jpg',
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fugit dolorum amet dolores praesentium, alias nam? Tempore',
  },
];

export default function ProdutosSolucoes() {
  return (
    <section className='bg-white'>
      <div className='container px-6 py-4 mx-auto'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold text-gray-800 capitalize lg:text-3xl'>
            Soluções
          </h1>
        </div>

        <div className='grid grid-cols-1 gap-8 m-4 md:grid-cols-2 xl:grid-cols-3'>
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}
