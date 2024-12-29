import {MinHeap} from './minHeap';

describe('MinHeap', () => {
  let heap: MinHeap<number>;

  beforeEach(() => {
    heap = new MinHeap<number>((a, b) => a - b);
  });

  test('should create an empty heap', () => {
    expect(heap.size()).toBe(0);
    expect(heap.isEmpty()).toBe(true);
  });
  test('should insert elements into the heap', () => {
    heap.insert(2);
    expect(heap.size()).toBe(1);
    expect(heap.peek()).toBe(2);

    heap.insert(3);
    expect(heap.size()).toBe(2);
    expect(heap.peek()).toBe(2);

    heap.insert(1);
    expect(heap.size()).toBe(3);
    expect(heap.peek()).toBe(1);
  });
  test('should extract the minimum element from the heap', () => {
    heap.insert(2);
    heap.insert(3);
    heap.insert(1);

    expect(heap.extract()).toBe(1);
    expect(heap.size()).toBe(2);

    expect(heap.extract()).toBe(2);
    expect(heap.size()).toBe(1);

    expect(heap.extract()).toBe(3);
    expect(heap.size()).toBe(0);
    expect(heap.isEmpty()).toBe(true);
  });
  test('should handle extract on an empty heap', () => {
    expect(heap.extract()).toBeUndefined();
  });
});

describe('MinHeap with large data set', () => {
  let heap: MinHeap<number>;
  const largeSize = 100000;

  beforeEach(() => {
    heap = new MinHeap<number>((a, b) => a - b);
  });

  test('should maintain heap property on extract', () => {
    let previous = heap.extract();
    for (let i = 1; i < largeSize; i++) {
      const current = heap.extract();
      if (typeof current === 'number' && typeof previous === 'number') {
        expect(current).toBeGreaterThanOrEqual(previous);
        previous = current;
      }
    }
    expect(heap.isEmpty()).toBe(true);
  });
  test('should handle insert and extract operations efficiently', () => {
    const start = performance.now();
    while (!heap.isEmpty()) {
      heap.extract();
    }
    const end = performance.now();
    const timeTaken = end - start;
    console.log(`Time taken to extract ${largeSize} elements: ${timeTaken}ms`);
    expect(timeTaken).toBeLessThan(10000);
  });
});
