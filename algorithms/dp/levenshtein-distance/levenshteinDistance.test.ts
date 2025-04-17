import {levenshteinDistance} from './levenshteinDistance';

describe('levenshteinDistance', () => {
  test('identical strings should have a distance of 0', () => {
    expect(levenshteinDistance('abc', 'abc')).toBe(0);
    expect(levenshteinDistance('', '')).toBe(0);
    expect(levenshteinDistance('hello', 'hello')).toBe(0);
  });
  test('empty string vs non-empty string should have distance equal to length', () => {
    expect(levenshteinDistance('', 'abc')).toBe(3);
    expect(levenshteinDistance('abc', '')).toBe(3);
  });
  test('simple single operation cases', () => {
    expect(levenshteinDistance('abc', 'abcd')).toBe(1);
    expect(levenshteinDistance('abc', 'ab')).toBe(1);
    expect(levenshteinDistance('abc', 'abd')).toBe(1);
  });
  test('complex edit distance cases', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
    expect(levenshteinDistance('saturday', 'sunday')).toBe(3);
    expect(levenshteinDistance('intention', 'execution')).toBe(5);
  });
  test('case sensitivity', () => {
    expect(levenshteinDistance('abc', 'ABC')).toBe(3);
    expect(levenshteinDistance('Hello', 'hello')).toBe(1);
  });
});
