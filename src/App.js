import React, { useState, useEffect } from "react";
import Tape from "./components/Tape/Tape";
import Controls from "./components/Controls/Controls";
import RuleBuilder from "./components/RuleBuilder/RuleBuilder";
import LanguageDiagram from "./components/LanguageDiagram/LanguageDiagram";
import "./App.css";

// Default language rules
const DEFAULT_LANGUAGE = {
  Default: {
    q0: { 0: ["1", "R", "q1"] },
    q1: { 1: ["0", "L", "q2"] },
    q2: { 1: ["1", "R", "q2"] },
  },
};

const App = () => {
  const [languages, setLanguages] = useState(DEFAULT_LANGUAGE); // Initialize with default language
  const [selectedLanguage, setSelectedLanguage] = useState("Default"); // Default language is selected by default
  const [rules, setRules] = useState(DEFAULT_LANGUAGE.Default); // Set rules for the default language
  const [tape, setTape] = useState(["0", "1", "0", "1", "_"]); // Initial tape
  const [headPosition, setHeadPosition] = useState(0); // Initial head position
  const [currentState, setCurrentState] = useState("q0"); // Initial state
  const [userInput, setUserInput] = useState(""); // User input for the tape

  // Save a language with the given name and rules
  const saveLanguage = (name, newRules) => {
    const formattedRules = {};
    newRules.forEach((rule) => {
      if (!formattedRules[rule.currentState]) {
        formattedRules[rule.currentState] = {};
      }
      formattedRules[rule.currentState][rule.currentSymbol] = [
        rule.writeSymbol,
        rule.direction,
        rule.nextState,
      ];
    });
    setLanguages({ ...languages, [name]: formattedRules });
    alert(`Language "${name}" saved successfully!`);
  };

  // Load a saved language by name
  const loadLanguage = (name) => {
    if (!languages[name]) {
      alert("Language not found.");
      return;
    }
    setSelectedLanguage(name);
    setRules(languages[name]);
    setCurrentState("q0");
    setHeadPosition(0);
    setTape(userInput.split("") || ["0", "1", "0", "1", "_"]); // Default tape if input is empty
  };

  // Perform a single step of the Turing machine
  const step = () => {
    if (!selectedLanguage) {
      alert("No language selected. Please load a language.");
      return;
    }

    const symbol = tape[headPosition] || "_"; // Default to blank if cell is undefined
    const transition = rules[currentState]?.[symbol];

    if (!transition) {
      alert("No rule defined for this state and symbol. Halting.");
      return;
    }

    const [write, direction, nextState] = transition;
    const newTape = [...tape];
    newTape[headPosition] = write;

    setTape(newTape);
    setHeadPosition((prev) => (direction === "R" ? prev + 1 : prev - 1));
    setCurrentState(nextState);
  };

  // Automatically load the default language on the first render
  useEffect(() => {
    loadLanguage("Default");
  }, []);

  return (
    <div className="App">
      <h1>Turing Machine Simulator</h1>

      {/* Rule Builder */}
      <RuleBuilder onSaveLanguage={saveLanguage} />

      {/* Saved Languages */}
      <div className="language-list">
        <h2>Saved Languages</h2>
        {Object.keys(languages).map((name) => (
          <button key={name} onClick={() => loadLanguage(name)}>
            {name}
          </button>
        ))}
      </div>

      {/* User Input for Tape */}
      <div className="tape-input">
        <h3>Set Initial Tape Input</h3>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Initialize the tape:"
        />
        <button onClick={() => setTape(userInput.split(""))}>Set Tape</button>
      </div>

      {/* Language Diagram */}
      {selectedLanguage && (
        <div>
          <h3>Diagram of "{selectedLanguage}"</h3>
          <LanguageDiagram rules={rules} />
        </div>
      )}

      {/* Tape Visualization */}
      <Tape tape={tape} headPosition={headPosition} />

      {/* State Display */}
      <div className="state-display">Current State: {currentState}</div>

      {/* Controls */}
      <Controls step={step} />
    </div>
  );
};

export default App;
