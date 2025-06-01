import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const HomeContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const Bio = styled(motion.div)`
  background: rgba(52, 152, 219, 0.08);
  padding: 2.5rem;
  border-radius: 20px;
  margin-top: 1rem;
  border: 1px solid rgba(52, 152, 219, 0.2);
  border-left: 4px solid #3498db;
  line-height: 1.8;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(52, 152, 219, 0.08) 0%,
      rgba(52, 152, 219, 0.05) 50%,
      rgba(52, 152, 219, 0.02) 100%
    );
    pointer-events: none;
  }

  h2 {
    color: #ffffff;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      font-size: 2.2rem;
      margin-left: 8px;
    }
  }
`;

const Paragraph = styled(motion.p)`
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  position: relative;
  padding-left: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: rgba(52, 152, 219, 0.3);
    border-radius: 4px;
  }
`;

const Highlight = styled.span`
  color: #3498db;
  font-weight: 500;
  position: relative;
  padding: 0 0.2rem;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 4px;
    z-index: -1;
  }
`;

const WavingEmoji = styled(motion.span)`
  display: inline-block;
  transform-origin: 70% 70%;
`;

const paragraphVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HomeContainer>
        <Bio
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Hello! <WavingEmoji 
              animate={{ 
                rotate: [0, 14, -8, 14, -4, 10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            >👋</WavingEmoji>
          </h2>
          <Paragraph
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            I'm an <Highlight>Electrical and Computer Engineer</Highlight> with a passion for robotics, 
            software development, and solving complex technical challenges. Currently, I'm working at an 
            exciting robotics startup in Miami, where I get to combine my love for engineering with 
            cutting-edge technology.
          </Paragraph>
          <Paragraph
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            When I'm not immersed in code or tinkering with robots, you'll find me exploring the great 
            outdoors on hiking trails, challenging myself with Rubik's cubes (I love puzzles!), diving 
            into fascinating non-fiction books, or unwinding with some video games. I believe in 
            maintaining a balance between technical pursuits and personal interests, as they both 
            contribute to creative problem-solving and continuous learning.
          </Paragraph>
          <Paragraph
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My engineering background, combined with my diverse interests, gives me a unique perspective 
            on problem-solving and innovation. I'm always excited to take on new challenges and 
            collaborate on projects that push the boundaries of what's possible in robotics and 
            technology.
          </Paragraph>
        </Bio>
      </HomeContainer>
    </motion.div>
  );
};

export default Home; 