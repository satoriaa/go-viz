export function* generateZSteps(text: string = "aabxaabxcaabxaabxay", pattern: string = "aabx") {
  const combined = pattern + "$" + text;
  const L = combined.length;
  const Z: number[] = new Array(L).fill(0);

  yield {
    text,
    pattern,
    textIndex: 0,
    patternIndex: 0,
    matchedIndices: [],
    explanation: `Menggabungkan pattern dan text menjadi: "${combined}" untuk menghitung Z-array.`,
    line: 1,
  };

  let L_box = 0, R_box = 0;
  const matchedIndices: number[] = [];

  for (let i = 1; i < L; i++) {
    if (i <= R_box) {
      Z[i] = Math.min(R_box - i + 1, Z[i - L_box]);
    }
    while (i + Z[i] < L && combined[Z[i]] === combined[i + Z[i]]) {
      Z[i]++;
    }
    if (i + Z[i] - 1 > R_box) {
      L_box = i;
      R_box = i + Z[i] - 1;
    }

    if (Z[i] === pattern.length) {
      const textIdx = i - pattern.length - 1;
      for (let k = textIdx; k < textIdx + pattern.length; k++) {
        if (!matchedIndices.includes(k)) matchedIndices.push(k);
      }
    }

    yield {
      text,
      pattern,
      textIndex: i,
      patternIndex: Z[i],
      matchedIndices: [...matchedIndices],
      explanation: `Menghitung nilai Z[${i}] = ${Z[i]}.`,
      line: 2,
    };
  }

  yield {
    text,
    pattern,
    textIndex: -1,
    patternIndex: -1,
    matchedIndices: [...matchedIndices],
    explanation: `Pencarian Z-Algorithm selesai.`,
    line: 3,
  };
}