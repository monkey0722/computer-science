/**
 * Performs Rabin-Karp string search using a rolling hash.
 * Finds all occurrences of a pattern in a text string.
 *
 * Uses a polynomial rolling hash with BigInt arithmetic
 * to safely handle non-ASCII characters without integer overflow.
 *
 * @param {string} text - The text to search in.
 * @param {string} pattern - The pattern to search for.
 * @returns {number[]} An array of starting indices where the pattern is found.
 */
export function rabinKarp(text: string, pattern: string): number[] {
  const results: number[] = [];
  const n = text.length;
  const m = pattern.length;

  if (m === 0) return results;
  if (m > n) return results;

  const base = 256n;
  const mod = 1_000_000_007n;

  // Compute base^(m-1) % mod for removing the leading character
  let highPow = 1n;
  for (let i = 0; i < m - 1; i++) {
    highPow = (highPow * base) % mod;
  }

  // Compute initial hash values for pattern and the first window of text
  let patternHash = 0n;
  let textHash = 0n;
  for (let i = 0; i < m; i++) {
    patternHash = (patternHash * base + BigInt(pattern.charCodeAt(i))) % mod;
    textHash = (textHash * base + BigInt(text.charCodeAt(i))) % mod;
  }

  for (let i = 0; i <= n - m; i++) {
    // If hashes match, verify character by character to avoid false positives
    if (patternHash === textHash) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        results.push(i);
      }
    }

    // Compute hash for the next window by rolling the hash
    if (i < n - m) {
      textHash =
        ((textHash - BigInt(text.charCodeAt(i)) * highPow) * base +
          BigInt(text.charCodeAt(i + m))) %
        mod;
      // Ensure non-negative (BigInt % can return negative)
      if (textHash < 0n) {
        textHash += mod;
      }
    }
  }

  return results;
}
