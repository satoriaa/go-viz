"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
//sorting algorithms
import { generateQuickSortSteps } from "@/algorithms/sorting/quick-sort/logic";
import { quickSortMetadata } from "@/algorithms/sorting/quick-sort/metadata";
import { generateBubbleSortSteps } from "@/algorithms/sorting/bubble-sort/logic";
import { bubbleSortMetadata } from "@/algorithms/sorting/bubble-sort/metadata";
import { generateSelectionSortSteps } from "@/algorithms/sorting/selection-sort/logic";
import { selectionSortMetadata } from "@/algorithms/sorting/selection-sort/metadata";
import { generateInsertionSortSteps } from "@/algorithms/sorting/insertion-sort/logic";
import { insertionSortMetadata } from "@/algorithms/sorting/insertion-sort/metadata";
import { generateHeapSortSteps } from "@/algorithms/sorting/heap-sort/logic";
import { heapSortMetadata } from "@/algorithms/sorting/heap-sort/metadata";
import { generateMergeSortSteps } from "@/algorithms/sorting/merge-sort/logic";
import { mergeSortMetadata } from "@/algorithms/sorting/merge-sort/metadata";
import { generateCountingSortSteps } from "@/algorithms/sorting/counting-sort/logic";
import { countingSortMetadata } from "@/algorithms/sorting/counting-sort/metadata";
import { generateBucketSortSteps } from "@/algorithms/sorting/bucket-sort/logic";
import { bucketSortMetadata } from "@/algorithms/sorting/bucket-sort/metadata";
import { generateIntroSortSteps } from "@/algorithms/sorting/introsort/logic";
import { introSortMetadata } from "@/algorithms/sorting/introsort/metadata";
import { generateRadixSortSteps } from "@/algorithms/sorting/radix-sort/logic";
import { radixSortMetadata } from "@/algorithms/sorting/radix-sort/metadata";
import { generateTimSortSteps } from "@/algorithms/sorting/timsort/logic";
import { timSortMetadata } from "@/algorithms/sorting/timsort/metadata";
import { generateShellSortSteps } from "@/algorithms/sorting/shell-sort/logic";
import { shellSortMetadata } from "@/algorithms/sorting/shell-sort/metadata";
//search algorithms
import { generateBinarySearchSteps } from "@/algorithms/searching/binary-search/logic";
import { binarySearchMetadata } from "@/algorithms/searching/binary-search/metadata";
import { generateInterpolationSearchSteps } from "@/algorithms/searching/interpolation-search/logic";
import { interpolationSearchMetadata } from "@/algorithms/searching/interpolation-search/metadata";
import { generateJumpSearchSteps } from "@/algorithms/searching/jump-search/logic";
import { jumpSearchMetadata } from "@/algorithms/searching/jump-search/metadata";
import { generateLinearSearchSteps } from "@/algorithms/searching/linear-search/logic";
import { linearSearchMetadata } from "@/algorithms/searching/linear-search/metadata";
import { generateExponentialSearchSteps } from "@/algorithms/searching/exponential-search/logic";
import { exponentialSearchMetadata } from "@/algorithms/searching/exponential-search/metadata";
import { generateFibonacciSearchSteps } from "@/algorithms/searching/fibonacci-search/logic";
import { fibonacciSearchMetadata } from "@/algorithms/searching/fibonacci-search/metadata";
import { generateTernarySearchSteps } from "@/algorithms/searching/ternary-search/logic";
import { ternarySearchMetadata } from "@/algorithms/searching/ternary-search/metadata";
//graph algorithms
import { generateBFSSteps } from "@/algorithms/graph/bfs/logic";
import { bfsMetadata } from "@/algorithms/graph/bfs/metadata";
import { generateDFSSteps } from "@/algorithms/graph/dfs/logic";
import { dfsMetadata } from "@/algorithms/graph/dfs/metadata";
import { generateBidirectionalSteps } from "@/algorithms/graph/bidirectional-search/logic";
import { bidirectionalMetadata } from "@/algorithms/graph/bidirectional-search/metadata";
import { generateUCSSteps } from "@/algorithms/graph/ucs/logic";
import { ucsMetadata } from "@/algorithms/graph/ucs/metadata";
import { generateAStarSteps } from "@/algorithms/graph/astar/logic";
import { aStarMetadata } from "@/algorithms/graph/astar/metadata";
import { generateGreedyBfsSteps } from "@/algorithms/graph/greedy-bfs/logic";
import { greedyBfsMetadata } from "@/algorithms/graph/greedy-bfs/metadata";
import { generateIDDFSSteps } from "@/algorithms/graph/iddfs/logic";
import { iddfsMetadata } from "@/algorithms/graph/iddfs/metadata";
//string-search algorithms
import { generateKMPSteps } from "@/algorithms/string-search/kmp/logic";
import { kmpMetadata } from "@/algorithms/string-search/kmp/metadata";
import { generateRabinKarpSteps } from "@/algorithms/string-search/rabin-karp/logic";
import { rabinKarpMetadata } from "@/algorithms/string-search/rabin-karp/metadata";
import { generateBoyerMooreSteps } from "@/algorithms/string-search/boyer-moore/logic";
import { boyerMooreMetadata } from "@/algorithms/string-search/boyer-moore/metadata";
import { generateTrieSteps } from "@/algorithms/string-search/trie/logic";
import { trieMetadata } from "@/algorithms/string-search/trie/metadata";
import { generateZSteps } from "@/algorithms/string-search/z-algorithm/logic";
import { zMetadata } from "@/algorithms/string-search/z-algorithm/metadata";
import { generateAhoCorasickSteps } from "@/algorithms/string-search/aho-corasick/logic";
import { ahoCorasickMetadata } from "@/algorithms/string-search/aho-corasick/metadata";

