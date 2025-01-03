import {coinChangeWays, minCoinsForChange} from './coinChange';

describe('coinChangeWays tests', () => {
  test('should return 4 ways for [1, 2, 5] and target 5', () => {
    const ways = coinChangeWays([1, 2, 5], 5);
    expect(ways).toBe(4);
  });
  test('should return 1 when target is 0', () => {
    expect(coinChangeWays([1, 2, 3], 0)).toBe(1);
  });

  test('should return 0 when cannot make change', () => {
    expect(coinChangeWays([3, 4], 1)).toBe(0);
  });
  test('should throw error for negative target', () => {
    expect(() => coinChangeWays([1, 2, 3], -5)).toThrow();
  });
  test('should throw error for non-positive coin', () => {
    expect(() => coinChangeWays([0, 2], 10)).toThrow();
  });
});

describe('minCoinsForChange tests', () => {
  test('should return 2 for [1, 3, 4] and target 6', () => {
    const minCoins = minCoinsForChange([1, 3, 4], 6);
    expect(minCoins).toBe(2);
  });
  test('should return 0 when target is 0', () => {
    expect(minCoinsForChange([1, 5], 0)).toBe(0);
  });
  test('should return -1 when cannot make change', () => {
    expect(minCoinsForChange([2, 4], 3)).toBe(-1);
  });
  test('should throw error for negative target', () => {
    expect(() => minCoinsForChange([1], -1)).toThrow();
  });
  test('should throw error for non-positive coin', () => {
    expect(() => minCoinsForChange([0], 10)).toThrow();
  });
});
