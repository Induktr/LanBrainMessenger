import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import UpdateSlider from '../components/Updates/UpdateSlider';
import CaseStudy from '../components/Updates/CaseStudy';
import { UpdateItem } from '../data/updates'; // Import the shared UpdateItem interface
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

const updatesData: UpdateItem[] = [ // Apply UpdateItem interface
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734715114/--turn-a-text-babble-into-a-more-complex-form--add_sobqo0.svg", // Use iconUrl
    title: 'Enhanced Chat Experience',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734708432/boldly-change-the-proportions--for-example--enlarg_ndehsg.svg", // Use iconUrl
    title: 'Security Updates',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734715324/add-a-light-gradient-to-the-background-that-resemb_nuv27x.svg", // Use iconUrl
    title: 'Mobile App Redesign',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734710237/turn-a-globe-into-an-abstract-geometric-sphere-mad_kbhymc.svg", // Use iconUrl
    title: 'Global Availability',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734708159/boldly-change-the-proportions--for-example--increa_r2v11j.svg", // Use iconUrl
    title: 'Performance Boost',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734715114/--turn-a-text-babble-into-a-more-complex-form--add_sobqo0.svg", // Use iconUrl
    title: 'AI Features Integration',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734708432/boldly-change-the-proportions--for-example--enlarg_ndehsg.svg", // Use iconUrl
    title: 'Two-Factor Authentication',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734715324/add-a-light-gradient-to-the-background-that-resemb_nuv27x.svg", // Use iconUrl
    title: 'Custom Themes',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  }
];

interface UpdateModalProps {
  update: UpdateItem | null;
  onClose: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ update, onClose }) => {
  if (!update) return null;
  // const Icon = update.icon; // No longer a component

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
            {update.iconUrl && <img src={update.iconUrl} alt={update.title} className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">{update.title}</h3>
            <p className="text-[var(--text-secondary)]">{update.date}</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-[var(--text-secondary)] mb-6">{update.description}</p>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Key Features</h4>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>......</li>
                <li>.....</li>
                <li>.....</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Impact Metrics</h4>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[var(--secondary)] p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[var(--accent-primary)]">......</div>
                  <div className="text-sm text-[var(--text-secondary)]">......</div>
                </div>
                <div className="bg-[var(--secondary)] p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[var(--accent-primary)]">.....</div>
                  <div className="text-sm text-[var(--text-secondary)]">.....</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Feature Overview</h4>
              <div className="aspect-video rounded-lg overflow-hidden bg-[var(--secondary)] mb-6">
                <iframe
                  className="w-full h-full"
                  src="https://youtu.be/9cH5Em0F7pc?si=mi9VoAX9xcDfP3Bj"
                  title="Feature Overview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Additional Information</h4>
              <p className="text-[var(--text-secondary)]">
               ..........
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
  title: string;
  icon: React.ElementType; // CaseStudy still expects a component for icon
  description: string;
  metrics: Metric[];
}

const Updates: React.FC<UpdatesProps> = () => {
  const { theme } = useTheme();
  const [selectedUpdate, setSelectedUpdate] = useState<UpdateItem | null>(null);

  const caseStudies: CaseStudyItem[] = [
    {
      title: "It's coming soon...",
      icon: PerformanceIcon, // CaseStudy uses PerformanceIcon component
      description: "At this juncture, the project is only about to commence its launch. Participants will receive updates via notifications and look forward to advancements and project initiation.",
      metrics: [
        { value: ".....", label: "....." },
        { value: "....", label: "......." }
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
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-4">Latest Updates</h1>
        <p className="text-[var(--text-secondary)]">
          Stay informed about our latest features and improvements
        </p>
      </div>

      {/* Feature Slider */}
      <div className="max-w-7xl mx-auto mb-16">
        {/* UpdateSlider expects UpdateItem[], which now has iconUrl */}
        <UpdateSlider updates={updatesData} />
      </div>

      {/* Case Studies */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">Impact & Case Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <CaseStudy key={index} {...study} />
          ))}
        </div>
      </div>

      {/* Updates Grid */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">All Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updatesData.map((update, index) => {
            // const Icon = update.icon; // No longer a component
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
                    {update.iconUrl && <img src={update.iconUrl} alt={update.title} className="w-8 h-8" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{update.title}</h3>
                  <p className="text-[var(--text-secondary)] mb-4">{update.description}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{update.date}</p>
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