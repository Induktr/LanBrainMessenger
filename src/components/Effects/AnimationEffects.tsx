import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimationEffectProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  intensity?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const GlitchEffect: React.FC<AnimationEffectProps> = ({ children, duration = 1.0, delay = 0, intensity = 1.5 }) => {
  const glitchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: [0, 1, 0.8, 1],
      y: [20, 0, -5, 0],
      x: [0, 0, 8 * intensity, -8 * intensity, 0],
      filter: [
        'hue-rotate(0deg) saturate(1)',
        `hue-rotate(${30 * intensity}deg) saturate(${2 * intensity})`,
        'hue-rotate(0deg) saturate(1)',
      ],
      transition: {
        duration: duration,
        delay: delay,
        ease: 'easeOut',
        filter: { duration: duration * 0.2, ease: 'easeInOut' },
        x: { duration: duration * 0.1, ease: 'easeInOut', repeat: 3, repeatType: 'mirror' },
      },
    },
  };

  return (
    <motion.div variants={glitchVariants}>
      {children}
    </motion.div>
  );
};

export const InertiaEffect: React.FC<AnimationEffectProps> = ({ children, duration = 1.5, delay = 0, direction = 'up' }) => {
  const initialY = direction === 'up' ? 150 : direction === 'down' ? -150 : 0;
  const initialX = direction === 'left' ? 150 : direction === 'right' ? -150 : 0;

  const inertiaVariants = {
    hidden: { opacity: 0, y: initialY, x: initialX },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
        duration: duration,
        delay: delay,
      },
    },
  };

  return (
    <motion.div variants={inertiaVariants}>
      {children}
    </motion.div>
  );
};

export const DistortionEffect: React.FC<AnimationEffectProps> = ({ children, duration = 1.0, delay = 0, intensity = 1.5 }) => {
  const distortionVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      skewX: [0, 8 * intensity, -5 * intensity, 0],
      skewY: [0, -8 * intensity, 5 * intensity, 0],
      transition: {
        duration: duration,
        delay: delay,
        ease: 'easeOut',
        skewX: { duration: duration * 0.3, ease: 'easeInOut' },
        skewY: { duration: duration * 0.3, ease: 'easeInOut', delay: duration * 0.1 },
      },
    },
  };

  return (
    <motion.div variants={distortionVariants}>
      {children}
    </motion.div>
  );
};

export const FlyingEffect: React.FC<AnimationEffectProps> = ({ children, duration = 1.8, delay = 0, direction = 'up' }) => {
  const initialY = direction === 'up' ? 200 : direction === 'down' ? -200 : 0;
  const initialX = direction === 'left' ? 200 : direction === 'right' ? -200 : 0;

  const flyingVariants = {
    hidden: { opacity: 0, y: initialY, x: initialX, rotate: 0 },
    visible: {
      opacity: 1,
      y: [initialY, initialY * 0.6, 0],
      x: [initialX, initialX * 0.6, 0],
      rotate: [0, 15, -8, 0],
      transition: {
        duration: duration,
        delay: delay,
        ease: 'easeOut',
        y: { type: 'spring', stiffness: 60, damping: 12 },
        x: { type: 'spring', stiffness: 60, damping: 12 },
      },
    },
  };

  return (
    <motion.div variants={flyingVariants}>
      {children}
    </motion.div>
  );
};

// Page Transition Effects
interface PageTransitionProps {
  children: React.ReactNode;
  duration?: number;
  glitchIntensity?: number;
}

export const PageTransitionWrapper: React.FC<PageTransitionProps> = ({
  children,
  duration = 1.0,
  glitchIntensity = 1.5,
}) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 80,
      filter: `hue-rotate(${30 * glitchIntensity}deg) saturate(${2 * glitchIntensity})`,
      x: 15 * glitchIntensity,
    },
    in: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: 'hue-rotate(0deg) saturate(1)',
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 18,
        duration: duration,
        filter: { duration: duration * 0.3, ease: 'easeInOut' },
        x: { duration: duration * 0.1, ease: 'easeInOut', repeat: 1, repeatType: 'mirror' },
      },
    },
    out: {
      opacity: 0,
      y: -80,
      filter: `hue-rotate(${30 * glitchIntensity}deg) saturate(${2 * glitchIntensity})`,
      x: -15 * glitchIntensity,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 18,
        duration: duration,
        filter: { duration: duration * 0.3, ease: 'easeInOut' },
        x: { duration: duration * 0.1, ease: 'easeInOut', repeat: 1, repeatType: 'mirror' },
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
