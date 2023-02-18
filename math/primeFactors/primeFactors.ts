/**
 * Find the prime factors of a given integer.
 * @param {number} n - The integer to factorize.
 * @returns {Array<number>} An array of prime factors.
 */
export function primeFactors(n: number): Array<number> {
  let factors: Array<number> = [];
  for (let i = 2; i <= n / i; i++) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
  }
  if (n > 1) {
    factors.push(n);
  }
  return factors;
}
