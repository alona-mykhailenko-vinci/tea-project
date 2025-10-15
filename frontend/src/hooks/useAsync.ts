import { useState, useCallback } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (asyncFunction: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
}

/**
 * Generic hook for handling async operations with loading, error, and data states
 */
export const useAsync = <T = any>(): UseAsyncState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (asyncFunction: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await asyncFunction();
      setData(result);
      return result;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};