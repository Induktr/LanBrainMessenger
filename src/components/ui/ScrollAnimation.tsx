import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { GlitchEffect, InertiaEffect, DistortionEffect, FlyingEffect } from '../Effects/AnimationEffects';

type AnimationType =
  | 'fadeIn'
  | 'slideUp'
  | 'slideRight'
  | 'slideLeft'
  | 'scale'
  | 'rotate'
  | 'glitch'
  | 'inertia'
  | 'distortion'
  | 'flying';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation: AnimationType;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  intensity?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation,
  duration,
  delay,
  threshold,
  once = true,
  className,
  intensity,
  direction,
}) => {
  const { ref, controls, isInView } = useScrollAnimation({ once, amount: threshold });

  // Predefined basic animations (kept for backward compatibility)
  const basicAnimations = {
    fadeIn: {
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, delay, ease: 'easeOut' },
      },
      hidden: {
        opacity: 0,
        y: 50,
      },
    },
    slideUp: {
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, delay, ease: 'easeOut' },
      },
      hidden: {
        opacity: 0,
        y: 100,
      },
    },
    slideRight: {
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration, delay, ease: 'easeOut' },
      },
      hidden: {
        opacity: 0,
        x: -100,
      },
    },
    slideLeft: {
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration, delay, ease: 'easeOut' },
      },
      hidden: {
        opacity: 0,
        x: 100,
      },
    },
    scale: {
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration, delay, ease: 'easeOut' },
      },
      hidden: {
        opacity: 0,
        scale: 0.8,
      },
    },
    rotate: {
      visible: {
        opacity: 1,
        rotate: 0,
        transition: { duration, delay, ease: 'easeOut' },
      },
      hidden: {
        opacity: 0,
        rotate: -180,
      },
    },
  };

  const renderAnimatedContent = () => {
    const commonProps = { duration, delay, intensity, direction };
    switch (animation) {
      case 'glitch':
        return isInView ? <GlitchEffect {...commonProps}>{children}</GlitchEffect> : <div style={{ opacity: 0 }}>{children}</div>;
      case 'inertia':
        return isInView ? <InertiaEffect {...commonProps}>{children}</InertiaEffect> : <div style={{ opacity: 0 }}>{children}</div>;
      case 'distortion':
        return isInView ? <DistortionEffect {...commonProps}>{children}</DistortionEffect> : <div style={{ opacity: 0 }}>{children}</div>;
      case 'flying':
        return isInView ? <FlyingEffect {...commonProps}>{children}</FlyingEffect> : <div style={{ opacity: 0 }}>{children}</div>;
      default:
        return (
          <motion.div
            initial="hidden"
            animate={controls} // controls are managed by useScrollAnimation hook
            variants={basicAnimations[animation]}
          >
            {children}
          </motion.div>
        );
    }
  };

  return (
    <div ref={ref} className={className}>
      {renderAnimatedContent()}
    </div>
  );
};

export default ScrollAnimation;
