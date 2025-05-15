import { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Define function overloads for useTranslation

export const useTranslation = (keys: string | string[]): string | { [key: string]: string } => {
  const { t } = useLanguage();

  return useMemo(() => {
    if (Array.isArray(keys)) {
      return keys.reduce((acc: { [key: string]: string }, key: string) => {
        acc[key.split('.').pop() as string] = t(key);
        return acc;
      }, {});
    }
    return t(keys);
  }, [t, keys]);
};

export default useTranslation;
