import {sieveOfEratosthenes} from './sieveOfEratosthenes';

describe('sieveOfEratosthenes', () => {
  test('returns [] for n < 2', () => {
    expect(sieveOfEratosthenes(1)).toEqual([]);
    expect(sieveOfEratosthenes(0)).toEqual([]);
    expect(sieveOfEratosthenes(-5)).toEqual([]);
  });
  test('returns [2] for n = 2', () => {
    expect(sieveOfEratosthenes(2)).toEqual([2]);
  });
  test('returns prime list for n = 10', () => {
    // primes up to 10 => 2, 3, 5, 7
    expect(sieveOfEratosthenes(10)).toEqual([2, 3, 5, 7]);
  });
  test('returns prime list for n = 11', () => {
    // primes up to 11 => 2, 3, 5, 7, 11
    expect(sieveOfEratosthenes(11)).toEqual([2, 3, 5, 7, 11]);
  });
  test('returns prime list for n = 1_000 (sanity check)', () => {
    const primesUpTo1000 = sieveOfEratosthenes(1000);
    expect(primesUpTo1000[0]).toBe(2);
    // A quick check: 997 is prime, so it should be in the array
    expect(primesUpTo1000).toContain(997);
  });
});
