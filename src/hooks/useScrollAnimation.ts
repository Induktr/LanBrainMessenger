import { useEffect, useRef } from 'react';
import { useInView, useAnimation, AnimationControls } from 'framer-motion';

interface UseScrollAnimationOptions {
  once?: boolean;
  amount?: number;
  delay?: number;
}

interface UseScrollAnimationResult {
  ref: React.RefObject<HTMLDivElement>;
  controls: AnimationControls;
  isInView: boolean;
}

export const useScrollAnimation = (options?: UseScrollAnimationOptions): UseScrollAnimationResult => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    amount: options?.amount ?? 0.2, // Trigger when 20% of the element is in view
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!(options?.once ?? true)) { // If not 'once', reset animation when out of view
      controls.start("hidden");
    }
  }, [isInView, controls, options?.once]);

  return { ref, controls, isInView };
};
