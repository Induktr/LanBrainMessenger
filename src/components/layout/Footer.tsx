import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaTwitter, FaLinkedin, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface FooterIconProps {
  src: string | undefined;
  alt: string;
  className?: string;
}

interface LinkItem {
  nameKey: string;
  href: string;
  icon: string;
  altKey: string;
}

interface ContactItem {
  icon: string | React.ElementType;
  textKey: string;
  isCustomIcon?: boolean;
  altKey?: string;
}

interface SocialItem {
  icon: React.ElementType;
  href: string;
  labelKey: string;
}

interface SectionData {
  id: string;
  titleKey: string;
  contentKey?: string;
  links?: LinkItem[];
  contacts?: ContactItem[];
  socials?: SocialItem[];
}

const FOOTER_ICONS = {
  home: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644803/a-stylized-minimalist-house--but-with-abstract-ele_1_d0oh7v.svg',
  faq: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644805/question-mark-or-dialog-cloud----make-the-question_nnegz0.svg',
  features: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644807/abstract-representation-of-functions----several-la_1_maddfq.svg',
  news: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644807/--an-open-newspaper-with-wavy-lines-symbolizing-th_aq6t4l.svg',
  roadmap: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644803/arrow-pointing-to-the-path----abstract-path-in-the_jbuw0m.svg',
  quickLinks: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644807/an-abstract-node-of-connected-lines-or-circles-rep_mnvo88.svg',
  emailIcon: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734644803/--transform-a-standard-envelope-into-a-more-creati_1_o9pccu.svg'
};

const FooterIcon: React.FC<FooterIconProps> = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={`w-6 h-6 ${className || ''}`} />
);

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const location = useLocation();

  const sections = React.useMemo((): SectionData[] => [
    {
      id: 'brand',
      titleKey: 'footer.sectionTitle.brand',
      contentKey: 'footer.brandContent'
    },
    {
      id: 'quickLinks',
      titleKey: 'footer.sectionTitle.quickLinks',
      links: [
        { nameKey: 'footer.quickLinks.home', href: '#', icon: FOOTER_ICONS.home, altKey: 'footer.quickLinks.home' },
        { nameKey: 'footer.quickLinks.features', href: '#features', icon: FOOTER_ICONS.features, altKey: 'footer.quickLinks.features' },
        { nameKey: 'footer.quickLinks.news', href: '#updates', icon: FOOTER_ICONS.news, altKey: 'footer.quickLinks.news' },
        { nameKey: 'footer.quickLinks.roadmap', href: '#roadmap', icon: FOOTER_ICONS.roadmap, altKey: 'footer.quickLinks.roadmap' },
        { nameKey: 'footer.quickLinks.faq', href: '#faq', icon: FOOTER_ICONS.faq, altKey: 'footer.quickLinks.faq' },
        { nameKey: 'footer.quickLinks.doc', href: '/docs', icon: FOOTER_ICONS.quickLinks, altKey: 'footer.quickLinks.doc' }
      ]
    },
    {
      id: 'contact',
      titleKey: 'footer.sectionTitle.contact',
      contacts: [
        {
          icon: FOOTER_ICONS.emailIcon,
          textKey: 'footer.contact.email', // Key for the email address
          isCustomIcon: true,
          altKey: 'footer.iconAlt.email'
        },
      ]
    },
    {
      id: 'social',
      titleKey: 'footer.sectionTitle.social',
      socials: [
        { icon: FaTwitter, href: '#', labelKey: 'footer.social.twitter' },
        { icon: FaLinkedin, href: '#', labelKey: 'footer.social.linkedin' }
      ]
    }
  ], [t]); // t is a dependency for React.useMemo if translations influence the structure, though here it's mainly for consistency.

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

  const handleNavigation = (link: LinkItem) => {
    if (link.href.startsWith('#')) {
      const elementId = link.href.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = link.href;
    }
  };

  const renderSectionContent = () => {
    const section = sections[currentSectionIndex];

    switch (section.id) {
      case 'brand':
        return (
          <div className="text-center transform transition-all duration-500">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              {t(section.titleKey)}
            </h2>
            {section.contentKey && (
              <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
                {t(section.contentKey)}
              </p>
            )}
          </div>
        );

      case 'quickLinks':
        return (
          <div className="text-center transform transition-all duration-500">
            <div className="flex items-center justify-center gap-3 mb-8">
              <FooterIcon src={FOOTER_ICONS.quickLinks} alt={t('footer.iconAlt.quickLinks')} className="w-8 h-8" />
              <h3 className="text-2xl font-semibold text-[var(--text-primary)]">{t(section.titleKey)}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {section.links?.map((link, index) => (
                link.href.startsWith('#') ? (
                  <button
                    key={index}
                    onClick={() => handleNavigation(link)}
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-[var(--primary)] rounded-lg text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:scale-105 transition-all duration-300"
                  >
                    <FooterIcon src={link.icon} alt={t(link.altKey)} />
                    {t(link.nameKey)}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={link.href}
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-[var(--primary)] rounded-lg text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:scale-105 transition-all duration-300"
                  >
                    <FooterIcon src={link.icon} alt={t(link.altKey)} />
                    {t(link.nameKey)}
                  </Link>
                )
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="text-center transform transition-all duration-500">
            <h3 className="text-2xl font-semibold mb-8 text-[var(--text-primary)]">{t(section.titleKey)}</h3>
            <div className="space-y-6 max-w-2xl mx-auto">
              {section.contacts?.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-300 group"
                >
                  {contact.isCustomIcon ? (
                    <FooterIcon src={contact.icon as string} alt={contact.altKey ? t(contact.altKey) : ''} className="text-3xl" />
                  ) : (
                    React.createElement(contact.icon as React.ElementType, { key: index, className: "text-3xl text-[var(--accent-primary)]" })
                  )}
                  <span className="text-lg">{t(contact.textKey)}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="text-center transform transition-all duration-500">
            <h3 className="text-2xl font-semibold mb-8 text-[var(--text-primary)]">{t(section.titleKey)}</h3>
            <div className="flex justify-center space-x-6">
              {section.socials?.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-4 rounded-full bg-[var(--primary)] text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:scale-110 transition-all duration-300"
                  aria-label={t(social.labelKey)}
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
            aria-label={t('footer.previousSection')}
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
            aria-label={t('footer.nextSection')}
          >
            <FaChevronDown size={20} />
          </button>
        )}
      </div>

      {/* Copyright - Always visible */}
      <div className="border-t border-[var(--border)] bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-center text-[var(--text-muted)]">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
