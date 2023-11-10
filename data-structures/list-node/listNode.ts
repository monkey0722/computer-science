/**
 * Class representing a single node in a linked list.
 * @template T - The type of the value.
 */
export class ListNode<T> {
  public value: T;
  public next: ListNode<T> | null = null;

  /**
   * Creates a list node.
   * @param {T} value - The value stored in the node.
   */
  constructor(value: T) {
    this.value = value;
  }
}
