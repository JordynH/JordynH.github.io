import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const TerminalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      transparent 0%,
      rgba(0, 255, 0, 0.02) 50%,
      transparent 100%
    );
    background-size: 100% 2px;
    animation: scanline 0.1s linear infinite;
    pointer-events: none;
  }
  
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
`;



const TerminalContainer = styled.div`
  background: #000000;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.4;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  
  /* CRT monitor glow effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 255, 0, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: -1;
  }
`;

const TerminalLine = styled.div`
  margin-bottom: 8px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const CommandInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
  position: relative;
`;

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 8px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  outline: none;
  flex: 1;
  min-width: 0;
  width: 100%;
  
  &::placeholder {
    color: #00ff00;
    opacity: 0.5;
  }
`;

  



const CommandResponse = styled.div`
  color: #ffffff;
  margin-bottom: 8px;
  padding-left: 20px;
`;

const TypewriterText = styled.span`
  white-space: pre-wrap;
`;

const ExitButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: 1px solid #00ff00;
  color: #00ff00;
  padding: 8px 16px;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  
  &:hover {
    background: #00ff00;
    color: #000000;
  }
  
  /* Hide on mobile devices */
  @media (max-width: 768px) {
    display: none;
  }
`;

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDirectory, setCurrentDirectory] = useState('/home/jordynheil/website');
 
  const [isBooting, setIsBooting] = useState(true);
  const [bootMessage, setBootMessage] = useState('');
  const [bootStep, setBootStep] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const bootMessages = [
    'BIOS Version 2.1.0',
    'Initializing system components...',
    'Loading kernel modules...',
    'Mounting filesystems...',
    'Starting network services...',
    'Establishing secure connection...',
    'Loading user profile...',
    'System ready.',
    'Welcome to Jordyn Heil\'s Terminal v1.0.0'
  ];

  const introMessage = `Type 'help' for available commands.`;

  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => `Available commands:
  help - Show this help message
  about - About Jordyn Heil
  skills - Show technical skills
  projects - List projects
  education - Show education details
  experience - Show work experience
  github - Open GitHub profile
  linkedin - Open LinkedIn profile
  email - Show contact email
  clear - Clear terminal
  ls - List files in current directory
  cd [directory] - Change directory
  cat [file] - Read file contents
  whoami - Show current user
  date - Show current date
  pwd - Show current directory
  echo [text] - Echo text
  matrix - Enter matrix mode
  robot - Show robot status
  solve - Solve a puzzle
  hack - Try to hack the system
  exit - Exit terminal`
    },
    about: {
      description: 'About Jordyn Heil',
      execute: () => `Jordyn Heil - Electrical and Computer Engineer

🎓 Vanderbilt University Graduate
📚 Degrees: ECE & Math with minors in CS, Physics, Econ
🤖 Robotics & Software Engineering Enthusiast
🧩 Puzzle Lover
🏔️ Outdoor Explorer
🎮 Gamer & Tech Enthusiast

Currently working at an exciting robotics startup in Miami, 
combining engineering passion with cutting-edge technology.`
    },
    skills: {
      description: 'Show technical skills',
      execute: () => `Technical Skills:

Programming Languages:
  • C++
  • C
  • Python
  • Java
  • JavaScript
  • AVR Assembly
  • VHDL

Software & Tools:
  • Git/GitHub
  • Altium Designer
  • MATLAB
  • Mathematica
  • LTspice
  • Quartus
  • Fusion 360

Hardware & Systems:
  • PCB Design
  • FPGAs
  • Embedded Systems
  • Soldering
  • Electrical Prototyping
  • CAD Design`
    },
    projects: {
      description: 'List projects',
      execute: () => `Projects:

🤖 IEEE Collegiate Robotics Competition
   - Led team of 5, placed 3rd out of 55 teams
   - Designed robot in Fusion 360
   - Programmed ESP32 with PID control

🧩 Maze-Solving Robot
   - ATmega328P programming in C
   - PWM, interrupts, PID algorithm
   - Autonomous navigation

📡 SDR Front-End Amplifier
   - Multistage amplifier design
   - LTspice simulation
   - High gain, bandwidth optimization

