export function* generateKMPSteps(text: string = "ABABDABACDABABCABAB", pattern: string = "ABABCABAB") {
  const n = text.length;
  const m = pattern.length;

  // Buat LPS (Longest Prefix Suffix) table
  const lps: number[] = new Array(m).fill(0);
  let len = 0;
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  yield {
    text,
    pattern,
    textIndex: 0,
    patternIndex: 0,
    matchedIndices: [],
    explanation: `Membangun tabel LPS (Longest Prefix Suffix) untuk pola '${pattern}'.`,
    line: 1,
  };

  let tIdx = 0; // index untuk text
  let pIdx = 0; // index untuk pattern
  const matchedIndices: number[] = [];

  while (tIdx < n) {
    yield {
        text,
        pattern,
        textIndex: tIdx,
        patternIndex: pIdx,
        matchedIndices: [...matchedIndices],
        explanation: `Membandingkan text[${tIdx}] ('${text[tIdx]}') dengan pattern[${pIdx}] ('${pattern[pIdx]}').`,
        line: 2,
    };

    if (pattern[pIdx] === text[tIdx]) {
      tIdx++;
      pIdx++;
    }

    if (pIdx === m) {
      const startMatch = tIdx - pIdx;
      for (let k = startMatch; k < tIdx; k++) {
        if (!matchedIndices.includes(k)) matchedIndices.push(k);
      }
      yield {
        text,
        pattern,
        textIndex: tIdx - 1,
        patternIndex: pIdx - 1,
        matchedIndices: [...matchedIndices],
        explanation: `Pola ditemukan pada indeks ${startMatch} hingga ${tIdx - 1}!`,
        line: 3,
    };
      pIdx = lps[pIdx - 1];
    } else if (tIdx < n && pattern[pIdx] !== text[tIdx]) {
      if (pIdx !== 0) {
        pIdx = lps[pIdx - 1];
      } else {
        tIdx++;
      }
    }
  }

  yield {
    text,
    pattern,
    textIndex: -1,
    patternIndex: -1,
    matchedIndices: [...matchedIndices],
    explanation: `Pencarian KMP selesai.`,
    line: 4,
  };
}