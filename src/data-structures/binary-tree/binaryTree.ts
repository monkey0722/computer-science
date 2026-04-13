/**
 * A binary search tree node that holds a value and pointers to its left and right children.
 */
class BinaryTreeNode<T> {
  public value: T;
  public left: BinaryTreeNode<T> | null;
  public right: BinaryTreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/**
 * A binary search tree class with methods to insert, search, traverse, and remove nodes.
 */
export class BinaryTree<T> {
  public root: BinaryTreeNode<T> | null = null;
  private compareFn: (a: T, b: T) => number;

  /**
   * @param compareFn A comparator function that returns negative if a<b, zero if a===b, positive if a>b.
   */
  constructor(compareFn: (a: T, b: T) => number) {
    this.compareFn = compareFn;
  }

  /**
   * Inserts a new value into the binary search tree.
   * @param {T} value The value to insert.
   */
  insert(value: T): void {
    const newNode = new BinaryTreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: BinaryTreeNode<T>, newNode: BinaryTreeNode<T>): void {
    const cmp = this.compareFn(newNode.value, node.value);
    if (cmp < 0) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (cmp > 0) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    } else {
      // if compareFn returns 0 => values are equal; define your behavior (ignore, etc.)
      // Here, we might do nothing (ignore duplicates) or handle them specially.
    }
  }

  /**
   * Searches for a value in the binary search tree.
   * @param {T} value The value to search for.
   * @returns {boolean} True if the value is found, false otherwise.
   */
  contains(value: T): boolean {
    return this.search(this.root, value) !== null;
  }

  private search(node: BinaryTreeNode<T> | null, value: T): BinaryTreeNode<T> | null {
    if (node === null) {
      return null;
    }
    const cmp = this.compareFn(value, node.value);
    if (cmp < 0) {
      return this.search(node.left, value);
    } else if (cmp > 0) {
      return this.search(node.right, value);
    } else {
      return node;
    }
  }

  /**
   * Traverses the binary search tree in order (left, root, right).
   * @param visit A function to call on each value.
   */
  inOrderTraverse(visit: (value: T) => void): void {
    const traverse = (n: BinaryTreeNode<T> | null): void => {
      if (n === null) return;
      traverse(n.left);
      visit(n.value);
      traverse(n.right);
    };
    traverse(this.root);
  }

  /**
   * Removes a value from the binary search tree.
   * @param {T} value The value to remove.
   */
  remove(value: T): void {
    this.root = this.removeNode(this.root, value);
  }

  private removeNode(node: BinaryTreeNode<T> | null, value: T): BinaryTreeNode<T> | null {
    if (node === null) {
      return null;
    }

    const cmp = this.compareFn(value, node.value);
    if (cmp < 0) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (cmp > 0) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      // found the node to remove
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      // two children: get min from right subtree
      node.value = this.findMinValue(node.right);
      node.right = this.removeNode(node.right, node.value);
      return node;
    }
  }

  private findMinValue(node: BinaryTreeNode<T>): T {
    let minv = node.value;
    let current = node;
    while (current.left !== null) {
      minv = current.left.value;
      current = current.left;
    }
    return minv;
  }
}
