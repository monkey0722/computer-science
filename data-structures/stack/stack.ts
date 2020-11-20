import { Node } from "../node";

export class Stack<T> {
  private _tail: Node<T> | null;
  private _length: number;

  constructor() {
    this._tail = null;
    this._length = 0;
  }

  isEmpty(): boolean {
    return this._length === 0;
  }

  push(value: T): number {
    const node = new Node(value);
    node.next = this._tail;
    this._tail = node;
    this._length++;
    return this._length;
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const node = this._tail as Node<T>;
    this._tail = node.next as Node<T>;
    node.next = null;
    this._length--;
    return node.value;
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return (this._tail as Node<T>).value;
  }

  get length(): number {
    return this._length;
  }
}
