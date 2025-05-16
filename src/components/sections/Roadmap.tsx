import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../context/LanguageContext';

interface RoadmapIconProps {
  src: string;
  alt: string;
  className?: string;
}

const RoadmapIcon: React.FC<RoadmapIconProps> = ({ src, alt, className = '' }) => (
  <img
    src={src}
    alt={alt}
    className={`w-7 h-7 ${className}`}
  />
);

const ROADMAP_ICONS = {
  projectLaunch: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644805/the-icon-can-be-in-the-form-of-a-rocket-symbolizin_1_aqjhcb.svg',
  security: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734709936/the-icon-can-be-in-the-form-of-a-castle-or-a-shiel_y7dvnn.svg',
  advancedcoloboration: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644805/abstract-circles-connected-by-lines-symbolizing-wo_1_qpcktc.svg',
  mobile: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734645805/the-icon-can-be-in-the-form-of-a-smartphone-surrou_bzqgts.svg',
  authentication: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734617743/Frame_15_gm8mjh.svg',
  ai: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734722860/--a-brain-with-lines-connecting-different-points--_b2ijx1.svg',
  global: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734708164/boldly-change-the-proportions--for-example--enlarg_tunm1s.svg',
  ecosystem: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644803/--a-shield-symbol-with-elements-representing-prote_1_onovon.svg',
  future: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644803/--the-light-bulb-as-a-symbol-of-an-idea--but-styli_1_ivsjpw.svg'
};

interface Milestone {
  dateKey: string;
  titleKey: string;
  descriptionKey: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  icon: React.ReactNode;
  featuresKeys: string[];
}

interface RoadmapProps {}

