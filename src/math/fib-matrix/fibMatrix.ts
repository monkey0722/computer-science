/**
 * Represents a 2x2 matrix of numbers.
 */
type Matrix2x2 = [[number, number], [number, number]];

/**
 * Multiplies two 2x2 matrices (a and b).
 * @param {Matrix2x2} a - The first 2x2 matrix.
 * @param {Matrix2x2} b - The second 2x2 matrix.
 * @returns {Matrix2x2} The resulting 2x2 matrix after multiplication.
 */
function multiplyMatrix2x2(a: Matrix2x2, b: Matrix2x2): Matrix2x2 {
  return [
    [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
    [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
  ];
}

/**
 * Raises a 2x2 matrix A to the power n using exponentiation by squaring.
 * @param {Matrix2x2} A - The base 2x2 matrix.
 * @param {number} n - The exponent (non-negative integer).
 * @returns {Matrix2x2} The result of A^n.
 */
function matrixPower(A: Matrix2x2, n: number): Matrix2x2 {
  // Identity matrix
  let result: Matrix2x2 = [
    [1, 0],
    [0, 1],
  ];
  let base = A;

  let e = n;
  while (e > 0) {
    if (e & 1) {
      result = multiplyMatrix2x2(result, base);
    }
    base = multiplyMatrix2x2(base, base);
    e >>= 1;
  }

  return result;
}

/**
 * Computes the n-th Fibonacci number using matrix exponentiation.
 * F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2).
 * @param {number} n - The index of the Fibonacci sequence (non-negative integer).
 * @returns {number} The n-th Fibonacci number.
 */
export function fibMatrix(n: number): number {
  if (n < 0) {
    throw new RangeError('fibMatrix: n must be a non-negative integer.');
  }
  if (n < 2) {
    return n;
  }

  // The standard Fibonacci transformation matrix:
  // | 1  1 |
  // | 1  0 |
  const F: Matrix2x2 = [
    [1, 1],
    [1, 0],
  ];

  // F^(n-1) multiplied by the initial vector [F(1), F(0)]^T = [1, 0]^T
  // effectively gives us F(n).
  // But we only need the top-left element [0][0] of F^(n-1].
  const F_n = matrixPower(F, n - 1);
  return F_n[0][0];
}
