/** @jsxImportSource @emotion/react */
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import './HoverElement.css';

const StyledMotionDiv = styled(motion.div)`
  display: inline-block;
  transition: transform 0.2s ease;
`;

export const HoverElement = ({ children, intensity = 0.2 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isHovered || !elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      setPosition({ x: x * intensity, y: y * intensity });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, intensity]);

  return (
    <StyledMotionDiv
      ref={elementRef}
      className="hover-element"
      animate={{
        x: isHovered ? position.x : 0,
        y: isHovered ? position.y : 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </StyledMotionDiv>
  );
}; 