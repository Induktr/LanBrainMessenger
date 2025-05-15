import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import UpdateSlider from '../components/Updates/UpdateSlider';
import CaseStudy from '../components/Updates/CaseStudy';
import {
  ChatIcon,
  SecurityIcon,
  MobileIcon,
  GlobalIcon,
  PerformanceIcon,
  AIIcon,
  AuthIcon,
  ThemeIcon
} from '../components/Icons/UpdateIcons';
import { CloudinaryPlayIcon, CloudinaryArrowIcon, CloudinaryLinkIcon } from '../components/Icons/CloudinaryIcons';

const updatesData = [
  {
    icon: ChatIcon,
    title: 'Enhanced Chat Experience',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    icon: SecurityIcon,
    title: 'Security Updates',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    icon: MobileIcon,
    title: 'Mobile App Redesign',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    icon: GlobalIcon,
    title: 'Global Availability',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    icon: PerformanceIcon,
    title: 'Performance Boost',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    icon: AIIcon,
    title: 'AI Features Integration',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    icon: AuthIcon,
    title: 'Two-Factor Authentication',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  },
  {
    icon: ThemeIcon,
    title: 'Custom Themes',
    description: 'It\'s coming soon',
    date: 'It\'s coming soon'
  }
];

const UpdateModal = ({ update, onClose }) => {
  if (!update) return null;
  const Icon = update.icon;

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
            <Icon size={24} />
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

const Updates = () => {
  const { theme } = useTheme();
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  const caseStudies = [
    {
      title: "It's coming soon...",
      icon: PerformanceIcon,
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
            const Icon = update.icon;
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
                    <Icon size={32} />
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