"use client";
import React from "react";

interface GraphStepType {
  nodes: string[];
  edges: [string, string][];
  visited: string[];
  queueOrStack: string[];
  current: string | null;
  explanation: string;
  line: number;
}

interface GraphVisualizerProps {
  step: GraphStepType;
}

// Koordinat posisi tetap untuk contoh node sederhana (A, B, C, D, E, F)
const nodeCoordinates: Record<string, { x: number; y: number }> = {
  A: { x: 100, y: 100 },
  B: { x: 250, y: 60 },
  C: { x: 400, y: 100 },
  D: { x: 175, y: 200 },
  E: { x: 325, y: 200 },
  F: { x: 250, y: 280 },
};

export function GraphVisualizer({ step }: GraphVisualizerProps) {
  if (!step) return <div>Memuat visualisasi graph...</div>;

  const { nodes, edges, visited, current, queueOrStack } = step;

  return (
    <div className="bg-white border-3 border-black p-6 rounded-neo shadow-neo space-y-6">
      <div className="flex justify-between items-center border-b-2 border-black pb-3">
        <h3 className="font-black text-lg uppercase">Graph Traversal Visualizer</h3>
        <div className="flex gap-4 text-xs font-bold">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-neoLime border border-black inline-block"></span> Dikunjungi (Visited)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-neoCyan border border-black inline-block"></span> Saat Ini (Current)
          </span>
        </div>
      </div>

      {/* SVG Canvas untuk Node & Edge */}
      <div className="relative w-full h-[350px] bg-gray-50 border-2 border-black rounded-neo flex items-center justify-center overflow-hidden">
        <svg className="w-full h-full absolute inset-0">
          {/* Render Edges (Garis) */}
          {edges.map(([u, v], idx) => {
            const start = nodeCoordinates[u] || { x: 50, y: 50 };
            const end = nodeCoordinates[v] || { x: 100, y: 100 };
            return (
              <line
                key={idx}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="black"
                strokeWidth="3"
              />
            );
          })}

          {/* Render Nodes (Lingkaran) */}
          {nodes.map((node) => {
            const pos = nodeCoordinates[node] || { x: 50, y: 50 };
            const isCurrent = current === node;
            const isVisited = visited.includes(node);

            let fillColor = "white";
            if (isCurrent) fillColor = "#00f0ff"; // neoCyan
            else if (isVisited) fillColor = "#39ff14"; // neoLime

            return (
              <g key={node} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle
                  r="24"
                  fill={fillColor}
                  stroke="black"
                  strokeWidth="3"
                />
                <text
                  textAnchor="middle"
                  dy=".3em"
                  className="font-black text-sm select-none"
                  fill="black"
                >
                  {node}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Informasi Queue / Stack State */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-100 p-4 border-2 border-black rounded">
        <div>
          <span className="text-xs font-bold uppercase block text-gray-600">Queue / Stack State:</span>
          <div className="flex gap-2 mt-1 font-mono text-xs">
            {queueOrStack.length > 0 ? (
              queueOrStack.map((item, i) => (
                <span key={i} className="px-2 py-1 bg-white border-2 border-black rounded font-bold">
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-400 italic">Kosong</span>
            )}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold uppercase block text-gray-600">Node Saat Ini:</span>
          <span className="font-mono font-black text-lg text-black">{current || "-"}</span>
        </div>
      </div>
    </div>
  );
}