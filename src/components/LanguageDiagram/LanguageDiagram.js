import React, { useEffect, useCallback } from "react";
import SelfLoopEdge from "./selfLoopEdge";
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

const edgeTypes = {
  selfLoop: SelfLoopEdge,
};

const LanguageDiagram = ({ rules }) => {
  // State management for nodes and edges using ReactFlow hooks
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Function to generate nodes and edges based on rules
  const generateDiagram = useCallback(() => {
    const newNodes = Object.keys(rules).map((state, index) => ({
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

    const newEdges = Object.keys(rules).flatMap((fromState) =>
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
          type: isSelfLoop ? "selfLoop" : "default",
        };
      })
    );

    setNodes(newNodes);
    setEdges(newEdges);
  }, [rules, setNodes, setEdges]);

  // Regenerate the graph whenever rules change
  useEffect(() => {
    generateDiagram();
  }, [rules, generateDiagram]);

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
          edgeTypes={edgeTypes}
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
