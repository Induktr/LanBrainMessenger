import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiBell, FiTrash2, FiSettings } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderIconProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const HeaderIcon: React.FC<HeaderIconProps> = ({ src, alt = '', className = '', style }) => (
  <img src={src} alt={alt} className={`w-5 h-5 ${className}`} style={style} />
);

const HEADER_ICONS = {
  globe: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734710237/turn-a-globe-into-an-abstract-geometric-sphere-mad_kbhymc.svg',
  sun: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734707359/boldly-change-the-proportions--for-example--enlarg_3_gstwrj.svg',
  moon: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734707285/boldly-change-the-proportions--for-example--enlarg_8_efnayy.svg',
  download: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734767932/dynamic-arrow-with-progress-bar---description--ins_pihvav.svg',
  fiChevronDown: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734887883/--idea--the-background-of-the-arrow-is-represented_btmay9.svg',
  defaultAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgNC44NCAyLjE3IDQuODQgNC44NCAwIDIuNjctMi4xNyA0Ljg0LTQuODQgNC44NC0yLjY3IDAtNC44NC0yLjE3LTQuODQtNC44NCAwLTIuNjcgMi4xNy00Ljg0IDQuODQtNC44NHptMCAxMmE4LjE0IDguMTQgMCAwIDEtNi43Mi0zLjU4Yy4wMy0yLjI0IDQuNDgtMy40NyA2LjcyLTMuNDcgMi4yNCAwIDYuNjkgMS4yMyA2LjcyIDMuNDdBOC4xNCA4LjE0IDAgMCAxIDEyIDE3eiIgZmlsbD0iY3VycmVudENvbG9yIi8+PC9zdmc+'
};

interface HeaderProps {
  children?: React.ReactNode;
}

interface MenuItem {
  name: string;
  to: string;
  type: 'scroll' | 'route';
}

interface Notification {
  id: string | number; // Assuming id can be string or number based on usage
  message: string;
  timestamp: string;
  read: boolean;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, changeLanguage, languages, t, isLoading } = useLanguage();
  const navigate = useNavigate();
  const langMenuRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { name: t('features'), to: 'features', type: 'scroll' },
    { name: t('faq'), to: '/faq', type: 'route' },
    { name: t('docs'), to: '/docs', type: 'route' }
  ];

  const renderNavLink = (item: MenuItem) => {
    if (item.type === 'scroll') {
      return (
        <a
          key={item.name}
          href={`#${item.to}`}
          className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
            document.getElementById(item.to)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {item.name}
        </a>
      );
    }
    return (
      <Link
        key={item.name}
        to={item.to}
        className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
        onClick={() => setIsOpen(false)}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-[var(--primary)] border-b border-[var(--border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[var(--accent-primary)]">
            BrainMessenger
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map(renderNavLink)}

            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                aria-label={t('selectLanguage')}
                title={t('changeLanguageTooltip')}
                disabled={isLoading}
              >
                <img src={HEADER_ICONS.globe} alt="Language" className="w-5 h-5 text-[var(--accent-primary)]" />
                <img
                  src={languages[language]?.flag}
                  alt={languages[language]?.name}
                  className="w-5 h-5 object-contain"
                  style={{ filter: 'brightness(0) saturate(100%) invert(94%) sepia(0%) saturate(0%) hue-rotate(213deg) brightness(105%) contrast(104%)' }}
                />
                <img
                  src={HEADER_ICONS.fiChevronDown}
                  alt="FiChevronDown"
                  className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
                    WebkitFilter: 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                  }}
                />
              </button>

              {/* Language Dropdown */}
              {isLangOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-[var(--primary)] rounded-lg shadow-xl border border-[var(--border)]">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-[var(--secondary)] transition-colors ${
                        language === code ? 'bg-[var(--secondary)]' : ''
                      }`}
                      onClick={() => {
                        changeLanguage(code);
                        setIsLangOpen(false);
                      }}
                    >
                      <img
                        src={lang.flag}
                        alt={lang.name}
                        className="w-5 h-5 object-contain"
                        style={{ filter: 'brightness(0) saturate(100%) invert(94%) sepia(0%) saturate(0%) hue-rotate(213deg) brightness(105%) contrast(104%)' }}
                      />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Download Button */}
            <a
              href="/download/windows"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--primary)] transition-colors"
              download
            >
              <img
                src={HEADER_ICONS.download}
                alt="Download"
                className="w-5 h-5"
                style={{ filter: 'brightness(0) saturate(100%) invert(10%) sepia(0%) saturate(7495%) hue-rotate(224deg) brightness(95%) contrast(88%)' }}
              />
              Download
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
              aria-label={isDark ? t('lightMode') : t('darkMode')}
            >
              {isDark ? (
                <HeaderIcon src={HEADER_ICONS.sun} alt="Light Mode" className="text-[var(--accent-primary)]" />
              ) : (
                <HeaderIcon src={HEADER_ICONS.moon} alt="Dark Mode" className="text-[var(--accent-primary)]" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('closeMenu') : t('openMenu')}
          >
            {isOpen ? (
              <FiX className="w-6 h-6 text-[var(--text-primary)]" />
            ) : (
              <FiMenu className="w-6 h-6 text-[var(--text-primary)]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map(renderNavLink)}

              {/* Mobile Language Selector */}
              <div className="py-2 border-t border-[var(--border)]">
                <p className="px-2 py-1 text-sm text-[var(--text-secondary)]">{t('selectLanguage')}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      onClick={() => {
                        changeLanguage(code);
                        setIsOpen(false);
                      }}
                      disabled={isLoading}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                        ${language === code
                          ? 'bg-[var(--accent-primary)] text-[var(--primary)]'
                          : 'hover:bg-[var(--secondary)] text-[var(--text-primary)]'}
                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <img
                        src={lang.flag}
                        alt={lang.name}
                        className="w-5 h-5 object-contain"
                        style={{ filter: 'brightness(0) saturate(100%) invert(94%) sepia(0%) saturate(0%) hue-rotate(213deg) brightness(105%) contrast(104%)' }}
                      />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Download Button */}
              <a
                href="/download/windows"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--primary)] transition-colors"
                download
              >
                <img
                  src={HEADER_ICONS.download}
                  alt="Download"
                  className="w-5 h-5"
                  style={{ filter: 'brightness(0) saturate(100%) invert(10%) sepia(0%) saturate(7495%) hue-rotate(224deg) brightness(95%) contrast(88%)' }}
                />
                Download for Windows
              </a>

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
              >
                {isDark ? (
                  <>
                    <HeaderIcon src={HEADER_ICONS.sun} alt="Light Mode" className="text-[var(--accent-primary)]" />
                    <span>{t('lightMode')}</span>
                  </>
                ) : (
                  <>
                    <HeaderIcon src={HEADER_ICONS.moon} alt="Dark Mode" className="text-[var(--accent-primary)]" />
                    <span>{t('darkMode')}</span>
                  </>
                )}
              </button>
            </nav>
          </div>
        )}
        {children} {/* Render children here */}
      </div>
    </header>
  );
};

export default Header;