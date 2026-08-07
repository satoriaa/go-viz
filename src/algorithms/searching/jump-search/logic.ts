export interface JumpSearchStep {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateJumpSearchSteps(array: number[], target: number): Generator<JumpSearchStep> {
  const n = array.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;

  yield {
    data: [...array],
    pointers: { prev, jumpStep: step },
    highlights: [prev],
    explanation: `Memulai Jump Search dengan ukuran lompatan sebesar ${step}.`,
    line: 1,
  };

  while (array[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));

    yield {
      data: [...array],
      pointers: { prev, current: Math.min(step, n) - 1 },
      highlights: [Math.min(step, n) - 1],
      explanation: `Melompat ke blok berikutnya hingga index ${Math.min(step, n) - 1}.`,
      line: 2,
    };

    if (prev >= n) {
      yield {
        data: [...array],
        pointers: {},
        highlights: [],
        explanation: `Target ${target} melampaui batas array dan tidak ditemukan.`,
        line: 3,
      };
      return;
    }
  }

  while (array[prev] < target) {
    yield {
      data: [...array],
      pointers: { linearCheck: prev },
      highlights: [prev],
      explanation: `Melakukan pencarian linear pada blok saat ini di index ${prev}.`,
      line: 4,
    };

    prev++;

    if (prev === Math.min(step, n)) {
      yield {
        data: [...array],
        pointers: {},
        highlights: [],
        explanation: `Target ${target} tidak ditemukan dalam blok ini.`,
        line: 5,
      };
      return;
    }
  }

  if (array[prev] === target) {
    yield {
      data: [...array],
      pointers: { found: prev },
      highlights: [prev],
      explanation: `Target ${target} ditemukan pada index ${prev}!`,
      line: 6,
    };
    return;
  }

  yield {
    data: [...array],
    pointers: {},
    highlights: [],
    explanation: `Target ${target} tidak ditemukan di dalam array.`,
    line: 7,
  };
}