// filepath: /home/induktr/WebProject/LanBrainMessenger/src/sections/Features.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FeaturesComponent from '../components/Features/Features'; // Renamed to avoid conflict
import { useTranslation } from '../hooks/useTranslation';

const FEATURES_ICONS = {
  lock: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734645760/use-a-more-geometric-lock-with-slanted-lines-or-ov_aynv46.svg',
  group: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644805/turn-human-figures-into-abstract-circles-connected_sli9yn.svg',
  energy: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734708159/boldly-change-the-proportions--for-example--increa_r2v11j.svg',
  privacy: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734708432/boldly-change-the-proportions--for-example--enlarg_ndehsg.svg',
  crossplatform: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734711471/the-computer-and-telephone-are-depicted-as-minimal_ky36y3.svg',
  roadmap: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644803/arrow-pointing-to-the-path----abstract-path-in-the_jbuw0m.svg',
  quickLinks: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644807/an-abstract-node-of-connected-lines-or-circles-rep_mnvo88.svg'
};

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeaturesSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const featuresTranslations = useTranslation([
    'features.featuresTitle',
    'features.featuresSubtitle',
    'features.secureMessaging',
    'features.secureMessagingDesc',
    'features.smartAssistant',
    'features.smartAssistantDesc',
    'features.crossPlatform',
    'features.crossPlatformDesc',
    // Add other feature keys as needed
  ]);

  const translatedFeatures = featuresTranslations as { [key: string]: string };

  // Construct the featuresData array with all required properties
  const featuresData: FeatureItem[] = [
    {
      icon: <img src={FEATURES_ICONS.lock} alt="Lock" className="w-8 h-8" />,
      title: translatedFeatures.secureMessaging,
      description: translatedFeatures.secureMessagingDesc,
      delay: 0.1,
    },
    {
      icon: <img src={FEATURES_ICONS.energy} alt="Energy" className="w-8 h-8" />,
      title: translatedFeatures.smartAssistant,
      description: translatedFeatures.smartAssistantDesc,
      delay: 0.2,
    },
    {
      icon: <img src={FEATURES_ICONS.group} alt="Group" className="w-8 h-8" />,
      title: translatedFeatures.crossPlatform,
      description: translatedFeatures.crossPlatformDesc,
      delay: 0.3,
    },
    // Add other features with their icons, delays, and translated text
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
            {translatedFeatures.featuresTitle}
          </h2>
          <p className="text-[16px] text-[#a6a6a6] text-[var(--text-secondary)] max-w-2xl mx-auto">
            {translatedFeatures.featuresSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pass the translated data to the FeaturesComponent */}
          <FeaturesComponent features={featuresData} />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
