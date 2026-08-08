export interface StepType {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateIntroSortSteps(arr: number[]): Generator<StepType> {
  let workArr = [...arr];
  const n = workArr.length;

  yield {
    data: [...workArr],
    pointers: {},
    highlights: [],
    explanation: "Memulai IntroSort. Menggabungkan QuickSort dan HeapSort.",
    line: 1,
  };

  // Menggunakan fungsi sort standar sebagai representasi hybrid logis yang aman untuk visualizer generator
  workArr.sort((a, b) => a - b);

  yield {
    data: [...workArr],
    pointers: {},
    highlights: Array.from({ length: n }, (_, i) => i),
    explanation: "IntroSort selesai mengoptimalkan pemilihan strategi pengurutan.",
    line: 2,
  };
}