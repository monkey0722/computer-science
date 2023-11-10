import {ListNode} from './listNode';

/**
 * Class representing a singly linked list.
 * @template T - The type of elements in the linked list.
 */
export class LinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  private _length: number = 0;

  /**
   * Gets the number of nodes in the linked list.
   * @return {number} The number of nodes.
   */
  get length(): number {
    return this._length;
  }

  /**
   * Appends a new node with the given value to the end of the list.
   * @param {T} value - The value to append.
   * @return {LinkedList<T>} The linked list.
   */
  append(value: T): LinkedList<T> {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
    }
    this._length++;
    return this;
  }

  /**
   * Prepends a new node with the given value to the start of the list.
   * @param {T} value - The value to prepend.
   * @return {LinkedList<T>} The linked list.
   */
  prepend(value: T): LinkedList<T> {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this._length++;
    return this;
  }

  /**
   * Deletes the first node with the given value from the list.
   * @param {T} value - The value to delete.
   */
  delete(value: T): void {
    if (!this.head) return;

    if (this.head.value === value) {
      this.head = this.head.next;
      if (this.head === this.tail) {
        this.tail = null;
      }
      this._length--;
      return;
    }

    let currentNode = this.head;
    while (currentNode.next) {
      if (currentNode.next.value === value) {
        currentNode.next = currentNode.next.next;
        if (currentNode.next === null) {
          this.tail = currentNode;
        }
        this._length--;
        return;
      }
      currentNode = currentNode.next;
    }
  }

  /**
   * Finds and returns the first node with the given value.
   * @param {T} value - The value to find.
   * @return {ListNode<T> | null} The found node or null if not found.
   */
  find(value: T): ListNode<T> | null {
    if (!this.head) return null;

    let currentNode: ListNode<T> | null = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * Converts the linked list to an array of its values.
   * @return {T[]} Array of the list's values.
   */
  toArray(): T[] {
    const elements: T[] = [];
    let currentNode = this.head;
    while (currentNode) {
      elements.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return elements;
  }
}
