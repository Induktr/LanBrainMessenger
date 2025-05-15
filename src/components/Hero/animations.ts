export const heroVariants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  },
  
  title: {
    hidden: { 
      opacity: 0,
      y: 20,
      filter: 'blur(10px)'
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  },

  paragraph: {
    hidden: { 
      opacity: 0,
      x: -20
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },

  buttons: {
    hidden: { scale: 0.8, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  },

  image: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -5
    },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  },

  parallax: {
    initial: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }
};

export const calculateParallax = (e: React.MouseEvent<HTMLElement>, depth: number = 20): { rotateX: number; rotateY: number } => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * depth;
  const rotateY = ((centerX - x) / centerX) * depth;
  
  return {
    rotateX: rotateX * 0.5, // Reduced intensity
    rotateY: rotateY * 0.5  // Reduced intensity
  };
};
