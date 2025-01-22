import React from "react";
import "./Tape.css";

const Tape = ({ tape, headPosition }) => {
  return (
    <div className="tape">
      {tape.map((symbol, index) => (
        <div
          key={index}
          className={`tape-cell ${index === headPosition ? "active" : ""}`}
        >
          {symbol}
        </div>
      ))}
    </div>
  );
};

export default Tape;
