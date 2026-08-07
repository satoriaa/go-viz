import { AlgorithmStep } from "@/types/algorithm";

export function* generateQuickSortSteps(initialArray: number[]): Generator<AlgorithmStep<number[]>> {
  let arr = [...initialArray];
  const steps: AlgorithmStep<number[]> = {
    data: [...arr],
    pointers: { low: null, high: null, pivot: null, i: null, j: null },
    highlights: [],
    line: 1,
    explanation: "Memulai algoritma Quick Sort.",
  };
  yield JSON.parse(JSON.stringify(steps));

  function* partition(low: number, high: number): Generator<any, number, any> {
    let pivot = arr[high];
    steps.pointers.pivot = high;
    steps.line = 3;
    steps.explanation = `Memilih pivot ${pivot} pada indeks ${high} (Lomuto Partition).`;
    yield JSON.parse(JSON.stringify(steps));

    let i = low - 1;
    steps.pointers.i = i;

    for (let j = low; j < high; j++) {
      steps.pointers.j = j;
      steps.highlights = [j, high];
      steps.line = 5;
      steps.explanation = `Membandingkan elemen ${arr[j]} dengan pivot ${pivot}.`;
      yield JSON.parse(JSON.stringify(steps));

      if (arr[j] < pivot) {
        i++;
        steps.pointers.i = i;
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        steps.data = [...arr];
        steps.highlights = [i, j];
        steps.line = 6;
        steps.explanation = `Elemen ${arr[i]} lebih kecil dari pivot, ditukar ke posisi indeks ${i}.`;
        yield JSON.parse(JSON.stringify(steps));
      }
    }

    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    steps.data = [...arr];
    steps.highlights = [i + 1, high];
    steps.line = 9;
    steps.explanation = `Menempatkan pivot ke posisi akhirnya di indeks ${i + 1}.`;
    yield JSON.parse(JSON.stringify(steps));

    return i + 1;
  }

  function* quickSortHelper(low: number, high: number): Generator<any, void, any> {
    if (low < high) {
      // @ts-ignore
      let pi = yield* partition(low, high);
      yield* quickSortHelper(low, pi - 1);
      yield* quickSortHelper(pi + 1, high);
    }
  }

  yield* quickSortHelper(0, arr.length - 1);
  
  steps.highlights = [];
  steps.pointers = { low: null, high: null, pivot: null, i: null, j: null };
  steps.line = 12;
  steps.explanation = "Quick Sort selesai! Array sudah terurut.";
  yield JSON.parse(JSON.stringify(steps));
}