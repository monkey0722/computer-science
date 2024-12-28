import {BinaryTreeNode} from './binaryTreeNode';

/**
 * A binary search tree class with methods to insert, search, traverse, and remove nodes.
 */
export class BinaryTree<T> {
  public root: BinaryTreeNode<T> | null = null;

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

  private insertNode(
    node: BinaryTreeNode<T>,
    newNode: BinaryTreeNode<T>
  ): void {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
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

  private search(
    node: BinaryTreeNode<T> | null,
    value: T
  ): BinaryTreeNode<T> | null {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      return this.search(node.left, value);
    } else if (value > node.value) {
      return this.search(node.right, value);
    } else {
      return node;
    }
  }

  /**
   * Traverses the binary search tree in order (left, root, right).
   * @param {function} visit Function to call on each value.
   */
  inOrderTraverse(visit: (value: T) => void): void {
    function traverse(node: BinaryTreeNode<T> | null): void {
      if (node === null) return;
      traverse(node.left);
      visit(node.value);
      traverse(node.right);
    }
    traverse(this.root);
  }

  /**
   * Removes a value from the binary search tree.
   * @param {T} value The value to remove.
   */
  remove(value: T): void {
    this.root = this.removeNode(this.root, value);
  }

  private removeNode(
    node: BinaryTreeNode<T> | null,
    value: T
  ): BinaryTreeNode<T> | null {
    if (node === null) {
      return null;
    }
    if (value < node.value) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      // Node with only one child or no child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      // Node with two children: Get the inorder successor (smallest in the right subtree)
      node.value = this.findMinValue(node.right);
      node.right = this.removeNode(node.right, node.value);
      return node;
    }
  }

  private findMinValue(node: BinaryTreeNode<T>): T {
    let minv = node.value;
    while (node.left !== null) {
      minv = node.left.value;
      node = node.left;
    }
    return minv;
  }
}
