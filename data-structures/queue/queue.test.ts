import {Queue} from './queue';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  test('enqueue should add an item to the queue', () => {
    queue.enqueue(1);
    expect(queue.size()).toBe(1);
  });

  test('dequeue should remove and return the first item', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    const item = queue.dequeue();
    expect(item).toBe(1);
    expect(queue.size()).toBe(1);
  });

  test('peek should return the first item without removing it', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    const item = queue.peek();
    expect(item).toBe(1);
    expect(queue.size()).toBe(2);
  });

  test('isEmpty should return true for a new queue', () => {
    expect(queue.isEmpty()).toBeTruthy();
  });

  test('isEmpty should return false for a queue with items', () => {
    queue.enqueue(1);
    expect(queue.isEmpty()).toBeFalsy();
  });

  test('isFull should return false for a new queue', () => {
    expect(queue.isFull()).toBeFalsy();
  });

  test('isFull should return true for a queue that has reached capacity', () => {
    const limitedQueue = new Queue<number>(1);
    limitedQueue.enqueue(1);
    expect(limitedQueue.isFull()).toBeTruthy();
  });

  test('dequeue should return undefined when called on an empty queue', () => {
    const item = queue.dequeue();
    expect(item).toBeUndefined();
  });

  test('enqueue should throw an error when trying to add items beyond capacity', () => {
    const limitedQueue = new Queue<number>(1);
    limitedQueue.enqueue(1);
    expect(() => {
      limitedQueue.enqueue(2);
    }).toThrow('Queue is full');
  });

  test('clear should remove all items from the queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.clear();
    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBeTruthy();
  });

  test('enqueue performance for 10000 items', () => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      queue.enqueue(i);
    }
    const end = performance.now();
    console.log(`Time taken to enqueue 10000 items: ${end - start}ms`);
    expect(end - start).toBeLessThan(100);
  });

  test('dequeue performance for 10000 items', () => {
    for (let i = 0; i < 10000; i++) {
      queue.enqueue(i);
    }

    const start = performance.now();
    while (!queue.isEmpty()) {
      queue.dequeue();
    }
    const end = performance.now();
    console.log(`Time taken to dequeue 10000 items: ${end - start}ms`);
    expect(end - start).toBeLessThan(100);
  });
});
