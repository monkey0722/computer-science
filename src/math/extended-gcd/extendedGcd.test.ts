import {extendedGcd, modInverse} from './extendedGcd';

describe('extendedGcd', () => {
  test('gcd(a, 0) => |a|', () => {
    expect(extendedGcd(5, 0)).toEqual([5, 1, 0]);
    expect(extendedGcd(-5, 0)).toEqual([5, -1, 0]);
  });
  test('basic checks for gcd and coefficients', () => {
    const [g1, x1, y1] = extendedGcd(15, 6);
    expect(g1).toBe(3);
    expect(15 * x1 + 6 * y1).toBe(3);

    const [g2, x2, y2] = extendedGcd(6, 15);
    expect(g2).toBe(3);
    expect(6 * x2 + 15 * y2).toBe(3);
  });
  test('extendedGcd with negative inputs', () => {
    const [g3, x3, y3] = extendedGcd(-9, 6);
    expect(g3).toBe(3);
    expect(-9 * x3 + 6 * y3).toBe(3);

    const [g4, x4, y4] = extendedGcd(9, -6);
    expect(g4).toBe(3);
    expect(9 * x4 + -6 * y4).toBe(3);
  });
});

describe('modInverse', () => {
  test('inverse of a = 1 mod m => should throw if gcd != 1', () => {
    expect(() => modInverse(6, 9)).toThrow();
  });
  test('modInverse(3, 7)', () => {
    const inv = modInverse(3, 7);
    expect(inv).toBe(5);
    expect((3 * inv) % 7).toBe(1);
  });
  test('modInverse(10, 17)', () => {
    const inv = modInverse(10, 17);
    expect(inv).toBe(12);
    expect((10 * inv) % 17).toBe(1);
  });
  test('modInverse(3, 11)', () => {
    const inv = modInverse(3, 11);
    expect(inv).toBe(4);
    expect((3 * inv) % 11).toBe(1);
  });
  test('modInverse(100, 3)', () => {
    const inv = modInverse(100, 3);
    expect(inv).toBe(1);
    expect((100 * inv) % 3).toBe(1);
  });
});
