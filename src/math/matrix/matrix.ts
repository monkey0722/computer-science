/**
 * A 2D matrix class with basic operations such as addition, multiplication,
 * determinant, and inverse calculation.
 */
export class Matrix {
  private data: number[][];

  /**
   * Creates a new Matrix with the specified number of rows and columns,
   * initializing each element with the provided initial value.
   *
   * @param {number} rows - Number of rows in the matrix (must be > 0).
   * @param {number} cols - Number of columns in the matrix (must be > 0).
   * @param {number} [initialValue=0] - The initial value for each element.
   * @throws Will throw an error if rows or cols is not a positive integer.
   */
  constructor(rows: number, cols: number, initialValue: number = 0) {
    if (rows <= 0 || cols <= 0) {
      throw new Error(`Invalid matrix size: ${rows} x ${cols}`);
    }
    this.data = Array.from({length: rows}, () => Array(cols).fill(initialValue));
  }

  /**
   * Creates a new Matrix from a two-dimensional array of numbers.
   *
   * @param {number[][]} arr - A 2D array representing matrix data. All rows must have the same number of columns.
   * @returns {Matrix} The generated Matrix instance.
   * @throws Will throw an error if the input array is empty or the rows have inconsistent lengths.
   */
  static fromArray(arr: number[][]): Matrix {
    if (arr.length === 0) {
      throw new Error('Cannot create matrix from an empty array.');
    }
    const rowCount = arr.length;
    const colCount = arr[0].length;

    for (let i = 1; i < rowCount; i++) {
      if (arr[i].length !== colCount) {
        throw new Error('All rows must have the same length.');
      }
    }

    const matrix = new Matrix(rowCount, colCount);
    matrix.data = arr.map((row) => [...row]);
    return matrix;
  }

  /**
   * Returns the number of rows in the matrix.
   *
   * @type {number}
   */
  get rows(): number {
    return this.data.length;
  }

  /**
   * Returns the number of columns in the matrix.
   *
   * @type {number}
   */
  get cols(): number {
    return this.data[0].length;
  }

  /**
   * Retrieves the element at the specified row and column.
   *
   * @param {number} row - Zero-based row index.
   * @param {number} col - Zero-based column index.
   * @returns {number} The element at the given row and column.
   * @throws Will throw an error if the row or column indices are out of range.
   */
  get(row: number, col: number): number {
    this.checkRange(row, col);
    return this.data[row][col];
  }

  /**
   * Sets the element at the specified row and column to a new value.
   *
   * @param {number} row - Zero-based row index.
   * @param {number} col - Zero-based column index.
   * @param {number} value - The value to set.
   * @throws Will throw an error if the row or column indices are out of range.
   */
  set(row: number, col: number, value: number): void {
    this.checkRange(row, col);
    this.data[row][col] = value;
  }

  /**
   * Adds this matrix and another matrix of the same dimension.
   *
   * @param {Matrix} other - The matrix to add.
   * @returns {Matrix} A new Matrix representing the sum.
   * @throws Will throw an error if the matrix dimensions differ.
   */
  add(other: Matrix): Matrix {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error('Matrix dimensions must match for addition.');
    }

    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.data[i][j] = this.data[i][j] + other.data[i][j];
      }
    }
    return result;
  }

  /**
   * Multiplies this matrix with another matrix (matrix multiplication).
   *
   * @param {Matrix} other - The matrix to multiply with.
   * @returns {Matrix} A new Matrix representing the product.
   * @throws Will throw an error if the number of columns of this matrix
   *         does not match the number of rows of the other matrix.
   */
  multiply(other: Matrix): Matrix {
    if (this.cols !== other.rows) {
      throw new Error('Invalid matrix dimensions for multiplication.');
    }

    const result = new Matrix(this.rows, other.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < other.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.data[i][k] * other.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    return result;
  }

  /**
   * Returns the transpose of this matrix (rows become columns and vice versa).
   *
   * @returns {Matrix} A new Matrix that is the transpose of the original.
   */
  transpose(): Matrix {
    const result = new Matrix(this.cols, this.rows);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.data[j][i] = this.data[i][j];
      }
    }
    return result;
  }

  /**
   * Calculates the determinant of this matrix using cofactor expansion (recursive).
   *
   * @returns {number} The determinant of the matrix.
   * @throws Will throw an error if the matrix is not square.
   * @remarks This method uses cofactor expansion and can be very inefficient for large matrices (O(n!)).
   */
  determinant(): number {
    if (this.rows !== this.cols) {
      throw new Error('Matrix must be square to calculate the determinant.');
    }

    // 1x1
    if (this.rows === 1) {
      return this.data[0][0];
    }

    // 2x2
    if (this.rows === 2) {
      return this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0];
    }

    // n x n (n >= 3)
    let det = 0;
    const n = this.rows;
    for (let j = 0; j < n; j++) {
      // Equivalent to Math.pow(-1, j)
      const sign = j % 2 === 0 ? 1 : -1;
      det += sign * this.data[0][j] * this.getMinor(0, j).determinant();
    }
    return det;
  }

  /**
   * Calculates the inverse of this matrix using the adjugate method.
   *
   * @returns {Matrix | null} The inverse matrix if it exists, or null if the determinant is zero (or very close to zero).
   * @throws Will throw an error if the matrix is not square.
   */
  inverse(): Matrix | null {
    const det = this.determinant();
    if (Math.abs(det) < 1e-10) {
      return null;
    }

    const adjugate = this.getAdjugate();
    const result = new Matrix(this.rows, this.cols);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.data[i][j] = adjugate.data[i][j] / det;
      }
    }
    return result;
  }

  /**
   * Checks if a row and column index is within the valid range of the matrix.
   *
   * @private
   * @param {number} row - The row index to check.
   * @param {number} col - The column index to check.
   * @throws Will throw an error if row or col is out of range.
   */
  private checkRange(row: number, col: number): void {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      throw new Error(`Index out of range: row=${row}, col=${col}`);
    }
  }

  /**
   * Returns the minor matrix obtained by removing the specified row and column.
   *
   * @private
   * @param {number} row - The row to remove.
   * @param {number} col - The column to remove.
   * @returns {Matrix} The minor matrix.
   */
  private getMinor(row: number, col: number): Matrix {
    const minor = new Matrix(this.rows - 1, this.cols - 1);
    let r = 0;

    for (let i = 0; i < this.rows; i++) {
      if (i === row) continue;
      let c = 0;
      for (let j = 0; j < this.cols; j++) {
        if (j === col) continue;
        minor.data[r][c] = this.data[i][j];
        c++;
      }
      r++;
    }
    return minor;
  }

  /**
   * Computes the adjugate (adjoint) of this matrix.
   *
   * @private
   * @returns {Matrix} The adjugate of this matrix.
   */
  private getAdjugate(): Matrix {
    const cofactor = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const sign = (i + j) % 2 === 0 ? 1 : -1;
        cofactor.data[i][j] = sign * this.getMinor(i, j).determinant();
      }
    }
    return cofactor.transpose();
  }
}
