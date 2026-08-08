export function* generateTrieSteps(text: string = "CAT, CATS, DOG, BAT", pattern: string = "CATS") {
  yield {
    text,
    pattern,
    textIndex: 0,
    patternIndex: 0,
    matchedIndices: [],
    explanation: `Membangun struktur Trie dari kumpulan kata dalam teks: "${text}".`,
    line: 1,
  };

  const words = text.split(",").map((w) => w.trim());
  let currentMatched = false;

  for (let i = 0; i < words.length; i++) {
    yield {
      text,
      pattern,
      textIndex: i,
      patternIndex: 0,
      matchedIndices: [],
      explanation: `Memasukkan kata '${words[i]}' ke dalam node Trie.`,
      line: 2,
    };
    if (words[i] === pattern) {
      currentMatched = true;
    }
  }

  yield {
    text,
    pattern,
    textIndex: -1,
    patternIndex: -1,
    matchedIndices: currentMatched ? [0] : [],
    explanation: currentMatched 
      ? `Pencarian berhasil! Kata '${pattern}'' ditemukan di dalam Trie.` 
      : `Kata '${pattern}' tidak ditemukan di dalam struktur Trie.`,
    line: 3,
  };
}