import { ArrayVisualizer } from "@/components/common/ArrayVisualizer";
import { GraphVisualizer } from "@/components/common/GraphVisualizer";
import { StringVisualizer } from "@/components/common/StringVisualizer";
import { useVisualizerStore } from "@/store/useVisualizerStore";

import { AlgorithmNav } from "@/app/algorithms/AlgorithmNav";
import { AlgorithmHeader } from "@/app/algorithms/AlgorithmHeader";
import { AlgorithmControls } from "@/app/algorithms/AlgorithmControls";
import { ExecutionLog } from "@/app/algorithms/ExecutionLog";
import { AlgorithmComplexity } from "@/app/algorithms/AlgorithmComplexity";
import { ArrayInputForm } from "@/app/algorithms/ArrayInputForm";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

interface StepType {
  data: number[];
  nodes?: string[];
  edges?: [string, string][];
  visited?: string[];
  queueOrStack?: string[];
  current?: string | null;
  pointers: Record<string, number | null>;
  highlights: number[];
  explanation: string;
  line: number;
  // String search specific properties
  text?: string;
  pattern?: string;
  textIndex?: number;
  patternIndex?: number;
  matchedIndices?: number[];
}

interface AlgorithmConfig {
  metadata: {
    title: string;
    description: string;
    timeComplexity: { best: string; average: string; worst: string };
    spaceComplexity: string;
    stability: boolean;
    inPlace: boolean;
  };
  generator: (...args: any[]) => Generator<any>;
}

const algorithmRegistry: Record<string, AlgorithmConfig> = {
  //sorting algorithms
  "quick-sort": { metadata: quickSortMetadata, generator: generateQuickSortSteps as any },
  "bubble-sort": { metadata: bubbleSortMetadata, generator: generateBubbleSortSteps as any },
  "selection-sort": { metadata: selectionSortMetadata, generator: generateSelectionSortSteps as any },
  "insertion-sort": { metadata: insertionSortMetadata, generator: generateInsertionSortSteps as any },
  "heap-sort": { metadata: heapSortMetadata, generator: generateHeapSortSteps as any },
  "merge-sort": { metadata: mergeSortMetadata, generator: generateMergeSortSteps as any },
  "counting-sort": { metadata: countingSortMetadata, generator: generateCountingSortSteps as any },
  "bucket-sort": { metadata: bucketSortMetadata, generator: generateBucketSortSteps as any },
  "intro-sort": { metadata: introSortMetadata, generator: generateIntroSortSteps as any },
  "radix-sort": { metadata: radixSortMetadata, generator: generateRadixSortSteps as any },
  "tim-sort": { metadata: timSortMetadata, generator: generateTimSortSteps as any },
  "shell-sort": { metadata: shellSortMetadata, generator: generateShellSortSteps as any },
  //search algorithms
  "binary-search": { metadata: binarySearchMetadata, generator: generateBinarySearchSteps as any },
  "linear-search": { metadata: linearSearchMetadata, generator: generateLinearSearchSteps as any },
  "interpolation-search": { metadata: interpolationSearchMetadata, generator: generateInterpolationSearchSteps as any },
  "jump-search": { metadata: jumpSearchMetadata, generator: generateJumpSearchSteps as any },
  "exponential-search": { metadata: exponentialSearchMetadata, generator: generateExponentialSearchSteps as any },
  "fibonacci-search": { metadata: fibonacciSearchMetadata, generator: generateFibonacciSearchSteps as any },
  "ternary-search": { metadata: ternarySearchMetadata, generator: generateTernarySearchSteps as any },
  //graph algorithms
  "bfs": { metadata: bfsMetadata, generator: generateBFSSteps as any },
  "dfs": { metadata: dfsMetadata, generator: generateDFSSteps as any },
  "bidirectional-search": { metadata: bidirectionalMetadata, generator: generateBidirectionalSteps as any },
  "ucs": { metadata: ucsMetadata, generator: generateUCSSteps as any },
  "a-star": { metadata: aStarMetadata, generator: generateAStarSteps as any },
  "greedy-bfs": { metadata: greedyBfsMetadata, generator: generateGreedyBfsSteps as any },
  "iddfs": { metadata: iddfsMetadata, generator: generateIDDFSSteps as any },
  //string-search algorithms
  "kmp": { metadata: kmpMetadata, generator: generateKMPSteps as any },
  "rabin-karp": { metadata: rabinKarpMetadata, generator: generateRabinKarpSteps as any },
  "boyer-moore": { metadata: boyerMooreMetadata, generator: generateBoyerMooreSteps as any },
  "trie": { metadata: trieMetadata, generator: generateTrieSteps as any },
  "z-algorithm": { metadata: zMetadata, generator: generateZSteps as any },
  "aho-corasick": { metadata: ahoCorasickMetadata, generator: generateAhoCorasickSteps as any },
};

