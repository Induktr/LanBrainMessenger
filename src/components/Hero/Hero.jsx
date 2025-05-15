import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { heroVariants, calculateParallax } from './animations';
import { useAuth } from '../../context/AuthContext';
import RegistrationForm from '../Auth/RegistrationForm';
import styles from './Hero.module.css';

const Hero = () => {
  const { user } = useAuth();
  const [showRegistration, setShowRegistration] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const downloadButtonRef = useRef(null);

  // Motion values for parallax effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const modifyIconColor = (svgUrl) => {
    return `${svgUrl}?tint=f0f0f0f0&tint-mode=multiply`;
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleClickOutside = (event) => {
      if (downloadButtonRef.current && !downloadButtonRef.current.contains(event.target)) {
        setShowDownloadMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (buttonType) => {
    if (!isMobile) {
      setHoveredButton(buttonType);
    }
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
    // Reset parallax effect
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleParallaxMove = (e) => {
    if (isMobile) return;
    
    const { rotateX: x, rotateY: y } = calculateParallax(e);
    rotateX.set(x);
    rotateY.set(y);
  };

  return (
    <motion.section
      variants={heroVariants.container}
      initial="hidden"
      animate="show"
      className={`pt-12 md:pt-24 pb-8 md:pb-16 ${styles.neuralConnection}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            variants={heroVariants.title}
            className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0"
          >
            <motion.h1
              data-text="Connect Smarter with BrainMessenger"
              className={`${styles.glitchText} text-[#F0F0F0] text-[var(--text-primary)] text-[20px] md:text-[24px] font-bold mb-4 md:mb-6`}
              variants={heroVariants.title}
            >
              Connect Smarter with BrainMessenger
            </motion.h1>
            
            <motion.p
              variants={heroVariants.paragraph}
              className="text-[#a6a6a6] text-[var(--text-secondary)] text-[14px] md:text-[16px] mb-6 md:mb-8 max-w-[90%] mx-auto lg:mx-0"
            >
              Experience the next generation of messaging with advanced features,
              unparalleled security, and seamless communication across all your devices.
            </motion.p>

            <motion.div
              variants={heroVariants.buttons}
              className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              {!user && (
                <motion.button
                  onClick={() => setShowRegistration(true)}
                  className={`${styles.circularDistort} inline-flex items-center gap-2 w-full bg-[var(--accent-primary)] sm:w-auto text-[var(--primary)] px-6 md:px-8 py-3 rounded-full hover:bg-[var(--accent-hover)] transition-colors text-[14px] md:text-[16px]`}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              )}

              <div className="relative" ref={downloadButtonRef}>
                <motion.button
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                  className={`${styles.circularDistort} group inline-flex items-center gap-2 w-full bg-[var(--secondary)] sm:w-auto bg-[#2e2e2e] text-[var(--text-primary)] text-[#F0F0F0] px-6 md:px-8 py-3 rounded-full hover:bg-[#96c93d] hover:text-[#1a1a1a] transition-colors text-[14px] md:text-[16px]`}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative w-5 h-5">
                    <img 
                      src={modifyIconColor("https://res.cloudinary.com/dsjalneil/image/upload/v1734716573/icon--abstract-computer-screen-with-download-eleme_tyqhpo.svg")}
                      alt="Download"
                      className="w-full h-full transition-all duration-200"
                    />
                    <img 
                      src={modifyIconColor("https://res.cloudinary.com/dsjalneil/image/upload/v1734716573/icon--abstract-computer-screen-with-download-eleme_tyqhpo.svg")}
                      alt=""
                      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ 
                        filter: 'brightness(0) saturate(0%) invert(10%) sepia(0%) saturate(0%) hue-rotate(153deg) brightness(10%) contrast(90%)',
                      }}
                    />
                  </div>
                  Download
                </motion.button>

                <AnimatePresence>
                  {showDownloadMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[var(--primary)] ring-1 ring-black ring-opacity-5"
                      style={{ 
                        zIndex: 100,
                        position: 'absolute',
                        top: '100%',
                        marginTop: '0.5rem'
                      }}
                    >
                      <div className="py-1" style={{ position: 'relative', backgroundColor: 'var(--primary)' }}>
                        <a
                          href="public/files/desktop-app.zip"
                          download
                          className="group flex items-center px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-[#1a1a1a] transition-colors"
                          onClick={() => setShowDownloadMenu(false)}
                        >
                          <div className="relative w-5 h-5 mr-2">
                            <img 
                              src={modifyIconColor("https://res.cloudinary.com/dsjalneil/image/upload/v1734716573/icon--abstract-computer-screen-with-download-eleme_tyqhpo.svg")}
                              alt="Windows"
                              className="w-full h-full transition-all duration-200"
                            />
                            <img 
                              src={modifyIconColor("https://res.cloudinary.com/dsjalneil/image/upload/v1734716573/icon--abstract-computer-screen-with-download-eleme_tyqhpo.svg")}
                              alt=""
                              className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              style={{ 
                                filter: 'brightness(0) saturate(0%) invert(10%) sepia(0%) saturate(0%) hue-rotate(153deg) brightness(10%) contrast(90%)',
                              }}
                            />
                          </div>
                          Download for Windows
                        </a>
                        <a
                          href="public/files/android-app.apk"
                          download
                          className="group flex items-center px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-[#1a1a1a] transition-colors"
                          onClick={() => setShowDownloadMenu(false)}
                        >
                          <div className="relative w-5 h-5 mr-2">
                            <img 
                              src={modifyIconColor("https://res.cloudinary.com/dsjalneil/image/upload/v1734721896/stylized-android-logo-with-boot-symbol---abstract-_n2xga7.svg")}
                              alt="Android"
                              className="w-full h-full transition-all duration-200"
                            />
                            <img 
                              src={modifyIconColor("https://res.cloudinary.com/dsjalneil/image/upload/v1734721896/stylized-android-logo-with-boot-symbol---abstract-_n2xga7.svg")}
                              className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              style={{ 
                                filter: 'brightness(0) saturate(0%) invert(10%) sepia(0%) saturate(0%) hue-rotate(153deg) brightness(10%) contrast(90%)',
                              }}
                            />
                          </div>
                          Download for Android
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={heroVariants.image}
            className="lg:w-1/2 mt-8 lg:mt-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div className={`${styles.deviceImage} ${styles.screenGlow} ${styles.deviceShadow}`}>
              <img
                src="https://s1.hostingkartinok.com/uploads/images/2024/12/22c26cd6b4ac5cb85ff007e2e5db8d17.png"
                alt="BrainMessenger App"
                className="w-full max-w-[90%] md:max-w-2xl mx-auto relative"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showRegistration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowRegistration(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[var(--primary)] rounded-xl p-6 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold mb-6">Create Account</h2>
              <RegistrationForm 
                onClose={() => setShowRegistration(false)}
                onSuccess={() => {
                  setShowRegistration(false);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <svg className="hidden">
        <defs>
          <filter id="circular-distortion">
            <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
          </filter>
        </defs>
      </svg>
    </motion.section>
  );
};

export default Hero;