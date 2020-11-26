import { Node, DummyHeadNode, DummyTailNode } from "../node";

export class Queue<T> {
  private _dummyHead: DummyHeadNode;
  private _dummyTail: DummyTailNode;
  private _length: number;

  constructor() {
    this._dummyHead = new DummyHeadNode();
    this._dummyTail = new DummyTailNode();
    this._dummyHead.next = this._dummyTail;
    this._dummyTail.prev = this._dummyHead;
    this._length = 0;
  }

  isEmpty(): boolean {
    return this._length === 0;
  }

  enqueue(value: T): number {
    const node = new Node(value);
    const prevLast = this._dummyTail.prev as Node<T> | DummyHeadNode;

    prevLast.next = node;
    node.prev = prevLast;
    node.next = this._dummyTail;
    this._dummyTail.prev = node;
    this._length++;

    return this._length;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const node = this._dummyHead.next as Node<T>;
    const newFirst = node.next as Node<T> | DummyTailNode;

    this._dummyHead.next = newFirst;
    newFirst.prev = this._dummyHead;
    node.next = null;
    this._length--;

    return node.value;
  }

  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return (this._dummyHead.next as Node<T>).value;
  }

  back(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return (this._dummyTail.prev as Node<T>).value;
  }

  get length(): number {
    return this._length;
  }
}
