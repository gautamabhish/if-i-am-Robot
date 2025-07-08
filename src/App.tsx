//@ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import adapt from './assets/images/adapt.png';
import frustrated from './assets/images/frustrated.png';
import notebook_handwriting from './assets/images/notebook_handwriting.png';
import shrug from './assets/images/shrug.png';
import analyse from './assets/images/analyse.png';
import glowing_brain_icon from './assets/images/glowing_brain_icon.png';
import overheat from './assets/images/overheat.png';
import shutdown from './assets/images/shutdown.png';
import awkward from './assets/images/awkward.png';
import grateful from './assets/images/grateful.png';
import react from './assets/images/react.svg'; // Note: 'react.svg' is typically a component, not an image for direct <img> src.
import sleeping from './assets/images/sleeping.png';
import bsod from './assets/images/bsod.png';
import ignore from './assets/images/ignore.png';
import RecaptchaLogo from './assets/images/RecaptchaLogo.svg.png'; // Renamed to avoid conflict
import suspicious from './assets/images/suspicious.jpg';
import cry from './assets/images/cry.png';
import lagging from './assets/images/lagging.png';
import reminder_notification from './assets/images/reminder_notification.png';
import tv from './assets/images/tv.png';
import foogy_brain from './assets/images/foogy_brain.png';
import loop from './assets/images/loop.png';
import running from './assets/images/running.png';
import frozen from './assets/images/frozen.png';
import meditation from './assets/images/meditation.png';
import scroll from './assets/images/scroll.png';
import robotImg from './assets/images/RecaptchaLogo.svg.png'; // Assuming you have a robot image for the checkbox
import { Copy } from "lucide-react";
// Create an object mapping original filenames to their imported module paths
import handler from "../api/robotpersona.js"
const TypingEffect = ({ text, speed = 20 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(prev => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return <>{displayed}</>;
};


const RobotVerifierPage = () => {
  const images = {
  'adapt.png': adapt,
  'frustrated.png': frustrated,
  'notebook_handwriting.png': notebook_handwriting,
  'shrug.png': shrug,
  'analyse.png': analyse,
  'glowing_brain_icon.png': glowing_brain_icon,
  'overheat.png': overheat,
  'shutdown.png': shutdown,
  'awkward.png': awkward,
  'grateful.png': grateful,
  'react.svg': react,
  'sleeping.png': sleeping,
  'bsod.png': bsod,
  'ignore.png': ignore,
  'RecaptchaLogo.svg.png': RecaptchaLogo,
  'suspicious.jpg': suspicious,
  'cry.png': cry,
  'lagging.png': lagging,
  'reminder_notification.png': reminder_notification,
  'tv.png': tv,
  'foogy_brain.png': foogy_brain,
  'loop.png': loop,
  'running.png': running,
  'frozen.png': frozen,
  'meditation.png': meditation,
  'scroll.png': scroll,
};
 const visualCaptchaSets = {
  set1: [
    {
      question: 'How do you usually remember things?', // Added a general question prompt
      questionId: "remember-things",
      options: [
        { imageName: "notebook_handwriting.png", value: "I write them down somewhere" },
        { imageName: "glowing_brain_icon.png",    value: "I trust my memory" },
        { imageName: "reminder_notification.png", value: "I use reminders or apps" },
        { imageName: "foogy_brain.png",           value: "I forget but remember later" },
      ],
    },
    {
      question: 'What do you do when plans change suddenly?',
      questionId: "plans-change",
      options: [
        { imageName: "adapt.png",          value: "Adapt quickly and move on" },
        { imageName: "frozen.png",         value: "Freeze for a bit before adjusting" },
        { imageName: "frustrated.png",     value: "Feel frustrated but go with the flow" },
        { imageName: "shutdown.png",       value: "Completely shut down" },
      ],
    },
    {
      question: 'How do you feel when you make a mistake?',
      questionId: "making-mistake",
      options: [
        { imageName: "analyse.png",         value: "I analyze and learn from it" },
        { imageName: "cry.png",             value: "I feel bad for a while" },
        { imageName: "ignore.png",          value: "I ignore it and move on" },
        { imageName: "loop.png",            value: "I replay it in my head endlessly" },
      ],
    },
    {
      question: 'When you’re tired, what’s your go-to recharge?',
      questionId: "when-tired",
      options: [
        { imageName: "sleeping.png",        value: "Sleep deeply" },
        { imageName: "scroll.png",          value: "Scroll mindlessly" },
        { imageName: "tv.png",              value: "Watch something relaxing" },
        { imageName: "meditation.png",      value: "Just sit in silence" },
      ],
    },
    {
      question: 'How do you respond to praise?',
      questionId: "respond-to-praise",
      options: [
        { imageName: "grateful.png",        value: "Grateful and motivated" },
        { imageName: "awkward.png",         value: "Awkwardly accept it" },
        { imageName: "shrug.png",           value: "Downplay it" },
        { imageName: "suspicious.jpg",      value: "Think it’s suspicious" },
      ],
    },
    {
      question: 'If your brain had a status, what would it be?',
      questionId: "brain-status",
      options: [
        { imageName: "running.png",         value: "Running smoothly" },
        { imageName: "overheat.png",        value: "Overheating slightly" },
        { imageName: "lagging.png",         value: "Lagging occasionally" },
        { imageName: "bsod.png",            value: "Crashing every now and then" },
      ],
    },
  ],

  set2: [
    {
      question: 'How do you approach problems?',
      questionId: "approach-problems",
      options: [
        { imageName: "gears_and_logic_diagram.png", value: "Logically" },
        { imageName: "heart_and_circuit.png",       value: "Emotionally" },
        { imageName: "robot_avoiding_wall.png",     value: "Avoid them" },
        { imageName: "trial_and_error_path.png",    value: "Trial and error" },
      ],
    },
    {
      question: 'What’s your response to stress?',
      questionId: "response-to-stress",
      options: [
        { imageName: "focused_robot_lens.png", value: "Calm and focused" },
        { imageName: "robot_sweating.png",     value: "Slight panic" },
        { imageName: "powered_down_robot.png", value: "Shutdown" },
        { imageName: "robot_rebooting.png",    value: "Reboot" },
      ],
    },
    {
      question: 'When someone misunderstands you, what do you do?',
      questionId: "misunderstood",
      options: [
        { imageName: "robot_explaining.png",   value: "Explain again" },
        { imageName: "silent_robot.png",       value: "Stay quiet" },
        { imageName: "robot_overthinking.png", value: "Overthink it" },
        { imageName: "erased_memory_chip.png", value: "Forget it happened" },
      ],
    },
    {
      question: 'Choose your processing speed:',
      questionId: "processing-speed",
      options: [
        { imageName: "speedometer_fast.png",    value: "Fast" },
        { imageName: "speedometer_medium.png",  value: "Medium" },
        { imageName: "speedometer_slow.png",    value: "Slow" },
        { imageName: "speedometer_variable.png",value: "It depends" },
      ],
    },
    {
      question: 'What’s your idle state like?',
      questionId: "idle-state",
      options: [
        { imageName: "creative_lightbulb.png", value: "Creative" },
        { imageName: "anxious_pupils.png",     value: "Anxious" },
        { imageName: "peaceful_landscape.png", value: "Peaceful" },
        { imageName: "blank_screen.png",       value: "Nonexistent" },
      ],
    },
    {
      question: 'What motivates you the most?',
      questionId: "what-motivates",
      options: [
        { imageName: "curiosity_magnifying_glass.png", value: "Curiosity" },
        { imageName: "routine_calendar.png",            value: "Routine" },
        { imageName: "deadline_clock.png",              value: "Deadline" },
        { imageName: "validation_trophy.png",           value: "Validation" },
      ],
    },
  ],
};

  const [isChecked, setIsChecked] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedSet, setSelectedSet] = useState([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);
  const [robotPersona, setRobotPersona] = useState<string | null>(null); // To store the robot persona output

  const checkboxRef = useRef(null);

  const loadNewQuestions = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    setIsVerified(false);
    setRobotPersona(null); // Clear previous persona
    setCurrentQuestionIndex(0); // Reset to first question

    setTimeout(() => {
      const sets = Object.values(visualCaptchaSets); // Use visualCaptchaSets now
      const randomSet = sets[Math.floor(Math.random() * sets.length)];
      setSelectedSet(sets[0]);
      setAnswers(Array(randomSet.length).fill(''));
      setIsLoading(false);
    }, 500);
  }, []);

  const handleCheckboxClick = () => {
    if (isVerified) return;

    setIsChecked(true);
    setIsLoading(true);
    setIsError(false);
    setIsVerified(false);
    setRobotPersona(null); // Clear persona on new interaction

    setTimeout(() => {
     
        setShowChallenge(true);
        loadNewQuestions();
     
       
    }, 1000);
  };

const handleAnswerAndNext = (qIndex: number, value: string) => {
  const updatedAnswers = [...answers];
  updatedAnswers[qIndex] = value;
  setAnswers(updatedAnswers);

  if (qIndex < selectedSet.length - 1) {
    setCurrentQuestionIndex(prev => prev + 1);
  } else {
    handleSubmit(updatedAnswers); // Pass updated answers directly
  }
};


  const handleSubmit =  async (finalAnswers: string[] = answers) => {
    setIsLoading(true);
    setIsError(false);
    setIsVerified(false);
    setRobotPersona(null); // Clear previous persona

    try {
      // Pass all answers for analysis
      const personaResult = await handlePersonaMatch(finalAnswers); // This is where your backend call goes
      if (personaResult.isRobot) { // Now consistently checking for isRobot
        setIsVerified(true);
        setShowChallenge(false);
        setRobotPersona(personaResult.robotOutput); // Set the detailed robot output
      } else {
        setIsError(true);
        setRobotPersona(personaResult.robotOutput || "Analysis inconclusive: Human-like patterns detected. Re-evaluation required."); // Provide default if no output
        setTimeout(() => {
          setShowChallenge(true); // Show challenge again on failure
          loadNewQuestions(); // Load new questions for retry
        }, 2000); // Longer delay before retry
      }
    } catch (error) {
      console.error('Persona matching failed:', error);
      setIsError(true);
      setRobotPersona("System error: Unable to process data. Initiate retry protocol.");
      setTimeout(() => {
        setShowChallenge(true);
        loadNewQuestions();
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Placeholder for Gemini API integration (Backend logic) ---
  // This function would send data to your backend endpoint for Gemini processing

const [copied, setCopied] = useState(false);
const [userName, setUserName] = useState('');
const handleNameChange = (e) => {
  setUserName(e.target.value);
};

const handlePersonaMatch = async (userAnswers: string[]): Promise<{ isRobot: boolean; robotOutput: string }> => {
  try {
    const traits = userAnswers.map(answer => answer.toLowerCase());

    const res = await fetch('/api/robot-persona', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ traits }),
    });

    const data = await res.json();

    return {
      isRobot: data?.isRobot ?? false,
      robotOutput: data?.robotIntro ?? 'Unable to generate robot intro.',
    };
  } catch (error) {
    console.error("Gemini error:", error);
    return {
      isRobot: false,
      robotOutput: "System error: Unable to process data. Initiate retry protocol.",
    };
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-sans max-w-screen">
        
      <input
        type="text"
        id="userName"
        required
        value={userName}
        onChange={handleNameChange}
        placeholder="Enter your name"
        className="appearance-none border-none mb-2 focus:outline-none w-fit text-center uppercase"
      />
      <div className="border w-fit border-gray-300 rounded-lg shadow-lg bg-white max-w-screen p-2   overflow-hidden">
        {/* Top bar with checkbox */}
       
        <div className="  flex justify-center items-center space-x-2 py-2 px-2 border-b border-gray-200">
          <div className="relative w-6 h-6 flex items-center justify-center">
  <input
    type="checkbox"
    ref={checkboxRef}
    className=" w-full h-full border-2 border-gray-400 text-blue-500 rounded-sm cursor-pointer checked:border-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    checked={isChecked && isVerified}
    onChange={handleCheckboxClick}
    disabled={isLoading || isVerified || showChallenge || userName.trim() === ''} // Disable if loading, verified, challenge shown, or no name
  />
            {/* {(isLoading && !isVerified) && (
              <div className="absolute animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            )} */}
            {/* {isVerified && (
             <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-blue-600">
      ✔
    </span>
            )} */}
          </div>
          <label
            htmlFor="not-robot-checkbox"
            className={`text-base font-medium text-gray-800 ml-1`}
          >
            I'm  a robot
          </label>
          <div className="ml-20">
            <img src={robotImg} alt="reCAPTCHA" className="w-10 h-10" />
          </div>
        </div>

        {/* Challenge Section (appears conditionally) */}
    {showChallenge && !isVerified && !isLoading && selectedSet.length > 0 && (
  <div className="p-4 space-y-4">
    {/* Current Question */}
    <div className="space-y-3">
      <p className="font-medium text-gray-800 text-sm">
        {selectedSet[currentQuestionIndex]?.question}
      </p>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-0 w-full">
        {selectedSet[currentQuestionIndex]?.options.map((option, oIndex) => (
          <div
            key={oIndex}
            onClick={() => handleAnswerAndNext(currentQuestionIndex, option.value)}
            className={`
              relative h-44 sm:h-52 w-full flex items-center justify-center 
              border-2 rounded-lg overflow-hidden cursor-pointer transition-all 
              ${answers[currentQuestionIndex] === option.value 
                ? 'border-blue-600 ring-2 ring-blue-400 scale-95' 
                : 'border-gray-200 hover:border-blue-400 hover:scale-[1.025] hover:z-10'}
            `}
          >
            <img
              src={images[option.imageName]}
              alt={option.value}
              className="object-cover w-full h-full"
              title={option.value}
            />
          </div>
        ))}
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex justify-end items-center pt-2">
     

      <button
        onClick={loadNewQuestions}
        className="px-3 py-1 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-xs"
        disabled={isLoading}
      >
        Reset Sequence
      </button>
    </div>
  </div>
)}


        {/* Loading state for challenge submission */}
        {isLoading && (
          <div className="p-4 flex flex-col items-center justify-center min-h-[150px]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 text-sm">Initiating robot persona analysis...</p>
          </div>
        )}

        {/* Robot Persona Output */}
{!isLoading && robotPersona && (
  <div className="p-4 text-left space-y-4 relative">
 

    {/* Robot Persona Chat-style Box */}
    <div className="relative bg-gray-100 rounded-md px-4 py-3 text-sm font-mono leading-relaxed text-gray-800 shadow-inner whitespace-pre-wrap border border-gray-200">
      
      {/* Copy Button */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(robotPersona);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 flex items-center space-x-1"
        title="Copy"
      >
        <Copy className="w-4 h-4" />
        {copied && <span className="text-xs font-medium">Copied!</span>}
      </button>

      <TypingEffect text={robotPersona} />
    </div>

    {/* Retry Button */}
    {!isVerified && (
      <div className="text-right">
        <button
          onClick={() => {
            setIsChecked(false);
            setShowChallenge(false);
            setIsError(false);
            setIsLoading(false);
            setRobotPersona(null);
            setAnswers([]);
            setSelectedSet([]);
          }}
          className="mt-2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
           Retry Verification
        </button>
      </div>
    )}
  </div>
)}


      </div>
    </div>
  );
};

export default RobotVerifierPage;