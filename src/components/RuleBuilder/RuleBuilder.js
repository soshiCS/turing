import React, { useState } from "react";
import "./RuleBuilder.css";

const RuleBuilder = ({ onSaveLanguage }) => {
  const [languageName, setLanguageName] = useState("");
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({
    currentState: "",
    currentSymbol: "",
    writeSymbol: "",
    direction: "R",
    nextState: "",
  });

  const addRule = () => {
    if (
      !newRule.currentState ||
      !newRule.currentSymbol ||
      !newRule.writeSymbol ||
      !newRule.nextState
    ) {
      alert("All fields are required for a rule.");
      return;
    }

    setRules([...rules, newRule]);
    setNewRule({
      currentState: "",
      currentSymbol: "",
      writeSymbol: "",
      direction: "R",
      nextState: "",
    });
  };

  const deleteRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const saveLanguage = () => {
    if (!languageName.trim()) {
      alert("Please provide a name for the language.");
      return;
    }

    if (rules.length === 0) {
      alert("Add at least one rule before saving the language.");
      return;
    }

    onSaveLanguage(languageName, rules);
    setLanguageName("");
    setRules([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRule((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="rule-builder">
      <h2>Rule Builder</h2>
      <div className="language-form">
        <input
          type="text"
          value={languageName}
          onChange={(e) => setLanguageName(e.target.value)}
          placeholder="Language Name (e.g., Addition)"
        />
      </div>
      <div className="rule-form">
        <input
          type="text"
          name="currentState"
          value={newRule.currentState}
          onChange={handleInputChange}
          placeholder="Current State (e.g., q0)"
        />
        <input
          type="text"
          name="currentSymbol"
          value={newRule.currentSymbol}
          onChange={handleInputChange}
          placeholder="Current Symbol (e.g., 1)"
        />
        <input
          type="text"
          name="writeSymbol"
          value={newRule.writeSymbol}
          onChange={handleInputChange}
          placeholder="Write Symbol (e.g., 0)"
        />
        <select
          name="direction"
          value={newRule.direction}
          onChange={handleInputChange}
        >
          <option value="R">Right</option>
          <option value="L">Left</option>
        </select>
        <input
          type="text"
          name="nextState"
          value={newRule.nextState}
          onChange={handleInputChange}
          placeholder="Next State (e.g., q1)"
        />
        <button onClick={addRule}>Add Rule</button>
      </div>
      <div className="rule-list">
        <h3>Defined Rules</h3>
        {rules.map((rule, index) => (
          <div key={index} className="rule-item">
            <span>
              {rule.currentState} + {rule.currentSymbol} → {rule.writeSymbol},{" "}
              {rule.direction}, {rule.nextState}
            </span>
            <button onClick={() => deleteRule(index)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={saveLanguage} className="save-button">
        Save Language
      </button>
    </div>
  );
};

export default RuleBuilder;
