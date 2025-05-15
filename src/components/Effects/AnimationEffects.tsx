import React from 'react';
import { motion } from 'framer-motion';

interface WindEffectProps {
  children: React.ReactNode;
  className?: string;
}

export const WindEffect: React.FC<WindEffectProps> = ({ children, className }) => {
  const windVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: [0, 1, 0.8, 1],
      scale: [0.8, 1.1, 0.9, 1],
      rotate: [0, 5, -3, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
            "radial-gradient(circle at 60% 60%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)",
            "radial-gradient(circle at 40% 40%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)"
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

interface GlitterEffectProps {
  count?: number; // count has a default value, so it's optional
}

export const GlitterEffect: React.FC<GlitterEffectProps> = ({ count = 12 }) => {
  const glitters = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 3
  }));

  return (
    <>
      {glitters.map((glitter) => (
        <motion.div
          key={glitter.id}
          className="absolute"
          style={{
            width: glitter.size,
            height: glitter.size,
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 0 4px rgba(255,255,255,0.8)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() * 20 - 10],
            y: [0, Math.random() * 20 - 10],
          }}
          transition={{
            duration: glitter.duration,
            delay: glitter.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2
          }}
        />
      ))}
    </>
  );
};

interface OrganicGlareEffectProps {
  className?: string; // className has a default value, so it's optional
  intensity?: number; // intensity has a default value, so it's optional
}

export const OrganicGlareEffect: React.FC<OrganicGlareEffectProps> = ({ className, intensity = 0.6 }) => {
  const glareVariants = {
    hidden: { 
      opacity: 0,
      filter: "blur(20px) brightness(1)",
    },
    visible: {
      opacity: [0.4 * intensity, 0.7 * intensity, 0.5 * intensity],
      filter: [
        "blur(15px) brightness(1.2)",
        "blur(20px) brightness(1.4)",
        "blur(18px) brightness(1.3)"
      ],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror"
      }
    }
  };

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        mixBlendMode: "soft-light",
        background: "linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
        backdropFilter: "blur(8px)",
      }}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8), transparent 70%)",
          mixBlendMode: "overlay",
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: ["0%", "3%", "-2%", "0%"],
          y: ["0%", "-2%", "3%", "0%"],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </motion.div>
  );
};
