/**
 * Use the Sieve of Eratosthenes algorithm to generate a list of primes up to n.
 * @param {number} n - The upper limit for prime numbers.
 * @returns {number[]} An array of prime numbers up to n.
 */
export function sieveOfEratosthenes(n: number): number[] {
  if (n < 2) {
    return [];
  }

  const primes = new Array<boolean>(n + 1).fill(true);
  // 0 and 1 are not prime numbers
  primes[0] = false;
  primes[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }

  const result: number[] = [];
  for (let i = 2; i <= n; i++) {
    if (primes[i]) {
      result.push(i);
    }
  }
  return result;
}
