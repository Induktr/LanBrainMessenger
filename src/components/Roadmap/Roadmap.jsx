import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const RoadmapIcon = ({ src, alt, className = '' }) => (
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

const Roadmap = () => {
  const { theme } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const milestones = [
    {
      date: 'January 2024',
      title: 'Project Launch',
      description: 'Initial release of BrainMessenger with core messaging functionality',
      status: 'completed',
      icon: (
        <RoadmapIcon 
          src={ROADMAP_ICONS.projectLaunch}
          alt="Project Launch"
        />
      ),
      features: [
        'Secure messaging infrastructure',
        'Cross-platform compatibility',
        'Basic user interface'
      ]
    },
    {
      date: 'March 2024',
      title: 'Enhanced Security & Features',
      description: 'Major security upgrades and new feature implementations',
      status: 'upcoming',
      icon: (
        <RoadmapIcon 
          src={ROADMAP_ICONS.security}
          alt="Enhanced Security"
        />
      ),
      features: [
        'End-to-end encryption',
        'Two-factor authentication',
        'File sharing capabilities'
      ]
    },
    {
      date: 'June 2024',
      title: 'Advanced Collaboration Tools',
      description: 'Introduction of team collaboration features',
      status: 'upcoming',
      icon: (
        <RoadmapIcon 
          src={ROADMAP_ICONS.advancedcoloboration}
          alt="Advanced Collaboration Tools"
        />
      ),
      features: [
        'Team workspaces',
        'Real-time collaboration',
        'Advanced file sharing'
      ]
    },
    {
      date: 'September 2024',
      title: 'Advanced Collaboration Tools',
      description: 'Introduction of team collaboration features',
      status: 'upcoming',
      icon: (
        <RoadmapIcon 
          src={ROADMAP_ICONS.advancedcoloboration}
          alt="Advanced Collaboration Tools"
        />
      ),
      features: [
        'Team workspaces',
        'Real-time collaboration',
        'Advanced file sharing'
      ]
    },
    {
      date: 'November 2024',
      title: 'Mobile Enhancement',
      description: 'Focus on mobile experience and performance',
      status: 'upcoming',
      icon: (
        <RoadmapIcon 
          src={ROADMAP_ICONS.mobile}
          alt="Mobile Enhancement"
        />
      ),
      features: [
        'Native mobile apps',
        'Offline functionality',
        'Push notifications'
      ]
    },
    {
      date: 'January 2025',
      title: 'AI Integration',
      description: 'Implementation of AI-powered features',
      status: 'upcoming',
      icon: (
        <RoadmapIcon 
          src={ROADMAP_ICONS.ai}
          alt="AI Integration"
        />
      ),
      features: [
        'Smart message categorization',
        'Automated responses',
        'Content analysis'
      ]
    },
    {
      date: 'March 2025',
      title: 'Global Expansion',
      description: 'Focus on international markets and localization',
      status: 'upcoming',
      icon: (
        <RoadmapIcon 
          src={ROADMAP_ICONS.global}
          alt="Global Expansion"
        />
      ),
      features: [
        'Multi-language support',
        'Regional data centers',
        'Cultural adaptations'
      ]
    },
    {
      date: 'June 2025',
      title: 'Enterprise Solutions',
      description: 'Dedicated features for enterprise clients',
      status: 'upcoming',
      icon: (
        <RoadmapIcon 
          src={ROADMAP_ICONS.ecosystem}
          alt="Enterprise Solutions"
        />
      ),
      features: [
        'Advanced admin controls',
        'Custom integrations',
        'Enterprise support'
      ]
    },
    {
      date: 'Beyond 2025',
      title: 'Future Innovation',
      description: 'Continuous innovation and feature expansion',
      status: 'upcoming',
      icon: (
        <RoadmapIcon 
          src={ROADMAP_ICONS.future}
          alt="Future Innovation"
        />
      ),
      features: [
        'Emerging technologies',
        'Community-driven features',
        'Platform expansion'
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-[var(--accent-primary)]';
      case 'in-progress':
        return 'bg-[var(--accent-red)]';
      default:
        return 'bg-[var(--tertiary)]';
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    visible: index => ({
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
            Development Roadmap
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Our journey to revolutionize secure messaging
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
                key={milestone.date}
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
                          {milestone.title}
                        </h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(milestone.status)} text-white`}>
                        {milestone.status}
                      </span>
                    </div>
                    <p className="text-[var(--text-secondary)] mb-4">
                      {milestone.description}
                    </p>
                    <ul className="space-y-2">
                      {milestone.features.map((feature, idx) => (
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
                          {feature}
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
                    {milestone.date}
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
