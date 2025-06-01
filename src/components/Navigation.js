import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
    padding: 1rem;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    margin-top: 1rem;
  }

  @media (min-width: 769px) {
    display: flex;
  }
`;

const NavItem = styled(Link)`
  display: block;
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  border-radius: 5px;
  background: transparent;
  
  &.active {
    color: #3498db;
    background: rgba(52, 152, 219, 0.1);
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
  }
  
  &:hover {
    color: #3498db;
    background: rgba(52, 152, 219, 0.1);
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 18px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.3s ease-in-out;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: #ffffff;
    border-radius: 2px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;

    &:nth-of-type(1) {
      top: ${props => props.isOpen ? '8px' : '0px'};
      transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-of-type(2) {
      top: 8px;
      opacity: ${props => props.isOpen ? '0' : '1'};
    }

    &:nth-of-type(3) {
      top: ${props => props.isOpen ? '8px' : '16px'};
      transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContainer>
        <HamburgerButton onClick={toggleMenu} aria-label="Toggle navigation menu">
          <MenuIcon isOpen={isOpen}>
            <span></span>
            <span></span>
            <span></span>
          </MenuIcon>
        </HamburgerButton>
        <AnimatePresence>
          <NavList isOpen={isOpen}>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <NavItem 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavItem>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <NavItem 
                to="/resume" 
                className={location.pathname === '/resume' ? 'active' : ''}
                onClick={() => setIsOpen(false)}
              >
                Resume
              </NavItem>
            </motion.li>
          </NavList>
        </AnimatePresence>
      </NavContainer>
    </motion.div>
  );
};

export default Navigation; 