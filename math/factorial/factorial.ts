/**
 * Calculate the factorial of a non-negative integer.
 * @param {number} n - A non-negative integer.
 * @returns {number} The factorial of n.
 */
export function factorial(n: number): number {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}
