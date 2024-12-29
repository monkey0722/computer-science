/**
 * A simple MinHeap data structure for demonstration.
 * @template T - The type of elements stored in the heap.
 */
export class MinHeap<T> {
  private heap: T[];
  private compareFn: (a: T, b: T) => number;

  /**
   * Creates a new MinHeap.
   * @param compareFn - A comparator function that should return a negative number if `a < b`,
   *                    zero if `a === b`, or a positive number if `a > b`.
   */
  constructor(compareFn: (a: T, b: T) => number) {
    this.heap = [];
    this.compareFn = compareFn;
  }

  /**
   * Returns the number of elements in the heap.
   * @returns The number of elements.
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Checks if the heap is empty.
   * @returns True if the heap is empty; otherwise, false.
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Returns the minimum element without removing it.
   * @returns The minimum element, or undefined if the heap is empty.
   */
  peek(): T | undefined {
    return this.heap[0];
  }

  /**
   * Inserts a new element into the heap.
   * @param value - The element to insert.
   */
  insert(value: T): void {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }

  /**
   * Removes and returns the minimum element from the heap.
   * @returns The minimum element, or undefined if the heap is empty.
   */
  extract(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    // The root (index 0) is the minimum element
    const minValue = this.heap[0];
    // Move the last element to the root and pop it from the array
    const lastValue = this.heap.pop();
    // If there's still at least one element left
    if (!this.isEmpty() && lastValue !== undefined) {
      this.heap[0] = lastValue;
      this.siftDown(0);
    }
    return minValue;
  }

  /**
   * Moves the element at 'index' upwards until the min-heap property is satisfied.
   * @param index - The index to sift up from.
   */
  private siftUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      // If the parent is greater than the current element, swap them
      if (this.compareFn(this.heap[parentIndex], this.heap[index]) > 0) {
        this.swap(parentIndex, index);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Moves the element at 'index' downwards until the min-heap property is satisfied.
   * @param index - The index to sift down from.
   */
  private siftDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      const leftIndex = this.getLeftChildIndex(index);
      const rightIndex = this.getRightChildIndex(index);
      let smallest = index;

      // Check if the left child is smaller
      if (leftIndex < length && this.compareFn(this.heap[leftIndex], this.heap[smallest]) < 0) {
        smallest = leftIndex;
      }
      // Check if the right child is even smaller
      if (rightIndex < length && this.compareFn(this.heap[rightIndex], this.heap[smallest]) < 0) {
        smallest = rightIndex;
      }

      // If the current element is not the smallest, swap and continue
      if (smallest !== index) {
        this.swap(index, smallest);
        index = smallest;
      } else {
        break; // The heap property is satisfied
      }
    }
  }

  /**
   * Gets the index of the left child of the node at the given index.
   * @param parentIndex - The index of the parent node.
   * @returns The index of the left child.
   */
  private getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  /**
   * Gets the index of the right child of the node at the given index.
   * @param parentIndex - The index of the parent node.
   * @returns The index of the right child.
   */
  private getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  /**
   * Gets the index of the parent of the node at the given index.
   * @param childIndex - The index of the child node.
   * @returns The index of the parent node.
   */
  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * Swaps the elements at the two given indexes.
   * @param i - The index of the first element.
   * @param j - The index of the second element.
   */
  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
