import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { HoverElement } from './components/HoverElement';
import { ProfileImage } from './components/ProfileImage';
import { theme } from './theme';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.body};
  padding: 2rem;
`;

const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
  text-align: center;
`;

const Name = styled(motion.h1)`
  font-family: ${theme.fonts.heading};
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text};
  opacity: 0.8;
  margin-bottom: 2rem;
`;

const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
`;

const IconLink = styled.a`
  color: ${theme.colors.primary};
  font-size: 1.8rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${theme.colors.secondary};
  }
`;

const Bio = styled.div`
  text-align: left;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
`;

const Education = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 10px;
  border-left: 4px solid ${theme.colors.primary};
`;

const Highlight = styled.span`
  color: ${theme.colors.primary};
  font-weight: 600;
`;

function App() {
  return (
    <Container>
      <Header>
        <Name
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Jordyn Heil
        </Name>
        <Title>Software Developer & Engineer</Title>
        
        <ProfileImage 
          src="/images/profile.jpg"
          alt="Jordyn Heil"
        />
        
        <SocialLinks>
          <HoverElement>
            <IconLink href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </IconLink>
          </HoverElement>
          
          <HoverElement>
            <IconLink href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </IconLink>
          </HoverElement>
          
          <HoverElement>
            <IconLink href="mailto:your.email@example.com">
              <FaEnvelope />
            </IconLink>
          </HoverElement>
        </SocialLinks>
      </Header>

      <Content>
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>About Me</h2>
            <Bio>
              <p>
                I am a recent graduate of Vanderbilt University, where I pursued a comprehensive education
                in engineering and mathematics. My academic journey reflects my passion for understanding
                complex systems and solving challenging problems across multiple disciplines.
              </p>
              
              <Education>
                <h3>Education</h3>
                <p>
                  <Highlight>Vanderbilt University</Highlight>, Class of 2025
                  <br />
                  Bachelor of Engineering in <Highlight>Electrical and Computer Engineering</Highlight> (Honors)
                  <br />
                  Second Major in <Highlight>Mathematics</Highlight>
                  <br />
                  Minors in:
                  <ul>
                    <li>Computer Science</li>
                    <li>Physics</li>
                    <li>Economics</li>
                  </ul>
                </p>
              </Education>
            </Bio>
          </motion.div>
        </Section>

        {/* Add more sections as needed */}
      </Content>
    </Container>
  );
}

export default App;
