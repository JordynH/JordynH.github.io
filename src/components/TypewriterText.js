import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const TypewriterText = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const controls = useAnimation();
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        controls.start({ opacity: 1 });
      }
    }, 100); // Adjust speed here (lower number = faster typing)

    return () => clearInterval(interval);
  }, [text, controls]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1 }}
      animate={controls}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        style={{ marginLeft: '2px' }}
      >
        |
      </motion.span>
    </motion.div>
  );
}; 