import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Resume from './components/Resume';
import TypewriterText from './components/TypewriterText';
import HoverElement from './components/HoverElement';
import Tilt from 'react-vanilla-tilt';
import './App.css';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

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

const TiltWrapper = styled.div`
  background: transparent;
  transform-style: preserve-3d;
  transform: perspective(1000px);

  .tilt {
    background: transparent !important;
    transform-style: preserve-3d;
    box-shadow: none !important;
  }

  .vanilla-tilt-inner {
    background: transparent !important;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin: 2rem 0;
  border: 3px solid #3498db;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  object-fit: cover;
  object-position: center;
  transform: translateZ(20px);

  &:hover {
    box-shadow: 0 0 30px rgba(52, 152, 219, 0.8);
  }
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
          <TiltWrapper>
            <Tilt
              options={{
                scale: 1.05,
                speed: 1000,
                max: 15,
                glare: false,
                reverse: true
              }}
              className="tilt"
              style={{ background: 'transparent' }}
            >
              <ProfileImage
                src="/images/profile.jpg"
                alt="Jordyn Heil"
              />
            </Tilt>
          </TiltWrapper>
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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
