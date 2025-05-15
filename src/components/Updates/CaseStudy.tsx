import React from 'react';
import { motion } from 'framer-motion';

interface Metric {
  value: string; // Assuming value is displayed as text
  label: string;
}

interface CaseStudyProps {
  title: string;
  metrics: Metric[]; // Apply Metric interface to the metrics array
  description: string;
  icon?: React.ElementType; // icon is a component, make optional based on usage
}

const CaseStudy: React.FC<CaseStudyProps> = ({ title, metrics, description, icon: Icon }) => {
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
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-[var(--text-secondary)] mb-4">{description}</p>
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-[var(--accent-primary)]">
                  {metric.value}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudy;