/**
 * Class representing a queue data structure.
 * @template T - The type of elements held in the queue.
 */
export class Queue<T> {
  private storage: T[] = [];
  constructor(private capacity: number = Infinity) {}

  /**
   * Adds an element to the back of the queue.
   * @param {T} item - The item to be added to the queue.
   * @throws {Error} if the queue has reached its capacity limit.
   */
  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error('Queue is full');
    }
    this.storage.push(item);
  }

  /**
   * Removes the element from the front of the queue and returns it.
   * @return {T | undefined} The element at the front of the queue or undefined if the queue is empty.
   */
  dequeue(): T | undefined {
    return this.storage.shift();
  }

  /**
   * Returns the number of elements in the queue.
   * @return {number} The size of the queue.
   */
  size(): number {
    return this.storage.length;
  }

  /**
   * Checks if the queue is empty.
   * @return {boolean} True if the queue is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Checks if the queue has reached its capacity.
   * @return {boolean} True if the queue is full, false otherwise.
   */
  isFull(): boolean {
    return this.size() === this.capacity;
  }

  /**
   * Returns the element at the front of the queue without removing it.
   * @return {T | undefined} The element at the front of the queue or undefined if the queue is empty.
   */
  peek(): T | undefined {
    return this.storage[0];
  }

  /**
   * Empties the queue of all elements.
   */
  clear(): void {
    this.storage = [];
  }
}
