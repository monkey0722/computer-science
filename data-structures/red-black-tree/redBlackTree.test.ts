import {RedBlackTree} from './redBlackTree';

describe('RedBlackTree', () => {
  let tree: RedBlackTree<number>;

  beforeEach(() => {
    tree = new RedBlackTree<number>();
  });

  test('should insert elements and maintain order', () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(15);

    const result = tree.inOrderTraversal();
    expect(result).toEqual([10, 15, 20]);
  });

  test('should search for existing elements', () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(15);

    expect(tree.search(10)).toBe(true);
    expect(tree.search(20)).toBe(true);
    expect(tree.search(15)).toBe(true);
  });

  test('should return false for non-existing elements', () => {
    tree.insert(10);
    tree.insert(20);

    expect(tree.search(5)).toBe(false);
    expect(tree.search(15)).toBe(false);
  });

  test('should handle duplicate inserts gracefully', () => {
    tree.insert(10);
    tree.insert(10);
    tree.insert(10);

    const result = tree.inOrderTraversal();
    expect(result).toEqual([10]);
  });

  test('should correctly balance the tree after inserts', () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(30);
    tree.insert(40);
    tree.insert(50);

    const result = tree.inOrderTraversal();
    expect(result).toEqual([10, 20, 30, 40, 50]);
  });

  test('should handle mixed inserts and maintain order', () => {
    tree.insert(50);
    tree.insert(30);
    tree.insert(70);
    tree.insert(20);
    tree.insert(40);
    tree.insert(60);
    tree.insert(80);

    const result = tree.inOrderTraversal();
    expect(result).toEqual([20, 30, 40, 50, 60, 70, 80]);
  });

  test('should support custom comparator', () => {
    const stringTree = new RedBlackTree<string>((a, b) => a.localeCompare(b));
    stringTree.insert('banana');
    stringTree.insert('apple');
    stringTree.insert('cherry');

    const result = stringTree.inOrderTraversal();
    expect(result).toEqual(['apple', 'banana', 'cherry']);
  });
});
