import { Link } from 'react-router-dom';

const links = [
  { name: 'Sobre Nós', href: '/quem-somos' },
  { name: 'Serviços', href: '/servicos' },
  { name: 'Portfólio', href: '/portifolio' },
  { name: 'Orçamento', href: '/orcamento' },
];

function QuickLinks() {
  return (
    <div className='text-center md:text-left'>
      <h3 className='font-semibold text-lg mb-4 text-gray-800'>
        Links Rápidos
      </h3>
      <ul className='space-y-2'>
        {links.map(link => (
          <li key={link.name}>
            <Link
              to={link.href}
              className='text-gray-700 hover:text-amber-600 transition-colors duration-200 hover:underline'
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuickLinks;
