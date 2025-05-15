import React, { useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiChevronDown } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { faqData } from '../data/faq';
import { CloudinaryPlayIcon, CloudinaryArrowIcon, CloudinaryLinkIcon } from '../components/Icons/CloudinaryIcons';

const FAQ_ICONS = {
  magnifier: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734731094/the-magnifier-icon-can-be-designed-in-a-minimalist_bvzrsy.svg'
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
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

const FAQComponent = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const toggleQuestion = (id) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };

  const filteredQuestions = faqData.flatMap((category, categoryIndex) => 
    category.questions.map((q, questionIndex) => ({
      ...q,
      id: `${category.category}-${questionIndex}`,
      category: category.category
    }))
  ).filter(q => {
    const matchesSearch = searchQuery.trim() === '' ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || q.category === activeCategory;
    
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
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mt-6 mb-4">Frequently Asked Questions</h1>
          <p className="text-[var(--text-secondary)]">
            Find answers to common questions about BrainMessenger
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <img 
              src={FAQ_ICONS.magnifier}
              alt="Search"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ filter: 'invert(42%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(92%) contrast(82%)' }}
            />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)]
                text-[var(--text-primary)] placeholder-[var(--text-secondary)]
                focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap
                ${activeCategory === 'all'
                  ? 'bg-[var(--accent-primary)] text-[var(--primary)]'
                  : 'bg-[var(--secondary)] text-[var(--text-primary)] hover:bg-[var(--tertiary)]'
                }`}
            >
              All Questions
            </button>
            {faqData.map(category => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap
                  ${activeCategory === category.category
                    ? 'bg-[var(--accent-primary)] text-[var(--primary)]'
                    : 'bg-[var(--secondary)] text-[var(--text-primary)] hover:bg-[var(--tertiary)]'
                  }`}
              >
                {category.category}
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
                      {item.question}
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
                          <p className="text-[var(--text-secondary)]">{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ErrorBoundary>
            ))}
          </AnimatePresence>

          {filteredQuestions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-[var(--text-secondary)]"
            >
              No questions found matching your search.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;