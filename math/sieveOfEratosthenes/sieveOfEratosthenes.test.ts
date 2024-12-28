import {sieveOfEratosthenes} from './sieveOfEratosthenes';

describe('sieveOfEratosthenes', () => {
  test('should return an empty array when passed 1', () => {
    expect(sieveOfEratosthenes(1)).toEqual([]);
  });
  test('should return an array containing 2, 3, 5, and 7 when passed 10', () => {
    expect(sieveOfEratosthenes(10)).toEqual([2, 3, 5, 7]);
  });
  test('should return an array containing 2, 3, 5, 7, 11, and 13 when passed 15', () => {
    expect(sieveOfEratosthenes(15)).toEqual([2, 3, 5, 7, 11, 13]);
  });
  test('should return an array containing 2, 3, 5, 7, 11, and 13 when passed 20', () => {
    expect(sieveOfEratosthenes(20)).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
  });
  test('should return an array containing 2, 3, 5, 7, 11, 13, 17, 19, 23, and 29 when passed 30', () => {
    expect(sieveOfEratosthenes(30)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });
});
