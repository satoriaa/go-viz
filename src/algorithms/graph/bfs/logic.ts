export interface GraphStepType {
  nodes: string[];
  edges: [string, string][];
  visited: string[];
  queueOrStack: string[];
  current: string | null;
  explanation: string;
  line: number;
}

export function* generateBFSSteps(
  adjacencyList: Record<string, string[]>,
  startNode: string
): Generator<GraphStepType> {
  let visited: string[] = [];
  let queue: string[] = [startNode];
  let allNodes = Object.keys(adjacencyList);
  let allEdges: [string, string][] = [];

  // Mengumpulkan semua edges untuk keperluan visualisasi
  for (let u in adjacencyList) {
    for (let v of adjacencyList[u]) {
      if (!allEdges.some(([a, b]) => (a === u && b === v) || (a === v && b === u))) {
        allEdges.push([u, v]);
      }
    }
  }

  yield {
    nodes: allNodes,
    edges: allEdges,
    visited: [...visited],
    queueOrStack: [...queue],
    current: null,
    explanation: `Memulai BFS dari node awal '${startNode}' menggunakan Queue.`,
    line: 1,
  };

  let visitedSet = new Set<string>();
  visitedSet.add(startNode);

  while (queue.length > 0) {
    let current = queue.shift()!;
    visited.push(current);

    yield {
      nodes: allNodes,
      edges: allEdges,
      visited: [...visited],
      queueOrStack: [...queue],
      current,
      explanation: `Mengunjungi node '${current}' dan memproses tetangganya.`,
      line: 2,
    };

    for (let neighbor of adjacencyList[current] || []) {
      if (!visitedSet.has(neighbor) && !queue.includes(neighbor)) {
        visitedSet.add(neighbor);
        queue.push(neighbor);
        yield {
          nodes: allNodes,
          edges: allEdges,
          visited: [...visited],
          queueOrStack: [...queue],
          current,
          explanation: `Menambahkan tetangga '${neighbor}' ke dalam Queue.`,
          line: 3,
        };
      }
    }
  }

  yield {
    nodes: allNodes,
    edges: allEdges,
    visited: [...visited],
    queueOrStack: [...queue],
    current: null,
    explanation: `BFS selesai! Semua node yang terhubung telah dikunjungi.`,
    line: 4,
  };
}