/**
 * Extended Euclidean Algorithm
 * Returns [g, x, y] where g = gcd(a, b) and a*x + b*y = g.
 *
 * @param a The first number
 * @param b The second number
 * @returns [g, x, y] where g = gcd(a, b) and a*x + b*y = g
 */
export function extendedGcd(a: number, b: number): [number, number, number] {
  if (b === 0) {
    // gcd(a, 0) = |a|
    // a*x + b*y = a*(a<0?-1:1) + 0*0 => ±a
    return [Math.abs(a), a < 0 ? -1 : 1, 0];
  }

  const [g, x1, y1] = extendedGcd(b, a % b);

  // Truncation-based quotient
  const q = Math.trunc(a / b);

  // x = y1
  // y = x1 - q * y1
  const x = y1;
  const y = x1 - q * y1;

  return [g, x, y];
}

/**
 * Compute modular inverse of a under modulo m (assuming gcd(a,m)=1).
 * a^{-1} s.t. a * a^{-1} ≡ 1 (mod m)
 *
 * @param a The number whose inverse is to be found
 * @param m The modulo
 * @returns The modular inverse of a under modulo m
 */
export function modInverse(a: number, m: number): number {
  const [g, x] = extendedGcd(a, m);
  if (g !== 1) {
    // If extendedGcd(a, m) is not 1, then the inverse does not exist.
    throw new Error(`${a} and ${m} are not co-prime, so inverse doesn't exist.`);
  }
  // Normalize x to the range [0, m-1] and return it.
  return ((x % m) + m) % m;
}
