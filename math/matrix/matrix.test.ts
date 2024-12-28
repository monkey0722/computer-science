import {Matrix} from './matrix';

describe('Matrix Class Tests', () => {
  test('should create a matrix with the correct dimensions', () => {
    const mat = new Matrix(2, 3, 5);
    expect(mat.rows).toBe(2);
    expect(mat.cols).toBe(3);
    for (let i = 0; i < mat.rows; i++) {
      for (let j = 0; j < mat.cols; j++) {
        expect(mat.get(i, j)).toBe(5);
      }
    }
  });
  test('should create a matrix from a 2D array', () => {
    const arr = [
      [1, 2],
      [3, 4],
    ];
    const mat = Matrix.fromArray(arr);
    expect(mat.rows).toBe(2);
    expect(mat.cols).toBe(2);
    expect(mat.get(0, 0)).toBe(1);
    expect(mat.get(1, 1)).toBe(4);
  });
  test('should add two matrices of the same dimensions', () => {
    const matA = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    const matB = Matrix.fromArray([
      [5, 6],
      [7, 8],
    ]);
    const sum = matA.add(matB);
    expect(sum.get(0, 0)).toBe(6); // 1 + 5
    expect(sum.get(1, 1)).toBe(12); // 4 + 8
  });
  test('should multiply two matrices if dimensions are compatible', () => {
    const matA = Matrix.fromArray([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const matB = Matrix.fromArray([
      [7, 8],
      [9, 10],
      [11, 12],
    ]);
    const product = matA.multiply(matB);
    // Product should be a 2x2 matrix
    expect(product.rows).toBe(2);
    expect(product.cols).toBe(2);
    // Manually compute product:
    // matA x matB = [[1*7 + 2*9 + 3*11, 1*8 + 2*10 + 3*12],
    //                [4*7 + 5*9 + 6*11, 4*8 + 5*10 + 6*12]]
    //             = [[58, 64], [139, 154]]
    expect(product.get(0, 0)).toBe(58);
    expect(product.get(0, 1)).toBe(64);
    expect(product.get(1, 0)).toBe(139);
    expect(product.get(1, 1)).toBe(154);
  });
  test('should transpose a matrix', () => {
    const mat = Matrix.fromArray([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const transposed = mat.transpose();
    expect(transposed.rows).toBe(3);
    expect(transposed.cols).toBe(2);
    expect(transposed.get(0, 0)).toBe(1);
    expect(transposed.get(1, 0)).toBe(2);
    expect(transposed.get(2, 0)).toBe(3);
    expect(transposed.get(0, 1)).toBe(4);
    expect(transposed.get(1, 1)).toBe(5);
    expect(transposed.get(2, 1)).toBe(6);
  });

  test('should calculate determinant of a 2x2 matrix correctly', () => {
    const mat = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    // Determinant of [[1,2],[3,4]] = 1*4 - 2*3 = -2
    expect(mat.determinant()).toBe(-2);
  });

  test('should calculate determinant of a 3x3 matrix correctly', () => {
    const mat = Matrix.fromArray([
      [3, 8, 1],
      [4, 6, 2],
      [1, -2, 5],
    ]);
    // Determinant can be computed or verified externally = 3*(6*5 - 2*(-2)) - 8*(4*5 - 2*1) + 1*(4*(-2) - 6*1)
    // = 3*(30 + 4) - 8*(20 - 2) + 1*(-8 - 6)
    // = 3*34 - 8*18 + (-14) = 102 - 144 - 14 = -56
    expect(mat.determinant()).toBe(-56);
  });
  test('should return null when attempting to invert a matrix with determinant 0', () => {
    const mat = Matrix.fromArray([
      [2, 4],
      [1, 2],
    ]);
    // Determinant = 2*2 - 4*1 = 0
    expect(mat.inverse()).toBeNull();
  });

  test('should invert a 2x2 matrix properly', () => {
    const mat = Matrix.fromArray([
      [1, 2],
      [3, 4],
    ]);
    // Inverse of [[1,2],[3,4]] = 1/det * [[4,-2],[-3,1]]
    // Determinant = (1*4 - 2*3) = -2
    const inv = mat.inverse()!;
    expect(inv.get(0, 0)).toBeCloseTo(-2.0);
    expect(inv.get(0, 1)).toBeCloseTo(1.0);
    expect(inv.get(1, 0)).toBeCloseTo(1.5);
    expect(inv.get(1, 1)).toBeCloseTo(-0.5);
  });
  test('should invert a 3x3 matrix properly', () => {
    // Example: invertible 3x3 matrix
    const mat = Matrix.fromArray([
      [1, 2, 3],
      [0, 1, 4],
      [5, 6, 0],
    ]);
    // This is just a sample check to ensure the inverse * mat = Identity
    const inv = mat.inverse();
    expect(inv).not.toBeNull();

    if (inv) {
      const identity = mat.multiply(inv);
      for (let i = 0; i < identity.rows; i++) {
        for (let j = 0; j < identity.cols; j++) {
          if (i === j) {
            expect(identity.get(i, j)).toBeCloseTo(1);
          } else {
            expect(identity.get(i, j)).toBeCloseTo(0);
          }
        }
      }
    }
  });
});
