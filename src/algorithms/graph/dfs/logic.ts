import { GraphStepType } from "../bfs/logic";

export function* generateDFSSteps(
  adjacencyList: Record<string, string[]>,
  startNode: string
): Generator<GraphStepType> {
  let visited: string[] = [];
  let stack: string[] = [startNode];
  let allNodes = Object.keys(adjacencyList);
  let allEdges: [string, string][] = [];

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
    queueOrStack: [...stack],
    current: null,
    explanation: `Memulai DFS dari node awal '${startNode}' menggunakan Stack.`,
    line: 1,
  };

  let visitedSet = new Set<string>();

  while (stack.length > 0) {
    let current = stack.pop()!;

    if (!visitedSet.has(current)) {
      visitedSet.add(current);
      visited.push(current);

      yield {
        nodes: allNodes,
        edges: allEdges,
        visited: [...visited],
        queueOrStack: [...stack],
        current,
        explanation: `Mengunjungi node '${current}'.`,
        line: 2,
      };

      // Masukkan tetangga ke stack (dibalik agar urutannya sesuai saat di-pop)
      let neighbors = [...(adjacencyList[current] || [])].reverse();
      for (let neighbor of neighbors) {
        if (!visitedSet.has(neighbor)) {
          stack.push(neighbor);
          yield {
            nodes: allNodes,
            edges: allEdges,
            visited: [...visited],
            queueOrStack: [...stack],
            current,
            explanation: `Menambahkan tetangga '${neighbor}' ke dalam Stack.`,
            line: 3,
          };
        }
      }
    }
  }

  yield {
    nodes: allNodes,
    edges: allEdges,
    visited: [...visited],
    queueOrStack: [...stack],
    current: null,
    explanation: `DFS selesai! Penjelajahan graph tuntas.`,
    line: 4,
  };
}