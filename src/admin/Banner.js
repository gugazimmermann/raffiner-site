import React, { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/apiClient';
import ErrorMessage from '../components/ui/ErrorMessage';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const VALIDATION_RULES = {
  title: {
    required: true,
    minLength: 1,
    maxLength: 100,
    message: 'Título é obrigatório e deve ter entre 1 e 100 caracteres',
  },
  subtitle: {
    maxLength: 200,
    message: 'Subtítulo deve ter no máximo 200 caracteres',
  },
  actionButtonText: {
    maxLength: 50,
    message: 'Texto do botão deve ter no máximo 50 caracteres',
  },
  actionButtonUrl: {
    maxLength: 500,
    message: 'URL do botão deve ter no máximo 500 caracteres',
  },
  startColor: {
    pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    message: 'Cor inicial deve ser um código hexadecimal válido (ex: #FF0000)',
  },
  endColor: {
    pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    message: 'Cor final deve ser um código hexadecimal válido (ex: #FF0000)',
  },
  order: {
    required: true,
    min: 1,
    message: 'Ordem deve ser maior que 0',
  },
};

function Banner() {
  const [formData, setFormData] = useState({
    image: '',
    startColor: '',
    endColor: '',
    title: '',
    subtitle: '',
    actionButtonText: '',
    actionButtonUrl: '',
    order: 1,
    isActive: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [banners, setBanners] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const validateField = useCallback(
    (name, value) => {
      const rule = VALIDATION_RULES[name];
      if (!rule) return '';

      if (rule.required && !String(value || '').trim()) {
        return rule.message;
      }

      if (rule.min && parseInt(value) < rule.min) {
        return rule.message;
      }

      if (
        rule.minLength &&
        String(value || '').trim().length < rule.minLength
      ) {
        return rule.message;
      }

      if (rule.maxLength && value?.length > rule.maxLength) {
        return rule.message;
      }

      if (rule.pattern && value && !rule.pattern.test(value)) {
        return rule.message;
      }

      // Custom validation for actionButtonUrl
      if (name === 'actionButtonUrl' && formData.actionButtonText && !value) {
        return 'URL do botão é obrigatória quando o texto do botão é fornecido';
      }

      return '';
    },
    [formData.actionButtonText]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoadingData(true);
        setLoadError(null);

        const { banners } = await apiClient.get('/banners');
        setBanners(banners || []);
      } catch (err) {
        setLoadError('Erro ao carregar banners. Tente novamente.');
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    setHasChanges(true);
  }, [formData, imageFile]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      image: '',
      startColor: '',
      endColor: '',
      title: '',
      subtitle: '',
      actionButtonText: '',
      actionButtonUrl: '',
      order: banners.length + 1,
      isActive: true,
    });
    setImageFile(null);
    setImagePreview('');
    setErrors({});
    setEditingId(null);
    setHasChanges(false);
  };

  const handleEdit = banner => {
    setFormData({
      image: banner.image || '',
      startColor: banner.startColor || '',
      endColor: banner.endColor || '',
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      actionButtonText: banner.actionButtonText || '',
      actionButtonUrl: banner.actionButtonUrl || '',
      order: banner.order || 1,
      isActive: banner.isActive !== undefined ? banner.isActive : true,
    });
    setImagePreview(banner.image || '');
    setImageFile(null);
    setEditingId(banner._id);
    setErrors({});
    setHasChanges(false);
  };

  const handleDelete = async id => {
    if (!window.confirm('Tem certeza que deseja excluir este banner?')) {
      return;
    }

    try {
      await apiClient.delete(`/banners/${id}`);
      setBanners(prev => prev.filter(banner => banner._id !== id));
    } catch (error) {
      alert('Erro ao excluir banner. Tente novamente.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);
    setErrors({ submit: '' });

    try {
      const submitData = new FormData();

      Object.keys(formData).forEach(key => {
        if (
          formData[key] !== undefined &&
          formData[key] !== null &&
          formData[key] !== ''
        ) {
          submitData.append(key, formData[key]);
        }
      });

      if (imageFile) {
        submitData.append('image', imageFile);
      }

      if (editingId) {
        await apiClient.put(`/banners/${editingId}`, submitData);
      } else {
        await apiClient.post('/banners', submitData);
      }

      const { banners } = await apiClient.get('/banners');
      setBanners(banners || []);

      setIsSuccess(true);
      resetForm();
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      setErrors({ submit: 'Erro ao salvar banner. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const inputClassName = fieldName => {
    const baseClass =
      'block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200';
    const errorClass = 'border-red-300 focus:border-red-400 focus:ring-red-300';
    const successClass =
      'border-gray-200 focus:border-blue-400 focus:ring-blue-300';

    return `${baseClass} ${errors[fieldName] ? errorClass : successClass}`;
  };

  if (isLoadingData) {
    return (
      <section className='max-w-6xl p-6 mt-4 mx-auto bg-white rounded-lg shadow-md'>
        <div className='flex items-center justify-center py-12'>
          <LoadingSpinner size='lg' text='Carregando banners...' />
        </div>
      </section>
    );
  }

  if (loadError) {
    return (
      <section className='max-w-6xl p-6 mt-4 mx-auto bg-white rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>
          Gerenciar Banners
        </h2>
        <ErrorMessage
          error={loadError}
          showRetry={true}
          onRetry={handleRetry}
          variant='card'
        />
      </section>
    );
  }

  return (
    <section className='max-w-6xl p-6 mt-4 mx-auto bg-white rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-gray-800'>
          Gerenciar Banners
        </h2>
        {hasChanges && (
          <span className='text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full'>
            Alterações não salvas
          </span>
        )}
      </div>

      {isSuccess && (
        <div className='mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center'>
          <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'
            />
          </svg>
          Banner {editingId ? 'atualizado' : 'criado'} com sucesso!
        </div>
      )}

      {errors.submit && (
        <div className='mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center'>
          <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
          {errors.submit}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className='space-y-8'
        method='post'
        encType='multipart/form-data'
      >
        <div className='bg-gray-50 p-6 rounded-lg'>
          <h3 className='text-lg font-medium text-gray-800 mb-4 flex items-center'>
            <svg
              className='w-5 h-5 mr-2 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            Imagem do Banner
          </h3>

          <div className='space-y-4'>
            <div>
              <label
                htmlFor='image'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Imagem *
              </label>
              <input
                id='image'
                name='image'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className={inputClassName('image')}
              />
              <p className='mt-1 text-sm text-gray-500'>
                Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
              </p>
            </div>

            {imagePreview && (
              <div className='mt-4'>
                <div className='block text-sm font-medium text-gray-700 mb-2'>
                  Preview da Imagem
                </div>
                <div className='relative w-full max-w-md'>
                  <img
                    src={imagePreview}
                    alt='Preview'
                    className='w-full h-48 object-cover rounded-lg border border-gray-200'
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='bg-gray-50 p-6 rounded-lg'>
          <h3 className='text-lg font-medium text-gray-800 mb-4 flex items-center'>
            <svg
              className='w-5 h-5 mr-2 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z'
              />
            </svg>
            Conteúdo do Banner
          </h3>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div className='sm:col-span-2'>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Título *
              </label>
              <input
                id='title'
                name='title'
                type='text'
                value={formData.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('title')}
                placeholder='Digite o título do banner'
                maxLength={100}
              />
              {errors.title && (
                <p className='mt-1 text-sm text-red-600 flex items-center'>
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {errors.title}
                </p>
              )}
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='subtitle'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Subtítulo
              </label>
              <textarea
                id='subtitle'
                name='subtitle'
                value={formData.subtitle}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('subtitle')}
                placeholder='Digite o subtítulo do banner'
                maxLength={200}
                rows={3}
              />
              {errors.subtitle && (
                <p className='mt-1 text-sm text-red-600 flex items-center'>
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {errors.subtitle}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='actionButtonText'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Texto do Botão
              </label>
              <input
                id='actionButtonText'
                name='actionButtonText'
                type='text'
                value={formData.actionButtonText}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('actionButtonText')}
                placeholder='Ex: Saiba Mais'
                maxLength={50}
              />
              {errors.actionButtonText && (
                <p className='mt-1 text-sm text-red-600 flex items-center'>
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {errors.actionButtonText}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='actionButtonUrl'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                URL do Botão
              </label>
              <input
                id='actionButtonUrl'
                name='actionButtonUrl'
                type='url'
                value={formData.actionButtonUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('actionButtonUrl')}
                placeholder='https://exemplo.com'
                maxLength={500}
              />
              {errors.actionButtonUrl && (
                <p className='mt-1 text-sm text-red-600 flex items-center'>
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {errors.actionButtonUrl}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='bg-gray-50 p-6 rounded-lg'>
          <h3 className='text-lg font-medium text-gray-800 mb-4 flex items-center'>
            <svg
              className='w-5 h-5 mr-2 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z'
              />
            </svg>
            Configurações Visuais
          </h3>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
            <div>
              <label
                htmlFor='startColor'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Cor Inicial (Gradiente)
              </label>
              <div className='flex'>
                <input
                  id='startColor'
                  name='startColor'
                  type='color'
                  value={formData.startColor}
                  onChange={handleChange}
                  className='w-12 h-10 border border-gray-300 rounded-l-md cursor-pointer'
                />
                <input
                  type='text'
                  value={formData.startColor}
                  onChange={handleChange}
                  name='startColor'
                  placeholder='#FF0000'
                  className='flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              {errors.startColor && (
                <p className='mt-1 text-sm text-red-600 flex items-center'>
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {errors.startColor}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='endColor'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Cor Final (Gradiente)
              </label>
              <div className='flex'>
                <input
                  id='endColor'
                  name='endColor'
                  type='color'
                  value={formData.endColor}
                  onChange={handleChange}
                  className='w-12 h-10 border border-gray-300 rounded-l-md cursor-pointer'
                />
                <input
                  type='text'
                  value={formData.endColor}
                  onChange={handleChange}
                  name='endColor'
                  placeholder='#0000FF'
                  className='flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              {errors.endColor && (
                <p className='mt-1 text-sm text-red-600 flex items-center'>
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {errors.endColor}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='order'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Ordem *
              </label>
              <input
                id='order'
                name='order'
                type='number'
                min='1'
                value={formData.order}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('order')}
                placeholder='1'
              />
              {errors.order && (
                <p className='mt-1 text-sm text-red-600 flex items-center'>
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {errors.order}
                </p>
              )}
            </div>
          </div>

          <div className='mt-6'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                name='isActive'
                checked={formData.isActive}
                onChange={handleChange}
                className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
              />
              <span className='ml-2 text-sm text-gray-700'>
                Banner ativo (visível no site)
              </span>
            </label>
          </div>
        </div>

        <div className='flex justify-end space-x-4'>
          <button
            type='button'
            onClick={resetForm}
            className='px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200'
          >
            {editingId ? 'Cancelar Edição' : 'Limpar Formulário'}
          </button>
          <button
            type='submit'
            disabled={isLoading || !hasChanges}
            className='px-8 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center'
          >
            {isLoading ? (
              <>
                <LoadingSpinner size='sm' color='white' className='mr-2' />
                Salvando...
              </>
            ) : editingId ? (
              'Atualizar Banner'
            ) : (
              'Criar Banner'
            )}
          </button>
        </div>
      </form>

      {/* Lista de Banners */}
      {banners.length > 0 && (
        <div className='mt-12'>
          <h3 className='text-lg font-medium text-gray-800 mb-6'>
            Banners Existentes
          </h3>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {banners.map(banner => (
              <div
                key={banner._id}
                className='bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'
              >
                <div className='relative'>
                  {banner.image && (
                    <img
                      src={`${process.env.REACT_APP_IMAGE_BASE_URL}${banner.image}`}
                      alt={banner.title}
                      className='w-full h-48 object-cover rounded-t-lg'
                      crossOrigin='anonymous | use-credentials'
                    />
                  )}
                  <div className='absolute top-2 right-2 flex space-x-1'>
                    <button
                      onClick={() => handleEdit(banner)}
                      className='p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200'
                      title='Editar'
                    >
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(banner._id)}
                      className='p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200'
                      title='Excluir'
                    >
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                    </button>
                  </div>
                  {!banner.isActive && (
                    <div className='absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 rounded text-xs'>
                      Inativo
                    </div>
                  )}
                </div>
                <div className='p-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className='font-medium text-gray-900 truncate'>
                      {banner.title}
                    </h4>
                    <span className='text-sm text-gray-500'>
                      #{banner.order}
                    </span>
                  </div>
                  {banner.subtitle && (
                    <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
                      {banner.subtitle}
                    </p>
                  )}
                  {banner.actionButtonText && (
                    <div className='flex items-center justify-between text-xs text-gray-500'>
                      <span>Botão: {banner.actionButtonText}</span>
                      {banner.startColor && banner.endColor && (
                        <div className='flex items-center space-x-1'>
                          <div
                            className='w-4 h-4 rounded border border-gray-300'
                            style={{
                              background: `linear-gradient(45deg, ${banner.startColor}, ${banner.endColor})`,
                            }}
                          />
                          <span>Gradiente</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {banners.length === 0 && (
        <div className='mt-12 text-center py-12 bg-gray-50 rounded-lg'>
          <svg
            className='w-16 h-16 mx-auto text-gray-400 mb-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            Nenhum banner criado
          </h3>
          <p className='text-gray-600'>
            Crie seu primeiro banner usando o formulário acima.
          </p>
        </div>
      )}
    </section>
  );
}

export default Banner;
