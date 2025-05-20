import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext'; // Import useLanguage

interface NewsCardProps {
  titleKey: string;
  descriptionKey: string;
  originalTitle?: string;
  iconUrl?: string; // iconUrl is optional based on usage
  isMore?: boolean; // isMore has a default value
  isActive?: boolean; // isActive has a default value
}

const NewsCard: React.FC<NewsCardProps> = ({ titleKey, descriptionKey, originalTitle, iconUrl, isMore = false, isActive = false }) => {
  const { theme } = useTheme();
  const { t } = useLanguage(); // Use the translation hook
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 }); // Explicitly type state

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => { // Add type annotations
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = (): void => { // Add type annotation
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: isActive 
          ? `rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`
          : 'none',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Card glow effect */}
      <motion.div
        className="absolute -inset-2 rounded-2xl opacity-0"
        animate={{
          opacity: isActive ? 0.15 : 0,
          scale: isActive ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at center, var(--accent-primary-transparent), transparent 70%)`,
          filter: 'blur(15px)',
          zIndex: -1
        }}
      />

      {/* Main card content */}
      <motion.div
        className={`relative backdrop-blur-sm rounded-xl p-6 
          ${isMore 
            ? 'bg-[var(--accent-primary)] text-[var(--primary)] hover:bg-[var(--accent-hover)]' 
            : 'bg-[var(--secondary)] border border-[var(--border)]'} 
          transition-colors cursor-pointer group`}
        whileHover={{ scale: isActive ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-start gap-4">
          <div className={`text-2xl ${isMore ? 'text-[var(--primary)]' : 'text-[var(--accent-primary)]'}`}>
            {iconUrl && (
              <img 
                src={iconUrl}
                alt={t(titleKey) || originalTitle}
                className="w-8 h-8 object-contain"
                style={{
                  filter: titleKey === 'updates.items.performanceBoost.title'
                    ? 'brightness(0) saturate(100%) invert(7%) sepia(0%) saturate(0%) hue-rotate(153deg) brightness(103%) contrast(96%)'
                    : 'invert(var(--is-dark))'
                }}
              />
            )}
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold mb-2 ${isMore ? 'text-[var(--primary)]' : 'text-[var(--text-primary)]'}`}>
              {t(titleKey)}
            </h3>
            <p className={isMore ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'}>
              {t(descriptionKey)}
            </p>
          </div>
          {isMore && (
            <motion.div
              className="text-[var(--primary)] text-xl"
              initial={{ x: 0 }}
              animate={{ x: isActive ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* <CustomArrowRight /> */}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewsCard;
