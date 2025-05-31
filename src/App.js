import React from 'react';
import { motion } from 'framer-motion';
import { HoverElement } from './components/HoverElement';
import { ProfileImage } from './components/ProfileImage';
import { TypewriterText } from './components/TypewriterText';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './App.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function App() {
  return (
    <div className="container">
      <header className="header">
        <motion.h1
          className="name"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Jordyn Heil
        </motion.h1>
        <TypewriterText 
          text="Electrical and Computer Engineer"
          className="title"
        />
        
        <ProfileImage 
          src="/images/profile.jpg"
          alt="Jordyn Heil - Electrical and Computer Engineer"
        />
        
        <div className="social-links">
          <HoverElement>
            <a href="https://github.com/JordynH" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaGithub />
            </a>
          </HoverElement>
          
          <HoverElement>
            <a href="https://www.linkedin.com/in/jordynheil/" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaLinkedin />
            </a>
          </HoverElement>
          
          <HoverElement>
            <a href="mailto:jordynheil@gmail.com" className="icon-link">
              <FaEnvelope />
            </a>
          </HoverElement>
        </div>
      </header>

      <main className="content">
        {/* Education Section */}
        <motion.section
          className="section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.8 }}
        >
          <h2>Education</h2>
          <div className="education-card">
            <h3>Vanderbilt University</h3>
            <p className="location-date">Nashville, TN • May 2025</p>
            <p className="degree">Bachelor of Engineering in Electrical & Computer Engineering</p>
            <p className="honors">Honors in Electrical & Computer Engineering and Mathematics</p>
            <p className="minors">Minors: Computer Science, Physics, and Economics</p>
            <p className="gpa">GPA 4.0/4.0</p>
            <div className="highlights">
              <h4>Relevant Coursework:</h4>
              <p>Data Structures, Algorithms, Intermediate Software Design, Advanced Linear Algebra, Digital Signal Processing, Circuits I & II, Electronics I & II, Microcontrollers, FPGA Design</p>
              <h4>Awards:</h4>
              <p>Department of Defense SMART Scholarship, ECE Program Award (top ECE graduate), Summa Cum Laude, CF Chen Best Design Award, SyBBURE Research Stipend, Dean's List - All Semesters</p>
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          className="section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.8 }}
        >
          <h2>Experience</h2>
          <div className="experience-card">
            <h3>Intermediate Software Design (CS 3251) Teaching Assistant</h3>
            <p className="location-date">Nashville, TN • Fall 2024 – Spring 2024</p>
            <ul>
              <li>Guided students through software engineering concepts, focusing on clean code and well-architected systems via design patterns in C++</li>
            </ul>
          </div>

          <div className="experience-card">
            <h3>Lab Manager at SyBBURE Searle Undergraduate Research Program</h3>
            <p className="location-date">Nashville, TN • Fall 2024 – Spring 2024</p>
            <ul>
              <li>Managed a group of 12 people to organize training on equipment and further improve the capabilities of labs shared among 74 undergraduates</li>
            </ul>
          </div>

          <div className="experience-card">
            <h3>Engineering Intern at the Naval Air Warfare Center Weapons Division</h3>
            <p className="location-date">Point Mugu, CA • Summer 2024</p>
            <ul>
              <li>Created a full-stack, multithreaded application for fiber-optic networking between separate local networks using the Windows Sockets API and the Microsoft Foundations Class (MFC) library in C++</li>
            </ul>
          </div>

          <div className="experience-card">
            <h3>Student Researcher in Advanced Robotics and Controls (ARC) Lab</h3>
            <p className="location-date">Nashville, TN • Spring 2023 – Spring 2024</p>
            <ul>
              <li>Expanded a nonlinear, model-free, optimal control algorithm to work on naturally unstable systems with arbitrary numbers of control inputs. Reduced the cost function by approximately 70% on an unstable two-link robot</li>
              <li>Designed PCBs in Altium Designer for custom usage of motor controllers, microcontrollers, and amplifiers</li>
            </ul>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          className="section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.8 }}
        >
          <h2>Projects</h2>
          <div className="project-card">
            <h3>IEEE Collegiate Robotics Competition</h3>
            <ul>
              <li>Led a team of 5 in designing and building an autonomous robot for the 2025 IEEE SoutheastCon Hardware Competition, placing 3rd in qualifying rounds out of 55 teams</li>
              <li>Designed the robot in Fusion 360 and fabricated components via laser cutting and 3D printing</li>
              <li>Programmed an ESP32 (ESP-IDF) to execute PID control and a finite state machine; integrated vision data via SPI from a Raspberry Pi and Limelight Smart Camera for localization</li>
            </ul>
          </div>

          <div className="project-card">
            <h3>Chess Training Table</h3>
            <ul>
              <li>Designed and built a smart chessboard with an 8×8 hall effect sensor matrix and wireless microcontroller communication to a C++ program interfacing with Stockfish via HTTP API</li>
              <li>Awarded best project among 13 teams</li>
            </ul>
          </div>

          <div className="project-card">
            <h3>Maze-Solving Robot</h3>
            <ul>
              <li>Programmed an ATmega328P in C to control motors and sensors using PWM, interrupts, and a PID algorithm for autonomous maze navigation</li>
            </ul>
          </div>

          <div className="project-card">
            <h3>SDR Front-End Amplifier</h3>
            <ul>
              <li>Designed and simulated a robust multistage amplifier for software-defined radio, ensuring high gain, bandwidth, and tolerance to transistor variation using LTspice</li>
            </ul>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.8 }}
        >
          <h2>Skills</h2>
          <div className="skills-container">
            <div className="skills-card">
              <h3>Programming Languages</h3>
              <div className="skills-list">
                <span className="skill-tag">C++</span>
                <span className="skill-tag">C</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">AVR Assembly</span>
                <span className="skill-tag">VHDL</span>
                <span className="skill-tag">JavaScript (React)</span>
              </div>
            </div>

            <div className="skills-card">
              <h3>Software</h3>
              <div className="skills-list">
                <span className="skill-tag">Git/GitHub</span>
                <span className="skill-tag">Altium Designer</span>
                <span className="skill-tag">MATLAB</span>
                <span className="skill-tag">Mathematica</span>
                <span className="skill-tag">LTspice</span>
                <span className="skill-tag">Quartus</span>
                <span className="skill-tag">Fusion 360</span>
              </div>
            </div>

            <div className="skills-card">
              <h3>General</h3>
              <div className="skills-list">
                <span className="skill-tag">PCB Design</span>
                <span className="skill-tag">FPGAs</span>
                <span className="skill-tag">Embedded Systems</span>
                <span className="skill-tag">Soldering</span>
                <span className="skill-tag">Electrical Prototyping</span>
                <span className="skill-tag">CAD</span>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;
