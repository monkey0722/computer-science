/**
 * Find the prime factors of a given integer (n > 1).
 * @param {number} n - The integer to factorize.
 * @returns {number[]} An array of prime factors.
 */
export function primeFactors(n: number): number[] {
  if (n <= 1) {
    throw new Error('primeFactors is undefined for n <= 1.');
  }

  const factors: number[] = [];
  for (let i = 2; i * i <= n; i++) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
  }
  // If there are more than 1 remaining, that is the last prime factor.
  if (n > 1) {
    factors.push(n);
  }
  return factors;
}
