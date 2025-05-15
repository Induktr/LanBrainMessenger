import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaTwitter, FaLinkedin, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const FOOTER_ICONS = {
  home: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644803/a-stylized-minimalist-house--but-with-abstract-ele_1_d0oh7v.svg',
  faq: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644805/question-mark-or-dialog-cloud----make-the-question_nnegz0.svg',
  features: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644807/abstract-representation-of-functions----several-la_1_maddfq.svg',
  news: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644807/--an-open-newspaper-with-wavy-lines-symbolizing-th_aq6t4l.svg',
  poll: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644803/graph-or-checkbox----stylized-graph-with-multicolo_1_vxzc1t.svg',
  roadmap: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644803/arrow-pointing-to-the-path----abstract-path-in-the_jbuw0m.svg',
  quickLinks: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644807/an-abstract-node-of-connected-lines-or-circles-rep_mnvo88.svg'
};

const FooterIcon = ({ src, alt = '', className = '' }) => (
  <img src={src} alt={alt} className={`w-6 h-6 ${className}`} />
);

const sections = [
  {
    id: 'brand',
    title: 'Brain Messenger',
    content: 'Connecting minds by empowering communication through innovative messaging solutions'
  },
  {
    id: 'quickLinks',
    title: 'Quick Links',
    links: [
      { name: 'Home', href: '#', icon: FOOTER_ICONS.home },
      { name: 'Features', href: '#features', icon: FOOTER_ICONS.features },
      { name: 'News', href: '#updates', icon: FOOTER_ICONS.news },
      { name: 'Roadmap', href: '#roadmap', icon: FOOTER_ICONS.roadmap },
      { name: 'FAQ', href: '#faq', icon: FOOTER_ICONS.faq },
      { name: 'Poll', href: '#poll', icon: FOOTER_ICONS.poll }
    ]
  },
  {
    id: 'contact',
    title: 'Contact Us',
    contacts: [
      { 
        icon: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644803/--transform-a-standard-envelope-into-a-more-creati_1_o9pccu.svg', 
        text: 'contact@webbrainmessenger.com',
        isCustomIcon: true 
      },
    ]
  },
  {
    id: 'social',
    title: 'Follow Us',
    socials: [
      { icon: FaTwitter, href: '#' },
      { icon: FaLinkedin, href: '#' }
    ]
  }
];

const Footer = () => {
  const { theme } = useTheme();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const location = useLocation();

  const goToNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleNavigation = (link) => {
    if (location.pathname !== '/' && (link.name === 'Home' || link.name === 'Features' || link.name === 'Roadmap')) {
      window.location.href = '/';
    } else {
      // Remove the '#' from the href before using querySelector
      const elementId = link.href.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderSectionContent = () => {
    const section = sections[currentSectionIndex];

    switch (section.id) {
      case 'brand':
        return (
          <div className="text-center transform transition-all duration-500">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              {section.title}
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              {section.content}
            </p>
          </div>
        );

      case 'quickLinks':
        return (
          <div className="text-center transform transition-all duration-500">
            <div className="flex items-center justify-center gap-3 mb-8">
              <FooterIcon src={FOOTER_ICONS.quickLinks} alt="Quick Links" className="w-8 h-8" />
              <h3 className="text-2xl font-semibold text-[var(--text-primary)]">{section.title}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {section.links.map((link, index) => {
                // Handle special cases for News, FAQ, and Poll
                if (link.name === 'News') {
                  return (
                    <Link
                      key={index}
                      to="/updates"
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-[var(--primary)] rounded-lg text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:scale-105 transition-all duration-300"
                    >
                      <FooterIcon src={link.icon} alt={link.name} />
                      {link.name}
                    </Link>
                  );
                }
                if (link.name === 'FAQ') {
                  return (
                    <Link
                      key={index}
                      to="/faq"
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-[var(--primary)] rounded-lg text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:scale-105 transition-all duration-300"
                    >
                      <FooterIcon src={link.icon} alt={link.name} />
                      {link.name}
                    </Link>
                  );
                }
                if (link.name === 'Poll') {
                  return (
                    <Link
                      key={index}
                      to="/poll"
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-[var(--primary)] rounded-lg text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:scale-105 transition-all duration-300"
                    >
                      <FooterIcon src={link.icon} alt={link.name} />
                      {link.name}
                    </Link>
                  );
                }
                // For Home, Features, and Roadmap links
                if (link.name === 'Home' || link.name === 'Features' || link.name === 'Roadmap') {
                  return (
                    <button
                      key={index}
                      onClick={() => handleNavigation(link)}
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-[var(--primary)] rounded-lg text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:scale-105 transition-all duration-300"
                    >
                      <FooterIcon src={link.icon} alt={link.name} />
                      {link.name}
                    </button>
                  );
                }
                // For other links
                return (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-[var(--primary)] rounded-lg text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:scale-105 transition-all duration-300"
                  >
                    <FooterIcon src={link.icon} alt={link.name} />
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="text-center transform transition-all duration-500">
            <h3 className="text-2xl font-semibold mb-8 text-[var(--text-primary)]">{section.title}</h3>
            <div className="space-y-6 max-w-2xl mx-auto">
              {section.contacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-300 group"
                >
                  {contact.isCustomIcon ? (
                    <FooterIcon src={contact.icon} alt={contact.text} className="text-3xl" />
                  ) : (
                    <contact.icon className="text-3xl text-[var(--accent-primary)]" />
                  )}
                  <span className="text-lg">{contact.text}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="text-center transform transition-all duration-500">
            <h3 className="text-2xl font-semibold mb-8 text-[var(--text-primary)]">{section.title}</h3>
            <div className="flex justify-center space-x-6">
              {section.socials.map((social, index) => (
                <a
                  key={index}
                  href="https://x.com/Nikitsglost5"
                  className="p-4 rounded-full bg-[var(--primary)] text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:scale-110 transition-all duration-300"
                >
                  <social.icon size={28} />
                </a>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <footer className="w-full bg-[var(--secondary)] text-[var(--text-primary)] flex flex-col relative">
      {/* Navigation Arrows */}
      <div className="flex-1 flex flex-col items-center justify-between py-16 px-4 sm:px-6 lg:px-8">
        {currentSectionIndex > 0 && (
          <button
            onClick={goToPreviousSection}
            className="absolute top-[15px] left-1/2 -translate-x-1/2 p-3 rounded-full text-[var(--text-secondary)] hover:text-[var(--accent-primary)] z-10"
          >
            <FaChevronUp size={20} />
          </button>
        )}

        {/* Section Content */}
        <div className="w-full max-w-7xl mx-auto">
          {renderSectionContent()}
        </div>

        {currentSectionIndex < sections.length - 1 && (
          <button
            onClick={goToNextSection}
            className="absolute bottom-[60px] left-1/2 -translate-x-1/2 p-3 rounded-full text-[var(--text-secondary)] hover:text-[var(--accent-primary)] z-10"
          >
            <FaChevronDown size={20} />
          </button>
        )}
      </div>

      {/* Copyright - Always visible */}
      <div className="border-t border-[var(--border)] bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-center text-[var(--text-muted)]">
            2024 Brain Messenger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
