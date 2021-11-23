export class BinaryTreeNode<T> {
  public value: T;
  public left: BinaryTreeNode<T> | null;
  public right: BinaryTreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  size(): number {
    return (
      1 +
      (this.left ? this.left.size() : 0) +
      (this.right ? this.right.size() : 0)
    );
  }

  height(): number {
    return Math.max(
      this.right ? this.right.height() + 1 : 0,
      this.left ? this.left.height() + 1 : 0
    );
  }

  isLeaf(): boolean {
    return !(this.left || this.right);
  }
}
