"use client";
import React from "react";

interface ComplexityProps {
  metadata: {
    timeComplexity: { best: string; average: string; worst: string };
    spaceComplexity: string;
    stability: boolean;
    inPlace: boolean;
  };
}

export function AlgorithmComplexity({ metadata }: ComplexityProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white border-3 border-black p-6 rounded-neo shadow-neo space-y-2">
        <h3 className="font-black text-lg border-b-2 border-black pb-2">Time Complexity</h3>
        <p className="text-sm font-medium">Best: <strong>{metadata.timeComplexity.best}</strong></p>
        <p className="text-sm font-medium">Average: <strong>{metadata.timeComplexity.average}</strong></p>
        <p className="text-sm font-medium">Worst: <strong>{metadata.timeComplexity.worst}</strong></p>
      </div>

      <div className="bg-white border-3 border-black p-6 rounded-neo shadow-neo space-y-2">
        <h3 className="font-black text-lg border-b-2 border-black pb-2">Space Complexity</h3>
        <p className="text-sm font-medium">{metadata.spaceComplexity}</p>
      </div>

      <div className="bg-white border-3 border-black p-6 rounded-neo shadow-neo space-y-2">
        <h3 className="font-black text-lg border-b-2 border-black pb-2">Properties</h3>
        <p className="text-sm font-medium">Stability: <strong>{metadata.stability ? "Yes" : "No"}</strong></p>
        <p className="text-sm font-medium">In-Place: <strong>{metadata.inPlace ? "Yes" : "No"}</strong></p>
      </div>
    </div>
  );
}