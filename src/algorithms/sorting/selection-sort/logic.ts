export interface SelectionSortStep {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateSelectionSortSteps(initialArray: number[]): Generator<SelectionSortStep> {
  const arr = [...initialArray];
  const n = arr.length;

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: "Memulai Selection Sort. Mencari elemen minimum secara berulang.",
    line: 1,
  };

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    yield {
      data: [...arr],
      pointers: { i: i, min: minIdx },
      highlights: [i],
      explanation: `Anggap elemen pada index ${i} (${arr[i]}) sebagai nilai minimum sementara.`,
      line: 2,
    };

    for (let j = i + 1; j < n; j++) {
      yield {
        data: [...arr],
        pointers: { i: i, min: minIdx, j: j },
        highlights: [minIdx, j],
        explanation: `Membandingkan minimum saat ini dengan elemen pada index ${j} (${arr[j]}).`,
        line: 3,
      };

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        yield {
          data: [...arr],
          pointers: { i: i, min: minIdx },
          highlights: [minIdx],
          explanation: `Ditemukan nilai yang lebih kecil (${arr[minIdx]}) pada index ${minIdx}. Perbarui minimum.`,
          line: 4,
        };
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      yield {
        data: [...arr],
        pointers: { i: i, min: minIdx },
        highlights: [i, minIdx],
        explanation: `Menukar posisi elemen minimum ${arr[i]} ke index ${i}.`,
        line: 5,
      };
    }
  }

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: "Array berhasil diurutkan sepenuhnya dengan Selection Sort!",
    line: 6,
  };
}