import {primeFactors} from './primeFactors';

describe('primeFactors', () => {
  test('should return an empty array when passed 1', () => {
    expect(primeFactors(1)).toEqual([]);
  });
  test('should return an array containing 2 and 2 when passed 4', () => {
    expect(primeFactors(4)).toEqual([2, 2]);
  });
  test('should return an array containing 2, 3, and 5 when passed 30', () => {
    expect(primeFactors(30)).toEqual([2, 3, 5]);
  });
  test('should return an array containing 2, 2, 2, and 3 when passed 24', () => {
    expect(primeFactors(24)).toEqual([2, 2, 2, 3]);
  });
  test('should return an array containing 2 and 7 when passed 14', () => {
    expect(primeFactors(14)).toEqual([2, 7]);
  });
});
