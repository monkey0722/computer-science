import { BinaryTreeNode } from "./binaryTreeNode";

export class BinaryTree<T> {
  public root: BinaryTreeNode<T> | null;

  constructor(value?: T) {
    this.root = value == null ? null : new BinaryTreeNode(value);
  }

  size(): number {
    if (!this.root) {
      return 0;
    }

    return this.root.size();
  }

  height(): number {
    if (!this.root) {
      return 0;
    }

    return this.root.height();
  }

  inOrder(): Array<T> {
    const arr: Array<T> = [];

    function inOrderImpl(node: BinaryTreeNode<T> | null) {
      if (node == null) {
        return;
      }

      inOrderImpl(node.left);
      arr.push(node.value);
      inOrderImpl(node.right);
    }

    inOrderImpl(this.root);
    return arr;
  }

  preOrder(): Array<T> {
    const arr: Array<T> = [];

    function preOrderImpl(node: BinaryTreeNode<T> | null) {
      if (!node) {
        return;
      }

      arr.push(node.value);
      preOrderImpl(node.left);
      preOrderImpl(node.right);
    }

    preOrderImpl(this.root);
    return arr;
  }

  postOrder(): Array<T> {
    const arr: Array<T> = [];

    function postOrderImpl(node: BinaryTreeNode<T> | null) {
      if (!node) {
        return;
      }

      postOrderImpl(node.left);
      postOrderImpl(node.right);
      arr.push(node.value);
    }

    postOrderImpl(this.root);
    return arr;
  }

  isBalanced(): boolean {
    function isBalancedImpl(node: BinaryTreeNode<T> | null): boolean {
      if (!node) {
        return true;
      }

      const leftHeight = node.left ? node.left.height() : -1;
      const rightHeight = node.right ? node.right.height() : -1;

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }

      return isBalancedImpl(node.left) && isBalancedImpl(node.right);
    }

    return isBalancedImpl(this.root);
  }

  isComplete(): boolean {
    function isCompleteImpl(
      node: BinaryTreeNode<T> | null,
      index: number,
      numNodes: number
    ): boolean {
      if (!node) {
        return true;
      }

      if (index >= numNodes) {
        return false;
      }

      return (
        isCompleteImpl(node.left, 2 * index + 1, numNodes) &&
        isCompleteImpl(node.right, 2 * index + 2, numNodes)
      );
    }

    return isCompleteImpl(this.root, 0, this.size());
  }
}
