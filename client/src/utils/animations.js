/**
 * BitBloom Animation Utilities
 * This file contains functions to handle animations across the application
 */

/**
 * Sets up intersection observers for animated elements
 * @param {Array} animationClasses - Array of CSS classes to observe (e.g., ['animate-in', 'slide-in-left'])
 * @param {Number} threshold - Intersection threshold (0-1)
 * @param {String} visibleClass - Class to add when element is visible
 * @returns {Function} - Cleanup function to remove observers
 */
export const setupAnimations = (animationClasses = ['animate-in', 'slide-in-left', 'slide-in-right'], threshold = 0.1, visibleClass = 'visible') => {
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(visibleClass);
      }
    });
  }, { threshold });
  
  // Get all elements with animation classes
  const elements = [];
  animationClasses.forEach(className => {
    const classElements = document.querySelectorAll(`.${className}`);
    classElements.forEach(el => {
      observer.observe(el);
      elements.push(el);
    });
  });
  
  // Return cleanup function
  return () => {
    elements.forEach(el => observer.unobserve(el));
  };
};

/**
 * Adds staggered animation delays to a group of elements
 * @param {String} selector - CSS selector for the elements
 * @param {Number} baseDelay - Base delay in seconds
 * @param {Number} increment - Delay increment for each element
 */
export const addStaggeredDelays = (selector, baseDelay = 0, increment = 0.1) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    el.style.animationDelay = `${baseDelay + (index * increment)}s`;
  });
};

/**
 * Triggers a pulse animation on an element
 * @param {HTMLElement} element - The element to animate
 * @param {String} pulseClass - CSS class for the pulse animation
 * @param {Number} duration - Duration in milliseconds
 */
export const pulseElement = (element, pulseClass = 'pulse-animation', duration = 1000) => {
  if (!element) return;
  
  element.classList.add(pulseClass);
  setTimeout(() => {
    element.classList.remove(pulseClass);
  }, duration);
};

/**
 * Creates a typing animation effect
 * @param {HTMLElement} element - The element to animate text in
 * @param {String} text - The text to type
 * @param {Number} speed - Typing speed in milliseconds
 * @returns {Promise} - Resolves when animation completes
 */
export const typeText = (element, text, speed = 50) => {
  return new Promise(resolve => {
    let i = 0;
    element.textContent = '';
    
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
        resolve();
      }
    }, speed);
  });
};

/**
 * Initializes all animations on page load
 */
export const initializeAnimations = () => {
  // Set up intersection observers
  const cleanup = setupAnimations();
  
  // Add staggered delays to card elements
  addStaggeredDelays('.card.animate-in', 0.2, 0.1);
  
  // Return cleanup function
  return cleanup;
};