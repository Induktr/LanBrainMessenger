import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UpdateItem } from '../../data/updates'; // Import the shared UpdateItem interface

interface UpdateSliderProps {
  updates: UpdateItem[]; // updates is an array of UpdateItem
}

const UpdateSlider: React.FC<UpdateSliderProps> = ({ updates }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold: number = 10000;
  const swipePower = (offset: { x: number; y: number }, velocity: { x: number; y: number }): number => {
    return Math.abs(offset.x) * velocity.x;
  };

  const paginate = (newDirection: number): void => {
    setCurrentIndex((prev) => (prev + newDirection + updates.length) % updates.length);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl bg-[var(--secondary)] mb-12">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset, velocity);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full flex items-center justify-center"
        >
          <div className="w-full max-w-4xl mx-auto px-6 py-12">
            <div className="flex items-center space-x-8">
              <div className="w-1/3">
                {/* Render icon using img tag and iconUrl */}
                {updates[currentIndex].iconUrl && (
                  <img
                    src={updates[currentIndex].iconUrl}
                    alt={updates[currentIndex].title}
                    className="w-20 h-20 object-contain text-[var(--accent-primary)]" // Adjust size and add class
                  />
                )}
              </div>
              <div className="w-2/3">
                <h2 className="text-3xl font-bold mb-4">{updates[currentIndex].title}</h2>
                <p className="text-lg text-[var(--text-secondary)] mb-6">{updates[currentIndex].description}</p>
                <div className="flex items-center text-sm text-[var(--text-secondary)]">
                  <span>{updates[currentIndex].date}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {updates.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-[var(--accent-primary)]"
                : "bg-[var(--text-secondary)] opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default UpdateSlider;
