export function* generateAStarSteps(graph: Record<string, string[]>, startNode: string = "A") {
  const nodes = Object.keys(graph);
  const edges = Object.entries(graph).flatMap(([u, neighbors]) =>
    (neighbors as string[]).map((v): [string, string] => [u, v])
  );

  const targetNode = nodes[nodes.length - 1] || "F"; // Target otomatis node terakhir

  // Fungsi heuristik sederhana berbasis selisih abjad (mocking heuristic)
  const heuristic = (n: string) => Math.abs(n.charCodeAt(0) - targetNode.charCodeAt(0));

  const openSet: { node: string; g: number; f: number }[] = [
    { node: startNode, g: 0, f: heuristic(startNode) },
  ];
  const visited = new Set<string>();

  yield {
    data: [],
    nodes,
    edges,
    visited: [],
    queueOrStack: [startNode],
    current: null,
    pointers: { target: targetNode.charCodeAt(0) },
    highlights: [],
    explanation: `Memulai A* Search dari '${startNode}' menuju target '${targetNode}'.`,
    line: 1,
  };

  while (openSet.length > 0) {
    // Urutkan berdasarkan nilai f(n) terkecil
    openSet.sort((a, b) => a.f - b.f);
    const currentObj = openSet.shift()!;
    const current = currentObj.node;

    if (current === targetNode) {
      visited.add(current);
      yield {
        data: [],
        nodes,
        edges,
        visited: Array.from(visited),
        queueOrStack: [],
        current,
        pointers: {},
        highlights: [],
        explanation: `Target '${targetNode}' berhasil ditemukan menggunakan A* Search!`,
        line: 2,
      };
      return;
    }

    if (visited.has(current)) continue;
    visited.add(current);

    yield {
      data: [],
      nodes,
      edges,
      visited: Array.from(visited),
      queueOrStack: openSet.map((item) => `${item.node}(f:${item.f})`),
      current,
      pointers: {},
      highlights: [],
      explanation: `Mengevaluasi node '${current}' dengan f(n) = ${currentObj.f}.`,
      line: 3,
    };

    for (const neighbor of graph[current] || []) {
      if (visited.has(neighbor)) continue;

      const tentativeG = currentObj.g + 1;
      const h = heuristic(neighbor);
      const f = tentativeG + h;

      openSet.push({ node: neighbor, g: tentativeG, f });

      yield {
        data: [],
        nodes,
        edges,
        visited: Array.from(visited),
        queueOrStack: openSet.map((item) => `${item.node}(f:${item.f})`),
        current,
        pointers: {},
        highlights: [],
        explanation: `Menambahkan tetangga '${neighbor}' ke Open Set (g: ${tentativeG}, h: ${h}, f: ${f}).`,
        line: 4,
      };
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
    explanation: `Pencarian A* selesai. Jalur tidak ditemukan.`,
    line: 5,
  };
}