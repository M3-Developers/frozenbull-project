import React from 'react';
import { useNumberScroll } from '../../hooks/useNumberScroll';
import {
  green_n0, green_n1, green_n2, green_n3, green_n4, green_n5, green_n6, green_n7, green_n8, green_n9,
  red_n0, red_n1, red_n2, red_n3, red_n4, red_n5, red_n6, red_n7, red_n8, red_n9
} from '../../assets/images';
import './ScrollingNumber.css';

const ScrollingNumber = ({ 
  targetNumber, 
  color = 'green', 
  duration = 2000, 
  delay = 0,
  threshold = 0.5,
  maxNumber = 9,
  className = '',
  alt = ''
}) => {
  const { currentNumber, isAnimating, elementRef } = useNumberScroll(
    targetNumber, 
    color, 
    duration, 
    delay, 
    threshold,
    maxNumber
  );

  // Map numbers to corresponding images (0-9)
  const numberImages = {
    green: [green_n0, green_n1, green_n2, green_n3, green_n4, green_n5, green_n6, green_n7, green_n8, green_n9],
    red: [red_n0, red_n1, red_n2, red_n3, red_n4, red_n5, red_n6, red_n7, red_n8, red_n9]
  };

  const currentImage = numberImages[color][currentNumber];

  return (
    <img 
      ref={elementRef}
      src={currentImage} 
      alt={alt || `${color} number ${currentNumber}`}
      className={`scrolling-number ${className} ${isAnimating ? 'animating' : ''}`}
    />
  );
};

export default ScrollingNumber;
