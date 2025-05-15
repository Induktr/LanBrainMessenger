import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FeatureCard from './FeatureCard';
import { FiLock, FiZap, FiUsers, FiGlobe, FiShield } from 'react-icons/fi';

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

const features: FeatureItem[] = [
  {
    icon: <img src={FEATURES_ICONS.lock} alt="Lock" className="w-8 h-8" />,
    title: 'End-to-End Encryption',
    description: 'Your messages are secured with state-of-the-art encryption technology.',
    delay: 0.1
  },
  {
    icon: <img src={FEATURES_ICONS.energy} alt="Energy" className="w-8 h-8" />,
    title: 'Lightning Fast',
    description: 'Experience instant messaging with minimal latency across all devices.',
    delay: 0.2
  },
  {
    icon: <img src={FEATURES_ICONS.group} alt="Group" className="w-8 h-8" />,
    title: 'Group Chats',
    description: 'Create and manage large group conversations with advanced admin tools.',
    delay: 0.3
  },
  {
    icon: <img src={FEATURES_ICONS.crossplatform} alt="Crossplatform" className="w-8 h-8" />,
    title: 'Cross-Platform',
    description: 'Seamlessly sync your chats across all your devices.',
    delay: 0.4
  },
  {
    icon: <img src={FEATURES_ICONS.privacy} alt="Privacy" className="w-8 h-8" />,
    title: 'Privacy First',
    description: 'Your privacy is our priority with customizable security settings.',
    delay: 0.5
  }
];

interface FeaturesProps {} // Define an empty interface for component props

const Features: React.FC<FeaturesProps> = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    // Removed threshold due to potential typing issue with react-intersection-observer version
  });

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
            Why Choose BrainMessenger?
          </h2>
          <p className="text-[16px] text-[#a6a6a6] text-[var(--text-secondary)] max-w-2xl mx-auto">
            Discover the features that make BrainMessenger the smartest choice for your communication needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;