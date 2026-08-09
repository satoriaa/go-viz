export function* generateTernarySearchSteps(arr: number[], target: number) {
  let left = 0;
  let right = arr.length - 1;

  yield {
    data: [...arr],
    pointers: { left, right },
    highlights: [],
    explanation: `Memulai Ternary Search dari indeks ${left} hingga ${right} untuk mencari target ${target}.`,
    line: 1,
  };

  while (left <= right) {
    const mid1 = Math.floor(left + (right - left) / 3);
    const mid2 = Math.floor(right - (right - left) / 3);

    yield {
      data: [...arr],
      pointers: { left, mid1, mid2, right },
      highlights: [mid1, mid2],
      explanation: `Membagi rentang menjadi mid1 (${mid1}: ${arr[mid1]}) dan mid2 (${mid2}: ${arr[mid2]}).`,
      line: 2,
    };

    if (arr[mid1] === target) {
      yield {
        data: [...arr],
        pointers: { mid1 },
        highlights: [mid1],
        explanation: `Target ${target} ditemukan pada indeks mid1 (${mid1})!`,
        line: 3,
      };
      return;
    }
    if (arr[mid2] === target) {
      yield {
        data: [...arr],
        pointers: { mid2 },
        highlights: [mid2],
        explanation: `Target ${target} ditemukan pada indeks mid2 (${mid2})!`,
        line: 4,
      };
      return;
    }

    if (target < arr[mid1]) {
      right = mid1 - 1;
    } else if (target > arr[mid2]) {
      left = mid2 + 1;
    } else {
      left = mid1 + 1;
      right = mid2 - 1;
    }
  }

  yield {
    data: [...arr],
    pointers: {},
    highlights: [],
    explanation: `Pencarian selesai. Target ${target} tidak ditemukan di dalam array.`,
    line: 5,
  };
}