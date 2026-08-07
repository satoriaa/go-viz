export interface LinearSearchStep {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateLinearSearchSteps(array: number[], target: number): Generator<LinearSearchStep> {
  yield {
    data: [...array],
    pointers: { i: null },
    highlights: [],
    explanation: `Memulai Linear Search untuk mencari nilai target: ${target}.`,
    line: 1,
  };

  for (let i = 0; i < array.length; i++) {
    yield {
      data: [...array],
      pointers: { i: i },
      highlights: [i],
      explanation: `Memeriksa elemen pada index ${i} dengan nilai ${array[i]}.`,
      line: 2,
    };

    if (array[i] === target) {
      yield {
        data: [...array],
        pointers: { found: i },
        highlights: [i],
        explanation: `Target ${target} ditemukan pada index ${i}!`,
        line: 3,
      };
      return;
    }
  }

  yield {
    data: [...array],
    pointers: {},
    highlights: [],
    explanation: `Target ${target} tidak ditemukan di dalam array.`,
    line: 4,
  };
}