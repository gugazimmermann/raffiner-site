import { useState, useCallback } from 'react';

const useAsyncState = (initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async asyncFunction => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Erro inesperado';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
  }, [initialData]);

  const setDataManually = useCallback(newData => {
    setData(newData);
  }, []);

  const setErrorManually = useCallback(errorMessage => {
    setError(errorMessage);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    setData: setDataManually,
    setError: setErrorManually,
  };
};

export default useAsyncState;
