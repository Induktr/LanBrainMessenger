import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { heroVariants, calculateParallax } from '../Hero/animations';
import styles from '../../styles/Hero.module.css';
import { useLanguage } from '../../context/LanguageContext'; // Import useLanguage

interface HeroProps {} // Define an empty interface for component props

const Hero: React.FC<HeroProps> = () => {
  const [showDownloadMenu, setShowDownloadMenu] = useState<boolean>(false); // Explicitly type boolean
  const [hoveredButton, setHoveredButton] = useState<string | null>(null); // Explicitly type string or null
  const downloadButtonRef = useRef<HTMLDivElement>(null); // Explicitly type the ref element

  const { t } = useLanguage(); // Use the translation hook

  // Motion values for parallax effect
  const rotateX = useMotionValue<number>(0); // Explicitly type number
  const rotateY = useMotionValue<number>(0); // Explicitly type number

  const modifyIconColor = (svgUrl: string): string => { // Add type annotations
    return `${svgUrl}?tint=f0f0f0f0&tint-mode=multiply`;
  };

  const handleMouseLeave = (): void => { // Add type annotation for return type
    setHoveredButton(null);
    // Reset parallax effect
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.section
      variants={heroVariants.container}
      initial="hidden"
      animate="show"
      className={`pt-10 sm:pt-12 md:pt-20 lg:pt-24 pb-6 sm:pb-8 md:pb-12 lg:pb-16 ${styles.neuralConnection}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            variants={heroVariants.title}
            className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0"
          >
            <motion.h1
              data-text={t('hero.title')} // Use translation key
              className={`${styles.glitchText} text-[#F0F0F0] text-[var(--text-primary)] text-[18px] sm:text-[20px] md:text-[24px] font-bold mb-3 sm:mb-4 md:mb-6`}
              variants={heroVariants.title}
            >
              {t('hero.title')} {/* Use translation key */}
            </motion.h1>

            <motion.p
              variants={heroVariants.paragraph}
              className="text-[#a6a6a6] text-[var(--text-secondary)] text-[13px] sm:text-[14px] md:text-[16px] mb-5 sm:mb-6 md:mb-8 max-w-[90%] mx-auto lg:mx-0"
            >
              {t('hero.subtitle')} {/* Use translation key */}
            </motion.p>

            <motion.div
              variants={heroVariants.buttons}
              className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >

              <div className="relative" ref={downloadButtonRef}>
                <motion.button
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                  className={`${styles.circularDistort} group inline-flex items-center gap-2 w-full bg-[var(--secondary)] sm:w-auto bg-[#2e2e2e] text-[var(--text-primary)] text-[#F0F0F0] px-6 md:px-8 py-3 rounded-full hover:bg-[#96c93d] hover:text-[#1a1a1a] transition-colors text-[13px] sm:text-[14px] md:text-[16px]`}
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
                  {t('hero.downloadButton')} {/* Use translation key */}
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
                          {t('hero.downloadWindows')} {/* Use translation key */}
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
                          {t('hero.downloadAndroid')} {/* Use translation key */}
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