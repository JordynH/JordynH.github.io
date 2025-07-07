import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Resume from './components/Resume';
import Terminal from './components/Terminal';
import TypewriterText from './components/TypewriterText';
import FlipProfileImage from './components/FlipProfileImage';
import './App.css';



const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  color: #ffffff;
  position: relative;
  overflow-x: hidden;
`;

const ProfileSection = styled(motion.section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  padding-top: 4rem;
  text-align: center;
`;



const Name = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  color: #3498db;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const SocialLink = styled.a`
  color: #ffffff;
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #3498db;
    transform: translateY(-3px);
  }
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navigation />
        <ProfileSection
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Name>Jordyn Heil</Name>
          <TypewriterText text="Electrical and Computer Engineer" />
          <FlipProfileImage />
          <SocialLinks>
            <SocialLink href="https://github.com/JordynH" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/jordynheil" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </SocialLink>
            <SocialLink href="mailto:jordynheil@gmail.com">
              <i className="fas fa-envelope"></i>
            </SocialLink>
          </SocialLinks>
        </ProfileSection>

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/terminal" element={<Terminal />} />
          </Routes>
        </AnimatePresence>
      </AppContainer>
    </Router>
  );
}

export default App;
