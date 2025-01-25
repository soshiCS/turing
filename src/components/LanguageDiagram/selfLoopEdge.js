import React from "react";

const SelfLoopEdge = ({
  id,
  sourceX,
  sourceY,
  style = {},
  markerEnd,
  label,
}) => {
  console.log("joooooooooooo");
  const loopOffset = 50; // Adjust arc size
  const nodeRadius = 50; // Account for the node's radius to avoid overlap

  const edgePath = `
    M ${sourceX} ${sourceY - nodeRadius} 
    C ${sourceX + loopOffset} ${sourceY - loopOffset - nodeRadius}, 
      ${sourceX - loopOffset} ${sourceY - loopOffset - nodeRadius}, 
      ${sourceX} ${sourceY - nodeRadius}
  `;

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{
          ...style,
          fill: "none",
          stroke: "black",
          strokeWidth: 2,
        }}
        markerEnd={markerEnd}
      />
      {label && (
        <text
          x={sourceX}
          y={sourceY - loopOffset - nodeRadius - 10}
          style={{
            fill: "black",
            fontSize: "12px",
            textAnchor: "middle",
            dominantBaseline: "middle",
          }}
        >
          {label}
        </text>
      )}
    </>
  );
};

export default SelfLoopEdge;
