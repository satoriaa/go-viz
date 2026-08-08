export function* generateUCSSteps(graph: Record<string, string[]>, startNode: string = "A") {
  const nodes = Object.keys(graph);
  const edges = Object.entries(graph).flatMap(([u, neighbors]) =>
    (neighbors as string[]).map((v): [string, string] => [u, v])
  );

  // Priority queue menyimpan [node, cost]
  const pq: { node: string; cost: number }[] = [{ node: startNode, cost: 0 }];
  const visited = new Set<string>();
  const costs: Record<string, number> = { [startNode]: 0 };

  yield {
    data: [],
    nodes,
    edges,
    visited: [],
    queueOrStack: [startNode],
    current: null,
    pointers: {},
    highlights: [],
    explanation: `Memulai UCS dari node '${startNode}' dengan cost awal 0.`,
    line: 1,
  };

  while (pq.length > 0) {
    // Urutkan berdasarkan cost terkecil (Priority Queue sederhana)
    pq.sort((a, b) => a.cost - b.cost);
    const { node: current, cost } = pq.shift()!;

    if (visited.has(current)) continue;
    visited.add(current);

    yield {
      data: [],
      nodes,
      edges,
      visited: Array.from(visited),
      queueOrStack: pq.map((item) => `${item.node}(${item.cost})`),
      current,
      pointers: { cost },
      highlights: [],
      explanation: `Mengunjungi node '${current}' dengan akumulasi cost terendah: ${cost}.`,
      line: 2,
    };

    for (const neighbor of graph[current] || []) {
      const edgeCost = 1; // Simulasi bobot antar edge bernilai 1 (bisa disesuaikan jika ada bobot custom)
      const newCost = cost + edgeCost;

      if (!(neighbor in costs) || newCost < costs[neighbor]) {
        costs[neighbor] = newCost;
        pq.push({ node: neighbor, cost: newCost });

        yield {
          data: [],
          nodes,
          edges,
          visited: Array.from(visited),
          queueOrStack: pq.map((item) => `${item.node}(${item.cost})`),
          current,
          pointers: {},
          highlights: [],
          explanation: `Memperbarui cost tetangga '${neighbor}' menjadi ${newCost}.`,
          line: 3,
        };
      }
    }
  }

  yield {
    data: [],
    nodes,
    edges,
    visited: Array.from(visited),
    queueOrStack: [],
    current: null,
    pointers: {},
    highlights: [],
    explanation: `Uniform Cost Search selesai.`,
    line: 4,
  };
}