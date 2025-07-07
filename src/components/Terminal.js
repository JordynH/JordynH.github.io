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
`;

const MatrixRain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 255, 0, 0.1) 50%,
      transparent 100%
    );
    animation: matrix-sweep 3s ease-in-out;
  }
  
  @keyframes matrix-sweep {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
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
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      rgba(0, 255, 0, 0.03) 50%,
      transparent 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
    animation: scan 10s linear infinite;
  }
  
  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
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

const Cursor = styled.span`
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
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
`;

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const introMessage = `Welcome to Jordyn Heil's Terminal v1.0.0
Initializing system...
Loading user profile...
Establishing secure connection...
System ready.
Type 'help' for available commands.`;

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
  ls - List files
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
      execute: () => `Directory listing:
📁 projects/
📁 education/
📁 experience/
📁 skills/
📁 contact/
📄 resume.txt
📄 about.txt
📄 github.txt`
    },
    cat: {
      description: 'Read file contents',
      execute: (args) => {
        if (!args[0]) return 'Usage: cat [filename]';
        
        const files = {
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
Focus: Robotics, Embedded Systems, Software Engineering`
        };
        
        return files[args[0]] || `File '${args[0]}' not found.`;
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
    pwd: {
      description: 'Show current directory',
      execute: () => '/home/jordynheil/website'
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

  // Typewriter effect for intro message
  useEffect(() => {
    if (isTyping && currentIndex < introMessage.length) {
      const timer = setTimeout(() => {
        setTypedText(introMessage.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 20); // Four times as fast as original
      return () => clearTimeout(timer);
    } else if (currentIndex >= introMessage.length) {
      // Add a small delay before finishing
      const finishTimer = setTimeout(() => {
        setIsTyping(false);
      }, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [currentIndex, isTyping, introMessage]);

  useEffect(() => {
    // Only scroll when a new command is added and we're not typing
    if (containerRef.current && !isTyping && history.length > 0) {
      const container = containerRef.current;
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      
      // Only scroll if we're not already at the bottom
      if (!isAtBottom) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [history, isTyping]);

  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  return (
    <TerminalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MatrixRain />
      <ExitButton onClick={() => window.history.back()}>
        EXIT
      </ExitButton>
      
      <TerminalContainer ref={containerRef}>
        {isTyping ? (
          <TerminalLine>
            <TypewriterText>{typedText}</TypewriterText>
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