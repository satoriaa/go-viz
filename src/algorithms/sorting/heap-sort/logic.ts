export interface HeapSortStep {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateHeapSortSteps(initialArray: number[]): Generator<HeapSortStep> {
  const arr = [...initialArray];
  const n = arr.length;

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: "Memulai Heap Sort. Membangun max-heap dari array awal.",
    line: 1,
  };

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    yield {
      data: [...arr],
      pointers: { root: 0, last: i },
      highlights: [0, i],
      explanation: `Pindahkan elemen terbesar root (${arr[0]}) ke akhir array pada index ${i}.`,
      line: 2,
    };

    // Swap root with last element
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    yield {
      data: [...arr],
      pointers: { root: 0, sorted: i },
      highlights: [i],
      explanation: `Elemen ${arr[i]} kini sudah berada di posisi terurut yang benar.`,
      line: 3,
    };

    // Heapify reduced heap
    yield* heapify(arr, i, 0);
  }

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: "Array berhasil diurutkan sepenuhnya dengan Heap Sort!",
    line: 4,
  };
}

function* heapify(arr: number[], n: number, i: number): Generator<HeapSortStep> {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    yield {
      data: [...arr],
      pointers: { i: i, largest: largest },
      highlights: [i, largest],
      explanation: `Menukar nilai ${arr[i]} dengan ${arr[largest]} untuk mempertahankan sifat max-heap.`,
      line: 5,
    };

    const swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    yield* heapify(arr, n, largest);
  }
}