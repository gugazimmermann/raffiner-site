import React, { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/apiClient';
import ErrorMessage from '../components/ui/ErrorMessage';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const VALIDATION_RULES = {
  street: {
    required: true,
    message: 'Rua é obrigatória',
  },
  number: {
    required: true,
    min: 1,
    message: 'Número deve ser maior que 0',
  },
  neighborhood: {
    required: true,
    message: 'Bairro é obrigatório',
  },
  city: {
    required: true,
    message: 'Cidade é obrigatória',
  },
  state: {
    required: true,
    length: 2,
    message: 'Estado deve ter exatamente 2 caracteres',
  },
  zipCode: {
    required: true,
    pattern: /^\d{8}$/,
    message: 'CEP deve ter 8 dígitos',
  },
  phone: {
    required: true,
    pattern: /^\d{10,12}$/,
    message: 'Telefone deve ter entre 10 e 12 dígitos',
  },
  whatsapp: {
    required: true,
    pattern: /^\d{10,12}$/,
    message: 'WhatsApp deve ter entre 10 e 12 dígitos',
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Email inválido',
  },
};

const BRAZILIAN_STATES = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

function Config() {
  const [formData, setFormData] = useState({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    whatsapp: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const validateField = useCallback((name, value) => {
    const rule = VALIDATION_RULES[name];
    if (!rule) return '';

    if (rule.required && !String(value || '').trim()) {
      return rule.message;
    }

    if (rule.min && parseInt(value) < rule.min) {
      return rule.message;
    }

    if (rule.length && value?.length !== rule.length) {
      return rule.message;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message;
    }

    return '';
  }, []);

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
    const fetchConfigData = async () => {
      try {
        setIsLoadingData(true);
        setLoadError(null);

        const { config } = await apiClient.get('/config');

        if (config) {
          const initialData = {
            street: config.street || '',
            number: config.number || '',
            neighborhood: config.neighborhood || '',
            city: config.city || '',
            state: config.state || '',
            zipCode: config.zipCode || '',
            phone: config.phone || '',
            whatsapp: config.whatsapp || '',
            email: config.email || '',
          };
          setFormData(initialData);
        }
      } catch (err) {
        setLoadError(
          'Erro ao carregar configuração existente. Tente novamente.'
        );
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchConfigData();
  }, []);

  useEffect(() => {
    setHasChanges(true);
  }, [formData]);

  const handleChange = e => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === 'phone' || name === 'whatsapp') {
      formattedValue = value.replace(/\D/g, '').slice(0, 12);
    } else if (name === 'zipCode') {
      formattedValue = value.replace(/\D/g, '').slice(0, 8);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
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

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);
    setErrors({ submit: '' });

    try {
      await apiClient.put('/config', formData);

      setIsSuccess(true);
      setHasChanges(false);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      setErrors({ submit: 'Erro ao salvar configuração. Tente novamente.' });
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
      <section className='max-w-4xl p-6 mt-4 mx-auto bg-white rounded-lg shadow-md'>
        <div className='flex items-center justify-center py-12'>
          <LoadingSpinner size='lg' text='Carregando configurações...' />
        </div>
      </section>
    );
  }

  if (loadError) {
    return (
      <section className='max-w-4xl p-6 mt-4 mx-auto bg-white rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>
          Configurações da Empresa
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
    <section className='max-w-4xl p-6 mt-4 mx-auto bg-white rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-gray-800'>
          Configurações da Empresa
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
          Configurações salvas com sucesso!
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

      <form onSubmit={handleSubmit} className='space-y-8'>
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
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            Endereço
          </h3>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div className='sm:col-span-2'>
              <label
                htmlFor='street'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Rua *
              </label>
              <input
                id='street'
                name='street'
                type='text'
                value={formData.street}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('street')}
                placeholder='Digite o nome da rua'
              />
              {errors.street && (
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
                  {errors.street}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='number'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Número *
              </label>
              <input
                id='number'
                name='number'
                type='number'
                min='1'
                value={formData.number}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('number')}
                placeholder='123'
              />
              {errors.number && (
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
                  {errors.number}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='neighborhood'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Bairro *
              </label>
              <input
                id='neighborhood'
                name='neighborhood'
                type='text'
                value={formData.neighborhood}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('neighborhood')}
                placeholder='Digite o bairro'
              />
              {errors.neighborhood && (
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
                  {errors.neighborhood}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='city'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Cidade *
              </label>
              <input
                id='city'
                name='city'
                type='text'
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('city')}
                placeholder='Digite a cidade'
              />
              {errors.city && (
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
                  {errors.city}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='state'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Estado *
              </label>
              <select
                id='state'
                name='state'
                value={formData.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('state')}
              >
                <option value=''>Selecione o estado</option>
                {BRAZILIAN_STATES.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
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
                  {errors.state}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='zipCode'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                CEP *
              </label>
              <input
                id='zipCode'
                name='zipCode'
                type='text'
                maxLength='8'
                value={formData.zipCode}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('zipCode')}
                placeholder='12345678'
              />
              {errors.zipCode && (
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
                  {errors.zipCode}
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
                d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
              />
            </svg>
            Contato
          </h3>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Telefone *
              </label>
              <input
                id='phone'
                name='phone'
                type='text'
                maxLength='12'
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('phone')}
                placeholder='11987654321'
              />
              {errors.phone && (
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
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='whatsapp'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                WhatsApp *
              </label>
              <input
                id='whatsapp'
                name='whatsapp'
                type='text'
                maxLength='12'
                value={formData.whatsapp}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('whatsapp')}
                placeholder='11987654321'
              />
              {errors.whatsapp && (
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
                  {errors.whatsapp}
                </p>
              )}
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Email *
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName('email')}
                placeholder='contato@empresa.com'
              />
              {errors.email && (
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
                  {errors.email}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='flex justify-end space-x-4'>
          <button
            type='button'
            onClick={() => window.location.reload()}
            className='px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200'
          >
            Cancelar
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
            ) : (
              'Salvar Configurações'
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Config;
