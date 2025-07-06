import useContactData from '../../hooks/useContactData';

function ContactInfo() {
  const { contactData, loading, error } = useContactData();

  if (loading) {
    return (
      <div className='text-gray-700 space-y-3'>
        <h3 className='font-semibold text-lg mb-4 text-gray-800'>Contato</h3>
        <div className='space-y-3'>
          {[1, 2, 3].map(index => (
            <div key={`skeleton-${index}`} className='flex items-start gap-3'>
              <div className='w-5 h-5 bg-gray-300 rounded animate-pulse flex-shrink-0'></div>
              <div className='flex-1 space-y-2'>
                <div className='h-4 bg-gray-300 rounded animate-pulse'></div>
                <div className='h-3 bg-gray-300 rounded animate-pulse w-3/4'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-gray-700 space-y-3'>
        <h3 className='font-semibold text-lg mb-4 text-gray-800'>Contato</h3>
        <div className='text-red-600 text-sm'>{error}</div>
      </div>
    );
  }

  if (!contactData) {
    return null;
  }

  const phoneNumber = `(47) ${contactData.phone.toString().replace(/(\d{5})(\d{4})/, '$1-$2')}`;
  return (
    <div className='text-gray-700 space-y-3'>
      <h3 className='font-semibold text-lg mb-4 text-gray-800'>Contato</h3>

      <div className='space-y-3'>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(`${contactData.street}, ${contactData.neighborhood}, ${contactData.city} - ${contactData.state}, ${contactData.zipCode}`)}`}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-start gap-3 group hover:text-amber-600 transition-colors duration-200'
        >
          <svg
            className='w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          <address className='not-italic group-hover:underline cursor-pointer'>
            {contactData.street}
            <br />
            {contactData.neighborhood} / {contactData.city} -{' '}
            {contactData.state}
            <br />
            CEP: {contactData.zipCode}
          </address>
        </a>

        <a
          href={`tel:+5547${contactData.phone}`}
          className='flex items-center gap-3 group hover:text-amber-600 transition-colors duration-200'
        >
          <svg
            className='w-5 h-5 text-amber-600 flex-shrink-0'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
            />
          </svg>
          <span className='group-hover:underline'>{phoneNumber}</span>
        </a>

        <a
          href={`mailto:${contactData.email}`}
          className='flex items-center gap-3 group hover:text-amber-600 transition-colors duration-200'
        >
          <svg
            className='w-5 h-5 text-amber-600 flex-shrink-0'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            />
          </svg>
          <span className='group-hover:underline break-all'>
            {contactData.email}
          </span>
        </a>
      </div>
    </div>
  );
}

export default ContactInfo;
