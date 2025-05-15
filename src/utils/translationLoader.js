import { languages } from '../context/LanguageContext';

const translationCache = new Map();

export const loadTranslations = async (language) => {
  // Check cache first
  if (translationCache.has(language)) {
    return translationCache.get(language);
  }

  try {
    const translations = await import(`../translations/${language}.json`);
    translationCache.set(language, translations.default);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for ${language}`, error);
    // Fall back to English if it's not already English
    if (language !== 'en') {
      const fallback = await import(`../translations/en.json`);
      return fallback.default;
    }
    throw error;
  }
};

export const preloadTranslations = async () => {
  const promises = Object.keys(languages).map(lang => 
    import(`../translations/${lang}.json`)
      .then(module => translationCache.set(lang, module.default))
      .catch(error => console.error(`Failed to preload ${lang}:`, error))
  );
  await Promise.all(promises);
};

export const clearTranslationCache = () => {
  translationCache.clear();
};
