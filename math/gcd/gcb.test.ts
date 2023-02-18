import {gcd} from './gcd';

describe('gcd', () => {
  test('should return 2 when passed 4 and 6', () => {
    expect(gcd(4, 6)).toBe(2);
  });
  test('should return 6 when passed 30 and 42', () => {
    expect(gcd(30, 42)).toBe(6);
  });
  test('should return 4 when passed -8 and 12', () => {
    expect(gcd(-8, 12)).toBe(4);
  });
  test('should return 12 when passed 0 and 12', () => {
    expect(gcd(0, 12)).toBe(12);
  });
});
