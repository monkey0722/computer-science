/**
 * Represents the color of a node in a Red-Black Tree.
 */
enum Color {
  RED,
  BLACK,
}

/**
 * Represents a single node in the Red-Black Tree.
 * @template T - The type of value stored in the node.
 */
class Node<T> {
  value: T;
  color: Color;
  left: Node<T>;
  right: Node<T>;
  parent: Node<T>;

  /**
   * Initializes a new node in the Red-Black Tree.
   * @param {T} value - The value of the node.
   * @param {Node<T>} nil - The sentinel node (used for leaves and root).
   */
  constructor(value: T, nil: Node<T>) {
    this.value = value;
    this.color = Color.RED;
    this.left = nil;
    this.right = nil;
    this.parent = nil;
  }
}

/**
 * Represents a Red-Black Tree, a self-balancing binary search tree.
 * @template T - The type of values stored in the tree.
 */
export class RedBlackTree<T> {
  private root: Node<T>;
  private readonly nil: Node<T>;

  /**
   * Initializes an empty Red-Black Tree.
   * @param {(a: T, b: T) => number} [compare] - A custom comparator function. Default: numerical comparison.
   */
  constructor(private compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
    this.nil = new Node<T>(null as T, null!);
    this.nil.color = Color.BLACK;
    this.nil.left = this.nil.right = this.nil;
    this.root = this.nil;
  }

  /**
   * Inserts a value into the Red-Black Tree.
   * If the value already exists, it will not be inserted.
   *
   * @param {T} value - The value to insert.
   */
  insert(value: T): void {
    if (this.search(value)) {
      return;
    }

    const node = new Node(value, this.nil);

    let y = this.nil;
    let x = this.root;

    while (x !== this.nil) {
      y = x;
      if (this.compare(node.value, x.value) < 0) {
        x = x.left;
      } else {
        x = x.right;
      }
    }

    node.parent = y;
    if (y === this.nil) {
      this.root = node;
    } else if (this.compare(node.value, y.value) < 0) {
      y.left = node;
    } else {
      y.right = node;
    }

    this.fixInsert(node);
  }

  /**
   * Fixes violations of Red-Black Tree properties after an insertion.
   * @private
   * @param {Node<T>} node - The newly inserted node.
   */
  private fixInsert(node: Node<T>): void {
    while (node.parent.color === Color.RED) {
      if (node.parent === node.parent.parent.left) {
        const uncle = node.parent.parent.right;
        if (uncle.color === Color.RED) {
          node.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          node.parent.parent.color = Color.RED;
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            node = node.parent;
            this.leftRotate(node);
          }
          node.parent.color = Color.BLACK;
          node.parent.parent.color = Color.RED;
          this.rightRotate(node.parent.parent);
        }
      } else {
        const uncle = node.parent.parent.left;
        if (uncle.color === Color.RED) {
          node.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          node.parent.parent.color = Color.RED;
          node = node.parent.parent;
        } else {
          if (node === node.parent.left) {
            node = node.parent;
            this.rightRotate(node);
          }
          node.parent.color = Color.BLACK;
          node.parent.parent.color = Color.RED;
          this.leftRotate(node.parent.parent);
        }
      }
    }
    this.root.color = Color.BLACK;
  }

  /**
   * Performs a left rotation around a given node.
   * @private
   * @param {Node<T>} node - The node to rotate.
   */
  private leftRotate(node: Node<T>): void {
    const y = node.right;
    node.right = y.left;
    if (y.left !== this.nil) {
      y.left.parent = node;
    }
    y.parent = node.parent;
    if (node.parent === this.nil) {
      this.root = y;
    } else if (node === node.parent.left) {
      node.parent.left = y;
    } else {
      node.parent.right = y;
    }
    y.left = node;
    node.parent = y;
  }

  /**
   * Performs a right rotation around a given node.
   * @private
   * @param {Node<T>} node - The node to rotate.
   */
  private rightRotate(node: Node<T>): void {
    const y = node.left;
    node.left = y.right;
    if (y.right !== this.nil) {
      y.right.parent = node;
    }
    y.parent = node.parent;
    if (node.parent === this.nil) {
      this.root = y;
    } else if (node === node.parent.right) {
      node.parent.right = y;
    } else {
      node.parent.left = y;
    }
    y.right = node;
    node.parent = y;
  }

  /**
   * Searches for a value in the Red-Black Tree.
   * @param {T} value - The value to search for.
   * @returns {boolean} - True if the value is found, false otherwise.
   */
  search(value: T): boolean {
    let current = this.root;
    while (current !== this.nil) {
      const comparison = this.compare(value, current.value);
      if (comparison === 0) {
        return true;
      }
      current = comparison < 0 ? current.left : current.right;
    }
    return false;
  }

  /**
   * Performs an in-order traversal of the tree.
   * @returns {T[]} - An array of all values in the tree, in sorted order.
   */
  inOrderTraversal(): T[] {
    const result: T[] = [];
    this.inOrderTraversalHelper(this.root, result);
    return result;
  }

  /**
   * Helper method for in-order traversal.
   * @private
   * @param {Node<T>} node - The current node.
   * @param {T[]} result - The array to store values.
   */
  private inOrderTraversalHelper(node: Node<T>, result: T[]): void {
    if (node !== this.nil) {
      this.inOrderTraversalHelper(node.left, result);
      result.push(node.value);
      this.inOrderTraversalHelper(node.right, result);
    }
  }
}
