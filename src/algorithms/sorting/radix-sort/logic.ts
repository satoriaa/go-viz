export interface StepType {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateRadixSortSteps(arr: number[]): Generator<StepType> {
  let workArr = [...arr];
  const n = workArr.length;

  if (n <= 1) return;

  const getMax = (arr: number[]) => Math.max(...arr);
  let max = getMax(workArr);

  yield {
    data: [...workArr],
    pointers: {},
    highlights: [],
    explanation: `Mencari nilai maksimum (${max}) untuk menentukan jumlah digit.`,
    line: 1,
  };

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    yield {
      data: [...workArr],
      pointers: { exp },
      highlights: [],
      explanation: `Mengurutkan berdasarkan digit pada posisi exp = ${exp}.`,
      line: 2,
    };

    let output = new Array(n).fill(0);
    let count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
      let index = Math.floor(workArr[i] / exp) % 10;
      count[index]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      let index = Math.floor(workArr[i] / exp) % 10;
      output[count[index] - 1] = workArr[i];
      count[index]--;
    }

    for (let i = 0; i < n; i++) {
      workArr[i] = output[i];
    }

    yield {
      data: [...workArr],
      pointers: { exp },
      highlights: [],
      explanation: `Hasil pengurutan untuk digit pada posisi ${exp}.`,
      line: 3,
    };
  }

  yield {
    data: [...workArr],
    pointers: {},
    highlights: Array.from({ length: n }, (_, i) => i),
    explanation: "Radix Sort selesai!",
    line: 4,
  };
}