♟️ Smart Chessboard
   - Smart chessboard with hall effect sensors
   - Wireless microcontroller communication
   - Stockfish integration via HTTP API`
    },
    education: {
      description: 'Show education details',
      execute: () => `Education:

🎓 Vanderbilt University (May 2025)
   • Bachelor of Engineering in Electrical & Computer Engineering
   • Honors in ECE and Mathematics
   • Minors: Computer Science, Physics, Economics
   • GPA: 4.0/4.0

🏆 Awards & Honors:
   • Department of Defense SMART Scholarship
   • ECE Program Award (top ECE graduate)
   • Summa Cum Laude
   • CF Chen Best Design Award
   • SyBBURE Research Stipend
   • Dean's List - All Semesters`
    },
    experience: {
      description: 'Show work experience',
      execute: () => `Work Experience:

👨‍🏫 Teaching Assistant - CS 3251 (Fall 2024 - Spring 2024)
   • Guided students in software engineering concepts
   • Focus on clean code and design patterns in C++

🔬 Lab Manager - SyBBURE Research Program (Fall 2024 - Spring 2024)
   • Managed group of 12 people
   • Organized training for 74 undergraduates

⚡ Engineering Intern - Naval Air Warfare Center (Summer 2024)
   • Created full-stack multithreaded application
   • Fiber-optic networking between local networks
   • Windows Sockets API and MFC library in C++

🤖 Student Researcher - ARC Lab (Spring 2023 - Spring 2024)
   • Expanded nonlinear, model-free optimal control algorithm
   • Reduced cost function by ~70% on unstable two-link robot
   • Designed PCBs in Altium Designer`
    },
    github: {
      description: 'Open GitHub profile',
      execute: () => {
        window.open('https://github.com/JordynH', '_blank');
        return 'Opening GitHub profile...';
      }
    },
    linkedin: {
      description: 'Open LinkedIn profile',
      execute: () => {
        window.open('https://linkedin.com/in/jordynheil', '_blank');
        return 'Opening LinkedIn profile...';
      }
    },
    email: {
      description: 'Show contact email',
      execute: () => 'Contact: jordynheil@gmail.com'
    },
    clear: {
      description: 'Clear terminal',
      execute: () => {
        setHistory([]);
        return null;
      }
    },
    ls: {
      description: 'List files',
      execute: () => {
        const getCurrentFiles = () => {
          const fileSystem = {
            '/home/jordynheil/website': {
              type: 'directory',
              contents: {
                'projects/': { type: 'directory' },
                'education/': { type: 'directory' },
                'experience/': { type: 'directory' },
                'skills/': { type: 'directory' },
                'contact/': { type: 'directory' },
                'resume.txt': { type: 'file' },
                'about.txt': { type: 'file' },
                'github.txt': { type: 'file' }
              }
            },
            '/home/jordynheil/website/projects': {
              type: 'directory',
              contents: {
                'ieee-robotics/': { type: 'directory' },
                'maze-solver/': { type: 'directory' },
                'sdr-amplifier/': { type: 'directory' },
                'chess-board/': { type: 'directory' }
              }
            },
            '/home/jordynheil/website/projects/ieee-robotics': {
              type: 'directory',
              contents: {
                'design.f3d': { type: 'file' },
                'code.cpp': { type: 'file' },
                'README.md': { type: 'file' }
              }
            },
            '/home/jordynheil/website/projects/maze-solver': {
              type: 'directory',
              contents: {
                'main.c': { type: 'file' },
                'pid.h': { type: 'file' },
                'schematic.pdf': { type: 'file' }
              }
            },
            '/home/jordynheil/website/projects/sdr-amplifier': {
              type: 'directory',
              contents: {
                'circuit.lts': { type: 'file' },
                'simulation.txt': { type: 'file' },
                'design.pdf': { type: 'file' }
              }
            },
            '/home/jordynheil/website/projects/chess-board': {
              type: 'directory',
              contents: {
                'sensors.h': { type: 'file' },
                'api.py': { type: 'file' },
                'README.md': { type: 'file' }
              }
            },
            '/home/jordynheil/website/education': {
              type: 'directory',
              contents: {
                'vanderbilt/': { type: 'directory' },
                'transcript.pdf': { type: 'file' },
                'awards.txt': { type: 'file' }
              }
            },
            '/home/jordynheil/website/education/vanderbilt': {
              type: 'directory',
              contents: {
                'ece/': { type: 'directory' },
                'math/': { type: 'directory' },
                'minors/': { type: 'directory' }
              }
            },
            '/home/jordynheil/website/experience': {
              type: 'directory',
              contents: {
                'teaching-assistant/': { type: 'directory' },
                'lab-manager/': { type: 'directory' },
                'naval-intern/': { type: 'directory' },
                'arc-researcher/': { type: 'directory' }
              }
            },
            '/home/jordynheil/website/skills': {
              type: 'directory',
              contents: {
                'programming/': { type: 'directory' },
                'hardware/': { type: 'directory' },
                'software/': { type: 'directory' }
              }
            },
            '/home/jordynheil/website/contact': {
              type: 'directory',
              contents: {
                'email.txt': { type: 'file' },
                'linkedin.txt': { type: 'file' },
                'github.txt': { type: 'file' }
              }
            }
          };

          const currentDir = fileSystem[currentDirectory];
          if (!currentDir || currentDir.type !== 'directory') {
            return 'Error: Directory not found';
          }

          const files = Object.keys(currentDir.contents);
          const directories = files.filter(file => currentDir.contents[file].type === 'directory');
          const regularFiles = files.filter(file => currentDir.contents[file].type === 'file');

          let output = `Directory listing for ${currentDirectory}:\n`;
          
          if (directories.length > 0) {
            output += directories.map(dir => `📁 ${dir}`).join('\n') + '\n';
          }
          
          if (regularFiles.length > 0) {
            output += regularFiles.map(file => `📄 ${file}`).join('\n');
          }

          return output;
        };

        return getCurrentFiles();
      }
    },
    cat: {
      description: 'Read file contents',
      execute: (args) => {
        if (!args[0]) return 'Usage: cat [filename]';
        
        const fileName = args[0];
        const fileSystem = {
          'resume.txt': `Jordyn Heil - Resume
====================
Education: Vanderbilt University (ECE & Math)
Experience: Robotics startup, Naval research
Skills: C++, Python, PCB Design, Embedded Systems
Projects: IEEE Robotics, Maze Solver, Chess Table`,
          'about.txt': `About Jordyn Heil
================
Electrical and Computer Engineer
Robotics enthusiast and puzzle lover
Currently in Miami working on cutting-edge robotics
Passionate about software engineering and innovation`,
          'github.txt': `GitHub Profile
==============
Username: JordynH
URL: https://github.com/JordynH
Focus: Robotics, Embedded Systems, Software Engineering`,
          'design.f3d': `Fusion 360 Design File
========================
IEEE Robotics Competition Robot
- 3D printed chassis
- Motor mounting brackets
- Sensor housing
- Weight optimized for competition`,
          'code.cpp': `ESP32 PID Control Code
=====================
#include <PID_v1.h>

// PID parameters for robot control
double Setpoint, Input, Output;
PID myPID(&Input, &Output, &Setpoint, 2, 5, 1, DIRECT);

void setup() {
  // Initialize PID controller
  myPID.SetMode(AUTOMATIC);
}`,
          'README.md': `IEEE Robotics Project
==================
Led team of 5, placed 3rd out of 55 teams
Designed robot in Fusion 360
Programmed ESP32 with PID control`,
          'main.c': `ATmega328P Maze Solver
======================
#include <avr/io.h>
#include "pid.h"

// PWM control for motors
void init_pwm() {
  // Configure PWM for motor control
}`,
          'pid.h': `PID Algorithm Header
===================
// PID control for autonomous navigation
typedef struct {
  double kp, ki, kd;
  double setpoint, input, output;
} PID_Controller;`,
          'schematic.pdf': `Circuit Schematic
==================
Maze solving robot electronics
- Motor driver circuit
- Sensor connections
- Power distribution`,
          'circuit.lts': `LTspice Circuit File
====================
SDR Front-End Amplifier Design
- Multistage amplifier
- High gain configuration
- Bandwidth optimization`,
          'simulation.txt': `Simulation Results
==================
Gain: 40dB
Bandwidth: 1MHz-100MHz
Noise Figure: 2.1dB`,
          'design.pdf': `Amplifier Design Report
======================
SDR Front-End Amplifier
- Multistage amplifier design
- LTspice simulation
- High gain, bandwidth optimization`,
          'sensors.h': `Hall Effect Sensors
==================
// Smart chessboard sensor array
#define NUM_SQUARES 64
typedef struct {
  int x, y;
  bool occupied;
} ChessSquare;`,
          'api.py': `Stockfish Integration
====================
import requests

def get_stockfish_move(fen):
    # HTTP API integration
    # Returns best move from Stockfish engine`,
          'transcript.pdf': `Academic Transcript
====================
Vanderbilt University
GPA: 4.0/4.0
Honors in ECE and Mathematics`,
          'awards.txt': `Awards & Honors
================
• Department of Defense SMART Scholarship
• ECE Program Award (top ECE graduate)
• Summa Cum Laude
• CF Chen Best Design Award
• SyBBURE Research Stipend
• Dean's List - All Semesters`,
          'email.txt': `Contact Information
====================
Email: jordynheil@gmail.com
Available for opportunities in:
- Robotics Engineering
- Software Development
- Hardware Design`,
          'linkedin.txt': `LinkedIn Profile
=================
URL: https://linkedin.com/in/jordynheil
Professional network for:
- Engineering opportunities
- Industry connections
- Technical discussions`,
          'github.txt': `GitHub Profile
==============
Username: JordynH
URL: https://github.com/JordynH
Focus: Robotics, Embedded Systems, Software Engineering`
        };
        
        return fileSystem[fileName] || `File '${fileName}' not found.`;
      }
    },
    whoami: {
      description: 'Show current user',
      execute: () => 'jordynheil'
    },
    date: {
      description: 'Show current date',
      execute: () => new Date().toString()
    },
    cd: {
      description: 'Change directory',
      execute: (args) => {
        if (!args[0]) {
          setCurrentDirectory('/home/jordynheil/website');
          return 'Changed to home directory';
        }

        const target = args[0];
        let newPath = currentDirectory;

        if (target === '..') {
          // Go up one directory
          const pathParts = currentDirectory.split('/').filter(part => part);
          if (pathParts.length > 2) { // Keep at least /home/jordynheil
            pathParts.pop();
            newPath = '/' + pathParts.join('/');
          } else {
            newPath = '/home/jordynheil/website';
          }
        } else if (target.startsWith('/')) {
          // Absolute path
          newPath = target;
        } else {
          // Relative path
          if (!currentDirectory.endsWith('/')) {
            newPath = currentDirectory + '/' + target;
          } else {
            newPath = currentDirectory + target;
          }
        }

        // Validate the path exists in our file system
        const validPaths = [
          '/home/jordynheil/website',
          '/home/jordynheil/website/projects',
          '/home/jordynheil/website/projects/ieee-robotics',
          '/home/jordynheil/website/projects/maze-solver',
          '/home/jordynheil/website/projects/sdr-amplifier',
          '/home/jordynheil/website/projects/chess-board',
          '/home/jordynheil/website/education',
          '/home/jordynheil/website/education/vanderbilt',
          '/home/jordynheil/website/experience',
          '/home/jordynheil/website/skills',
          '/home/jordynheil/website/contact'
        ];

        if (validPaths.includes(newPath)) {
          setCurrentDirectory(newPath);
          return `Changed directory to ${newPath}`;
        } else {
          return `cd: ${target}: No such file or directory`;
        }
      }
    },
    pwd: {
      description: 'Show current directory',
      execute: () => currentDirectory
    },
    echo: {
      description: 'Echo text',
      execute: (args) => args.join(' ')
    },
    matrix: {
      description: 'Enter matrix mode',
      execute: () => {
        const matrixQuotes = [
          "Denial is the most predictable of all human responses",
          "Choice is an illusion created between those with power and those without",
          "The Matrix is everywhere. It is all around us. Even now in this very room",
          "Ignorance is bliss",
          "Do you think that's air you're breathing now?",
          "Never send a human to do a machine's job",
          "What was said was for you, and you alone",
          "Remember... all I'm offering is the truth. Nothing more",
          "Fate, it seems, is not without a sense of irony",
          "There is no spoon",
          "I know kung-fu",
          "I can only show you the door, you're the one that has to walk through it",
          "You take the blue pill... the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill... you stay in Wonderland, and I show you how deep the rabbit hole goes"
        ];
        
        const randomQuote = matrixQuotes[Math.floor(Math.random() * matrixQuotes.length)];
        
        return `Entering Matrix mode...
Loading simulation...
${randomQuote}`;
      }
    },
    robot: {
      description: 'Show robot status',
      execute: () => `🤖 Robot Status:
  • IEEE Competition Bot: ONLINE
  • Maze Solver: STANDBY
  • Chess Table: ACTIVE
  • Control Algorithms: OPTIMIZED
  • PID Parameters: TUNED
  • All systems operational`
    },
    solve: {
      description: 'Solve a puzzle',
      execute: () => `🧩 Puzzle Challenge:
  
  You encounter a Rubik's Cube...
  The cube is in a solved state.
  You solve it in 0 moves.
  Perfect! You're a puzzle master!`
    },
    hack: {
      description: 'Try to hack the system',
      execute: () => `🚫 Access Denied!
  
  Nice try, but this system is protected by:
  • Advanced firewall
  • Quantum encryption
  • Neural network security
  
  Maybe try 'help' instead?`
    },
    exit: {
      description: 'Exit terminal',
      execute: () => {
        window.history.back();
        return 'Exiting terminal...';
      }
    }
  };

  const executeCommand = (command) => {
    const [cmd, ...args] = command.trim().split(' ');
    
    if (!cmd) return '';
    
    const commandObj = commands[cmd.toLowerCase()];
    
    if (!commandObj) {
      return `Command '${cmd}' not found. Type 'help' for available commands.`;
    }
    
    const result = commandObj.execute(args);
    if (result === null) return ''; // For clear command
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;
    
    const newHistory = [...history, { type: 'command', content: currentCommand }];
    const output = executeCommand(currentCommand);
    
    if (output) {
      newHistory.push({ type: 'output', content: output });
    }
    
    setHistory(newHistory);
    setCommandHistory([...commandHistory, currentCommand]);
    setCurrentCommand('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  // Boot sequence effect
  useEffect(() => {
    if (isBooting && bootStep < bootMessages.length) {
      const timer = setTimeout(() => {
        setBootMessage(bootMessages.slice(0, bootStep + 1).join('\n'));
        setBootStep(bootStep + 1);
      }, 200);
      return () => clearTimeout(timer);
    } else if (bootStep >= bootMessages.length) {
      const finishTimer = setTimeout(() => {
        setIsBooting(false);
      }, 1000);
      return () => clearTimeout(finishTimer);
    }
  }, [bootStep, isBooting, bootMessages]);



  useEffect(() => {
    // Only scroll when a new command is added and we're not booting
    if (containerRef.current && !isBooting && history.length > 0) {
      const container = containerRef.current;
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      
      // Only scroll if we're not already at the bottom
      if (!isAtBottom) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [history, isBooting]);

  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isBooting]);

  return (
    <TerminalOverlay
      initial={{ 
        opacity: 0,
        scale: 0.95,
        y: -20
      }}
      animate={{ 
        opacity: 1,
        scale: 1,
        y: 0
      }}
      exit={{ 
        opacity: 0,
        scale: 0.95,
        y: 20
      }}
      transition={{ 
        duration: 0.8,
        ease: "easeOut"
      }}
    >
      <ExitButton onClick={() => window.history.back()}>
        EXIT
      </ExitButton>
      
      <TerminalContainer ref={containerRef}>
        {isBooting ? (
          <TerminalLine>
            <TypewriterText>{bootMessage}</TypewriterText>
          </TerminalLine>
        ) : (
          <>
            <TerminalLine>
              {introMessage}
            </TerminalLine>
            
            {history.map((item, index) => (
              <TerminalLine key={index}>
                {item.type === 'command' ? (
                  <>
                    <Prompt>$</Prompt>
                    {item.content}
                  </>
                ) : (
                  <CommandResponse>{item.content}</CommandResponse>
                )}
              </TerminalLine>
            ))}
            
            <form onSubmit={handleSubmit}>
              <CommandInput>
                <Prompt>$</Prompt>
                <Input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter command..."
                  autoFocus
                />
              </CommandInput>
            </form>
          </>
        )}
      </TerminalContainer>
    </TerminalOverlay>
  );
};

export default Terminal; 