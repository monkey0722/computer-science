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

  // Initialize the table with base values
  const table: Array<Array<number>> = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    table[i] = new Array(k + 1);
    table[i][0] = 1;
  }
  for (let j = 1; j <= k; j++) {
    table[0][j] = 0;
  }

  // Fill in the table using dynamic programming
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= k; j++) {
      table[i][j] = table[i - 1][j - 1] + table[i - 1][j];
    }
  }

  return table[n][k];
}
