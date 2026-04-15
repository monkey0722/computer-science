import {primeFactors} from './primeFactors';

describe('primeFactors', () => {
  test('should return throw', () => {
    expect(() => primeFactors(1)).toThrow();
  });
  test('primeFactors(2) => [2]', () => {
    expect(primeFactors(2)).toEqual([2]);
  });
  test('primeFactors(3) => [3]', () => {
    expect(primeFactors(3)).toEqual([3]);
  });
  test('primeFactors(4) => [2, 2]', () => {
    expect(primeFactors(4)).toEqual([2, 2]);
  });
  test('primeFactors(18) => [2, 3, 3]', () => {
    expect(primeFactors(18)).toEqual([2, 3, 3]);
  });
  test('primeFactors(100) => [2, 2, 5, 5]', () => {
    expect(primeFactors(100)).toEqual([2, 2, 5, 5]);
  });
  test('primeFactors(9973) => [9973] (9973 is prime)', () => {
    expect(primeFactors(9973)).toEqual([9973]);
  });
});
