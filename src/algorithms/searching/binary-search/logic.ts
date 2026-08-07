export interface SearchStep {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateBinarySearchSteps(arr: number[], target: number): Generator<SearchStep> {
  const sortedArr = [...arr].sort((a, b) => a - b);
  let low = 0;
  let high = sortedArr.length - 1;

  yield {
    data: sortedArr,
    pointers: { low, high },
    highlights: [],
    explanation: `Memulai Binary Search untuk mencari nilai target [${target}] pada array terurut.`,
    line: 1,
  };

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = sortedArr[mid];

    yield {
      data: sortedArr,
      pointers: { low, mid, high },
      highlights: [mid],
      explanation: `Hitung titik tengah (mid = ${mid}). Nilai pada index mid adalah ${midVal}.`,
      line: 2,
    };

    if (midVal === target) {
      yield {
        data: sortedArr,
        pointers: { found: mid },
        highlights: [mid],
        explanation: `Target ${target} berhasil ditemukan pada index ${mid}!`,
        line: 3,
      };
      return;
    } else if (midVal < target) {
      yield {
        data: sortedArr,
        pointers: { low: mid + 1, high },
        highlights: [mid],
        explanation: `Nilai ${midVal} < target ${target}. Geser batas bawah (low) ke ${mid + 1}.`,
        line: 4,
      };
      low = mid + 1;
    } else {
      yield {
        data: sortedArr,
        pointers: { low, high: mid - 1 },
        highlights: [mid],
        explanation: `Nilai ${midVal} > target ${target}. Geser batas atas (high) ke ${mid - 1}.`,
        line: 5,
      };
      high = mid - 1;
    }
  }

  yield {
    data: sortedArr,
    pointers: {},
    highlights: [],
    explanation: `Pencarian selesai. Target ${target} tidak ditemukan di dalam array.`,
    line: 6,
  };
}