import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadTranslations } from '../utils/translationLoader';

interface Language {
  name: string;
  code: string;
  flag: string;
}

interface Translations {
  [key: string]: string | Translations;
}

interface LanguageContextType {
  language: string;
  changeLanguage: (langCode: string) => Promise<void>;
  languages: { [key: string]: Language };
  t: (key: string, params?: { [key: string]: string }) => string | Translations | any; // Using any for simplicity, can refine later
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languages: { [key: string]: Language } = {
  en: {
    name: 'English',
    code: 'en',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734886391/gb--great-britain----element--stylized-image-of-bi_vah3li.svg'
  },
  ru: {
    name: 'Русский',
    code: 'ru',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734886396/ru--russia----element--abstract-dome-of-st--basil-_bcv8vd.svg'
  },
  uk: {
    name: 'Українська',
    code: 'uk',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734886393/ua--ukraine----element--stylized-sun-and-ears-of-w_zaflxv.svg'
  },
};


interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });
  const [currentTranslations, setCurrentTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('language', language);
    // In a real app, you might fetch translations from an API here
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const loadedTranslations = await loadTranslations(language);
        setCurrentTranslations(loadedTranslations);
        console.log('Loaded translations:', loadedTranslations);
      } catch (error) {
        console.error("Failed to load translations in context:", error);
        // Optionally set a default or show an error
        setCurrentTranslations({}); // Set to empty object on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchTranslations();
  }, [language]);

  const changeLanguage = async (langCode: string) => {
    setIsLoading(true);
    // Simulate fetching translations
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    setLanguage(langCode);
    setIsLoading(false);
  };

  const getTranslation = (key: string, params: { [key: string]: string } = {}): string | Translations | any => {
    const keys = key.split('.');
    let result: any = currentTranslations;
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    // If the result is not a string, return it directly
    if (typeof result !== 'string') {
      return result;
    }

    let translatedString = result as string;

    // Replace placeholders with params if params are provided
    if (Object.keys(params).length > 0) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translatedString = translatedString.replace(`{{${paramKey}}}`, paramValue);
      });
    }

    return translatedString;
  };

  const contextValue: LanguageContextType = {
    language,
    changeLanguage,
    languages,
    t: getTranslation,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
