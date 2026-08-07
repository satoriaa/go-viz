"use client";
import React from "react";
import { motion } from "framer-motion";
import { AlgorithmStep } from "@/types/algorithm";

interface ArrayVisualizerProps {
  step: AlgorithmStep<number[]>;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ step }) => {
  if (!step || !step.data) return null;

  const { data, highlights, pointers } = step;
  const maxValue = Math.max(...data, 1);

  return (
    <div className="w-full h-80 bg-white border-4 border-black rounded-neo shadow-neo flex items-end justify-center p-6 gap-2 overflow-x-auto">
      {data.map((value, idx) => {
        const isHighlighted = highlights.includes(idx);
        const isPivot = pointers.pivot === idx;
        const isI = pointers.i === idx;
        const isJ = pointers.j === idx;

        let barColor = "bg-neoYellow";
        if (isPivot) barColor = "bg-neoPink";
        else if (isHighlighted) barColor = "bg-neoCyan";

        const heightPercentage = Math.max((value / maxValue) * 100, 15);

        return (
          <div key={idx} className="flex flex-col items-center h-full justify-end">
            <span className="text-xs font-bold mb-1">{value}</span>
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ height: `${heightPercentage}%` }}
              className={`w-8 sm:w-12 border-2 border-black rounded-t-neo ${barColor} flex items-center justify-center font-black text-sm`}
            >
              {/* Batang Visualisasi */}
            </motion.div>
            <div className="h-6 mt-2 flex flex-col items-center">
              {isPivot && <span className="text-[10px] bg-neoPink border border-black px-1 rounded font-bold">Pivot</span>}
              {isI && <span className="text-[10px] bg-neoCyan border border-black px-1 rounded font-bold">i</span>}
              {isJ && <span className="text-[10px] bg-neoLime border border-black px-1 rounded font-bold">j</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};