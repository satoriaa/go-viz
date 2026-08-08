export interface StepType {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateFibonacciSearchSteps(
  arr: number[],
  target: number
): Generator<StepType> {
  const n = arr.length;

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: `Memulai Fibonacci Search untuk mencari target ${target}.`,
    line: 1,
  };

  if (n === 0) return;

  // Inisialisasi angka Fibonacci
  let fib2 = 0; // (m-2)th angka Fibonacci
  let fib1 = 1; // (m-1)th angka Fibonacci
  let fibM = fib2 + fib1; // m-th angka Fibonacci

  while (fibM < n) {
    fib2 = fib1;
    fib1 = fibM;
    fibM = fib2 + fib1;
  }

  let offset = -1;

  while (fibM > 1) {
    let i = Math.min(offset + fib2, n - 1);

    yield {
      data: [...arr],
      pointers: { i },
      highlights: [i],
      explanation: `Memeriksa elemen pada indeks ${i} (nilai: ${arr[i]}).`,
      line: 2,
    };

    if (arr[i] < target) {
      fibM = fib1;
      fib1 = fib2;
      fib2 = fibM - fib1;
      offset = i;
      yield {
        data: [...arr],
        pointers: { offset },
        highlights: [],
        explanation: `Target lebih besar dari ${arr[i]}, menggeser rentang ke kanan.`,
        line: 3,
      };
    } else if (arr[i] > target) {
      fibM = fib2;
      fib1 = fib1 - fib2;
      fib2 = fibM - fib1;
      yield {
        data: [...arr],
        pointers: {},
        highlights: [],
        explanation: `Target lebih kecil dari ${arr[i]}, menggeser rentang ke kiri.`,
        line: 4,
      };
    } else {
      yield {
        data: [...arr],
        pointers: { i },
        highlights: [i],
        explanation: `Target ${target} ditemukan pada indeks ${i}!`,
        line: 5,
      };
      return;
    }
  }

  if (fib1 && arr[offset + 1] === target) {
    yield {
      data: [...arr],
      pointers: { index: offset + 1 },
      highlights: [offset + 1],
      explanation: `Target ${target} ditemukan pada indeks ${offset + 1}!`,
      line: 6,
    };
    return;
  }

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: `Target ${target} tidak ditemukan dalam array.`,
    line: 7,
  };
}