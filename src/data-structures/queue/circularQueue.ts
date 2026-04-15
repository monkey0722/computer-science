/**
 * A fixed-size queue implemented using a circular buffer.
 * Enqueue and dequeue operations run in O(1) time.
 * @template T The type of elements held in the queue.
 */
export class CircularQueue<T> {
  private buffer: Array<T | null>;
  private head: number;
  private tail: number;
  private count: number;
  private readonly capacity: number;

  /**
   * Creates a new circular queue with the specified capacity.
   * @param {number} capacity - The maximum number of elements this queue can hold.
   */
  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error('Capacity must be greater than 0');
    }
    this.capacity = capacity;
    this.buffer = new Array<T | null>(capacity).fill(null);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  /**
   * Returns the current number of elements in the queue.
   * @return {number} The size of the queue.
   */
  size(): number {
    return this.count;
  }

  /**
   * Checks if the queue is empty.
   * @return {boolean} True if the queue is empty; otherwise, false.
   */
  isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Checks if the queue is full (i.e. has reached its capacity).
   * @return {boolean} True if the queue is full; otherwise, false.
   */
  isFull(): boolean {
    return this.count === this.capacity;
  }

  /**
   * Adds an element to the back of the queue in O(1) time.
   * @param {T} item - The element to be enqueued.
   * @throws {Error} If the queue is already full.
   */
  enqueue(item: T): void {
    if (this.isFull()) {
      throw new Error('Queue is full');
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this.count++;
  }

  /**
   * Removes and returns the front element of the queue in O(1) time.
   * @return {T | undefined} The front element, or undefined if the queue is empty.
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const frontItem = this.buffer[this.head] as T;
    this.buffer[this.head] = null; // not strictly required, but can help with debugging/garbage collection
    this.head = (this.head + 1) % this.capacity;
    this.count--;
    return frontItem;
  }

  /**
   * Returns the front element without removing it.
   * @return {T | undefined} The front element, or undefined if the queue is empty.
   */
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.buffer[this.head] as T;
  }

  /**
   * Removes all elements from the queue.
   */
  clear(): void {
    this.buffer.fill(null);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }
}
