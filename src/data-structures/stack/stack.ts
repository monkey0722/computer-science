/**
 * Represents a stack data structure with an optional capacity limit.
 * @template T - The type of elements held in the stack.
 */
export class Stack<T> {
  private storage: T[] = [];
  private readonly capacity: number;

  /**
   * Creates a new stack.
   * @param capacity - The maximum number of items the stack can hold (default: Infinity).
   * @throws {RangeError} if capacity <= 0.
   */
  constructor(capacity: number = Infinity) {
    if (capacity <= 0) {
      throw new RangeError('Stack capacity must be greater than 0.');
    }
    this.capacity = capacity;
  }

  /**
   * Adds an element to the top of the stack.
   * @param item - The item to be added.
   * @throws {Error} if the stack has reached its capacity limit.
   */
  push(item: T): void {
    if (this.size() === this.capacity) {
      throw new Error('Stack is full');
    }
    this.storage.push(item);
  }

  /**
   * Removes the element from the top of the stack and returns it.
   * @returns The popped element, or undefined if the stack is empty.
   */
  pop(): T | undefined {
    return this.storage.pop();
  }

  /**
   * Returns the element at the top of the stack without removing it.
   * @returns The top element, or undefined if the stack is empty.
   */
  peek(): T | undefined {
    return this.storage[this.storage.length - 1];
  }

  /**
   * Returns the number of elements in the stack.
   * @returns The size of the stack.
   */
  size(): number {
    return this.storage.length;
  }

  /**
   * Checks if the stack is empty.
   * @returns True if the stack is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.storage.length === 0;
  }

  /**
   * Checks if the stack has reached its capacity limit.
   * @returns True if the stack is full, false otherwise.
   */
  isFull(): boolean {
    return this.size() === this.capacity;
  }

  /**
   * Removes all elements from the stack.
   */
  clear(): void {
    this.storage = [];
  }
}
