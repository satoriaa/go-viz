export interface AlgorithmStep<T = any> {
  data: T;
  pointers: Record<string, number | string | null>;
  highlights: number[];
  line: number;
  explanation: string;
}

export interface AlgorithmMetadata {
  id: string;
  title: string;
  category: string;
  slug: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stability: boolean;
  inPlace: boolean;
  pros: string[];
  cons: string[];
  useCases: string[];
  pseudoCode: string[];
  sourceCode: {
    cpp: string;
    python: string;
    javascript: string;
    typescript: string;
    java: string;
  };
}