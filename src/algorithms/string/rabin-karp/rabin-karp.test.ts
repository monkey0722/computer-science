import {rabinKarp} from './rabin-karp';

describe('Rabin-Karp Algorithm', () => {
  test('should find a single occurrence', () => {
    expect(rabinKarp('hello world', 'world')).toEqual([6]);
  });

  test('should find multiple occurrences', () => {
    expect(rabinKarp('ababababab', 'abab')).toEqual([0, 2, 4, 6]);
  });

  test('should return empty array when pattern is not found', () => {
    expect(rabinKarp('hello world', 'xyz')).toEqual([]);
  });

  test('should return empty array for empty pattern', () => {
    expect(rabinKarp('hello', '')).toEqual([]);
  });

  test('should return empty array when pattern is longer than text', () => {
    expect(rabinKarp('hi', 'hello')).toEqual([]);
  });

  test('should handle pattern equal to text', () => {
    expect(rabinKarp('abc', 'abc')).toEqual([0]);
  });

  test('should handle single character pattern', () => {
    expect(rabinKarp('abcabc', 'a')).toEqual([0, 3]);
  });

  test('should handle single character text and pattern', () => {
    expect(rabinKarp('a', 'a')).toEqual([0]);
    expect(rabinKarp('a', 'b')).toEqual([]);
  });

  test('should handle repeated characters', () => {
    expect(rabinKarp('aaaaaa', 'aaa')).toEqual([0, 1, 2, 3]);
  });

  test('should handle pattern at the end of text', () => {
    expect(rabinKarp('abcdef', 'def')).toEqual([3]);
  });

  test('should handle pattern at the beginning of text', () => {
    expect(rabinKarp('abcdef', 'abc')).toEqual([0]);
  });

  test('should handle large text efficiently', () => {
    const text = 'a'.repeat(10000) + 'b';
    const pattern = 'a'.repeat(100) + 'b';

    const startTime = performance.now();
    const result = rabinKarp(text, pattern);
    const endTime = performance.now();

    expect(result).toEqual([9900]);
    expect(endTime - startTime).toBeLessThan(1000);
  });

  test('should handle hash collisions correctly', () => {
    // Use longer strings to increase collision potential
    const text = 'The quick brown fox jumps over the lazy dog';
    const pattern = 'fox';
    expect(rabinKarp(text, pattern)).toEqual([16]);
  });
});
