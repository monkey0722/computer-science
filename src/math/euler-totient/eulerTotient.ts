/**
 * Calculates Euler's Totient Function φ(n).
 *
 * The Euler's Totient Function φ(n) is the number of positive integers up to n that are relatively prime to n.
 * If n = p1^a1 * p2^a2 * ... * pk^ak (prime factorization),
 * then φ(n) = n * (1 - 1/p1) * (1 - 1/p2) * ... * (1 - 1/pk).
 *
 * @param {number} n - The integer for which to calculate φ(n). If n <= 0, returns 0.
 * @returns {number} The value of the Euler's Totient Function for n.
 */
export function eulerTotient(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let result = n;
  let temp = n;
  // As long as it can be divided by 2, remove factor 2 first.
  if (temp % 2 === 0) {
    result -= result / 2;
    while (temp % 2 === 0) {
      temp /= 2;
    }
  }
  // Check for odd factors starting from 3.
  for (let i = 3; i * i <= temp; i += 2) {
    if (temp % i === 0) {
      result -= result / i;
      while (temp % i === 0) {
        temp /= i;
      }
    }
  }
  // If the last remaining number is greater than 1, it is a prime factor.
  if (temp > 1) {
    result -= result / temp;
  }
  return Math.floor(result);
}
