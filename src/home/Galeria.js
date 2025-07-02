import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import useGalleryFilters from '../hooks/useGalleryFilters';
import useGalleryItems from '../hooks/useGalleryItems';

const ITEMS_PER_PAGE = 15;

const ImageSkeleton = () => (
  <div className='animate-pulse'>
    <div className='bg-gray-200 dark:bg-gray-700 aspect-square rounded-xl'></div>
  </div>
);

const ImageError = () => (
  <div className='flex items-center justify-center aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl'>
    <div className='text-center'>
      <div className='text-4xl mb-2'>📷</div>
      <p className='text-sm text-gray-500 dark:text-gray-400'>
        Imagem não disponível
      </p>
    </div>
  </div>
);

const FilterButtons = ({
  activeFilter,
  onFilterChange,
  itemCounts,
  filters,
  loading,
}) => {
  const handleFilterClick = useCallback(
    filterId => {
      onFilterChange(filterId);
    },
    [onFilterChange]
  );

  if (loading) {
    return (
      <div className='flex items-center justify-center mb-8'>
        <div className='flex items-center gap-2 p-1 border border-blue-600 dark:border-blue-400 rounded-xl'>
          <div className='px-4 py-2 md:py-3 md:px-6'>
            <div className='w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center mb-8'>
      <div className='flex flex-wrap items-center gap-2 p-1 border border-blue-600 dark:border-blue-400 rounded-xl'>
        <button
          className={`
            px-4 py-2 text-sm font-medium transition-all duration-300 
            md:py-3 rounded-xl md:px-6 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2
            ${
              activeFilter === null
                ? 'text-white bg-blue-600 shadow-lg'
                : 'text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:text-white'
            }
          `}
          onClick={() => handleFilterClick(null)}
          aria-pressed={activeFilter === null}
        >
          <span>Todos</span>
          <span className='text-xs bg-white/20 dark:bg-black/20 px-2 py-1 rounded-full'>
            {itemCounts.total || 0}
          </span>
        </button>

        {filters.map(filter => (
          <button
            key={filter.id}
            className={`
              px-4 py-2 text-sm font-medium transition-all duration-300 
              md:py-3 rounded-xl md:px-6 focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2
              ${
                activeFilter === filter.id
                  ? 'text-white bg-blue-600 shadow-lg'
                  : 'text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:text-white'
              }
            `}
            onClick={() => handleFilterClick(filter.id)}
            aria-pressed={activeFilter === filter.id}
          >
            <span>{filter.label}</span>
            <span className='text-xs bg-white/20 dark:bg-black/20 px-2 py-1 rounded-full'>
              {itemCounts[filter.id] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

FilterButtons.propTypes = {
  activeFilter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  itemCounts: PropTypes.object.isRequired,
  filters: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const GalleryItem = ({ item, onImageClick }) => {
  const { image, category, id } = item;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleClick = useCallback(() => {
    if (onImageClick) {
      onImageClick(item);
    }
  }, [onImageClick, item]);

  if (imageError) {
    return <ImageError />;
  }

  return (
    <div
      className='group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer'
      onClick={handleClick}
      role='button'
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {!imageLoaded && <ImageSkeleton />}
      <img
        className={`object-cover w-full aspect-square transition-all duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } group-hover:scale-110`}
        src={image}
        alt={`${category} - Imagem ${id}`}
        loading='lazy'
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300' />

      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
        <p className='text-white text-sm font-medium capitalize'>{category}</p>
        <p className='text-white/80 text-xs'>Imagem {id}</p>
      </div>
    </div>
  );
};

GalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func,
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = useCallback(
    page => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [onPageChange, totalPages]
  );

  const getVisiblePages = useCallback(() => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className='flex items-center justify-center mt-8'>
      <nav
        className='flex items-center space-x-2'
        aria-label='Navegação de páginas'
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }
          `}
          aria-label='Página anterior'
        >
          ← Anterior
        </button>

        <div className='flex items-center space-x-1'>
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className='px-3 py-2 text-gray-500' aria-hidden='true'>
                  ...
                </span>
              ) : (
                <button
                  onClick={() => handlePageChange(page)}
                  className={`
                    px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${
                      currentPage === page
                        ? 'text-white bg-blue-600 shadow-lg'
                        : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }
                  `}
                  aria-label={`Página ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }
          `}
          aria-label='Próxima página'
        >
          Próximo →
        </button>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

const ImageModal = ({
  isOpen,
  image,
  onClose,
  onNavigate,
  filteredItems,
  currentImageIndex,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = useCallback(
    e => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        onNavigate('next');
      }
    },
    [onClose, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const canNavigatePrev = currentImageIndex > 0;
  const canNavigateNext = currentImageIndex < filteredItems.length - 1;

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4'
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
      aria-label='Fechar modal'
    >
      <div className='relative max-w-4xl max-h-full'>
        <button
          onClick={onClose}
          className='absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl z-10'
          aria-label='Fechar modal'
        >
          ✕
        </button>

        {/* Botão Anterior */}
        {canNavigatePrev && (
          <button
            onClick={() => onNavigate('prev')}
            className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10'
            aria-label='Imagem anterior'
          >
            ←
          </button>
        )}

        {/* Botão Próximo */}
        {canNavigateNext && (
          <button
            onClick={() => onNavigate('next')}
            className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10'
            aria-label='Próxima imagem'
          >
            →
          </button>
        )}

        <img
          src={image?.image}
          alt={`${image?.category} - Imagem ${image?.id}`}
          className='max-w-full max-h-full object-contain rounded-lg'
        />

        {/* Indicador de posição */}
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm'>
          {currentImageIndex + 1} de {filteredItems.length}
        </div>
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  image: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  filteredItems: PropTypes.array.isRequired,
  currentImageIndex: PropTypes.number.isRequired,
};

const Galeria = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    filters,
    loading: filtersLoading,
    error: filtersError,
  } = useGalleryFilters();

  const {
    items: galleryItems,
    loading: itemsLoading,
    error: itemsError,
  } = useGalleryItems();

  const handleFilterChange = useCallback(filter => {
    setActiveFilter(filter);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(page => {
    setCurrentPage(page);
  }, []);

  const handleImageClick = useCallback(
    image => {
      const imageIndex = galleryItems.findIndex(item => item.id === image.id);
      setCurrentImageIndex(imageIndex);
      setSelectedImage(image);
      setIsModalOpen(true);
    },
    [galleryItems]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setCurrentImageIndex(0);
  }, []);

  const handleNavigate = useCallback(
    direction => {
      if (direction === 'prev' && currentImageIndex > 0) {
        const newIndex = currentImageIndex - 1;
        setCurrentImageIndex(newIndex);
        setSelectedImage(galleryItems[newIndex]);
      } else if (
        direction === 'next' &&
        currentImageIndex < galleryItems.length - 1
      ) {
        const newIndex = currentImageIndex + 1;
        setCurrentImageIndex(newIndex);
        setSelectedImage(galleryItems[newIndex]);
      }
    },
    [currentImageIndex, galleryItems]
  );

  const filteredItems = useMemo(() => {
    if (!galleryItems.length) return [];

    return activeFilter
      ? galleryItems.filter(item => item.category === activeFilter)
      : galleryItems;
  }, [activeFilter, galleryItems]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage]);

  const itemCounts = useMemo(() => {
    if (!galleryItems.length || !filters.length) return {};

    const counts = { total: galleryItems.length };

    filters.forEach(filter => {
      counts[filter.id] = galleryItems.filter(
        item => item.category === filter.id
      ).length;
    });

    return counts;
  }, [galleryItems, filters]);

  const itemCount = filteredItems.length;
  const showingCount = paginatedItems.length;
  const isLoading = filtersLoading || itemsLoading;
  const hasError = filtersError || itemsError;

  if (isLoading) {
    return (
      <section className='bg-white dark:bg-gray-900 min-h-screen'>
        <div className='container px-6 py-10 mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              Galeria de Fotos
            </h1>
            <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              Explore nossa coleção de momentos especiais capturados com carinho
              e profissionalismo
            </p>
          </div>

          <div className='flex items-center justify-center mt-16'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin'></div>
              <span className='text-gray-600 dark:text-gray-400'>
                Carregando galeria...
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (hasError) {
    return (
      <section className='bg-white dark:bg-gray-900 min-h-screen'>
        <div className='container px-6 py-10 mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              Galeria de Fotos
            </h1>
            <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              Explore nossa coleção de momentos especiais capturados com carinho
              e profissionalismo
            </p>
          </div>

          <div className='text-center mt-16'>
            <div className='text-6xl mb-4'>⚠️</div>
            <p className='text-red-500 dark:text-red-400 text-lg mb-2'>
              Erro ao carregar a galeria
            </p>
            <p className='text-gray-400 dark:text-gray-500 text-sm'>
              {filtersError || itemsError}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='bg-white dark:bg-gray-900 min-h-screen'>
      <div className='container px-6 py-10 mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Galeria de Fotos
          </h1>
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Explore nossa coleção de momentos especiais capturados com carinho e
            profissionalismo
          </p>
        </div>

        <FilterButtons
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          itemCounts={itemCounts}
          filters={filters}
          loading={filtersLoading}
        />

        {itemCount > 0 && (
          <div className='mt-8 xl:mt-16'>
            <div className='text-center mb-6'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Mostrando {showingCount} de {itemCount}{' '}
                {itemCount === 1 ? 'imagem' : 'imagens'}
                {activeFilter &&
                  ` em ${filters.find(f => f.id === activeFilter)?.label}`}
                {totalPages > 1 && ` (página ${currentPage} de ${totalPages})`}
              </p>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {paginatedItems.map(item => (
                <GalleryItem
                  key={item.id}
                  item={item}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {itemCount === 0 && (
          <div className='text-center mt-16'>
            <div className='text-6xl mb-4'>📷</div>
            <p className='text-gray-500 dark:text-gray-400 text-lg mb-2'>
              Nenhuma imagem encontrada para esta categoria.
            </p>
            <p className='text-gray-400 dark:text-gray-500 text-sm'>
              Tente selecionar outra categoria ou verificar os filtros
              aplicados.
            </p>
          </div>
        )}
      </div>

      <ImageModal
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
        filteredItems={filteredItems}
        currentImageIndex={currentImageIndex}
      />
    </section>
  );
};

export default Galeria;
