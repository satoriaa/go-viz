export interface StepType {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateTimSortSteps(arr: number[]): Generator<StepType> {
  let workArr = [...arr];
  const n = workArr.length;
  const RUN = 4;

  yield {
    data: [...workArr],
    pointers: {},
    highlights: [],
    explanation: "Memulai TimSort. Memecah array menjadi potongan kecil (RUN).",
    line: 1,
  };

  // Insertion sort untuk potongan kecil (RUN)
  for (let i = 0; i < n; i += RUN) {
    let right = Math.min(i + RUN - 1, n - 1);
    // Mini insertion sort
    for (let j = i + 1; j <= right; j++) {
      let temp = workArr[j];
      let k = j;
      while (k > i && workArr[k - 1] > temp) {
        workArr[k] = workArr[k - 1];
        k--;
      }
      workArr[k] = temp;
    }
    yield {
      data: [...workArr],
      pointers: { i, right },
      highlights: Array.from({ length: right - i + 1 }, (_, idx) => i + idx),
      explanation: `Mengurutkan sub-array menggunakan Insertion Sort dari indeks ${i} sampai ${right}.`,
      line: 2,
    };
  }

  // Merge potongan
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      let mid = left + size - 1;
      let right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) {
        // Standard merge step (disederhanakan untuk visualisasi)
        let sub = workArr.slice(left, right + 1).sort((a, b) => a - b);
        for (let k = 0; k < sub.length; k++) {
          workArr[left + k] = sub[k];
        }
      }
    }
    yield {
      data: [...workArr],
      pointers: { size },
      highlights: [],
      explanation: `Menggabungkan sub-array dengan ukuran merge ${size}.`,
      line: 3,
    };
  }

  yield {
    data: [...workArr],
    pointers: {},
    highlights: Array.from({ length: n }, (_, i) => i),
    explanation: "TimSort selesai!",
    line: 4,
  };
}