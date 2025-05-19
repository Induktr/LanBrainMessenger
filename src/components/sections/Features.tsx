import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FeatureCard from '../Features/FeatureCard';
import { useLanguage } from '../../context/LanguageContext'; // Import useLanguage

const FEATURES_ICONS = {
  lock: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734645760/use-a-more-geometric-lock-with-slanted-lines-or-ov_aynv46.svg',
  group: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644805/turn-human-figures-into-abstract-circles-connected_sli9yn.svg',
  energy: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734708159/boldly-change-the-proportions--for-example--increa_r2v11j.svg',
  privacy: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734708432/boldly-change-the-proportions--for-example--enlarg_ndehsg.svg',
  crossplatform: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734711471/the-computer-and-telephone-are-depicted-as-minimal_ky36y3.svg',
  // roadmap and quickLinks are not used in this component directly for feature cards
};

interface FeaturesIconProps {
  src: string;
  alt: string; // Alt text will be translated
  className?: string;
}

const FeaturesIcon: React.FC<FeaturesIconProps> = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt} // Alt text is passed directly
    className={`w-7 h-7 ${className}`}
  />
);

interface FeatureItem {
  iconKey: keyof typeof FEATURES_ICONS; // Use a key to look up the icon source
  altKey: string; // Translation key for alt text
  titleKey: string;
  descriptionKey: string;
}

interface FeaturesProps {}

const Features: React.FC<FeaturesProps> = () => {
  const { t } = useLanguage(); // Use the translation hook
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const featuresData: FeatureItem[] = [
    {
      iconKey: 'lock',
      altKey: 'features.secureMessaging', // Assuming alt text can be same as title for simplicity
      titleKey: 'features.secureMessaging',
      descriptionKey: 'features.secureMessagingDesc'
    },
    {
      iconKey: 'energy',
      altKey: 'features.smartAssistant',
      titleKey: 'features.smartAssistant',
      descriptionKey: 'features.smartAssistantDesc'
    },
    {
      iconKey: 'group',
      altKey: 'features.groupChats', // Corrected alt key if it's for group chats
      titleKey: 'features.groupChats',
      descriptionKey: 'features.groupChatsDesc'
    },
    {
      iconKey: 'crossplatform',
      altKey: 'features.crossPlatform',
      titleKey: 'features.crossPlatform',
      descriptionKey: 'features.crossPlatformDesc'
    },
    {
      iconKey: 'privacy',
      altKey: 'features.privacyFirst',
      titleKey: 'features.privacyFirst',
      descriptionKey: 'features.privacyFirstDesc'
    }
  ];


  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-[16px] mb-16"
        >
          <h2 className="text-[24px] text-[var(--text-primary)]  font-bold text-[#f0f0f0] mb-4">
            {t('features.featuresTitle')}
          </h2>
          <p className="text-[16px] text-[#a6a6a6] text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t('features.featuresSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={<FeaturesIcon src={FEATURES_ICONS[feature.iconKey]} alt={t(feature.altKey)} />}
              title={t(feature.titleKey)}
              description={t(feature.descriptionKey)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;