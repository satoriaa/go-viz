"use client";
import React from "react";

interface StepType {
  data: number[];
  explanation: string;
}

interface ExecutionLogProps {
  steps: StepType[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
}

export function ExecutionLog({ steps, currentStepIndex, onSelectStep }: ExecutionLogProps) {
  return (
    <div className="bg-white border-3 border-black rounded-neo shadow-neo p-4 flex flex-col h-[520px]">
      <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-3">
        <h3 className="font-black text-md uppercase">Execution Log</h3>
        <span className="text-xs bg-black text-white font-bold px-2 py-0.5 rounded">
          Live Feed
        </span>
      </div>

      <div className="overflow-y-auto space-y-2 pr-1 flex-1">
        {steps.map((st, idx) => {
          const isActive = idx === currentStepIndex;
          return (
            <div
              key={idx}
              onClick={() => onSelectStep(idx)}
              className={`p-2.5 border-2 border-black rounded text-xs cursor-pointer transition-all ${
                isActive
                  ? "bg-neoYellow font-bold shadow-neo-sm translate-x-0.5"
                  : idx < currentStepIndex
                  ? "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-black">Step {idx + 1}</span>
                <span className="font-mono text-[10px]">
                  [{st.data.join(", ")}]
                </span>
              </div>
              <p className="line-clamp-2">{st.explanation}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}