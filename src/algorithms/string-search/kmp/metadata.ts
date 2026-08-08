export const kmpMetadata = {
  title: "Knuth-Morris-Pratt (KMP)",
  description: "Algoritma pencarian string yang memanfaatkan awalan yang juga merupakan akhiran (prefix-suffix table) untuk menghindari pengecekan ulang karakter yang sudah cocok.",
  timeComplexity: { best: "O(n + m)", average: "O(n + m)", worst: "O(n + m)" },
  spaceComplexity: "O(m)",
  stability: false,
  inPlace: false,
};