export function* generateRabinKarpSteps(text: string = "GEEKS FOR GEEKS", pattern: string = "GEEK") {
  const n = text.length;
  const m = pattern.length;
  const d = 256; // jumlah karakter alphabet
  const q = 101; // bilangan prima untuk modulus
  let h = 1;
  let p = 0; // hash untuk pattern
  let t = 0; // hash untuk text window
  const matchedIndices: number[] = [];

  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }

  for (let i = 0; i < m; i++) {
    p = (d * p + pattern.charCodeAt(i)) % q;
    t = (d * t + text.charCodeAt(i)) % q;
  }

  yield {
    text,
    pattern,
    textIndex: 0,
    patternIndex: 0,
    matchedIndices: [],
    explanation: `Menghitung nilai hash awal untuk pattern (${p}) dan jendela teks pertama (${t}).`,
    line: 1,
  };

  for (let i = 0; i <= n - m; i++) {
    yield {
      text,
      pattern,
      textIndex: i,
      patternIndex: 0,
      matchedIndices: [...matchedIndices],
      explanation: `Memeriksa hash jendela teks pada indeks ${i} dengan hash pattern.`,
      line: 2,
    };

    if (p === t) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }

      if (match) {
        for (let k = i; k < i + m; k++) {
          if (!matchedIndices.includes(k)) matchedIndices.push(k);
        }
        yield {
          text,
          pattern,
          textIndex: i,
          patternIndex: m - 1,
          matchedIndices: [...matchedIndices],
          explanation: `Hash cocok dan isi karakter valid! Pola ditemukan di indeks ${i}.`,
          line: 3,
        };
      }
    }

    if (i < n - m) {
      t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      if (t < 0) t = t + q;
    }
  }

  yield {
    text,
    pattern,
    textIndex: -1,
    patternIndex: -1,
    matchedIndices: [...matchedIndices],
    explanation: `Pencarian Rabin-Karp selesai.`,
    line: 4,
  };
}