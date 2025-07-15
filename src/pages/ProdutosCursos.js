import PropTypes from 'prop-types';

const socialIcons = {
  facebook: {
    href: 'https://facebook.com',
    ariaLabel: 'Facebook',
    path: 'M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z',
    color: 'text-blue-600',
    hoverColor: 'hover:text-blue-500',
  },
  instagram: {
    href: 'https://instagram.com',
    ariaLabel: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    color: 'text-pink-600',
    hoverColor: 'hover:text-pink-500',
  },
};

const courses = [
  {
    name: 'Lorem ipsum',
    role: 'Cumque facere numquam est',
    image: '/images/produtos/cursos/1.jpeg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum nesciunt officia aliquam neque optio? Cumque facere numquam est.',
    socialLinks: ['facebook', 'instagram'],
  },
  {
    name: 'Lorem ipsum',
    role: 'Cumque facere numquam est',
    image: '/images/produtos/cursos/2.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum nesciunt officia aliquam neque optio? Cumque facere numquam est.',
    socialLinks: ['facebook', 'instagram'],
  },
  {
    name: 'Lorem ipsum',
    role: 'Cumque facere numquam est',
    image: '/images/produtos/cursos/3.jpeg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum nesciunt officia aliquam neque optio? Cumque facere numquam est.',
    socialLinks: ['facebook', 'instagram'],
  },
  {
    name: 'Lorem ipsum',
    role: 'Cumque facere numquam est',
    image: '/images/produtos/cursos/4.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum nesciunt officia aliquam neque optio? Cumque facere numquam est.',
    socialLinks: ['facebook', 'instagram'],
  },
];

const SocialIcon = ({ platform }) => {
  const icon = socialIcons[platform];
  return (
    <a
      href={icon.href}
      className={`mx-2 ${icon.color} ${icon.hoverColor} group-hover:text-white transition-colors duration-200`}
      aria-label={icon.ariaLabel}
    >
      <svg
        className='w-6 h-6 fill-current'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d={icon.path}></path>
      </svg>
    </a>
  );
};

SocialIcon.propTypes = {
  platform: PropTypes.string.isRequired,
};

const CoursesCard = ({ course }) => {
  return (
    <div className='px-12 py-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-fuchsia-600'>
      <div className='flex flex-col sm:-mx-4 sm:flex-row'>
        <img
          className='flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300'
          src={course.image}
          alt={course.name}
        />

        <div className='mt-4 sm:mx-4 sm:mt-0'>
          <h1 className='text-xl font-semibold text-gray-700 capitalize md:text-2xl group-hover:text-white'>
            {course.name}
          </h1>

          <p className='mt-2 text-gray-500 capitalize group-hover:text-white'>
            {course.role}
          </p>
        </div>
      </div>

      <p className='mt-4 text-gray-500 capitalize group-hover:text-white'>
        {course.description}
      </p>

      <div className='flex mt-4 -mx-2'>
        {course.socialLinks.map(platform => (
          <SocialIcon key={platform} platform={platform} />
        ))}
      </div>
    </div>
  );
};

CoursesCard.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    socialLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default function ProdutosCursos() {
  return (
    <section className='bg-white'>
      <div className='container px-6 py-2 mx-auto'>
        <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl'>
          Nossos <span className='text-fuchsia-500'>Cursos</span>
        </h1>

        <p className='max-w-2xl mx-auto my-6 text-center text-gray-500'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
          ex placeat modi magni quia error alias, adipisci rem similique, at
          omnis eligendi optio eos harum.
        </p>

        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2'>
          {courses.map((course, index) => (
            <CoursesCard key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
