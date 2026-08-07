import { create } from "zustand";

interface VisualizerState {
  isPlaying: boolean;
  currentStepIndex: number;
  totalSteps: number;
  speed: number; // dalam milidetik
  
  setIsPlaying: (isPlaying: boolean | ((prev: boolean) => boolean)) => void;
  setCurrentStepIndex: (index: number | ((prev: number) => number)) => void;
  setTotalSteps: (total: number) => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
}

export const useVisualizerStore = create<VisualizerState>((set) => ({
  isPlaying: false,
  currentStepIndex: 0,
  totalSteps: 0,
  speed: 400,

  setIsPlaying: (isPlaying) =>
    set((state) => ({
      isPlaying: typeof isPlaying === "function" ? isPlaying(state.isPlaying) : isPlaying,
    })),
  setCurrentStepIndex: (index) =>
    set((state) => ({
      currentStepIndex: typeof index === "function" ? index(state.currentStepIndex) : index,
    })),
  setTotalSteps: (totalSteps) => set({ totalSteps }),
  setSpeed: (speed) => set({ speed }),
  reset: () => set({ isPlaying: false, currentStepIndex: 0 }),
}));