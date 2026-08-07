import { AlgorithmMetadata } from "@/types/algorithm";

export const quickSortMetadata: AlgorithmMetadata = {
  id: "quick-sort",
  title: "Quick Sort",
  category: "Sorting",
  slug: "quick-sort",
  description: "Algoritma sorting efisien berbasis Divide and Conquer yang bekerja dengan memilih elemen 'pivot' dan mempartisi array di sekitar pivot.",
  timeComplexity: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
  },
  spaceComplexity: "O(log n)",
  stability: false,
  inPlace: true,
  pros: ["Sangat cepat pada kebanyakan kasus rata-rata", "In-place sorting (tidak butuh memori tambahan besar)"],
  cons: ["Kinerja terburuk O(n²) jika pemilihan pivot buruk", "Tidak stabil"],
  useCases: ["Sorting data umum dalam jumlah besar", "Digunakan sebagai fungsi sorting bawaan di berbagai bahasa pemrograman"],
  pseudoCode: [
    "function quickSort(arr, low, high):",
    "  if low < high:",
    "    pi = partition(arr, low, high)",
    "    quickSort(arr, low, pi - 1)",
    "    quickSort(arr, pi + 1, high)"
  ],
  sourceCode: {
    cpp: `void quickSort(vector<int>& arr, int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
    python: `def quick_sort(arr, low, high):\n    if low < high:\n        pi = partition(arr, low, high)\n        quick_sort(arr, low, pi - 1)\n        quick_sort(arr, pi + 1, high)`,
    javascript: `function quickSort(arr, low, high) {\n    if (low < high) {\n        let pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
    typescript: `function quickSort(arr: number[], low: number, high: number): void {\n    if (low < high) {\n        let pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
    java: `void quickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`
  }
};