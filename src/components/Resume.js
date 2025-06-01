import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const ResumeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

const SectionTitle = styled.h2`
  color: #3498db;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #3498db;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled(motion.section)`
  margin-bottom: 4rem;
`;

const ContentCard = styled(motion.div)`
  background: rgba(52, 152, 219, 0.08);
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  border: 1px solid rgba(52, 152, 219, 0.2);
  border-left: 4px solid #3498db;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
    background: rgba(52, 152, 219, 0.12);
  }

  h3 {
    color: #ffffff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .location-date {
    color: #3498db;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  p {
    color: #3498db;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 1rem;
      line-height: 1.6;
      position: relative;
      padding-left: 1.5rem;

      &:before {
        content: "•";
        color: #ffffff;
        position: absolute;
        left: 0;
        font-size: 1.2rem;
      }
    }
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const EducationDetails = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    color: #ffffff;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  p {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  .location-date {
    color: #3498db;
    font-size: 1.1rem;
  }

  .degree {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.3rem;
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .honors {
    color: #3498db;
    font-size: 1.05rem;
  }

  .minors {
    color: #3498db;
    font-size: 1.05rem;
  }

  .gpa {
    color: #3498db;
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }
`;

const Highlights = styled.div`
  h4 {
    color: #ffffff;
    font-size: 1.3rem;
    margin: 1.5rem 0 1rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  p {
    background: rgba(52, 152, 219, 0.08);
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    line-height: 1.6;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    color: rgba(255, 255, 255, 0.9);
    border-left: 4px solid #3498db;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
      background: rgba(52, 152, 219, 0.12);
    }
  }
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const SkillsSection = styled.div`
  h3 {
    color: #ffffff;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const SkillTag = styled(motion.span)`
  background: rgba(52, 152, 219, 0.08);
  color: #ffffff;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  border: 1px solid rgba(52, 152, 219, 0.2);
  border-left: 3px solid rgba(52, 152, 219, 0.3);
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
    background: rgba(52, 152, 219, 0.15);
    border-left: 3px solid rgba(52, 152, 219, 0.4);
  }
`;

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Resume = () => {
  return (
    <ResumeContainer>
      <Section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle>Education</SectionTitle>
        <ContentCard
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <EducationDetails>
            <h3>Vanderbilt University</h3>
            <p className="location-date">Nashville, TN • May 2025</p>
            <p className="degree">Bachelor of Engineering in Electrical & Computer Engineering</p>
            <p className="honors">Honors in Electrical and Computer Engineering and Mathematics</p>
            <p className="minors">Minors: Computer Science, Physics, and Economics</p>
            <p className="gpa">GPA 4.0/4.0</p>
          </EducationDetails>
          <Highlights>
            <h4>Relevant Coursework</h4>
            <p>Data Structures, Algorithms, Intermediate Software Design, Advanced Linear Algebra, Digital Signal Processing, Circuits I & II, Electronics I & II, Microcontrollers, FPGA Design</p>
            <h4>Awards</h4>
            <p>Department of Defense SMART Scholarship, ECE Program Award (top ECE graduate), Summa Cum Laude, CF Chen Best Design Award, SyBBURE Research Stipend, Dean's List - All Semesters</p>
          </Highlights>
        </ContentCard>
      </Section>

      <Section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle>Experience</SectionTitle>
        {[
          {
            title: "Intermediate Software Design (CS 3251) Teaching Assistant",
            location: "Nashville, TN • Fall 2024 – Spring 2024",
            bullets: [
              "Guided students through software engineering concepts, focusing on clean code and well-architected systems via design patterns in C++"
            ]
          },
          {
            title: "Lab Manager at SyBBURE Searle Undergraduate Research Program",
            location: "Nashville, TN • Fall 2024 – Spring 2024",
            bullets: [
              "Managed a group of 12 people to organize training on equipment and further improve the capabilities of labs shared among 74 undergraduates"
            ]
          },
          {
            title: "Engineering Intern at the Naval Air Warfare Center Weapons Division",
            location: "Point Mugu, CA • Summer 2024",
            bullets: [
              "Created a full-stack, multithreaded application for fiber-optic networking between separate local networks using the Windows Sockets API and the Microsoft Foundations Class (MFC) library in C++"
            ]
          },
          {
            title: "Student Researcher in Advanced Robotics and Controls (ARC) Lab",
            location: "Nashville, TN • Spring 2023 – Spring 2024",
            bullets: [
              "Expanded a nonlinear, model-free, optimal control algorithm to work on naturally unstable systems with arbitrary numbers of control inputs. Reduced the cost function by approximately 70% on an unstable two-link robot",
              "Designed PCBs in Altium Designer for custom usage of motor controllers, microcontrollers, and amplifiers"
            ]
          }
        ].map((experience, index) => (
          <ContentCard
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>{experience.title}</h3>
            <p className="location-date">{experience.location}</p>
            <ul>
              {experience.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex}>{bullet}</li>
              ))}
            </ul>
          </ContentCard>
        ))}
      </Section>

      <Section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle>Projects</SectionTitle>
        {[
          {
            title: "IEEE Collegiate Robotics Competition",
            bullets: [
              "Led a team of 5 in designing and building an autonomous robot for the 2025 IEEE SoutheastCon Hardware Competition, placing 3rd in qualifying rounds out of 55 teams",
              "Designed the robot in Fusion 360 and fabricated components via laser cutting and 3D printing",
              "Programmed an ESP32 (ESP-IDF) to execute PID control and a finite state machine; integrated vision data via SPI from a Raspberry Pi and Limelight Smart Camera for localization"
            ]
          },
          {
            title: "Maze-Solving Robot",
            bullets: [
              "Programmed an ATmega328P in C to control motors and sensors using PWM, interrupts, and a PID algorithm for autonomous maze navigation"
            ]
          },
          {
            title: "SDR Front-End Amplifier",
            bullets: [
              "Designed and simulated a robust multistage amplifier for software-defined radio, ensuring high gain, bandwidth, and tolerance to transistor variation using LTspice"
            ]
          },
          {
            title: "Chess Training Table",
            bullets: [
              "Designed and built a smart chessboard with an 8×8 hall effect sensor matrix and wireless microcontroller communication to a C++ program interfacing with Stockfish via HTTP API; awarded best project among 13 teams"
            ]
          }
        ].map((project, index) => (
          <ContentCard
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>{project.title}</h3>
            <ul>
              {project.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex}>{bullet}</li>
              ))}
            </ul>
          </ContentCard>
        ))}
      </Section>

      <Section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle>Skills</SectionTitle>
        <ContentCard
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SkillsContainer>
            {[
              {
                title: "Programming Languages",
                skills: ["C++", "C", "Python", "Java", "AVR Assembly", "VHDL", "JavaScript"]
              },
              {
                title: "Software",
                skills: ["Git/GitHub", "Altium Designer", "MATLAB", "Mathematica", "LTspice", "Quartus", "Fusion 360"]
              },
              {
                title: "General",
                skills: ["PCB Design", "FPGAs", "Embedded Systems", "Soldering", "Electrical Prototyping", "CAD"]
              }
            ].map((section, sectionIndex) => (
              <SkillsSection key={sectionIndex}>
                <h3>{section.title}</h3>
                <SkillsList>
                  {section.skills.map((skill, skillIndex) => (
                    <SkillTag
                      key={skillIndex}
                      variants={skillVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                    >
                      {skill}
                    </SkillTag>
                  ))}
                </SkillsList>
              </SkillsSection>
            ))}
          </SkillsContainer>
        </ContentCard>
      </Section>
    </ResumeContainer>
  );
};

export default Resume; 