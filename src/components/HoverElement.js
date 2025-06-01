/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import './HoverElement.css';

const HoverContainer = styled(motion.div)`
  position: relative;
  display: inline-block;
`;

const HoverElement = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate distance from center
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = rect.width / 2;
    const scale = Math.min(1, distance / maxDistance);
    
    // Apply exponential falloff
    const falloff = Math.exp(-scale * 2);
    
    setMousePosition({
      x: x * falloff,
      y: y * falloff,
    });
  };

  return (
    <HoverContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      animate={{
        x: isHovered ? mousePosition.x * 0.15 : 0,
        y: isHovered ? mousePosition.y * 0.15 : 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.2,
      }}
    >
      {children}
    </HoverContainer>
  );
};

export default HoverElement; 