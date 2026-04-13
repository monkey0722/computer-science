/**
 * Calculate the factorial of a non-negative integer.
 * @param {number} n - A non-negative integer.
 * @returns {number} The factorial of n.
 */
export function factorial(n: number): number {
  if (n < 0) {
    throw new RangeError('n must be a non-negative integer');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
