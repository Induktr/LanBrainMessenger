import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext'; // Import useLanguage

interface MetricItem { // Renamed to avoid conflict if Metric is used elsewhere, and to reflect key usage
  valueKey: string;
  labelKey: string;
}

interface CaseStudyProps {
  titleKey: string;
  metricsKeys: MetricItem[]; // metricsKeys is an array of MetricItem
  descriptionKey: string;
  icon?: React.ElementType; // icon is a component, make optional based on usage
}

const CaseStudy: React.FC<CaseStudyProps> = ({ titleKey, metricsKeys, descriptionKey, icon: Icon }) => {
  const { t } = useLanguage(); // Use the translation hook
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--secondary)] rounded-xl p-6 border border-[var(--border)]"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-full bg-[var(--accent-primary)] bg-opacity-10">
          {Icon && <Icon size={32} />}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{t(titleKey)}</h3>
          <p className="text-[var(--text-secondary)] mb-4">{t(descriptionKey)}</p>
          <div className="grid grid-cols-2 gap-4">
            {metricsKeys.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-[var(--accent-primary)]">
                  {t(metric.valueKey)}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">{t(metric.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudy;