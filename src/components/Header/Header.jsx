import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiBell, FiTrash2, FiSettings } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';

const HEADER_ICONS = {
  globe: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734710237/turn-a-globe-into-an-abstract-geometric-sphere-mad_kbhymc.svg',
  sun: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734707359/boldly-change-the-proportions--for-example--enlarg_3_gstwrj.svg',
  moon: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734707285/boldly-change-the-proportions--for-example--enlarg_8_efnayy.svg',
  download: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734767932/dynamic-arrow-with-progress-bar---description--ins_pihvav.svg',
  fiChevronDown: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734887883/--idea--the-background-of-the-arrow-is-represented_btmay9.svg',
  defaultAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgNC44NCAyLjE3IDQuODQgNC44NCAwIDIuNjctMi4xNyA0Ljg0LTQuODQgNC44NC0yLjY3IDAtNC44NC0yLjE3LTQuODQtNC44NCAwLTIuNjcgMi4xNy00Ljg0IDQuODQtNC44NHptMCAxMmE4LjE0IDguMTQgMCAwIDEtNi43Mi0zLjU4Yy4wMy0yLjI0IDQuNDgtMy40NyA2LjcyLTMuNDcgMi4yNCAwIDYuNjkgMS4yMyA2LjcyIDMuNDdBOC4xNCA4LjE0IDAgMCAxIDEyIDE3eiIgZmlsbD0iY3VycmVudENvbG9yIi8+PC9zdmc+'
};

const HeaderIcon = ({ src, alt = '', className = '' }) => (
  <img src={src} alt={alt} className={`w-5 h-5 ${className}`} />
);

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const { isDark, toggleTheme } = useTheme();
  const { language, changeLanguage, languages, t, isLoading } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const langMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  const deleteConfirmRef = useRef(null);

  const menuItems = [
    { name: t('features'), to: 'features', type: 'scroll' },
    { name: t('faq'), to: '/faq', type: 'route' },
    { name: t('poll'), to: '/poll', type: 'route' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (deleteConfirmRef.current && !deleteConfirmRef.current.contains(event.target)) {
        setShowDeleteConfirm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (user) {
      // Subscribe to notifications
      const subscription = supabase
        .channel('poll-notifications')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'poll_votes',
          filter: `poll_id=eq.${user.id}`
        }, payload => {
          const newNotification = {
            id: payload.new.id,
            message: 'New vote on your poll!',
            timestamp: new Date().toISOString(),
            read: false
          };
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const handleNotificationClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (unreadCount > 0) {
      setUnreadCount(0);
      // Mark notifications as read in the database
      const notificationIds = notifications
        .filter(n => !n.read)
        .map(n => n.id);
      
      if (notificationIds.length > 0) {
        supabase
          .from('notifications')
          .update({ read: true })
          .in('id', notificationIds);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setDeleteError('');

      // First delete user's data with cascading deletes
      const deleteUserData = async () => {
        // Delete polls (this will cascade to poll_votes)
        const { error: pollsError } = await supabase
          .from('polls')
          .delete()
          .eq('created_by', user.id);
        if (pollsError) throw pollsError;

        // Delete notifications
        const { error: notifError } = await supabase
          .from('notifications')
          .delete()
          .eq('user_id', user.id);
        if (notifError) throw notifError;
      };

      await deleteUserData();

      // Use the auth context's signOut function
      await supabase.auth.updateUser({
        data: { deleted: true, deleted_at: new Date().toISOString() }
      });

      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      setDeleteError(error.message);
    }
  };

  const renderNavLink = (item) => {
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
                <HeaderIcon src={HEADER_ICONS.globe} alt="Language" className="text-[var(--accent-primary)]" />
                <img 
                  src={languages[language]?.flag} 
                  alt={languages[language]?.name}
                  className="w-5 h-5 object-contain"
                  style={{ filter: 'brightness(0) saturate(100%) invert(94%) sepia(0%) saturate(0%) hue-rotate(213deg) brightness(105%) contrast(104%)' }}
                />
                <HeaderIcon 
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
                      <span className="text-[var(--text-primary)]">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <>
                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={handleNotificationClick}
                    className="p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors relative"
                    aria-label="Notifications"
                  >
                    <FiBell className="w-5 h-5 text-[var(--text-primary)]" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-[var(--primary)] rounded-lg shadow-xl border border-[var(--border)] max-h-96 overflow-y-auto">
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Notifications</h3>
                        {notifications.length > 0 ? (
                          notifications.map(notification => (
                            <div
                              key={notification.id}
                              className={`p-3 mb-2 rounded-lg ${
                                notification.read ? 'bg-[var(--secondary)]' : 'bg-[var(--accent-primary)] bg-opacity-10'
                              }`}
                            >
                              <p className="text-[var(--text-primary)]">{notification.message}</p>
                              <span className="text-xs text-[var(--text-secondary)]">
                                {new Date(notification.timestamp).toLocaleString()}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-[var(--text-secondary)] text-center py-4">No notifications</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                  >
                    <img
                      src={user.user_metadata?.avatar_url || HEADER_ICONS.defaultAvatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <HeaderIcon
                      src={HEADER_ICONS.fiChevronDown}
                      alt=""
                      className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-[var(--primary)] rounded-lg shadow-xl border border-[var(--border)]">
                      <div className="p-4 border-b border-[var(--border)]">
                        <p className="font-semibold text-[var(--text-primary)]">{user.user_metadata?.full_name || 'User'}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/profile/settings"
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--secondary)] rounded-lg transition-colors"
                        >
                          <FiSettings className="w-4 h-4" />
                          {t('settings')}
                        </Link>
                        <button
                          onClick={signOut}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--secondary)] rounded-lg transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                          {t('signOut')}
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-500 hover:bg-red-500 hover:bg-opacity-10 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          {t('deleteAccount')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Delete Account Confirmation Modal */}
                {showDeleteConfirm && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    <div
                      ref={deleteConfirmRef}
                      className="bg-[var(--primary)] rounded-lg p-6 max-w-md mx-4"
                      onClick={e => e.stopPropagation()}
                    >
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                        {t('deleteAccountConfirmTitle')}
                      </h3>
                      <p className="text-[var(--text-secondary)] mb-6">
                        {t('deleteAccountConfirmMessage')}
                      </p>
                      {deleteError && (
                        <p className="text-red-500 mb-4">{deleteError}</p>
                      )}
                      <div className="flex gap-4">
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="flex-1 px-4 py-2 rounded-lg bg-[var(--secondary)] text-[var(--text-primary)] hover:bg-opacity-80 transition-colors"
                        >
                          {t('cancel')}
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          {t('confirmDelete')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--primary)] transition-colors"
              >
                {t('signIn')}
              </Link>
            )}

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
      </div>
    </header>
  );
}

export default Header;