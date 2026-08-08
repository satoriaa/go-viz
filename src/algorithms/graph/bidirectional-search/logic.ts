export function* generateBidirectionalSteps(graph: Record<string, string[]>, startNode: string = "A") {
  const nodes = Object.keys(graph);
  const edges = Object.entries(graph).flatMap(([u, neighbors]) =>
    (neighbors as string[]).map((v): [string, string] => [u, v])
  );

  // Tentukan node tujuan secara dinamis (misal node terakhir di graph selain start)
  const targetNode = nodes.reverse().find((n) => n !== startNode) || nodes[0];
  nodes.reverse(); // Kembalikan urutan nodes

  const forwardVisited = new Set<string>([startNode]);
  const backwardVisited = new Set<string>([targetNode]);
  
  const forwardQueue: string[] = [startNode];
  const backwardQueue: string[] = [targetNode];

  yield {
    data: [],
    nodes,
    edges,
    visited: [startNode, targetNode],
    queueOrStack: [startNode, targetNode],
    current: null,
    pointers: {},
    highlights: [],
    explanation: `Memulai Bidirectional Search dari Start ('${startNode}') dan Target ('${targetNode}').`,
    line: 1,
  };

  while (forwardQueue.length > 0 && backwardQueue.length > 0) {
    // --- Langkah Forward ---
    const currentForward = forwardQueue.shift()!;
    
    yield {
      data: [],
      nodes,
      edges,
      visited: Array.from(new Set([...forwardVisited, ...backwardVisited])),
      queueOrStack: [...forwardQueue],
      current: currentForward,
      pointers: { forward: 1 },
      highlights: [],
      explanation: `Forward Search: Memproses node '${currentForward}'.`,
      line: 2,
    };

    if (backwardVisited.has(currentForward)) {
      yield {
        data: [],
        nodes,
        edges,
        visited: Array.from(new Set([...forwardVisited, ...backwardVisited])),
        queueOrStack: [],
        current: currentForward,
        pointers: {},
        highlights: [],
        explanation: `Jalur bertemu di node '${currentForward}'! Pencarian selesai.`,
        line: 3,
      };
      return;
    }

    for (const neighbor of graph[currentForward] || []) {
      if (!forwardVisited.has(neighbor)) {
        forwardVisited.add(neighbor);
        forwardQueue.push(neighbor);
      }
    }

    // --- Langkah Backward ---
    const currentBackward = backwardQueue.shift()!;
    
    yield {
      data: [],
      nodes,
      edges,
      visited: Array.from(new Set([...forwardVisited, ...backwardVisited])),
      queueOrStack: [...backwardQueue],
      current: currentBackward,
      pointers: { backward: 1 },
      highlights: [],
      explanation: `Backward Search: Memproses node '${currentBackward}'.`,
      line: 4,
    };

    if (forwardVisited.has(currentBackward)) {
      yield {
        data: [],
        nodes,
        edges,
        visited: Array.from(new Set([...forwardVisited, ...backwardVisited])),
        queueOrStack: [],
        current: currentBackward,
        pointers: {},
        highlights: [],
        explanation: `Jalur bertemu di node '${currentBackward}'! Pencarian selesai.`,
        line: 5,
      };
      return;
    }

    for (const neighbor of graph[currentBackward] || []) {
      if (!backwardVisited.has(neighbor)) {
        backwardVisited.add(neighbor);
        backwardQueue.push(neighbor);
      }
    }
  }

  yield {
    data: [],
    nodes,
    edges,
    visited: Array.from(new Set([...forwardVisited, ...backwardVisited])),
    queueOrStack: [],
    current: null,
    pointers: {},
    highlights: [],
    explanation: `Pencarian selesai. Tidak ditemukan jalur penghubung.`,
    line: 6,
  };
}