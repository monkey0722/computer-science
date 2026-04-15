import {UnionFind} from './unionFind';

describe('UnionFind', () => {
  let uf: UnionFind<number>;

  beforeEach(() => {
    uf = new UnionFind<number>();
  });

  test('should create a new set for a single element using makeSet', () => {
    uf.makeSet(1);
    expect(uf.getSize(1)).toBe(1);
    expect(uf.connected(1, 1)).toBe(true);
  });
  test('should throw an error when find is called on a non-existent element', () => {
    expect(() => uf.find(1)).toThrow('Element 1 not found in any set');
  });
  test('should connect two elements using union', () => {
    uf.makeSet(1);
    uf.makeSet(2);
    uf.union(1, 2);
    expect(uf.connected(1, 2)).toBe(true);
    expect(uf.getSize(1)).toBe(2);
    expect(uf.getSize(2)).toBe(2);
  });
  test('should not connect elements that are already in the same set', () => {
    uf.makeSet(1);
    uf.makeSet(2);
    uf.union(1, 2);
    const initialSize = uf.getSize(1);
    uf.union(1, 2); // Repeated union
    expect(uf.getSize(1)).toBe(initialSize); // Size remains unchanged
  });
  test('should handle multiple unions correctly', () => {
    uf.makeSet(1);
    uf.makeSet(2);
    uf.makeSet(3);
    uf.union(1, 2);
    uf.union(2, 3);
    expect(uf.connected(1, 3)).toBe(true);
    expect(uf.getSize(1)).toBe(3);
  });
  test('should optimize find with path compression', () => {
    uf.makeSet(1);
    uf.makeSet(2);
    uf.makeSet(3);
    uf.union(1, 2);
    uf.union(2, 3);
    const rootBefore = uf.find(1);
    uf.find(3);
    const rootAfter = uf.find(1);
    expect(rootBefore).toBe(rootAfter);
    expect(uf.find(2)).toBe(rootAfter);
  });
  test('should return false for connected when elements are not in the same set', () => {
    uf.makeSet(1);
    uf.makeSet(2);
    expect(uf.connected(1, 2)).toBe(false);
  });
  test('should throw an error when getSize is called on a non-existent element', () => {
    expect(() => uf.getSize(1)).toThrow('Element 1 not found in any set');
  });
  test('should correctly manage set sizes', () => {
    uf.makeSet(1);
    uf.makeSet(2);
    uf.makeSet(3);
    uf.union(1, 2);
    uf.union(2, 3);
    expect(uf.getSize(1)).toBe(3);
    expect(uf.getSize(2)).toBe(3);
    expect(uf.getSize(3)).toBe(3);
  });
  test('should work with non-number types', () => {
    const ufString = new UnionFind<string>();
    ufString.makeSet('a');
    ufString.makeSet('b');
    ufString.union('a', 'b');
    expect(ufString.connected('a', 'b')).toBe(true);
    expect(ufString.getSize('a')).toBe(2);
  });
});
