export interface BubbleSortStep {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateBubbleSortSteps(initialArray: number[]): Generator<BubbleSortStep> {
  const arr = [...initialArray];
  const n = arr.length;

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: "Memulai Bubble Sort. Membandingkan elemen bersebelahan secara berulang.",
    line: 1,
  };

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        data: [...arr],
        pointers: { j: j, "j+1": j + 1 },
        highlights: [j, j + 1],
        explanation: `Membandingkan nilai ${arr[j]} dan ${arr[j + 1]}.`,
        line: 2,
      };

      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        yield {
          data: [...arr],
          pointers: { j: j, "j+1": j + 1 },
          highlights: [j, j + 1],
          explanation: `Karena ${temp} > ${arr[j]}, tukar posisi keduanya.`,
          line: 3,
        };
      }
    }
    if (!swapped) break;
  }

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: "Array berhasil diurutkan sepenuhnya dengan Bubble Sort!",
    line: 4,
  };
}