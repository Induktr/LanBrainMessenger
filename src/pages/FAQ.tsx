import React, { useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { CloudinaryArrowIcon } from '../components/Icons/CloudinaryIcons';
import { useLanguage } from '../context/LanguageContext';
import { faqDataStructure } from '../data/faq'; // Import the new data structure

const FAQ_ICONS = {
  magnifier: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734731094/the-magnifier-icon-can-be-designed-in-a-minimalist_bvzrsy.svg'
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: any): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('FAQ Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-[var(--text-secondary)] bg-[var(--secondary)] rounded-xl">
          Something went wrong displaying this FAQ item.
        </div>
      );
    }
    return this.props.children;
  }
}

interface FAQComponentProps {}

// Updated interface to reflect new data structure from faq.ts
interface DisplayableFAQQuestion {
  id: string; // Unique ID for React key, e.g., "generalProject-q1"
  categoryKey: string; // e.g., "generalProject"
  questionKey: string; // Translation key for the question, e.g., "faq.questionsData.generalProject.q1.question"
  answerKey: string; // Translation key for the answer, e.g., "faq.questionsData.generalProject.q1.answer"
}

const FAQComponent: React.FC<FAQComponentProps> = () => {
  const { theme } = useTheme();
  const { t, language, isLoading: languageIsLoading } = useLanguage(); // Renamed isLoading to avoid conflict
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const toggleQuestion = (id: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };

  const { allQuestions, displayableCategoryKeys } = React.useMemo(() => {
    if (languageIsLoading) {
      return { allQuestions: [], displayableCategoryKeys: [] };
    }

    // Get the list of category keys from our faqDataStructure
    const categoryKeysFromData = faqDataStructure.map(cat => cat.categoryKey);
    
    // Filter displayableCategoryKeys: only show categories that have actual translations
    // and are present in faqDataStructure
    const currentFaqCategoriesRaw = t('faq.categories');
    const currentFaqCategories = (typeof currentFaqCategoriesRaw === 'object' && currentFaqCategoriesRaw !== null)
      ? currentFaqCategoriesRaw as Record<string, string>
      : {};

    const computedDisplayableCategoryKeys = categoryKeysFromData.filter(catKey =>
      typeof currentFaqCategories[catKey] === 'string' && currentFaqCategories[catKey].trim() !== ''
    );

    const computedAllQuestions: DisplayableFAQQuestion[] = faqDataStructure.flatMap(category => {
      // Only process categories that are displayable (have a translated name)
      if (!computedDisplayableCategoryKeys.includes(category.categoryKey)) {
        return [];
      }
      return category.questions.map(question => {
        const questionId = question.id; // e.g., "q1"
        return {
          id: `${category.categoryKey}-${questionId}`, // e.g., "generalProject-q1"
          categoryKey: category.categoryKey,
          questionKey: `faq.questionsData.${category.categoryKey}.${questionId}.question`,
          answerKey: `faq.questionsData.${category.categoryKey}.${questionId}.answer`,
        };
      });
    });
    
    return {
      allQuestions: computedAllQuestions,
      displayableCategoryKeys: computedDisplayableCategoryKeys,
    };
  }, [language, t, languageIsLoading]);

  const filteredQuestions = allQuestions.filter(q => {
    const translatedQuestion = t(q.questionKey) || '';
    const matchesSearch = searchQuery.trim() === '' ||
      translatedQuestion.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategoryKey === 'all' || q.categoryKey === activeCategoryKey;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[var(--primary)] text-[var(--text-primary)]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
          >
            <CloudinaryArrowIcon className="rotate-180" />
            {t('common.backToHome')}
          </Link>
          <h1 className="text-4xl font-bold mt-6 mb-4">{t('faq.title')}</h1>
          <p className="text-[var(--text-secondary)]">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <img
              src={FAQ_ICONS.magnifier}
              alt={t('faq.searchAlt')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ filter: 'invert(42%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(92%) contrast(82%)' }}
            />
            <input
              type="text"
              placeholder={t('faq.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)]
                text-[var(--text-primary)] placeholder-[var(--text-secondary)]
                focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategoryKey('all')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap
                ${activeCategoryKey === 'all'
                  ? 'bg-[var(--accent-primary)] text-[var(--primary)]'
                  : 'bg-[var(--secondary)] text-[var(--text-primary)] hover:bg-[var(--tertiary)]'
                }`}
            >
              {t('faq.allQuestions')}
            </button>
            {displayableCategoryKeys.map(catKey => (
              <button
                key={catKey}
                onClick={() => setActiveCategoryKey(catKey)}
                className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap
                  ${activeCategoryKey === catKey
                    ? 'bg-[var(--accent-primary)] text-[var(--primary)]'
                    : 'bg-[var(--secondary)] text-[var(--text-primary)] hover:bg-[var(--tertiary)]'
                  }`}
              >
                {t(`faq.categories.${catKey}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredQuestions.map((item) => (
              <ErrorBoundary key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-xl bg-[var(--secondary)] border border-[var(--border)] overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="w-full p-6 flex items-start justify-between gap-4 text-left"
                  >
                    <span className="text-[var(--text-primary)] font-medium">
                      {t(item.questionKey)}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedQuestions.has(item.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 text-[var(--text-secondary)]"
                    >
                      <FiChevronDown />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedQuestions.has(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-6"
                      >
                        <div className="pt-4 border-t border-[var(--border)]">
                          <p className="text-[var(--text-secondary)]">
                            {t(item.answerKey, { defaultValue: t('faq.answerComingSoon') })}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ErrorBoundary>
            ))}
          </AnimatePresence>

          {filteredQuestions.length === 0 && searchQuery.trim() !== '' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-[var(--text-secondary)]"
            >
              {t('faq.noResults')}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;