const sortingOptions = [
  { slug: "quick-sort", label: "Quick Sort" },
  { slug: "bubble-sort", label: "Bubble Sort" },
  { slug: "selection-sort", label: "Selection Sort" },
  { slug: "insertion-sort", label: "Insertion Sort" },
  { slug: "heap-sort", label: "Heap Sort" },
  { slug: "merge-sort", label: "Merge Sort" },
  { slug: "counting-sort", label: "Counting Sort" },
  { slug: "bucket-sort", label: "Bucket Sort" },
  { slug: "intro-sort", label: "Intro Sort" },
  { slug: "radix-sort", label: "Radix Sort" },
  { slug: "tim-sort", label: "Tim Sort" },
  { slug: "shell-sort", label: "Shell Sort" },
];

const searchingOptions = [
  { slug: "binary-search", label: "Binary Search" },
  { slug: "linear-search", label: "Linear Search" },
  { slug: "interpolation-search", label: "Interpolation Search" },
  { slug: "jump-search", label: "Jump Search" },
  { slug: "exponential-search", label: "Exponential Search" },
  { slug: "fibonacci-search", label: "Fibonacci Search" },
  { slug: "ternary-search", label: "Ternary Search" },
];

const graphOptions = [
  { slug: "bfs", label: "Breadth-First Search (BFS)" },
  { slug: "dfs", label: "Depth-First Search (DFS)" },
  { slug: "bidirectional-search", label: "Bidirectional Search" },
  { slug: "ucs", label: "Uniform Cost Search (UCS)" },
  { slug: "a-star", label: "A* Search" },
  { slug: "greedy-bfs", label: "Greedy Best-First Search" },
  { slug: "iddfs", label: "Iterative Deepening Depth-First Search (IDDFS)" },
];

const stringSearchOptions = [
  { slug: "kmp", label: "Knuth-Morris-Pratt (KMP)" },
  { slug: "rabin-karp", label: "Rabin-Karp" },
  { slug: "boyer-moore", label: "Boyer-Moore" },
  { slug: "trie", label: "Trie Search" },
  { slug: "z-algorithm", label: "Z Algorithm" },
  { slug: "aho-corasick", label: "Aho-Corasick" },
];

const sampleGraph = {
  A: ["B", "D"],
  B: ["A", "C", "E"],
  C: ["B", "F"],
  D: ["A", "E"],
  E: ["B", "D", "F"],
  F: ["C", "E"],
};

