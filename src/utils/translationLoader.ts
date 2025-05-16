import React from 'react';
import { languages } from '../context/LanguageContext';

const translationCache = new Map();

export const loadTranslations = async (language: string) => {
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
    // Fall back to English if the requested language is not English
    if (language !== 'en') {
      try {
        const englishTranslations = await import('../translations/en.json');
        console.warn(`Falling back to English translations for ${language}`);
        return englishTranslations.default;
      } catch (englishError) {
        console.error('Failed to load English fallback translations', englishError);
        return {}; // Return empty object if English also fails
      }
    }
    // If the requested language was English and it failed, return empty object
    return {};
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
