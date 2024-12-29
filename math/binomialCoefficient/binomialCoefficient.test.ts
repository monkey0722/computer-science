import {binomialCoefficient} from './binomialCoefficient';

describe('binomialCoefficient', () => {
  test('returns the correct result for basic combinations', () => {
    expect(binomialCoefficient(4, 2)).toBe(6);
    expect(binomialCoefficient(5, 2)).toBe(10);
    expect(binomialCoefficient(5, 0)).toBe(1);
    expect(binomialCoefficient(5, 5)).toBe(1);
  });
  test('returns 0 if k is greater than n', () => {
    expect(binomialCoefficient(3, 4)).toBe(0);
  });
  test('handles the optimization when k > n-k', () => {
    expect(binomialCoefficient(10, 7)).toBe(120);
  });
  test('handles corner cases correctly', () => {
    expect(binomialCoefficient(0, 0)).toBe(1);
    expect(binomialCoefficient(1, 0)).toBe(1);
    expect(binomialCoefficient(1, 1)).toBe(1);
  });
});