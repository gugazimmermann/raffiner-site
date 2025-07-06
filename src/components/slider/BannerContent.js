import { bannerContentPropTypes } from './propTypes/propTypes';

function BannerContent({ banner }) {
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='container mx-auto px-4 text-center max-w-4xl'>
        <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight animate-fade-in'>
          {banner.title}
        </h1>
        <p className='text-lg md:text-xl mb-6 leading-relaxed opacity-90 animate-fade-in-delay'>
          {banner.subtitle}
        </p>
        <button
          className='bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl transform'
          onClick={() => {
            if (banner.buttonLink) {
              window.location.href = banner.buttonLink;
            }
          }}
          aria-label={`${banner.buttonText} - ${banner.title}`}
        >
          {banner.buttonText}
        </button>
      </div>
    </div>
  );
}

BannerContent.propTypes = bannerContentPropTypes;

export default BannerContent;
