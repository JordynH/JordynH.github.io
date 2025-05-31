import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

const StyledMotionDiv = styled(motion.div)`
  display: inline-block;
  transition: transform 0.2s ease;
`;

export const HoverElement = ({ children, intensity = 0.2 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isHovered) return;
      
      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();
      
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      setPosition({ x: x * intensity, y: y * intensity });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, intensity]);

  return (
    <StyledMotionDiv
      animate={{
        x: isHovered ? position.x : 0,
        y: isHovered ? position.y : 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </StyledMotionDiv>
  );
}; 