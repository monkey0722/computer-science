/**
 * Calculate the greatest common divisor (GCD) of two integers.
 * @param {number} a - The first integer
 * @param {number} b - The second integer
 * @returns {number} The greatest common divisor of a and b (non-negative)
 */
export function gcd(a: number, b: number): number {
  if (a === 0 && b === 0) {
    throw new Error('gcd(0,0) is undefined');
  }
  if (b === 0) {
    return Math.abs(a);
  }
  return gcd(b, a % b);
}
