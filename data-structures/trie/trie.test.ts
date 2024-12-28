import {Trie} from './trie';

describe('Trie', () => {
  let trie: Trie;

  beforeEach(() => {
    trie = new Trie();
  });

  test('should insert and search a word', () => {
    trie.insert('apple');
    expect(trie.search('apple')).toBe(true);
    expect(trie.search('app')).toBe(false);
  });
  test('should handle case-insensitive search', () => {
    trie.insert('Apple');
    expect(trie.search('apple')).toBe(true);
    expect(trie.search('APPLE')).toBe(true);
  });
  test('should check for prefix existence', () => {
    trie.insert('apple');
    expect(trie.startsWith('app')).toBe(true);
    expect(trie.startsWith('appl')).toBe(true);
    expect(trie.startsWith('apz')).toBe(false);
  });
  test('should find all words with a given prefix', () => {
    trie.insert('apple');
    trie.insert('app');
    trie.insert('application');
    trie.insert('banana');
    expect(trie.findWords('app').sort()).toEqual(
      ['app', 'apple', 'application'].sort()
    );
    expect(trie.findWords('ban')).toEqual(['banana']);
    expect(trie.findWords('cat')).toEqual([]);
  });
  test('should throw an error for empty string insertion', () => {
    expect(() => trie.insert('')).toThrowError('Cannot insert an empty string');
  });
});
