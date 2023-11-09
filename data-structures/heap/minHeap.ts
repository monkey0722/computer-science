/**
 * Represents a min heap data structure.
 * @template T The type of elements in the heap.
 */
export class MinHeap<T> {
  private heap: T[];
  private compareFn: (a: T, b: T) => number;

  constructor(compareFn: (a: T, b: T) => number) {
    this.heap = [];
    this.compareFn = compareFn;
  }

  /**
   * Gets the index of the left child of the node at the given index.
   * @param {number} parentIndex The index of the parent node.
   * @return {number} The index of the left child.
   */
  private getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  /**
   * Gets the index of the right child of the node at the given index.
   * @param {number} parentIndex The index of the parent node.
   * @return {number} The index of the right child.
   */
  priva;
  private getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  /**
   * Gets the index of the parent of the node at the given index.
   * @param {number} childIndex The index of the child node.
   * @return {number} The index of the parent node.
   */
  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * Swaps the elements at the two given indexes.
   * @param {number} index1 The index of the first element.
   * @param {number} index2 The index of the second element.
   */
  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  /**
   * Restores the min heap property by sifting the element at the end of the heap upwards.
   */
  private siftUp(): void {
    let index = this.heap.length - 1;
    while (
      index > 0 &&
      this.compareFn(this.heap[this.getParentIndex(index)], this.heap[index]) >
        0
    ) {
      const parentIndex = this.getParentIndex(index);
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  /**
   * Restores the min heap property by sifting the element at the root of the heap downwards.
   */
  private siftDown(): void {
    let index = 0;
    let smallerChildIndex = this.getLeftChildIndex(index);

    while (
      smallerChildIndex < this.heap.length &&
      this.compareFn(this.heap[index], this.heap[smallerChildIndex]) > 0
    ) {
      const rightChildIndex = this.getRightChildIndex(index);
      if (
        rightChildIndex < this.heap.length &&
        this.compareFn(
          this.heap[rightChildIndex],
          this.heap[smallerChildIndex]
        ) < 0
      ) {
        smallerChildIndex = rightChildIndex;
      }

      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
      smallerChildIndex = this.getLeftChildIndex(index);
    }
  }

  /**
   * Inserts a new element into the heap.
   * @param {T} value The element to insert.
   */
  insert(value: T): void {
    this.heap.push(value);
    this.siftUp();
  }

  /**
   * Extracts and returns the minimum element from the heap.
   * @return {T | undefined} The minimum element or undefined if the heap is empty.
   */
  extract(): T | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    const minValue = this.heap[0];
    const lastValue = this.heap.pop();
    if (this.heap.length > 0 && lastValue !== undefined) {
      this.heap[0] = lastValue;
      this.siftDown();
    }
    return minValue;
  }

  /**
   * Returns the minimum element from the heap without removing it.
   * @return {T | undefined} The minimum element or undefined if the heap is empty.
   */
  peek(): T | undefined {
    return this.heap[0];
  }

  /**
   * Returns the number of elements in the heap.
   * @return {number} The number of elements.
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Determines whether the heap is empty.
   * @return {boolean} True if the heap is empty; otherwise, false.
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }
}
