export interface InsertionSortStep {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateInsertionSortSteps(initialArray: number[]): Generator<InsertionSortStep> {
  const arr = [...initialArray];
  const n = arr.length;

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: "Memulai Insertion Sort. Menganggap elemen pertama sudah terurut.",
    line: 1,
  };

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    yield {
      data: [...arr],
      pointers: { i: i, j: j },
      highlights: [i],
      explanation: `Ambil elemen kunci (key) bernilai ${key} pada index ${i}.`,
      line: 2,
    };

    while (j >= 0 && arr[j] > key) {
      yield {
        data: [...arr],
        pointers: { i: i, j: j },
        highlights: [j, j + 1],
        explanation: `Nilai ${arr[j]} lebih besar dari key (${key}), geser ke kanan.`,
        line: 3,
      };

      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;

    yield {
      data: [...arr],
      pointers: { "j+1": j + 1 },
      highlights: [j + 1],
      explanation: `Sisipkan key (${key}) pada posisi index ${j + 1}.`,
      line: 4,
    };
  }

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: "Array berhasil diurutkan sepenuhnya dengan Insertion Sort!",
    line: 5,
  };
}