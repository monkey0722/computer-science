import {Stack} from './stack';

describe('Stack', () => {
  test('constructor initializes an empty stack', () => {
    const stack = new Stack<number>();
    expect(stack).toBeTruthy();
    expect(stack.size).toBe(0);
  });

  test('length is maintained correctly', () => {
    const stack = new Stack<number>();
    expect(stack.size).toBe(0);
    stack.push(100);
    expect(stack.size).toBe(1);
    stack.push(200);
    expect(stack.size).toBe(2);
    stack.pop();
    expect(stack.size).toBe(1);
    stack.push(300);
    expect(stack.size).toBe(2);
  });

  test('push adds elements to the stack', () => {
    const stack = new Stack<number>();
    stack.push(100);
    expect(stack.peek()).toBe(100);
    stack.push(200);
    expect(stack.peek()).toBe(200);
    expect(stack.size).toBe(2);
  });

  test('pop returns and removes the last element', () => {
    const stack = new Stack<number>();
    stack.push(100);
    stack.push(200);
    expect(stack.pop()).toBe(200);
    expect(stack.size).toBe(1);
    expect(stack.pop()).toBe(100);
    expect(stack.size).toBe(0);
    expect(stack.pop()).toBe(undefined);
  });

  test('pop works correctly with objects', () => {
    const stack = new Stack<object>();
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    stack.push(obj1);
    stack.push(obj2);
    expect(stack.pop()).toBe(obj2);
    expect(stack.pop()).toBe(obj1);
  });

  test('isEmpty indicates if the stack is empty', () => {
    const stack = new Stack<number>();
    expect(stack.isEmpty()).toBe(true);
    stack.push(100);
    expect(stack.isEmpty()).toBe(false);
    stack.pop();
    expect(stack.isEmpty()).toBe(true);
  });

  test('peek returns the last element without removing it', () => {
    const stack = new Stack<number>();
    expect(stack.peek()).toBe(undefined);
    stack.push(100);
    expect(stack.peek()).toBe(100);
    stack.push(200);
    expect(stack.peek()).toBe(200);
    stack.pop();
    expect(stack.peek()).toBe(100);
  });

  test('handles large amounts of data', () => {
    const stack = new Stack<number>();
    const n = 10000;
    for (let i = 0; i < n; i++) {
      stack.push(i);
    }
    expect(stack.size).toBe(n);
    for (let i = n - 1; i >= 0; i--) {
      expect(stack.pop()).toBe(i);
    }
    expect(stack.isEmpty()).toBe(true);
  });

  test('stack handles different types when using generics', () => {
    const numberStack = new Stack<number>();
    numberStack.push(1);
    expect(numberStack.peek()).toBe(1);

    const stringStack = new Stack<string>();
    stringStack.push('test');
    expect(stringStack.peek()).toBe('test');
  });
});
