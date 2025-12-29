import {lcs} from './lcs';

describe('LCS function test', () => {
  test('should return correct result for normal strings', () => {
    const {length, sequence} = lcs('ABCBDAB', 'BDCABA');
    expect(length).toBe(4);
    expect(sequence.length).toBe(4);
    expect(['BDAB', 'BCAB']).toContain(sequence);
  });
  test('should return 0 for empty input', () => {
    const {length, sequence} = lcs('', 'ABCDE');
    expect(length).toBe(0);
    expect(sequence).toBe('');
  });
  test('should return full length if strings are identical', () => {
    const {length, sequence} = lcs('HELLO', 'HELLO');
    expect(length).toBe(5);
    expect(sequence).toBe('HELLO');
  });
  test('should return correct result for partially matching strings', () => {
    const {length, sequence} = lcs('ABC', 'ACE');
    expect(length).toBe(2);
    expect(sequence).toBe('AC');
  });
  test('should handle no common characters', () => {
    const {length, sequence} = lcs('ABC', 'XYZ');
    expect(length).toBe(0);
    expect(sequence).toBe('');
  });
});