const Roadmap: React.FC<RoadmapProps> = () => {
  const { theme } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const { t } = useLanguage();

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const milestones: Milestone[] = [
    {
      dateKey: 'roadmap.date.jan2024',
      titleKey: 'roadmap.title.projectLaunch',
      descriptionKey: 'roadmap.description.projectLaunch',
      status: 'completed',
      icon: (
        <RoadmapIcon
          src={ROADMAP_ICONS.projectLaunch}
          alt={t('roadmap.iconAlt.projectLaunch')}
        />
      ),
      featuresKeys: [
        'roadmap.features.secureMessagingInfrastructure',
        'roadmap.features.crossPlatformCompatibility',
        'roadmap.features.basicUserInterface'
      ]
    },
    {
      dateKey: 'roadmap.date.mar2024',
      titleKey: 'roadmap.title.enhancedSecurity',
      descriptionKey: 'roadmap.description.enhancedSecurity',
      status: 'upcoming',
      icon: (
        <RoadmapIcon
          src={ROADMAP_ICONS.security}
          alt={t('roadmap.iconAlt.enhancedSecurity')}
        />
      ),
      featuresKeys: [
        'roadmap.features.endToEndEncryption',
        'roadmap.features.twoFactorAuthentication',
        'roadmap.features.fileSharingCapabilities'
      ]
    },
    {
      dateKey: 'roadmap.date.jun2024',
      titleKey: 'roadmap.title.advancedCollaboration',
      descriptionKey: 'roadmap.description.advancedCollaboration',
      status: 'upcoming',
      icon: (
        <RoadmapIcon
          src={ROADMAP_ICONS.advancedcoloboration}
          alt={t('roadmap.iconAlt.advancedCollaboration')}
        />
      ),
      featuresKeys: [
        'roadmap.features.teamWorkspaces',
        'roadmap.features.realTimeCollaboration',
        'roadmap.features.advancedFileSharing'
      ]
    },
    {
      dateKey: 'roadmap.date.sep2024',
      titleKey: 'roadmap.title.advancedCollaboration',
      descriptionKey: 'roadmap.description.advancedCollaboration',
      status: 'upcoming',
      icon: (
        <RoadmapIcon
          src={ROADMAP_ICONS.advancedcoloboration}
          alt={t('roadmap.iconAlt.advancedCollaboration')}
        />
      ),
      featuresKeys: [
        'roadmap.features.teamWorkspaces',
        'roadmap.features.realTimeCollaboration',
        'roadmap.features.advancedFileSharing'
      ]
    },
    {
      dateKey: 'roadmap.date.nov2024',
      titleKey: 'roadmap.title.mobileEnhancement',
      descriptionKey: 'roadmap.description.mobileEnhancement',
      status: 'upcoming',
      icon: (
        <RoadmapIcon
          src={ROADMAP_ICONS.mobile}
          alt={t('roadmap.iconAlt.mobileEnhancement')}
        />
      ),
      featuresKeys: [
        'roadmap.features.nativeMobileApps',
        'roadmap.features.offlineFunctionality',
        'roadmap.features.pushNotifications'
      ]
    },
    {
      dateKey: 'roadmap.date.jan2025',
      titleKey: 'roadmap.title.aiIntegration',
      descriptionKey: 'roadmap.description.aiIntegration',
      status: 'upcoming',
      icon: (
        <RoadmapIcon
          src={ROADMAP_ICONS.ai}
          alt={t('roadmap.iconAlt.aiIntegration')}
        />
      ),
      featuresKeys: [
        'roadmap.features.smartMessageCategorization',
        'roadmap.features.automatedResponses',
        'roadmap.features.contentAnalysis'
      ]
    },
    {
      dateKey: 'roadmap.date.mar2025',
      titleKey: 'roadmap.title.globalExpansion',
      descriptionKey: 'roadmap.description.globalExpansion',
      status: 'upcoming',
      icon: (
        <RoadmapIcon
          src={ROADMAP_ICONS.global}
          alt={t('roadmap.iconAlt.globalExpansion')}
        />
      ),
      featuresKeys: [
        'roadmap.features.multiLanguageSupport',
        'roadmap.features.regionalDataCenters',
        'roadmap.features.culturalAdaptations'
      ]
    },
    {
      dateKey: 'roadmap.date.jun2025',
      titleKey: 'roadmap.title.enterpriseSolutions',
      descriptionKey: 'roadmap.description.enterpriseSolutions',
      status: 'upcoming',
      icon: (
        <RoadmapIcon
          src={ROADMAP_ICONS.ecosystem}
          alt={t('roadmap.iconAlt.enterpriseSolutions')}
        />
      ),
      featuresKeys: [
        'roadmap.features.advancedAdminControls',
        'roadmap.features.customIntegrations',
        'roadmap.features.enterpriseSupport'
      ]
    },
    {
      dateKey: 'roadmap.date.beyond2025',
      titleKey: 'roadmap.title.futureInnovation',
      descriptionKey: 'roadmap.description.futureInnovation',
      status: 'upcoming',
      icon: (
        <RoadmapIcon
          src={ROADMAP_ICONS.future}
          alt={t('roadmap.iconAlt.futureInnovation')}
        />
      ),
      featuresKeys: [
        'roadmap.features.emergingTechnologies',
        'roadmap.features.communityDrivenFeatures',
        'roadmap.features.platformExpansion'
      ]
    }
  ];

  const getStatusColor = (status: Milestone['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-[var(--accent-primary)]';
      case 'in-progress':
        return 'bg-[var(--accent-red)]';
      default:
        return 'bg-[var(--tertiary)]';
    }
  };

  const getTranslatedStatus = (status: Milestone['status']): string => {
    switch (status) {
      case 'completed':
        return t('roadmap.status.completed');
      case 'in-progress':
        return t('roadmap.status.inProgress');
      default:
        return t('roadmap.status.upcoming');
    }
  };

  const iconVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: -180,
    },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        delay: 0.3 + (index * 0.2),
        duration: 0.6,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    })
  };

  return (
    <div id="roadmap" className="w-full bg-[var(--secondary)] py-20 overflow-hidden">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t('roadmap.title.section')}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            {t('roadmap.subtitle.section')}
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            variants={{
              hidden: { scaleY: 0 },
              visible: {
                scaleY: 1,
                transition: {
                  duration: 1,
                  ease: "easeInOut"
                }
              }
            }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full origin-top bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)]"
          />

          <div className="relative z-10">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.dateKey}
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.2 * index
                    }
                  }
                }}
                className={`flex items-center mb-20 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-5/12">
                  <div className={`p-6 rounded-lg bg-[var(--primary)] shadow-xl backdrop-blur-sm bg-opacity-80 transform transition-all duration-300 hover:scale-105 ${
                    milestone.status === 'completed' ? 'border-l-4 border-[var(--accent-primary)]' : ''
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          variants={iconVariants}
                          custom={index}
                        >
                          {milestone.icon}
                        </motion.div>
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                          {t(milestone.titleKey)}
                        </h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(milestone.status)} text-white`}>
                        {getTranslatedStatus(milestone.status)}
                      </span>
                    </div>
                    <p className="text-[var(--text-secondary)] mb-4">
                      {t(milestone.descriptionKey)}
                    </p>
                    <ul className="space-y-2">
                      {milestone.featuresKeys.map((featureKey, idx) => (
                        <motion.li
                          key={idx}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                  duration: 0.3,
                                  delay: 0.1 * idx
                                }
                              }
                            }}
                            className="flex items-center gap-2 text-[var(--text-secondary)]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                            {t(featureKey)}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="w-2/12 flex justify-center">
                    <motion.div
                      variants={{
                        hidden: { scale: 0 },
                        visible: {
                          scale: 1,
                          transition: {
                            duration: 0.4,
                            delay: 0.2 + (0.1 * index)
                          }
                        }
                      }}
                      className="relative"
                    >
                      <div className={`w-6 h-6 rounded-full ${getStatusColor(milestone.status)} shadow-lg`} />
                      <div className="absolute -inset-2 bg-[var(--accent-primary)] rounded-full opacity-20 animate-ping" />
                    </motion.div>
                  </div>

                  <div className="w-5/12 flex justify-center">
                    <motion.span
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            duration: 0.4,
                            delay: 0.3 + (0.1 * index)
                          }
                        }
                      }}
                      className="text-[var(--text-primary)] font-semibold bg-[var(--primary)] px-4 py-2 rounded-full shadow-md"
                    >
                      {t(milestone.dateKey)}
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

export default Roadmap;
