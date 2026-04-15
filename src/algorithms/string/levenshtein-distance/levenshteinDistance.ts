/**
 * Calculates the Levenshtein distance (edit distance) between two strings.
 * The edit distance is the minimum number of single-character operations
 * (insertions, deletions, or substitutions) required to change one string into the other.
 *
 * @param {string} s1 - The first string.
 * @param {string} s2 - The second string.
 * @returns {number} The minimum number of operations required to transform s1 into s2.
 */
export function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  // Create a matrix of size (m+1) x (n+1)
  const dp: number[][] = Array.from({length: m + 1}, () => Array(n + 1).fill(0));
  // Initialize the first column
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  // Initialize the first row
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  // Fill the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // No operation needed
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}
