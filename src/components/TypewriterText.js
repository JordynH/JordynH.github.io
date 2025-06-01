import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const TypewriterContainer = styled(motion.div)`
  font-size: 1.5rem;
  color: #ffffff;
  opacity: 0.9;
  margin-bottom: 2rem;
  min-height: 1.5em;
  width: 100%;
`;

const TextContainer = styled.div`
  display: inline;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const TextSpan = styled.span`
  display: inline;
`;

const Cursor = styled(motion.span)`
  display: inline;
  margin-left: 2px;
  font-weight: bold;
`;

const Emoji = styled(motion.span)`
  display: inline;
  margin-left: 0.5rem;
  font-size: 1.3rem;
  vertical-align: baseline;
`;

const TypewriterText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [shouldStartTyping, setShouldStartTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTypingEmoji, setIsTypingEmoji] = useState(false);

  const emojis = ['⚡', '💻', '💾', '📱', '🤖'];

  // Helper function to get random time within a range
  const getRandomTime = (min, max) => {
    return Math.random() * (max - min) * 1000 + min * 1000;
  };

  useEffect(() => {
    // Initial delay before typing starts
    const initialDelay = setTimeout(() => {
      setShowCursor(true); // Show cursor right before typing starts
      setTimeout(() => {
        setShouldStartTyping(true);
        setCurrentIndex(0);
      }, 400); // Small delay after cursor appears before typing starts
    }, 1000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!shouldStartTyping) return;

    if (currentIndex >= 0 && currentIndex < text.length) {
      let delay = 60; // Default faster typing speed (was 100)

      // Add pauses after specific words
      if (currentIndex === 10) { // After "Electrical"
        delay = 300; // 0.3s pause
      } else if (currentIndex === 14) { // After "and"
        delay = 300; // 0.3s pause
      }

      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length) {
      // Start emoji cycle after text is complete
      let emojiIndex = 0;

      const cycleEmoji = () => {
        setIsTypingEmoji(true);
        setShowEmoji(false);
        
        // Start typing animation for new emoji
        setTimeout(() => {
          setCurrentEmoji(emojis[emojiIndex]);
          setShowEmoji(true);
          
          // Show emoji for random time between 1.5-5 seconds
          const displayTime = getRandomTime(1.5, 5);
          setTimeout(() => {
            setShowEmoji(false);
            setIsTypingEmoji(false);
            
            // Wait random time between 0.3-2.5 seconds before next emoji
            const waitTime = getRandomTime(0.3, 2.5);
            setTimeout(() => {
              emojiIndex = (emojiIndex + 1) % emojis.length;
              cycleEmoji();
            }, waitTime);
          }, displayTime);
        }, 300); // Keep consistent typing animation time
      };

      cycleEmoji();
    }
  }, [currentIndex, text, shouldStartTyping]);

  return (
    <TypewriterContainer
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      <TextContainer>
        <TextSpan>{displayText}</TextSpan>
        {showEmoji && (
          <Emoji>
            {currentEmoji}
          </Emoji>
        )}
        {(showCursor && (!showEmoji || isTypingEmoji)) && (
          <Cursor
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            |
          </Cursor>
        )}
      </TextContainer>
    </TypewriterContainer>
  );
};

export default TypewriterText; 