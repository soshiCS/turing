import React, { useState } from "react";
import Tape from "./components/Tape/Tape";
import Controls from "./components/Controls/Controls";
import RuleBuilder from "./components/RuleBuilder/RuleBuilder";
import "./App.css";

const App = () => {
  const [languages, setLanguages] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [tape, setTape] = useState([
    "_",
    "_",
    "_",
    "1",
    "0",
    "1",
    "_",
    "_",
    "_",
  ]);
  const [headPosition, setHeadPosition] = useState(3);
  const [currentState, setCurrentState] = useState("q0");

  const saveLanguage = (name, rules) => {
    const formattedRules = {};
    rules.forEach((rule) => {
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

  const loadLanguage = (name) => {
    if (!languages[name]) {
      alert("Language not found.");
      return;
    }
    setSelectedLanguage(languages[name]);
    setCurrentState("q0");
    setHeadPosition(3);
    setTape(["_", "_", "_", "1", "0", "1", "_", "_", "_"]);
  };

  const step = () => {
    if (!selectedLanguage) {
      alert("No language selected. Please load a language.");
      return;
    }

    const symbol = tape[headPosition];
    const transition = selectedLanguage[currentState]?.[symbol];

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

  return (
    <div className="App">
      <h1>Turing Machine Simulator</h1>
      <RuleBuilder onSaveLanguage={saveLanguage} />
      <div className="language-list">
        <h2>Saved Languages</h2>
        {Object.keys(languages).map((name) => (
          <button key={name} onClick={() => loadLanguage(name)}>
            {name}
          </button>
        ))}
      </div>
      <Tape tape={tape} headPosition={headPosition} />
      <div className="state-display">Current State: {currentState}</div>
      <Controls step={step} />
    </div>
  );
};

export default App;
