# Scrolling Number Animation System

## Overview

The Scrolling Number Animation System creates a dynamic effect where number images cycle through values (0-9) before landing on target numbers, similar to a slot machine or odometer. The animation only triggers when the elements become visible on screen, providing an engaging user experience.

## 🏗️ Architecture

### File Structure
```
src/
├── hooks/
│   └── useNumberScroll.js          # Core animation logic + visibility detection
├── components/
│   └── ScrollingNumber/
│       ├── ScrollingNumber.js      # React component wrapper
│       ├── ScrollingNumber.css     # Animation styles
│       └── index.js               # Export file
├── assets/
│   └── images/
│       ├── green_n0.svg          # Number images (green 0-9)
│       ├── green_n1.svg
│       ├── ...
│       ├── green_n9.svg
│       ├── red_n0.svg             # Number images (red 0-9)
│       ├── red_n1.svg
│       ├── ...
│       └── red_n9.svg
└── pages/
    └── Home.jsx                   # Implementation example
```

## 🔧 Core Components

### 1. `useNumberScroll` Hook

**Location**: `src/hooks/useNumberScroll.js`

**Purpose**: Manages animation state, visibility detection, and number cycling logic.

#### Parameters:
- `targetNumber` (0-9): Final number to display
- `color` ('green'|'red'): Color variant of number images
- `duration` (ms): Total animation time (default: 2000ms)
- `delay` (ms): Delay before starting animation (default: 0)
- `threshold` (0-1): Intersection threshold for visibility (default: 0.5)
- `maxNumber` (0-9): Maximum number in range (default: 9)

#### Returns:
- `currentNumber`: Currently displayed number (0-9)
- `isAnimating`: Boolean indicating if animation is running
- `elementRef`: React ref for Intersection Observer

#### Key Features:
```javascript
// Intersection Observer for visibility detection
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && !hasAnimated) {
    setIsVisible(true);
  }
}, { threshold });

// Animation logic with cycles
const cycles = 3; // Number of full 0-9 cycles
const numbersInCycle = maxNumber + 1; // 0-9 = 10 numbers
const totalSteps = cycles * numbersInCycle + targetNumber;
const stepDuration = duration / totalSteps;
```

### 2. `ScrollingNumber` Component

**Location**: `src/components/ScrollingNumber/ScrollingNumber.js`

**Purpose**: React component that renders the animated number images.

#### Props:
```javascript
const ScrollingNumber = ({ 
  targetNumber,     // Final number (0-9)
  color,           // 'green' or 'red'
  duration,        // Animation duration
  delay,           // Start delay
  threshold,       // Visibility threshold
  maxNumber,       // Maximum number in range (default: 9)
  className,       // Additional CSS classes
  alt              // Alt text for accessibility
}) => {
  // Component logic
};
```

#### Image Mapping:
```javascript
const numberImages = {
  green: [green_n0, green_n1, green_n2, green_n3, green_n4, green_n5, green_n6, green_n7, green_n8, green_n9],
  red: [red_n0, red_n1, red_n2, red_n3, red_n4, red_n5, red_n6, red_n7, red_n8, red_n9]
};
```

### 3. CSS Animations

**Location**: `src/components/ScrollingNumber/ScrollingNumber.css`

**Effects**:
- Scale animation during scrolling
- Bounce effect when landing on final number
- Optional blur effect for rapid changes
- Smooth transitions between states

```css
.scrolling-number.animating {
  transform: scale(1.05);
  filter: blur(0.5px);
}

@keyframes numberLand {
  0% { transform: scale(1.1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}
```

## 🎯 How It Works

### 1. Initial State
- All numbers display as `0` (starting position)
- Components are mounted but animation is dormant
- Intersection Observers are set up for each number

### 2. Visibility Detection
```javascript
// When 30% of element enters viewport
threshold: 0.3

// Observer callback
if (entry.isIntersecting && !hasAnimated) {
  setIsVisible(true); // Triggers animation
}
```

### 3. Animation Sequence
1. **Delay Phase**: Waits for specified delay time
2. **Cycling Phase**: Rapidly cycles through numbers 0→1→2→3→4→5→6→7→8→9 (3 full cycles)
3. **Landing Phase**: Final cycle stops at target number
4. **Completion**: Animation ends, bounce effect plays

### 4. Staggered Timing
```javascript
// Example from Home.jsx - now supports 0-9!
<ScrollingNumber targetNumber={7} delay={500} />   // Starts first
<ScrollingNumber targetNumber={9} delay={700} />   // Starts 200ms later
<ScrollingNumber targetNumber={6} delay={1000} />  // Starts 500ms after first
```

