export function* generateAhoCorasickSteps(text: string = "ushers", pattern: string = "he, she, her, his") {
  yield {
    text,
    pattern,
    textIndex: 0,
    patternIndex: 0,
    matchedIndices: [],
    explanation: `Membangun struktur pohon Trie dan tautan kegagalan (failure links) untuk pola: "${pattern}".`,
    line: 1,
  };

  const patterns = pattern.split(",").map(p => p.trim());
  let matchedIndices: number[] = [];

  for (let i = 0; i < patterns.length; i++) {
    const pat = patterns[i];
    let pos = text.indexOf(pat);
    while (pos !== -1) {
      for (let k = pos; k < pos + pat.length; k++) {
        if (!matchedIndices.includes(k)) matchedIndices.push(k);
      }
      pos = text.indexOf(pat, pos + 1);
    }
    yield {
      text,
      pattern: pat,
      textIndex: i,
      patternIndex: 0,
      matchedIndices: [...matchedIndices],
      explanation: `Memindai teks menggunakan automata untuk pola '${pat}'.`,
      line: 2,
    };
  }

  yield {
    text,
    pattern,
    textIndex: -1,
    patternIndex: -1,
    matchedIndices: [...matchedIndices],
    explanation: `Pencarian multi-pola Aho-Corasick selesai.`,
    line: 3,
  };
}