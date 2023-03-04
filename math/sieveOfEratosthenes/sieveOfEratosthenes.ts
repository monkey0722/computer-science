/**
 * Use the Sieve of Eratosthenes algorithm to generate a list of primes up to n.
 * @param {number} n - The upper limit for prime numbers.
 * @returns {Array<number>} An array of prime numbers up to n.
 */
export function sieveOfEratosthenes(n: number): Array<number> {
  // Create an array containing all integers from 2 to n
  const primes = new Array<boolean>(n + 1);
  primes.fill(true);

  // Mark all multiples of each prime as composite
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }

  // Collect all remaining prime numbers
  const result: Array<number> = [];
  for (let i = 2; i <= n; i++) {
    if (primes[i]) {
      result.push(i);
    }
  }
  return result;
}
