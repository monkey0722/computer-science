import {Stack} from './stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  test('should create a new stack that is empty', () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
  });
  test('should push an item onto the stack', () => {
    stack.push(1);
    expect(stack.size()).toBe(1);
    expect(stack.peek()).toBe(1);
  });
  test('should push items in LIFO order', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.peek()).toBe(2); // The last pushed item is on top
  });
  test('should pop the top item', () => {
    stack.push(1);
    stack.push(2);
    const popped = stack.pop();
    expect(popped).toBe(2);
    expect(stack.size()).toBe(1);
    expect(stack.peek()).toBe(1);
  });
  test('should return undefined when popping from an empty stack', () => {
    expect(stack.pop()).toBeUndefined();
  });
  test('should peek the top item without removing it', () => {
    stack.push(1);
    const top = stack.peek();
    expect(top).toBe(1);
    expect(stack.size()).toBe(1); // Size unchanged
  });
  test('should return the current size of the stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  });
  test('should push and pop items up to capacity', () => {
    const capacityStack = new Stack<number>(3);
    capacityStack.push(10);
    capacityStack.push(20);
    expect(capacityStack.size()).toBe(2);
    expect(capacityStack.peek()).toBe(20);

    const popped = capacityStack.pop();
    expect(popped).toBe(20);
    expect(capacityStack.peek()).toBe(10);
    expect(capacityStack.size()).toBe(1);
  });
  test('should throw an error when pushing beyond capacity', () => {
    const limitedStack = new Stack<number>(2);
    limitedStack.push(1);
    limitedStack.push(2);
    expect(() => limitedStack.push(3)).toThrow('Stack is full');
  });
  test('should clear the stack', () => {
    const anotherStack = new Stack<number>(5);
    anotherStack.push(10);
    anotherStack.push(20);
    anotherStack.clear();
    expect(anotherStack.isEmpty()).toBe(true);
    expect(anotherStack.peek()).toBeUndefined();
  });
  test('should throw a RangeError if capacity is <= 0', () => {
    expect(() => new Stack<number>(0)).toThrow(RangeError);
    expect(() => new Stack<number>(-1)).toThrow(RangeError);
  });
  test('should push 10000 items efficiently', () => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      stack.push(i);
    }
    const end = performance.now();
    console.log(`Time taken to push 10000 items: ${end - start}ms`);
    expect(end - start).toBeLessThan(100);
  });
});
