import React from "react";
import "./Controls.css";

const Controls = ({ step, reset }) => {
  return (
    <div className="controls">
      <button onClick={step}>Step</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Controls;
