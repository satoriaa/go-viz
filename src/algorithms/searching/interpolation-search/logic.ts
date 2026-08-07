export interface InterpolationSearchStep {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateInterpolationSearchSteps(array: number[], target: number): Generator<InterpolationSearchStep> {
  let low = 0;
  let high = array.length - 1;

  yield {
    data: [...array],
    pointers: { low, high },
    highlights: [low, high],
    explanation: `Memulai Interpolation Search untuk target ${target} antara index ${low} dan ${high}.`,
    line: 1,
  };

  while (low <= high && target >= array[low] && target <= array[high]) {
    if (low === high) {
      yield {
        data: [...array],
        pointers: { low, high },
        highlights: [low],
        explanation: `Rentang menyempit ke satu elemen pada index ${low}. Memeriksa nilai.`,
        line: 2,
      };

      if (array[low] === target) {
        yield {
          data: [...array],
          pointers: { found: low },
          highlights: [low],
          explanation: `Target ${target} ditemukan pada index ${low}!`,
          line: 3,
        };
        return;
      }
      break;
    }

    // Rumus estimasi posisi (Interpolation formula)
    const pos = low + Math.floor(((target - array[low]) * (high - low)) / (array[high] - array[low]));

    yield {
      data: [...array],
      pointers: { low, high, pos },
      highlights: [pos],
      explanation: `Memperkirakan posisi target berada di index ${pos} berdasarkan nilai ${target}.`,
      line: 4,
    };

    if (array[pos] === target) {
      yield {
        data: [...array],
        pointers: { found: pos },
        highlights: [pos],
        explanation: `Target ${target} ditemukan pada index ${pos}!`,
        line: 5,
      };
      return;
    }

    if (array[pos] < target) {
      yield {
        data: [...array],
        pointers: { low, high, pos },
        highlights: [pos],
        explanation: `Nilai target lebih besar dari ${array[pos]}, geser pencarian ke sisi kanan.`,
        line: 6,
      };
      low = pos + 1;
    } else {
      yield {
        data: [...array],
        pointers: { low, high, pos },
        highlights: [pos],
        explanation: `Nilai target lebih kecil dari ${array[pos]}, geser pencarian ke sisi kiri.`,
        line: 7,
      };
      high = pos - 1;
    }
  }

  yield {
    data: [...array],
    pointers: {},
    highlights: [],
    explanation: `Target ${target} tidak ditemukan di dalam array.`,
    line: 8,
  };
}