import {Stack} from './stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  test('new stack should be empty', () => {
    expect(stack.isEmpty()).toBe(true);
  });

  test('push should add an item to the stack', () => {
    stack.push(1);
    expect(stack.size()).toBe(1);
  });

  test('push should add items in LIFO order', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
  });

  test('pop should remove the last item', () => {
    stack.push(1);
    stack.push(2);
    const item = stack.pop();
    expect(item).toBe(2);
    expect(stack.size()).toBe(1);
  });

  test('pop should return undefined for an empty stack', () => {
    expect(stack.pop()).toBeUndefined();
  });

  test('peek should return the last item without removing it', () => {
    stack.push(1);
    expect(stack.peek()).toBe(1);
    expect(stack.size()).toBe(1);
  });

  test('size should return the number of items in the stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  });

  test('isEmpty should return false for stack with items', () => {
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });

  test('isFull should return true when stack reaches capacity', () => {
    const limitedStack = new Stack<number>(2);
    limitedStack.push(1);
    limitedStack.push(2);
    expect(limitedStack.isFull()).toBe(true);
  });

  test('push should throw an error when trying to add items beyond capacity', () => {
    const limitedStack = new Stack<number>(1);
    limitedStack.push(1);
    expect(() => {
      limitedStack.push(2);
    }).toThrow('Stack overflow');
  });

  test('clear should remove all items from the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
  });

  test('push performance for 10000 items', () => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      stack.push(i);
    }
    const end = performance.now();
    console.log(`Time taken to push 10000 items: ${end - start}ms`);
    expect(end - start).toBeLessThan(10);
  });
});