## 🎨 Visual Effects Timeline

```
Time: 0ms     → Numbers show as 0 (static)
Time: 500ms   → First number starts cycling: 0→1→2→3→4→5→6→7→8→9→0→1...
Time: 700ms   → Second number starts cycling
Time: 1000ms  → Third number starts cycling
Time: 2500ms  → First number lands on target (7)
Time: 2700ms  → Second number lands on target (9)
Time: 3000ms  → Third number lands on target (6)
```

## 🔧 Configuration Examples

### Basic Usage
```javascript
<ScrollingNumber 
  targetNumber={7} 
  color="green" 
/>
```

### Advanced Configuration
```javascript
<ScrollingNumber 
  targetNumber={9}
  color="red"
  duration={3000}        // 3 second animation
  delay={1000}          // Start after 1 second
  threshold={0.2}       // Trigger when 20% visible
  maxNumber={9}         // Support 0-9 range (default)
  className="custom"    // Additional styling
  alt="Sales percentage"
/>
```

### Cascading Effect
```javascript
{/* Create wave-like animation with 0-9 numbers */}
<ScrollingNumber targetNumber={8} delay={0} />
<ScrollingNumber targetNumber={9} delay={200} />
<ScrollingNumber targetNumber={6} delay={400} />
```

### Backward Compatibility (0-5 range only)
```javascript
<ScrollingNumber 
  targetNumber={3} 
  maxNumber={5}    // Limits to 0-5 range
/>
```

## 🚀 Performance Considerations

### Optimizations:
- **Intersection Observer**: Only animates when visible
- **One-time Animation**: Prevents re-animation on scroll
- **Efficient State Management**: Minimal re-renders
- **CSS Transitions**: Hardware-accelerated animations

### Memory Management:
```javascript
// Cleanup in useEffect
return () => {
  if (currentElement) {
    observer.unobserve(currentElement);
  }
  clearTimeout(timeout);
  clearInterval(interval);
};
```

## 🎛️ Customization Options

### Timing Adjustments
- **Duration**: Increase for slower, decrease for faster animation
- **Delay**: Stagger start times for cascading effects
- **Cycles**: Modify cycles count in hook for more/fewer rotations

### Visual Modifications
- **Threshold**: Adjust when animation triggers (0.1 = early, 0.9 = late)
- **CSS Effects**: Modify scale, blur, bounce in CSS file
- **Color Variants**: Extend to support more color schemes

### Behavioral Changes
```javascript
// Allow re-animation on scroll
const [hasAnimated, setHasAnimated] = useState(false);
// Remove to allow multiple triggers

// Different cycling patterns
const totalSteps = cycles * numbersInCycle + targetNumber; // Current (0-9)
const totalSteps = cycles * 6 + targetNumber; // For 0-5 numbers only

// Custom number ranges
maxNumber={5}  // For 0-5 range
maxNumber={9}  // For 0-9 range (default)
maxNumber={99} // Would need additional number images
```

## 🐛 Troubleshooting

### Common Issues:

1. **Animation doesn't start**
   - Check if elements are properly visible
   - Verify threshold value (try 0.1 for earlier trigger)
   - Ensure assets are properly imported

2. **Numbers don't cycle**
   - Verify all number images (0-9) exist for chosen color
   - Check console for import errors
   - Confirm duration is sufficient (minimum 1000ms recommended)
   - Ensure `maxNumber` prop matches available assets

3. **Performance issues**
   - Reduce number of simultaneous animations
   - Increase step duration
   - Remove blur effects in CSS
   - Consider using smaller maxNumber ranges for better performance

### Debug Tips:
```javascript
// Add logging to hook
console.log('Animation state:', { currentNumber, isAnimating, isVisible });

// Check intersection observer
console.log('Element visible:', entry.isIntersecting);
```

## 📱 Browser Compatibility

- **Intersection Observer**: Supported in all modern browsers
- **CSS Transforms**: Universal support
- **SVG Images**: Full browser support
- **React Hooks**: Requires React 16.8+

## 🎯 Use Cases

Perfect for:
- **Statistics counters**
- **Percentage displays**
- **Score animations**
- **Data reveals**
- **Loading sequences**
- **Game score displays**

## 🔮 Future Enhancements

Potential improvements:
- Support for decimal numbers
- Custom easing functions
- Sound effects integration
- Different animation patterns (bounce, elastic)
- Dynamic color changing during animation
- Integration with data fetching
