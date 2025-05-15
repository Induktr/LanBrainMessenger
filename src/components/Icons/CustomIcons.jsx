import React from 'react';
import { motion } from 'framer-motion';
import { WindEffect, GlitterEffect } from '../Effects/AnimationEffects';

const iconVariants = {
  hidden: { 
    scale: 0,
    opacity: 0,
    rotate: -180
  },
  visible: { 
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.6
    }
  }
};

const pathVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  }
};

export const CustomChevronLeft = ({ size = 50, className = '', animate = "visible", initial = "hidden", variants = iconVariants }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    variants={variants}
    initial={initial}
    animate={animate}
  >
    <motion.path
      d="M15.4102 19.0898L8.32018 12L15.4102 4.91016"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={pathVariants}
    />
  </motion.svg>
);

export const CustomChevronRight = ({ size = 50, className = '', animate = "visible", initial = "hidden", variants = iconVariants }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    variants={variants}
    initial={initial}
    animate={animate}
  >
    <motion.path
      d="M8.58984 19.0898L15.6798 12L8.58984 4.91016"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={pathVariants}
    />
  </motion.svg>
);

export const CustomArrowRight = ({ size = 50, className = '', animate = "visible", initial = "hidden", variants = iconVariants }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    variants={variants}
    initial={initial}
    animate={animate}
  >
    <motion.path
      d="M13.75 6.75L19.25 12M19.25 12L13.75 17.25M19.25 12H4.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={pathVariants}
    />
  </motion.svg>
);

export const CustomPause = ({ size = 50, className = '', animate = "visible", initial = "hidden", variants = iconVariants }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    variants={variants}
    initial={initial}
    animate={animate}
  >
    <motion.path
      d="M8.25 4.75V19.25M15.75 4.75V19.25"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={pathVariants}
    />
  </motion.svg>
);

export const CustomPlay = ({ size = 50, className = '', animate = "visible", initial = "hidden", variants = iconVariants }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    variants={variants}
    initial={initial}
    animate={animate}
  >
    <motion.path
      d="M5 4.99999V19C5 19.388 5.22446 19.741 5.57584 19.9056C5.92723 20.0702 6.3421 20.0166 6.64018 19.7682L18.6402 10.7682C18.8826 10.5749 19.0233 10.2968 19.0233 9.99999C19.0233 9.70319 18.8826 9.42506 18.6402 9.23174L6.64018 0.231742C6.3421 -0.0166438 5.92723 -0.0702544 5.57584 0.0943602C5.22446 0.258975 5 0.611957 5 0.999992V4.99999Z"
      fill="currentColor"
      variants={pathVariants}
    />
  </motion.svg>
);

export const CustomRocket = ({ size = 50, className = '', animate = "visible", initial = "hidden", variants = iconVariants }) => (
  <WindEffect className="relative">
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      variants={variants}
      initial={initial}
      animate={animate}
    >
      <motion.path
        d="M4.5 16.5L8 20M8 20L11.5 16.5M8 20V13M19.5 7.5L16 4M16 4L12.5 7.5M16 4V11M12 12L19.5 4.5L20 4L19.5 4.5C17.5 6.5 15.5 8.5 13.5 10.5C13.5 10.5 13 11 13 12C13 13 13.5 13.5 13.5 13.5L19.5 19.5L20 20L19.5 19.5L12 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
      />
      <motion.path
        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
      />
    </motion.svg>
    <GlitterEffect count={8} />
  </WindEffect>
);

export const CustomHourglass = ({ size = 50, className = '', animate = "visible", initial = "hidden", variants = iconVariants }) => (
  <WindEffect className="relative">
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      variants={variants}
      initial={initial}
      animate={animate}
    >
      <motion.path
        d="M6.5 4H17.5M6.5 20H17.5M7 4V8L11 12L7 16V20M17 4V8L13 12L17 16V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
      />
    </motion.svg>
    <GlitterEffect count={6} />
  </WindEffect>
);

export const CustomClock = ({ size = 50, className = '', animate = "visible", initial = "hidden", variants = iconVariants }) => (
  <WindEffect className="relative">
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      variants={variants}
      initial={initial}
      animate={animate}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        variants={pathVariants}
      />
      <motion.path
        d="M12 8V12L14 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
      />
    </motion.svg>
    <GlitterEffect count={10} />
  </WindEffect>
);