export default function AlgorithmDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params);

  function isSearchingCode(slug: string) {
    return searchingOptions.some((opt) => opt.slug === slug);
  }

  const isGraph = resolvedParams.category === "graph";
  const isStringSearch = resolvedParams.category === "string-search";
  const isSearch = isSearchingCode(resolvedParams.slug);

  const [array, setArray] = useState<number[]>([10, 22, 35, 48, 59, 72, 85, 96]);
  const [target, setTarget] = useState<number>(59);
  const startNode = "A";

  const defaultSlug = 
    resolvedParams.category === "graph" ? "bfs" : 
    resolvedParams.category === "searching" ? "binary-search" : 
    resolvedParams.category === "string-search" ? "kmp" : "quick-sort";

  const currentAlgorithm = algorithmRegistry[resolvedParams.slug] || algorithmRegistry[defaultSlug];
  const metadata = currentAlgorithm.metadata;

  const steps = useMemo(() => {
    if (isGraph) {
      const rawSteps = Array.from(currentAlgorithm.generator(sampleGraph, startNode));
      
      const allNodes = Object.keys(sampleGraph);
      const allEdges = Object.entries(sampleGraph).flatMap(([u, neighbors]) =>
        (neighbors as string[]).map((v): [string, string] => [u, v])
      );

      return rawSteps.map((s) => ({
        ...s,
        data: s.data || [],
        nodes: s.nodes && s.nodes.length > 0 ? s.nodes : allNodes,
        edges: s.edges && s.edges.length > 0 ? s.edges : allEdges,
      })) as StepType[];
    }

    if (isStringSearch) {
      return Array.from(currentAlgorithm.generator()) as StepType[];
    }
    
    const safeArray = Array.isArray(array) ? array : [10, 22, 35, 48, 59, 72, 85, 96];

    if (isSearch) {
      return Array.from(currentAlgorithm.generator(safeArray, target)) as StepType[];
    }
    return Array.from(currentAlgorithm.generator(safeArray)) as StepType[];
  }, [array, target, resolvedParams.category, resolvedParams.slug, currentAlgorithm, isGraph, isStringSearch, isSearch]);

  const { isPlaying, currentStepIndex, speed, setIsPlaying, setCurrentStepIndex, setTotalSteps } = useVisualizerStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTotalSteps(steps.length);
    setCurrentStepIndex(0);
  }, [steps, setTotalSteps, setCurrentStepIndex]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev: number) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps.length, setIsPlaying, setCurrentStepIndex]);

  const currentStep = steps[currentStepIndex] || steps[0];

  const handleRandomize = () => {
    setIsPlaying(false);
    if (!isGraph && !isStringSearch) {
      const newArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
      const finalArr = isSearch ? newArr.sort((a, b) => a - b) : newArr;
      setArray(finalArr);
      if (isSearch) {
        setTarget(finalArr[Math.floor(Math.random() * finalArr.length)]);
      }
      setCurrentStepIndex(0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Navigasi Kategori (Sorting / Searching / Graph / String Search) */}
      <AlgorithmNav
        category={resolvedParams.category}
        currentSlug={resolvedParams.slug}
        sortingOptions={sortingOptions}
        searchingOptions={searchingOptions}
        graphOptions={graphOptions}
        stringSearchOptions={stringSearchOptions}
      />

      {/* Header Info */}
      <AlgorithmHeader
        category={resolvedParams.category}
        slug={resolvedParams.slug}
        metadata={metadata}
        onRandomize={handleRandomize}
      />

      {/* Form Input Custom Angka & Target dari User (Hanya muncul jika bukan Graph dan bukan String Search) */}
      {!isGraph && !isStringSearch && (
        <ArrayInputForm
          onSubmitCustomArray={(newArr) => {
            setIsPlaying(false);
            setArray(newArr);
          }}
          isSearching={isSearch}
          target={target}
          onSubmitTarget={(newTgt) => {
            setIsPlaying(false);
            setTarget(newTgt);
          }}
        />
      )}

      {/* Main Layout: Visualizer di Kiri, Execution Log Panel di Kanan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            {isGraph ? (
              <GraphVisualizer step={currentStep as any} />
            ) : isStringSearch ? (
              <StringVisualizer step={currentStep as any} />
            ) : (
              <ArrayVisualizer step={currentStep} />
            )}
            
            <div className="bg-neoLime border-3 border-black p-4 rounded-neo shadow-neo flex items-center gap-4">
              <span className="bg-black text-white font-black px-3 py-1 rounded text-xs uppercase shrink-0">
                Learning Mode
              </span>
              <p className="font-bold text-sm">{currentStep?.explanation}</p>
            </div>
          </div>

          <AlgorithmControls
            isPlaying={isPlaying}
            currentStepIndex={currentStepIndex}
            totalSteps={steps.length}
            onPlayToggle={() => setIsPlaying(!isPlaying)}
            onReset={() => setCurrentStepIndex(0)}
            onPrev={() => setCurrentStepIndex(Math.max(currentStepIndex - 1, 0))}
            onNext={() => setCurrentStepIndex(Math.min(currentStepIndex + 1, steps.length - 1))}
          />
        </div>

        {/* Panel Log Gerak (Execution Log Feed) */}
        <ExecutionLog
          steps={steps}
          currentStepIndex={currentStepIndex}
          onSelectStep={(idx: number) => {
            setIsPlaying(false);
            setCurrentStepIndex(idx);
          }}
        />
      </div>

      {/* Bagian Bawah: Informasi Kompleksitas */}
      <AlgorithmComplexity metadata={metadata} />
    </div>
  );
}