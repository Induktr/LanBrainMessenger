import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const ScrollAnimation = ({ 
  children, 
  animation = "fadeIn", 
  duration = 0.6, 
  delay = 0,
  threshold = 0.2,
  once = true,
  className = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold: threshold,
    once: once 
  });
  const controls = useAnimation();

  // Predefined animations
  const animations = {
    fadeIn: {
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease: "easeOut" }
      },
      hidden: { 
        opacity: 0, 
        y: 50 
      }
    },
    slideUp: {
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease: "easeOut" }
      },
      hidden: { 
        opacity: 0, 
        y: 100 
      }
    },
    slideRight: {
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease: "easeOut" }
      },
      hidden: { 
        opacity: 0, 
        x: -100 
      }
    },
    slideLeft: {
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease: "easeOut" }
      },
      hidden: { 
        opacity: 0, 
        x: 100 
      }
    },
    scale: {
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, delay, ease: "easeOut" }
      },
      hidden: { 
        opacity: 0, 
        scale: 0.8 
      }
    },
    rotate: {
      visible: { 
        opacity: 1, 
        rotate: 0,
        transition: { duration, delay, ease: "easeOut" }
      },
      hidden: { 
        opacity: 0, 
        rotate: -180 
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
