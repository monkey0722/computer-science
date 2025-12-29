import {eulerTotient} from './eulerTotient';

describe('eulerTotient', () => {
  test('n <= 0 => returns 0', () => {
    expect(eulerTotient(0)).toBe(0);
    expect(eulerTotient(-1)).toBe(0);
    expect(eulerTotient(-100)).toBe(0);
  });
  test('φ(1) = 1', () => {
    expect(eulerTotient(1)).toBe(1);
  });
  test('φ(2) = 1', () => {
    expect(eulerTotient(2)).toBe(1);
  });
  test('φ(3) = 2', () => {
    expect(eulerTotient(3)).toBe(2);
  });
  test('φ(4) = 2', () => {
    expect(eulerTotient(4)).toBe(2);
  });
  test('φ(6) = 2', () => {
    expect(eulerTotient(6)).toBe(2);
  });
  test('φ(10) = 4', () => {
    expect(eulerTotient(10)).toBe(4);
  });
  test('φ(12) = 4', () => {
    expect(eulerTotient(12)).toBe(4);
  });
  test('φ(36) = 12', () => {
    expect(eulerTotient(36)).toBe(12);
  });
  test('φ(100) = 40', () => {
    expect(eulerTotient(100)).toBe(40);
  });
  test('φ(9973)', () => {
    expect(eulerTotient(9973)).toBe(9972);
  });
});
