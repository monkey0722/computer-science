/**
 * Calculates the binomial coefficient (n choose k) using dynamic programming.
 * @param {number} n - The total number of items.
 * @param {number} k - The number of items to choose.
 * @returns {number} The number of ways to choose k items from a set of n items.
 */
export function binomialCoefficient(n: number, k: number): number {
  if (k > n) {
    return 0;
  }
  // k to the smaller of n-k
  if (k > n - k) {
    k = n - k;
  }

  const table: number[][] = Array.from({length: n + 1}, () => Array(k + 1).fill(0));

  // Basic case: nC0 = 1
  for (let i = 0; i <= n; i++) {
    table[i][0] = 1;
  }
  // 0Cj = 0 (j>0)
  // j=0 can be omitted because it has already been filled with 1.
  for (let j = 1; j <= k; j++) {
    table[0][j] = 0;
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= Math.min(i, k); j++) {
      table[i][j] = table[i - 1][j - 1] + table[i - 1][j];
    }
  }
  return table[n][k];
}
