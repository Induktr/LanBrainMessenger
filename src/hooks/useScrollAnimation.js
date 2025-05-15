import { useEffect, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
  const [elements, setElements] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Get all elements with data-scroll attribute
    const scrollElements = document.querySelectorAll('[data-scroll]');
    setElements(Array.from(scrollElements));

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // Check if element is in viewport
        if (elementTop < windowHeight * (1 - threshold) && elementBottom > 0) {
          element.classList.add('scroll-animate-in');
        } else {
          element.classList.remove('scroll-animate-in');
        }
      });
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elements, threshold]);

  return scrollPosition;
};
