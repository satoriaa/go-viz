export interface StepType {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateShellSortSteps(arr: number[]): Generator<StepType> {
  let workArr = [...arr];
  const n = workArr.length;

  yield {
    data: [...workArr],
    pointers: {},
    highlights: [],
    explanation: "Memulai Shell Sort. Menentukan gap awal (n / 2).",
    line: 1,
  };

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    yield {
      data: [...workArr],
      pointers: { gap },
      highlights: [],
      explanation: `Menggunakan gap/interval sebesar ${gap}.`,
      line: 2,
    };

    for (let i = gap; i < n; i++) {
      let temp = workArr[i];
      let j = i;

      yield {
        data: [...workArr],
        pointers: { i, j, gap },
        highlights: [i],
        explanation: `Mengambil elemen temp = ${temp} pada indeks ${i}.`,
        line: 3,
      };

      while (j >= gap && workArr[j - gap] > temp) {
        workArr[j] = workArr[j - gap];
        j -= gap;
        yield {
          data: [...workArr],
          pointers: { i, j, gap },
          highlights: [j, j + gap],
          explanation: `Memindahkan elemen karena lebih besar dari temp.`,
          line: 4,
        };
      }

      workArr[j] = temp;
      yield {
        data: [...workArr],
        pointers: { j, gap },
        highlights: [j],
        explanation: `Menempatkan temp pada posisi indeks ${j}.`,
        line: 5,
      };
    }
  }

  yield {
    data: [...workArr],
    pointers: {},
    highlights: Array.from({ length: n }, (_, i) => i),
    explanation: "Shell Sort selesai! Array berhasil diurutkan.",
    line: 6,
  };
}