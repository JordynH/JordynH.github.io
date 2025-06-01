import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const NavContainer = styled.div`
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: rgba(32, 32, 32, 0.9);
  padding: 1.5rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(52, 152, 219, 0.2);
  z-index: 1000;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled(Link)`
  display: block;
  color: ${props => props.isActive ? '#3498db' : '#ffffff'};
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  border-radius: 5px;
  background: ${props => props.isActive ? 'rgba(52, 152, 219, 0.1)' : 'transparent'};
  box-shadow: ${props => props.isActive ? '0 0 10px rgba(52, 152, 219, 0.3)' : 'none'};
  
  &:hover {
    color: #3498db;
    background: rgba(52, 152, 219, 0.1);
  }
`;

const Navigation = () => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContainer>
        <NavList>
          <li>
            <NavItem 
              to="/" 
              isActive={location.pathname === '/'}
            >
              Home
            </NavItem>
          </li>
          <li>
            <NavItem 
              to="/resume" 
              isActive={location.pathname === '/resume'}
            >
              Resume
            </NavItem>
          </li>
        </NavList>
      </NavContainer>
    </motion.div>
  );
};

export default Navigation; 