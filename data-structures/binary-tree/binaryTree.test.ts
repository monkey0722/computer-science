import {BinaryTree} from './binaryTree';

describe('BinaryTree', () => {
  let tree: BinaryTree<number>;

  beforeEach(() => {
    tree = new BinaryTree<number>((a, b) => a - b);
  });

  test('should create an empty tree', () => {
    expect(tree.root).toBeNull();
  });
  test('should insert values into the tree', () => {
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    expect(tree.root!.value).toBe(3);
    expect(tree.root!.left!.value).toBe(1);
    expect(tree.root!.left!.right!.value).toBe(2);
  });
  test('should check if value is contained in the tree', () => {
    tree.insert(3);
    tree.insert(1);
    tree.insert(4);
    expect(tree.contains(1)).toBe(true);
    expect(tree.contains(4)).toBe(true);
    expect(tree.contains(5)).toBe(false);
  });
  test('should traverse the tree in-order and produce sorted output', () => {
    const values: number[] = [];
    tree.insert(3);
    tree.insert(1);
    tree.insert(4);
    tree.insert(2);
    tree.inOrderTraverse((value) => values.push(value));
    expect(values).toEqual([1, 2, 3, 4]);
  });
  test('should remove a leaf node from the tree', () => {
    tree.insert(3);
    tree.insert(1);
    tree.insert(4);
    tree.remove(4);
    expect(tree.contains(4)).toBe(false);
    expect(tree.root!.right).toBeNull();
  });
  test('should remove a node with one child from the tree', () => {
    tree.insert(3);
    tree.insert(1);
    tree.insert(4);
    tree.insert(5);
    tree.remove(4);
    expect(tree.contains(4)).toBe(false);
    expect(tree.root!.right!.value).toBe(5);
  });
  test('should remove a node with two children from the tree', () => {
    tree.insert(3);
    tree.insert(1);
    tree.insert(4);
    tree.insert(2);
    tree.insert(5);
    tree.remove(3);
    expect(tree.contains(3)).toBe(false);
    expect(tree.root!.value).not.toBe(3); // The value should have been replaced by the inorder successor
  });
  test('should handle removal of the root node', () => {
    tree.insert(3);
    tree.remove(3);
    expect(tree.root).toBeNull();
    expect(tree.contains(3)).toBe(false);
  });
  test('should insert values into the tree', () => {
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    expect(tree.root!.value).toBe(3);
    expect(tree.root!.left!.value).toBe(1);
    expect(tree.root!.left!.right!.value).toBe(2);
  });
});

describe('BinaryTree Performance Test', () => {
  let tree: BinaryTree<number>;

  beforeEach(() => {
    tree = new BinaryTree<number>((a, b) => a - b);
  });

  test('should handle large number of inserts', () => {
    const size = 100000;
    const start = performance.now();
    for (let i = 0; i < size; i++) {
      tree.insert(Math.floor(Math.random() * size));
    }
    const end = performance.now();
    console.log(`Time taken to insert ${size} items: ${end - start}ms`);
    expect(end - start).toBeLessThan(500);
  });
  test('should handle large number of searches', () => {
    const size = 1000;
    for (let i = 0; i < size; i++) {
      tree.insert(i);
    }
    const start = performance.now();
    for (let i = 0; i < size; i++) {
      tree.contains(Math.floor(Math.random() * size));
    }
    const end = performance.now();
    console.log(`Time taken to search ${size} items: ${end - start}ms`);
    expect(end - start).toBeLessThan(500);
  });
});
