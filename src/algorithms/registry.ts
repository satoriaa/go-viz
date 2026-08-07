import { generateQuickSortSteps } from "./sorting/quick-sort/logic";
import { quickSortMetadata } from "./sorting/quick-sort/metadata";
import { generateBinarySearchSteps } from "./searching/binary-search/logic";
import { binarySearchMetadata } from "./searching/binary-search/metadata";

export const algorithmRegistry: Record<string, { metadata: any; generator: Function }> = {
  "quick-sort": { metadata: quickSortMetadata, generator: generateQuickSortSteps },
  "binary-search": { metadata: binarySearchMetadata, generator: generateBinarySearchSteps },
  // Tambahkan algoritma lainnya di sini seiring perkembangannya
};