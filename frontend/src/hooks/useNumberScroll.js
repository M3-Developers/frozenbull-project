import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for number scrolling animation with intersection observer
 * @param {number} targetNumber - The final number to display (0-9)
 * @param {string} color - 'green' or 'red'
 * @param {number} duration - Animation duration in milliseconds
 * @param {number} delay - Delay before starting animation
 * @param {number} threshold - Intersection threshold (0-1)
 * @param {number} maxNumber - Maximum number in the range (default: 9)
 */
export const useNumberScroll = (targetNumber, color = 'green', duration = 2000, delay = 0, threshold = 0.5, maxNumber = 9) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  // Intersection Observer to detect when element is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, hasAnimated]);

  // Animation logic - only runs when visible
  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    const startAnimation = () => {
      setIsAnimating(true);
      setHasAnimated(true); // Prevent re-animation
      
      // Calculate how many cycles through numbers (0 to maxNumber)
      const cycles = 3; // Number of full cycles before landing on target
      const numbersInCycle = maxNumber + 1; // 0-9 = 10 numbers
      const totalSteps = cycles * numbersInCycle + targetNumber;
      const stepDuration = duration / totalSteps;

      let step = 0;
      
      const interval = setInterval(() => {
        step++;
        const displayNumber = step % numbersInCycle; // Always show 0 to maxNumber
        setCurrentNumber(displayNumber);

        // Stop when we reach the target after enough cycles
        if (step >= totalSteps) {
          clearInterval(interval);
          setCurrentNumber(targetNumber);
          setIsAnimating(false);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    // Start animation after delay
    const timeout = setTimeout(startAnimation, delay);
    return () => clearTimeout(timeout);
  }, [isVisible, targetNumber, duration, delay, hasAnimated, maxNumber]);

  return { currentNumber, isAnimating, elementRef };
};
