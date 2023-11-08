/**
 * Class representing a stack data structure.
 * @template T - The type of elements held in the stack.
 */
export class Stack<T> {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) {}

  /**
   * Adds an element to the top of the stack.
   * @param {T} item - The item to be added to the stack.
   * @throws {Error} if the stack has reached its capacity limit.
   */
  push(item: T): void {
    if (this.size() === this.capacity) {
      throw new Error('Stack overflow');
    }
    this.storage.push(item);
  }

  /**
   * Removes the element from the top of the stack and returns it.
   * @return {T | undefined} The element at the top of the stack or undefined if the stack is empty.
   */
  pop(): T | undefined {
    return this.storage.pop();
  }

  /**
   * Returns the element at the top of the stack without removing it.
   * @return {T | undefined} The element at the top of the stack or undefined if the stack is empty.
   */
  peek(): T | undefined {
    return this.storage[this.size() - 1];
  }

  /**
   * Returns the number of elements in the stack.
   * @return {number} The size of the stack.
   */
  size(): number {
    return this.storage.length;
  }

  /**
   * Checks if the stack is empty.
   * @return {boolean} True if the stack is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Checks if the stack has reached its capacity.
   * @return {boolean} True if the stack is full, false otherwise.
   */
  isFull(): boolean {
    return this.size() === this.capacity;
  }

  /**
   * Empties the stack of all elements.
   */
  clear(): void {
    this.storage = [];
  }
}
