import {fibMatrix} from './fibMatrix';

describe('fibMatrix', () => {
  test('F(0) = 0', () => {
    expect(fibMatrix(0)).toBe(0);
  });
  test('F(1) = 1', () => {
    expect(fibMatrix(1)).toBe(1);
  });
  test('F(2) = 1', () => {
    expect(fibMatrix(2)).toBe(1);
  });
  test('F(5) = 5', () => {
    expect(fibMatrix(5)).toBe(5);
  });
  test('F(10) = 55', () => {
    expect(fibMatrix(10)).toBe(55);
  });
  test('F(20) = 6765', () => {
    expect(fibMatrix(20)).toBe(6765);
  });
  test('should throw on negative input', () => {
    expect(() => fibMatrix(-1)).toThrow(RangeError);
  });
});
