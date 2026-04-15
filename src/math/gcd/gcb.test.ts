import {gcd} from './gcd';

describe('gcd function', () => {
  test('gcd(0, 0) should return throw', () => {
    expect(() => gcd(0, 0)).toThrow();
  });
  test('gcd(0, 5) = 5', () => {
    expect(gcd(0, 5)).toBe(5);
  });
  test('gcd(5, 0) = 5', () => {
    expect(gcd(5, 0)).toBe(5);
  });
  test('gcd(1, 1) = 1', () => {
    expect(gcd(1, 1)).toBe(1);
  });
  test('gcd(12, 4) = 4', () => {
    expect(gcd(12, 4)).toBe(4);
  });
  test('gcd(18, 24) = 6', () => {
    expect(gcd(18, 24)).toBe(6);
  });
  test('gcd(-6, 15) = 3 (if we handle negatives as absolute)', () => {
    expect(gcd(-6, 15)).toBe(3);
  });
  test('gcd(18, -24) = 6 (if we handle negatives as absolute)', () => {
    expect(gcd(18, -24)).toBe(6);
  });
});
