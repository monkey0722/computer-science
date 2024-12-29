import {modPow} from './modPow';

describe('modPow function', () => {
  test('base^0 => always 1 (mod m) when m > 1', () => {
    expect(modPow(2, 0, 5)).toBe(1);
    expect(modPow(10, 0, 7)).toBe(1);
  });
  test('modulus=1 => result is 0', () => {
    expect(modPow(5, 10, 1)).toBe(0);
  });
  test('simple cases', () => {
    expect(modPow(2, 3, 5)).toBe(3);
    expect(modPow(3, 3, 13)).toBe(1);
  });
  test('larger exponent', () => {
    // 2^10=1024 => 1024 % 7=2
    expect(modPow(2, 10, 7)).toBe(2);
    // 3^13=1594323 => 1594323 % 100=23
    expect(modPow(3, 13, 100)).toBe(23);
  });
  test('should handle negative exponent if we disallow it', () => {
    expect(() => modPow(2, -1, 5)).toThrow(RangeError);
  });
  test('should handle zero or negative modulus if we disallow it', () => {
    expect(() => modPow(2, 3, 0)).toThrow(RangeError);
    expect(() => modPow(2, 3, -5)).toThrow(RangeError);
  });
});
