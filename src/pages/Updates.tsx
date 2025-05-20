import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import UpdateSlider from '../components/Updates/UpdateSlider';
import CaseStudy from '../components/Updates/CaseStudy';
import { UpdateItem, updates as updatesData } from '../data/updates'; // Import the shared UpdateItem interface and the updates data
import {
  ChatIcon,
  SecurityIcon,
  MobileIcon,
  GlobalIcon,
  PerformanceIcon,
  AIIcon,
  AuthIcon,
  ThemeIcon
} from '../components/Icons/UpdateIcons'; // Keep imports for now, will refactor icon system later
import { CloudinaryPlayIcon, CloudinaryArrowIcon, CloudinaryLinkIcon } from '../components/Icons/CloudinaryIcons'; // Keep imports for now
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage

// Removed local updatesData declaration (lines 22-71) to use the imported one

interface UpdateModalProps {
  update: UpdateItem | null;
  onClose: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ update, onClose }) => {
  const { t } = useLanguage(); // Use the translation hook
  if (!update) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-[var(--primary)] rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <FiX size={24} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-[var(--accent-primary)] text-[var(--primary)]">
            {/* Render icon using img tag and iconUrl */}
            {update.iconUrl && <img src={update.iconUrl} alt={t(update.titleKey) || update.originalTitle} className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">{t(update.titleKey)}</h3>
            <p className="text-[var(--text-secondary)]">{t(update.dateKey)}</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-[var(--text-secondary)] mb-6">{t(update.descriptionKey)}</p>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{t('updates.modal.keyFeaturesTitle')}</h4> {/* Use translation key */}
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>{t('updates.modal.placeholder')}</li> {/* Use translation key for placeholder */}
                <li>{t('updates.modal.placeholder')}</li> {/* Use translation key for placeholder */}
                <li>{t('updates.modal.placeholder')}</li> {/* Use translation key for placeholder */}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{t('updates.modal.impactMetricsTitle')}</h4> {/* Use translation key */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[var(--secondary)] p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[var(--accent-primary)]">{t('updates.modal.placeholder')}</div> {/* Use translation key for placeholder */}
                  <div className="text-sm text-[var(--text-secondary)]">{t('updates.modal.placeholder')}</div> {/* Use translation key for placeholder */}
                </div>
                <div className="bg-[var(--secondary)] p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[var(--accent-primary)]">{t('updates.modal.placeholder')}</div> {/* Use translation key for placeholder */}
                  <div className="text-sm text-[var(--text-secondary)]">{t('updates.modal.placeholder')}</div> {/* Use translation key for placeholder */}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{t('updates.modal.featureOverviewTitle')}</h4> {/* Use translation key */}
              <div className="aspect-video rounded-lg overflow-hidden bg-[var(--secondary)] mb-6">
                <iframe
                  className="w-full h-full"
                  src="https://youtu.be/9cH5Em0F7pc?si=mi9VoAX9xcDfP3Bj"
                  title={t('updates.modal.featureOverviewTitle')} // Use translation key for iframe title
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{t('updates.modal.additionalInfoTitle')}</h4> {/* Use translation key */}
              <p className="text-[var(--text-secondary)]">
               {t('updates.modal.placeholder')} {/* Use translation key for placeholder */}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface UpdatesProps {}

interface Metric {
  value: string;
  label: string;
}

interface CaseStudyItem {
  titleKey: string; // Use translation key for title
  icon: React.ElementType;
  descriptionKey: string; // Use translation key for description
  metricsKeys: { valueKey: string; labelKey: string }[]; // Use translation keys for metrics
}

const Updates: React.FC<UpdatesProps> = () => {
  const { theme } = useTheme();
  const { t } = useLanguage(); // Use the translation hook
  const [selectedUpdate, setSelectedUpdate] = useState<UpdateItem | null>(null);

  const caseStudies: CaseStudyItem[] = [
    {
      titleKey: 'updates.caseStudy.title',
      icon: PerformanceIcon,
      descriptionKey: 'updates.caseStudy.description',
      metricsKeys: [
        { valueKey: 'updates.caseStudy.metricPlaceholder', labelKey: 'updates.caseStudy.metricPlaceholder' },
        { valueKey: 'updates.caseStudy.metricPlaceholder', labelKey: 'updates.caseStudy.metricPlaceholder' }
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--primary)] text-[var(--text-primary)] py-20 px-6">
      <div className="max-w-7xl mx-auto mb-12">
        <Link
          to="/"
          className="inline-flex items-center mt-8 text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors mb-8"
        >
          <CloudinaryArrowIcon className="mr-2 rotate-180"/>
          {t('backToHome')} {/* Use translation key */}
        </Link>
        <h1 className="text-4xl font-bold mb-4">{t('updates.pageTitle')}</h1> {/* Use translation key */}
        <p className="text-[var(--text-secondary)]">
          {t('updates.pageSubtitle')} {/* Use translation key */}
        </p>
      </div>

      {/* Feature Slider - updatesData will be translated in data/updates.ts */}
      <div className="max-w-7xl mx-auto mb-16">
        <UpdateSlider updates={updatesData} />
      </div>

      {/* Case Studies */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">{t('updates.impactTitle')}</h2> {/* Use translation key */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <CaseStudy key={index} {...study} />
          ))}
        </div>
      </div>

      {/* Updates Grid - updatesData will be translated in data/updates.ts */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">{t('updates.allUpdatesTitle')}</h2> {/* Use translation key */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updatesData.map((update, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                onClick={() => setSelectedUpdate(update)}
                className="group relative bg-[var(--secondary)] rounded-xl p-6 border border-[var(--border)] cursor-pointer"
              >
                <div
                  className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{
                    background: 'radial-gradient(circle at center, var(--accent-primary), transparent)'
                  }}
                />

                <div className="relative z-10">
                  <div className="text-[var(--accent-primary)] text-2xl mb-4">
                    {/* Render icon using img tag and iconUrl */}
                    {update.iconUrl && <img src={update.iconUrl} alt={t(update.titleKey) || update.originalTitle} className="w-8 h-8" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t(update.titleKey)}</h3>
                  <p className="text-[var(--text-secondary)] mb-4">{t(update.descriptionKey)}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{t(update.dateKey)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedUpdate && (
          <UpdateModal
            update={selectedUpdate}
            onClose={() => setSelectedUpdate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Updates;