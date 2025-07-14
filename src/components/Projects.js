import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

const ProjectsContainer = styled.div`
  min-height: 100vh;
  color: #ffffff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 800px;
  width: 100%;
  margin-top: 2rem;
`;

const ProjectCard = styled(motion.div)`
  width: 100%;
  background: rgba(52, 152, 219, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.07s ease, box-shadow 0.07s ease, background 0.07s ease, border-color 0.07s ease;
  border: 1px solid rgba(52, 152, 219, 0.3);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;

  &:hover {
    transform: translateY(-5px);
    border-color: #3498db;
    box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
    background: rgba(52, 152, 219, 0.15);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProjectTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #ffffff;
  text-align: center;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background: rgba(52, 152, 219, 0.15);
  color: #3498db;
  padding: 0.2rem 0.4rem;
  border-radius: 8px;
  font-size: 0.75rem;
  border: 1px solid rgba(52, 152, 219, 0.2);
  backdrop-filter: blur(5px);
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: rgba(44, 62, 80, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  padding: 2rem;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(52, 152, 219, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
`;

const ModalImage = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
  text-align: center;
`;

const ModalDescription = styled.div`
  color: #ecf0f1;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ModalTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ModalTechTag = styled.span`
  background: rgba(52, 152, 219, 0.15);
  color: #3498db;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(52, 152, 219, 0.2);
  backdrop-filter: blur(5px);
`;

const ModalSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: #3498db;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.25rem;
`;

const SectionContent = styled.div`
  color: #ecf0f1;
  line-height: 1.6;
`;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 'ieee-robotics',
      title: 'IEEE Robotics Competition',
      image: '/images/ieee-robotics.png',
      tech: ['C++', 'ESP32', 'Fusion 360', 'PID Control'],
      description: 'Led a team of 5 students to 3rd place out of 55 teams in the IEEE Collegiate Robotics Competition.',
      details: {
        overview: 'This project involved designing and programming an autonomous robot for the IEEE Collegiate Robotics Competition. As team leader, I coordinated the efforts of 5 team members across mechanical design, electrical systems, and software development.',
        role: 'Team Leader & Lead Engineer',
        responsibilities: [
          'Led team of 5 students in robot design and development',
          'Designed 3D printed chassis and mounting brackets in Fusion 360',
          'Programmed ESP32 microcontroller with PID control algorithms',
          'Optimized robot weight and performance for competition requirements',
          'Coordinated testing and debugging sessions'
        ],
        technicalDetails: [
          'Implemented PID control for precise motor control and navigation',
          'Designed modular 3D printed components for easy assembly and modification',
          'Integrated multiple sensors for autonomous navigation',
          'Optimized power management for extended battery life',
          'Developed robust error handling and recovery systems'
        ],
        outcomes: [
          'Achieved 3rd place out of 55 competing teams',
          'Successfully completed all competition challenges',
          'Demonstrated effective team leadership and technical skills',
          'Gained hands-on experience with embedded systems and robotics'
        ]
      }
    },
    {
      id: 'smart-chessboard',
      title: 'Smart Chessboard',
      image: '/images/chessboard.png',
      tech: ['C++', 'Hall Effect Sensors', 'Wireless Communication', 'HTTP API'],
      description: 'Smart chessboard with hall effect sensors and Stockfish integration via HTTP API.',
      details: {
        overview: 'Description coming soon!',
        role: 'Lead Developer',
        responsibilities: [
          'Description coming soon!'
        ],
        technicalDetails: [
          'Description coming soon!'
        ],
        outcomes: [
          'Description coming soon!'
        ]
      }
    },
    {
      id: 'sdr-amplifier',
      title: 'SDR Amplifier',
      image: '/images/sdr-amplifier.png',
      tech: ['LTspice', 'PCB Design', 'Analog Circuits'],
      description: 'Description coming soon!',
      details: {
        overview: 'Description coming soon!',
        role: 'Description coming soon!',
        responsibilities: ['Description coming soon!'],
        technicalDetails: ['Description coming soon!'],
        outcomes: ['Description coming soon!']
      }
    },
    {
      id: 'connect4-fpga',
      title: 'Connect 4 FPGA Game',
      image: '/images/connect4-fpga.png',
      tech: ['VHDL', 'FPGA', 'Game Design'],
      description: 'Description coming soon!',
      details: {
        overview: 'Description coming soon!',
        role: 'Description coming soon!',
        responsibilities: ['Description coming soon!'],
        technicalDetails: ['Description coming soon!'],
        outcomes: ['Description coming soon!']
      }
    }
  ];

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <ProjectsContainer>
      <motion.h1
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        style={{ fontSize: '3rem', marginBottom: '1rem', color: '#3498db' }}
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          🏗️
        </motion.span>
        {' '}
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Projects
        </motion.span>
        {' '}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          🚀
        </motion.span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ fontSize: '1.2rem', color: '#bdc3c7', textAlign: 'center', maxWidth: '600px' }}
      >
        Explore my technical projects and engineering achievements
      </motion.p>

      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            initial={{ opacity: 0, scale: 0.3, rotate: 15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.08,
              type: "spring",
              stiffness: 400,
              damping: 30
            }}
            onClick={() => openModal(project)}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.1 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ProjectImage>
              <motion.img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.08 + 0.1, type: "spring", stiffness: 500, damping: 40 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
              />
            </ProjectImage>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectTech>
              {project.tech.map((tech, techIndex) => (
                <motion.div
                  key={techIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.2 + 0.5 + techIndex * 0.1,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  <TechTag>{tech}</TechTag>
                </motion.div>
              ))}
            </ProjectTech>
          </ProjectCard>
        ))}
      </ProjectsGrid>

      <AnimatePresence>
        {selectedProject && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>×</CloseButton>
              
              <ModalImage>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                />
              </ModalImage>
              
              <ModalTitle>{selectedProject.title}</ModalTitle>
              
              <ModalDescription>
                {selectedProject.description}
              </ModalDescription>
              
              <ModalTech>
                {selectedProject.tech.map((tech, techIndex) => (
                  <ModalTechTag key={techIndex}>{tech}</ModalTechTag>
                ))}
              </ModalTech>
              
              <ModalSection>
                <SectionTitle>Overview</SectionTitle>
                <SectionContent>
                  {selectedProject.details.overview}
                </SectionContent>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle>Role & Responsibilities</SectionTitle>
                <SectionContent>
                  <strong>{selectedProject.details.role}</strong>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                    {selectedProject.details.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </SectionContent>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle>Technical Details</SectionTitle>
                <SectionContent>
                  <ul style={{ paddingLeft: '1.5rem' }}>
                    {selectedProject.details.technicalDetails.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </SectionContent>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle>Outcomes & Achievements</SectionTitle>
                <SectionContent>
                  <ul style={{ paddingLeft: '1.5rem' }}>
                    {selectedProject.details.outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </SectionContent>
              </ModalSection>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default Projects; 