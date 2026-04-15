import {CircularQueue} from './circularQueue';

describe('CircularQueue', () => {
  test('should throw an error if constructed with capacity <= 0', () => {
    expect(() => new CircularQueue<number>(0)).toThrow();
    expect(() => new CircularQueue<number>(-1)).toThrow();
  });
  test('should create an empty queue with given capacity', () => {
    const queue = new CircularQueue<number>(5);
    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
    expect(queue.isFull()).toBe(false);
  });
  test('should enqueue items until full', () => {
    const capacity = 3;
    const queue = new CircularQueue<number>(capacity);
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);
    expect(queue.isFull()).toBe(false);
    queue.enqueue(3);
    expect(queue.size()).toBe(capacity);
    expect(queue.isFull()).toBe(true);
  });
  test('should throw error when enqueue on a full queue', () => {
    const capacity = 2;
    const queue = new CircularQueue<number>(capacity);
    queue.enqueue(10);
    queue.enqueue(20);
    expect(() => queue.enqueue(30)).toThrow('Queue is full');
  });
  test('should dequeue items in correct order', () => {
    const queue = new CircularQueue<number>(3);
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    expect(queue.dequeue()).toBe(10);
    expect(queue.dequeue()).toBe(20);
    expect(queue.dequeue()).toBe(30);
    // now queue should be empty
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.isEmpty()).toBe(true);
  });
  test('should allow enqueue/dequeue in a circular manner', () => {
    const queue = new CircularQueue<number>(3);
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.isFull()).toBe(true);
    // remove one element
    expect(queue.dequeue()).toBe(1);
    expect(queue.isFull()).toBe(false);
    // now we can enqueue again
    queue.enqueue(4);
    // queue should be [2,3,4], in circular form
    expect(queue.isFull()).toBe(true);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBe(4);
    expect(queue.isEmpty()).toBe(true);
  });
  test('should return undefined when dequeue on empty queue', () => {
    const queue = new CircularQueue<number>(3);
    expect(queue.dequeue()).toBeUndefined();
  });
  test('should return the front element with peek()', () => {
    const queue = new CircularQueue<string>(3);
    queue.enqueue('apple');
    queue.enqueue('banana');
    expect(queue.peek()).toBe('apple');
    expect(queue.size()).toBe(2);
    expect(queue.dequeue()).toBe('apple');
    expect(queue.peek()).toBe('banana');
  });
  test('should clear all elements', () => {
    const queue = new CircularQueue<number>(4);
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    queue.clear();
    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
    expect(queue.dequeue()).toBeUndefined();
  });
  test('should handle large enqueue/dequeue sequences without performance issues', () => {
    const queue = new CircularQueue<number>(100000);
    const dataSize = 50000;

    for (let i = 0; i < dataSize; i++) {
      queue.enqueue(i);
    }
    expect(queue.size()).toBe(dataSize);

    for (let i = 0; i < dataSize; i++) {
      const item = queue.dequeue();
      expect(item).toBe(i);
    }
    expect(queue.isEmpty()).toBe(true);
  });
});
