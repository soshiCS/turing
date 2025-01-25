import React, { useState } from "react";
import SelfLoopEdge from "./selfLoopEdge";
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";

// Custom edge for self-loops

const edgeTypes = {
  selfLoop: SelfLoopEdge,
};

const LanguageDiagram = ({ rules }) => {
  // Generate initial nodes
  const initialNodes = Object.keys(rules).map((state, index) => ({
    id: state,
    type: state === "q0" ? "input" : "default",
    data: { label: state },
    position: { x: index * 200, y: 100 },
    style: {
      width: 50,
      height: 50,
      borderRadius: "50%",
      backgroundColor: state === "q0" ? "#d4edda" : "#ffffff",
      border: "2px solid #000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  }));

  // Generate initial edges
  const initialEdges = Object.keys(rules).flatMap((fromState) =>
    Object.keys(rules[fromState]).map((readSymbol) => {
      const [writeSymbol, direction, toState] = rules[fromState][readSymbol];
      const isSelfLoop = fromState === toState;
      return {
        id: `edge-${fromState}-${toState}`,
        source: fromState,
        target: toState,
        label: `${readSymbol}, ${writeSymbol}/${direction}`,
        style: { stroke: "black", strokeWidth: 2 },
        markerEnd: {
          type: "arrow",
          width: 15,
          height: 15,
        },
        type: isSelfLoop ? "selfLoop" : "default", // Use custom edge type for self-loops
      };
    })
  );

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = (changes) =>
    setNodes((nds) =>
      nds.map((n) => ({ ...n, ...changes.find((c) => c.id === n.id) }))
    );

  const onEdgesChange = (changes) => setEdges((eds) => [...eds, ...changes]);

  return (
    <div
      style={{
        height: "80vh",
        width: "90vw",
        border: "2px solid #ccc",
        borderRadius: "10px",
        overflow: "hidden",
        padding: "10px",
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          edgeTypes={edgeTypes} // Register custom edge types
          fitView
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default LanguageDiagram;
