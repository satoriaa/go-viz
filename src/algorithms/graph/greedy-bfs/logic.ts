export function* generateGreedyBfsSteps(graph: Record<string, string[]>, startNode: string = "A") {
  const nodes = Object.keys(graph);
  const edges = Object.entries(graph).flatMap(([u, neighbors]) =>
    (neighbors as string[]).map((v): [string, string] => [u, v])
  );
  const targetNode = nodes[nodes.length - 1] || "F";
  const heuristic = (n: string) => Math.abs(n.charCodeAt(0) - targetNode.charCodeAt(0));

  const pq: { node: string; h: number }[] = [{ node: startNode, h: heuristic(startNode) }];
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
    explanation: `Memulai Greedy Best-First Search dari '${startNode}' menuju '${targetNode}'.`,
    line: 1,
  };

  while (pq.length > 0) {
    pq.sort((a, b) => a.h - b.h);
    const { node: current } = pq.shift()!;

    if (visited.has(current)) continue;
    visited.add(current);

    yield {
      data: [],
      nodes,
      edges,
      visited: Array.from(visited),
      queueOrStack: pq.map(item => `${item.node}(h:${item.h})`),
      current,
      pointers: {},
      highlights: [],
      explanation: `Memilih node '${current}' dengan nilai heuristik terkecil h(n) = ${heuristic(current)}.`,
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
        explanation: `Target '${targetNode}' berhasil dicapai!`,
        line: 3,
      };
      return;
    }

    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        pq.push({ node: neighbor, h: heuristic(neighbor) });
      }
    }
  }
}