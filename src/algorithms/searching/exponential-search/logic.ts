export interface StepType {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateExponentialSearchSteps(
  arr: number[],
  target: number
): Generator<StepType> {
  const n = arr.length;

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: `Memulai Exponential Search untuk mencari target ${target}.`,
    line: 1,
  };

  if (n === 0) return;

  // Jika elemen pertama adalah target
  if (arr[0] === target) {
    yield {
      data: [...arr],
      pointers: { index: 0 },
      highlights: [0],
      explanation: `Target ${target} ditemukan langsung pada indeks 0.`,
      line: 2,
    };
    return;
  }

  // Menemukan rentang untuk binary search dengan melipatgandakan i
  let i = 1;
  while (i < n && arr[i] <= target) {
    yield {
      data: [...arr],
      pointers: { i },
      highlights: [i],
      explanation: `Memeriksa batas eksponensial pada indeks ${i} (nilai: ${arr[i]}).`,
      line: 3,
    };
    i *= 2;
  }

  // Melakukan binary search pada rentang [i/2, min(i, n-1)]
  let left = Math.floor(i / 2);
  let right = Math.min(i, n - 1);

  yield {
    data: [...arr],
    pointers: { left, right },
    highlights: [],
    explanation: `Target berada di antara rentang indeks ${left} dan ${right}. Melakukan Binary Search.`,
    line: 4,
  };

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    yield {
      data: [...arr],
      pointers: { left, right, mid },
      highlights: [mid],
      explanation: `Memeriksa titik tengah (mid) pada indeks ${mid} (nilai: ${arr[mid]}).`,
      line: 5,
    };

    if (arr[mid] === target) {
      yield {
        data: [...arr],
        pointers: { mid },
        highlights: [mid],
        explanation: `Target ${target} ditemukan pada indeks ${mid}!`,
        line: 6,
      };
      return;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: `Target ${target} tidak ditemukan dalam array.`,
    line: 7,
  };
}