"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { generateQuickSortSteps } from "@/algorithms/sorting/quick-sort/logic";
import { quickSortMetadata } from "@/algorithms/sorting/quick-sort/metadata";
import { ArrayVisualizer } from "@/components/common/ArrayVisualizer";
import { Button } from "@/components/ui/Button";
import { useVisualizerStore } from "@/store/useVisualizerStore";
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from "lucide-react";

export default function QuickSortPage() {
  const [array, setArray] = useState<number[]>([45, 12, 85, 32, 10, 75, 50, 20]);
  
  const steps = useMemo(() => Array.from(generateQuickSortSteps(array)), [array]);

  const { isPlaying, currentStepIndex, speed, setIsPlaying, setCurrentStepIndex, setTotalSteps } = useVisualizerStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTotalSteps(steps.length);
    setCurrentStepIndex(0);
  }, [steps, setTotalSteps, setCurrentStepIndex]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev: number) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps.length, setIsPlaying, setCurrentStepIndex]);

  const currentStep = steps[currentStepIndex] || steps[0];

  const handleRandomize = () => {
    setIsPlaying(false);
    const newArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(newArr);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="border-3 border-black p-6 rounded-neo bg-neoYellow shadow-neo flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">
            {quickSortMetadata.category}
          </span>
          <h1 className="text-4xl font-black mt-2">{quickSortMetadata.title}</h1>
          <p className="text-sm font-medium mt-1">{quickSortMetadata.description}</p>
        </div>
        <Button variant="white" onClick={handleRandomize}>
          Randomize Data
        </Button>
      </div>

      {/* Visualizer & Learning Mode Banner */}
      <div className="space-y-4">
        <ArrayVisualizer step={currentStep} />
        
        {/* Learning Mode */}
        <div className="bg-neoLime border-3 border-black p-4 rounded-neo shadow-neo flex items-center gap-4">
          <span className="bg-black text-white font-black px-3 py-1 rounded text-xs uppercase">
            Learning Mode
          </span>
          <p className="font-bold text-sm">{currentStep?.explanation}</p>
        </div>
      </div>

      {/* Control Dock */}
      <div className="bg-white border-3 border-black p-4 rounded-neo shadow-neo flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="cyan" onClick={() => setCurrentStepIndex(0)}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="cyan"
            onClick={() => setCurrentStepIndex((p: number) => Math.max(p - 1, 0))}
            disabled={currentStepIndex === 0}
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button
            variant="yellow"
            onClick={() => setIsPlaying((p: boolean) => !p)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="cyan"
            onClick={() => setCurrentStepIndex((p: number) => Math.min(p + 1, steps.length - 1))}
            disabled={currentStepIndex === steps.length - 1}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-bold">
            Step: {currentStepIndex + 1} / {steps.length}
          </span>
        </div>
      </div>

      {/* Metadata & Complexity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border-3 border-black p-6 rounded-neo shadow-neo space-y-2">
          <h3 className="font-black text-lg border-b-2 border-black pb-2">Time Complexity</h3>
          <p className="text-sm font-medium">Best: <strong>{quickSortMetadata.timeComplexity.best}</strong></p>
          <p className="text-sm font-medium">Average: <strong>{quickSortMetadata.timeComplexity.average}</strong></p>
          <p className="text-sm font-medium">Worst: <strong>{quickSortMetadata.timeComplexity.worst}</strong></p>
        </div>

        <div className="bg-white border-3 border-black p-6 rounded-neo shadow-neo space-y-2">
          <h3 className="font-black text-lg border-b-2 border-black pb-2">Space Complexity</h3>
          <p className="text-sm font-medium">{quickSortMetadata.spaceComplexity}</p>
        </div>

        <div className="bg-white border-3 border-black p-6 rounded-neo shadow-neo space-y-2">
          <h3 className="font-black text-lg border-b-2 border-black pb-2">Properties</h3>
          <p className="text-sm font-medium">Stability: <strong>{quickSortMetadata.stability ? "Yes" : "No"}</strong></p>
          <p className="text-sm font-medium">In-Place: <strong>{quickSortMetadata.inPlace ? "Yes" : "No"}</strong></p>
        </div>
      </div>
    </div>
  );
}