"use client";
import React from "react";

interface StringStepType {
  text?: string;
  pattern?: string;
  textIndex?: number;
  patternIndex?: number;
  matchedIndices?: number[];
  trieData?: Record<string, any>; // Opsional jika menggunakan Trie Search
  explanation: string;
}

interface StringVisualizerProps {
  step: StringStepType;
}

export function StringVisualizer({ step }: StringVisualizerProps) {
  if (!step) return null;

  const text = step.text || "ABCXABCDABABCDABCDABDE";
  const pattern = step.pattern || "ABCDABD";
  const textIndex = step.textIndex ?? -1;
  const patternIndex = step.patternIndex ?? -1;
  const matchedIndices = step.matchedIndices || [];

  return (
    <div className="bg-white border-3 border-black p-6 rounded-neo shadow-neo space-y-6">
      <div className="flex justify-between items-center border-b-2 border-black pb-4">
        <h3 className="font-black text-lg uppercase tracking-wider">String Search Visualizer</h3>
        <div className="flex gap-4 text-xs font-bold">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-neoYellow border-2 border-black rounded-sm inline-block"></span> Pointer Text
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-green-400 border-2 border-black rounded-sm inline-block"></span> Cocok (Match)
          </span>
        </div>
      </div>

      {/* Visualisasi Text Utama */}
      <div className="space-y-2">
        <span className="text-xs font-black uppercase text-gray-500">Teks Utama:</span>
        <div className="flex flex-wrap gap-1.5 overflow-x-auto py-2">
          {text.split("").map((char, idx) => {
            const isCurrent = idx === textIndex;
            const isMatched = matchedIndices.includes(idx);

            return (
              <div
                key={idx}
                className={`w-10 h-12 flex flex-col items-center justify-center font-black text-base border-3 border-black rounded transition-all ${
                  isCurrent
                    ? "bg-neoYellow shadow-neo-sm -translate-y-1"
                    : isMatched
                    ? "bg-green-400"
                    : "bg-gray-50"
                }`}
              >
                <span>{char}</span>
                <span className="text-[10px] text-gray-600 font-mono">{idx}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visualisasi Pattern yang Dicari */}
      <div className="space-y-2 pt-2">
        <span className="text-xs font-black uppercase text-gray-500">Pola (Pattern):</span>
        <div className="flex flex-wrap gap-1.5 overflow-x-auto py-2">
          {pattern.split("").map((char, idx) => {
            const isCurrentPattern = idx === patternIndex;

            return (
              <div
                key={idx}
                className={`w-10 h-12 flex flex-col items-center justify-center font-black text-base border-3 border-black rounded transition-all ${
                  isCurrentPattern
                    ? "bg-pink-400 shadow-neo-sm -translate-y-1 text-white"
                    : "bg-gray-100"
                }`}
              >
                <span>{char}</span>
                <span className="text-[10px] text-gray-600 font-mono">{idx}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keterangan Posisi Index */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-black text-sm font-bold">
        <div className="bg-gray-50 border-2 border-black p-3 rounded">
          <span>Text Index (i): </span>
          <span className="font-mono text-base">{textIndex >= 0 ? textIndex : "-"}</span>
        </div>
        <div className="bg-gray-50 border-2 border-black p-3 rounded">
          <span>Pattern Index (j): </span>
          <span className="font-mono text-base">{patternIndex >= 0 ? patternIndex : "-"}</span>
        </div>
      </div>
    </div>
  );
}