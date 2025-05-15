import { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const useTranslation = (keys) => {
  const { t } = useLanguage();

  return useMemo(() => {
    if (Array.isArray(keys)) {
      return keys.reduce((acc, key) => {
        acc[key.split('.').pop()] = t(key);
        return acc;
      }, {});
    }
    return t(keys);
  }, [t, keys]);
};

export default useTranslation;
