import {binomialCoefficient} from './binomialCoefficient';

describe('binomialCoefficient', () => {
  test('calculates the binomial coefficient correctly', () => {
    expect(binomialCoefficient(0, 0)).toBe(1);
    expect(binomialCoefficient(1, 0)).toBe(1);
    expect(binomialCoefficient(1, 1)).toBe(1);
    expect(binomialCoefficient(2, 1)).toBe(2);
    expect(binomialCoefficient(4, 2)).toBe(6);
    expect(binomialCoefficient(5, 3)).toBe(10);
    expect(binomialCoefficient(10, 5)).toBe(252);
    expect(binomialCoefficient(10, 11)).toBe(0);
  });
  test('returns 0 when k is greater than n', () => {
    expect(binomialCoefficient(5, 6)).toBe(0);
    expect(binomialCoefficient(10, 11)).toBe(0);
  });
});
