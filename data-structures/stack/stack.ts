import {Node} from '../node';

type Tail<T> = Node<T> | null

export class Stack<T> {
  private tail: Tail<T> = null;
  private length: number = 0;

  isEmpty(): boolean {
    return this.length === 0;
  }

  push(value: T): number {
    const node = new Node(value);
    node.next = this.tail;
    this.tail = node;
    return ++this.length;
  }

  pop(): T | undefined {
    const node = this.tail;
    if (!node) {
      return undefined;
    }
    this.tail = node.next as Tail<T>;
    node.next = null;
    this.length--;
    return node.value;
  }

  peek(): T | undefined {
    return this.tail?.value;
  }

  get size(): number {
    return this.length;
  }
}