export interface StepType {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateBucketSortSteps(arr: number[]): Generator<StepType> {
  let workArr = [...arr];
  const n = workArr.length;

  yield {
    data: [...workArr],
    pointers: {},
    highlights: [],
    explanation: "Memulai Bucket Sort. Membagi elemen ke dalam beberapa bucket.",
    line: 1,
  };

  if (n <= 1) return;

  const min = Math.min(...workArr);
  const max = Math.max(...workArr);
  const bucketCount = Math.floor(Math.sqrt(n)) || 1;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.min(
      Math.floor(((workArr[i] - min) / (max - min + 1)) * bucketCount),
      bucketCount - 1
    );
    buckets[bucketIndex].push(workArr[i]);
  }

  yield {
    data: [...workArr],
    pointers: {},
    highlights: [],
    explanation: `Elemen didistribusikan ke dalam ${bucketCount} bucket.`,
    line: 2,
  };

  let currentIndex = 0;
  for (let i = 0; i < bucketCount; i++) {
    buckets[i].sort((a, b) => a - b); // Mengurutkan tiap bucket
    for (let val of buckets[i]) {
      workArr[currentIndex++] = val;
    }
  }

  yield {
    data: [...workArr],
    pointers: {},
    highlights: Array.from({ length: n }, (_, i) => i),
    explanation: "Bucket Sort selesai! Semua bucket telah digabung kembali.",
    line: 3,
  };
}