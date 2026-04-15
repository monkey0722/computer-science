/**
 * Computes (base^exponent) mod modulus using exponentiation by squaring.
 * @param {number} base - The base integer.
 * @param {number} exponent - The exponent (non-negative integer).
 * @param {number} modulus - The modulus (positive integer).
 * @returns {number} (base^exponent) % modulus
 * @throws {RangeError} If exponent < 0 or modulus <= 0.
 */
export function modPow(base: number, exponent: number, modulus: number): number {
  if (exponent < 0) {
    throw new RangeError('exponent must be a non-negative integer.');
  }
  if (modulus <= 0) {
    throw new RangeError('modulus must be a positive integer.');
  }
  if (modulus === 1) {
    return 0;
  }

  let result = 1;
  let current = base % modulus;
  let e = exponent;

  while (e > 0) {
    if (e & 1) {
      result = (result * current) % modulus;
    }
    current = (current * current) % modulus;
    e >>= 1;
  }
  return result;
}
