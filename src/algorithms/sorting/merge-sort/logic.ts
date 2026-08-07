export interface MergeSortStep {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateMergeSortSteps(initialArray: number[]): Generator<MergeSortStep> {
  const arr = [...initialArray];

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: "Memulai Merge Sort. Memecah array secara rekursif.",
    line: 1,
  };

  yield* mergeSortHelper(arr, 0, arr.length - 1);

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: "Array berhasil diurutkan sepenuhnya dengan Merge Sort!",
    line: 2,
  };
}

function* mergeSortHelper(arr: number[], l: number, r: number): Generator<MergeSortStep> {
  if (l >= r) return;

  const m = Math.floor(l + (r - l) / 2);

  yield* mergeSortHelper(arr, l, m);
  yield* mergeSortHelper(arr, m + 1, r);
  yield* merge(arr, l, m, r);
}

function* merge(arr: number[], l: number, m: number, r: number): Generator<MergeSortStep> {
  const n1 = m - l + 1;
  const n2 = r - m;

  const L = new Array(n1);
  const R = new Array(n2);

  for (let i = 0; i < n1; i++) L[i] = arr[l + i];
  for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  let i = 0, j = 0, k = l;

  yield {
    data: [...arr],
    pointers: { left: l, mid: m, right: r },
    highlights: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
    explanation: `Menggabungkan sub-array dari index ${l} hingga ${r}.`,
    line: 3,
  };

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }

    yield {
      data: [...arr],
      pointers: { k: k },
      highlights: [k],
      explanation: `Menempatkan elemen ${arr[k]} pada posisi terurut index ${k}.`,
      line: 4,
    };
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    yield {
      data: [...arr],
      pointers: { k: k },
      highlights: [k],
      explanation: `Menyalin sisa elemen dari bagian kiri ke index ${k}.`,
      line: 5,
    };
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    yield {
      data: [...arr],
      pointers: { k: k },
      highlights: [k],
      explanation: `Menyalin sisa elemen dari bagian kanan ke index ${k}.`,
      line: 6,
    };
    j++;
    k++;
  }
}