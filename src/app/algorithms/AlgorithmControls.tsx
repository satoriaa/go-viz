"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from "lucide-react";

interface AlgorithmControlsProps {
  isPlaying: boolean;
  currentStepIndex: number;
  totalSteps: number;
  onPlayToggle: () => void;
  onReset: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function AlgorithmControls({
  isPlaying,
  currentStepIndex,
  totalSteps,
  onPlayToggle,
  onReset,
  onPrev,
  onNext,
}: AlgorithmControlsProps) {
  return (
    <div className="bg-white border-3 border-black p-4 rounded-neo shadow-neo flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button variant="cyan" onClick={onReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button variant="cyan" onClick={onPrev} disabled={currentStepIndex === 0}>
          <SkipBack className="w-4 h-4" />
        </Button>
        <Button variant="yellow" onClick={onPlayToggle}>
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button variant="cyan" onClick={onNext} disabled={currentStepIndex === totalSteps - 1}>
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-bold">
          Step: {currentStepIndex + 1} / {totalSteps}
        </span>
      </div>
    </div>
  );
}