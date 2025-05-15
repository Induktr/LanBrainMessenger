import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-[#2e2e2e] bg-[var(--secondary)] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="w-8 h-8 text-[#96c93d] mb-4">
        {icon}
      </div>
      <h3 className="text-[20px] text-[var(--accent-primary)] font-semibold text-[#96c93d] mb-2">{title}</h3>
      <p className="text-[#a6a6a6] text-[var(--text-secondary)] ">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;