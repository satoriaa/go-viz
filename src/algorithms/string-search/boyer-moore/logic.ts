export function* generateBoyerMooreSteps(text: string = "HERE IS A SIMPLE EXAMPLE", pattern: string = "EXAMPLE") {
  const n = text.length;
  const m = pattern.length;

  // Membuat bad character table
  const badChar: Record<string, number> = {};
  for (let i = 0; i < m; i++) {
    badChar[pattern[i]] = i;
  }

  let s = 0; // shift of the pattern with respect to text
  const matchedIndices: number[] = [];

  yield {
    text,
    pattern,
    textIndex: s,
    patternIndex: m - 1,
    matchedIndices: [],
    explanation: `Memulai Boyer-Moore Search dari kanan ke kiri pola '${pattern}'.`,
    line: 1,
  };

  while (s <= n - m) {
    let j = m - 1;

    while (j >= 0 && pattern[j] === text[s + j]) {
      yield {
        text,
        pattern,
        textIndex: s + j,
        patternIndex: j,
        matchedIndices: [...matchedIndices],
        explanation: `Karakter '${text[s + j]}' cocok dari kanan.`,
        line: 2,
      };
      j--;
    }

    if (j < 0) {
      for (let k = s; k < s + m; k++) {
        if (!matchedIndices.includes(k)) matchedIndices.push(k);
      }
      yield {
        text,
        pattern,
        textIndex: s,
        patternIndex: 0,
        matchedIndices: [...matchedIndices],
        explanation: `Pola ditemukan pada pergeseran indeks ${s}!`,
        line: 3,
      };
      s += s + m < n ? m - (badChar[text[s + m]] ?? -1) : 1;
    } else {
      const charAtText = text[s + j];
      const badCharShift = badChar[charAtText] ?? -1;
      const shift = Math.max(1, j - badCharShift);

      yield {
        text,
        pattern,
        textIndex: s + j,
        patternIndex: j,
        matchedIndices: [...matchedIndices],
        explanation: `Ketidakcocokan pada karakter '${charAtText}'. Geser pola sejauh ${shift} langkah.`,
        line: 4,
      };

      s += shift;
    }
  }

  yield {
    text,
    pattern,
    textIndex: -1,
    patternIndex: -1,
    matchedIndices: [...matchedIndices],
    explanation: `Pencarian Boyer-Moore selesai.`,
    line: 5,
  };
}