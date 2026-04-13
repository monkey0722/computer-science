import {factorial} from './factorial';

describe('factorial', () => {
  test('factorial(0) should return 1', () => {
    expect(factorial(0)).toBe(1);
  });
  test('factorial(1) should return 1', () => {
    expect(factorial(1)).toBe(1);
  });
  test('factorial(2) should return 2', () => {
    expect(factorial(2)).toBe(2);
  });
  test('factorial(5) should return 120', () => {
    expect(factorial(5)).toBe(120);
  });
  test('factorial(10) should return 3628800', () => {
    expect(factorial(10)).toBe(3628800);
  });
  test('negative input should throw RangeError', () => {
    expect(() => factorial(-1)).toThrow(RangeError);
  });
});
