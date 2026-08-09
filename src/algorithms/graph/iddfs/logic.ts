export function* generateIDDFSSteps(graph: Record<string, string[]>, startNode: string = "A") {
  const nodes = Object.keys(graph);
  const edges = Object.entries(graph).flatMap(([u, neighbors]) =>
    (neighbors as string[]).map((v): [string, string] => [u, v])
  );
  
  const targetNode = nodes[nodes.length - 1] || "F";
  let maxDepth = 3;

  for (let depth = 0; depth <= maxDepth; depth++) {
    const visited = new Set<string>();
    const stack: { node: string; d: number }[] = [{ node: startNode, d: 0 }];

    yield {
      data: [],
      nodes,
      edges,
      visited: Array.from(visited),
      queueOrStack: stack.map(s => s.node),
      current: null,
      pointers: { depthLimit: depth },
      highlights: [],
      explanation: `Memulai iterasi IDDFS dengan batas kedalaman (depth limit) = ${depth}.`,
      line: 1,
    };

    while (stack.length > 0) {
      const { node: current, d } = stack.pop()!;

      if (!visited.has(current)) {
        visited.add(current);

        yield {
          data: [],
          nodes,
          edges,
          visited: Array.from(visited),
          queueOrStack: stack.map(s => s.node),
          current,
          pointers: { depthLimit: depth, currentDepth: d },
          highlights: [],
          explanation: `Mengunjungi node '${current}' pada kedalaman ${d}.`,
          line: 2,
        };

        if (current === targetNode) {
          yield {
            data: [],
            nodes,
            edges,
            visited: Array.from(visited),
            queueOrStack: [],
            current,
            pointers: {},
            highlights: [],
            explanation: `Target '${targetNode}' ditemukan pada kedalaman ${depth}!`,
            line: 3,
          };
          return;
        }

        if (d < depth) {
          const neighbors = graph[current] || [];
          for (let i = neighbors.length - 1; i >= 0; i--) {
            const neighbor = neighbors[i];
            if (!visited.has(neighbor)) {
              stack.push({ node: neighbor, d: d + 1 });
            }
          }
        }
      }
    }
  }

  yield {
    data: [],
    nodes,
    edges,
    visited: [],
    queueOrStack: [],
    current: null,
    pointers: {},
    highlights: [],
    explanation: `IDDFS selesai.`,
    line: 4,
  };
}