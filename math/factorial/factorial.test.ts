import {factorial} from './factorial';

describe('factorial', () => {
  it('should return 1 when passed 0', () => {
    expect(factorial(0)).toBe(1);
  });
  it('should return 1 when passed 1', () => {
    expect(factorial(1)).toBe(1);
  });
  it('should return 24 when passed 4', () => {
    expect(factorial(4)).toBe(24);
  });
  it('should return 120 when passed 5', () => {
    expect(factorial(5)).toBe(120);
  });
  it('should throw an error when passed a negative number', () => {
    expect(() => {
      factorial(-1);
    }).toThrow();
  });
});
