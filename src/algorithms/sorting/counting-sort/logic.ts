export interface StepType {
  data: number[];
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
}

export function* generateCountingSortSteps(arr: number[]): Generator<StepType> {
  let workArr = [...arr];
  const n = workArr.length;

  yield {
    data: [...workArr],
    pointers: {},
    highlights: [],
    explanation: "Memulai Counting Sort. Mencari nilai maksimum dalam array.",
    line: 1,
  };

  if (n <= 1) return;

  const max = Math.max(...workArr);
  const min = Math.min(...workArr);
  const range = max - min + 1;

  yield {
    data: [...workArr],
    pointers: {},
    highlights: [],
    explanation: `Nilai minimum adalah ${min} dan maksimum adalah ${max}. Membuat array count sepanjang ${range}.`,
    line: 2,
  };

  const count = new Array(range).fill(0);

  // 1. Hitung frekuensi kemunculan
  for (let i = 0; i < n; i++) {
    const val = workArr[i];
    count[val - min]++;
    yield {
      data: [...workArr],
      pointers: { i },
      highlights: [i],
      explanation: `Menghitung frekuensi angka ${val}.`,
      line: 3,
    };
  }

  // 2. Akumulasi count array
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  yield {
    data: [...workArr],
    pointers: {},
    highlights: [],
    explanation: "Mengakumulasi array count untuk menentukan posisi akhir setiap elemen.",
    line: 4,
  };

  // 3. Rekonstruksi array hasil
  const output = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    const val = workArr[i];
    const pos = count[val - min] - 1;
    output[pos] = val;
    count[val - min]--;

    yield {
      data: [...output],
      pointers: { i, pos },
      highlights: [pos],
      explanation: `Menempatkan angka ${val} ke posisi terurut ${pos}.`,
      line: 5,
    };
  }

  // Salin kembali ke workArr
  for (let i = 0; i < n; i++) {
    workArr[i] = output[i];
  }

  yield {
    data: [...workArr],
    pointers: {},
    highlights: Array.from({ length: n }, (_, i) => i),
    explanation: "Counting Sort selesai! Array berhasil diurutkan.",
    line: 6,
  };
}