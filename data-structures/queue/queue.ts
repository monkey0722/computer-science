import {Node, DummyHeadNode, DummyTailNode} from '../node';

export class Queue<T> {
  #dummyHead: DummyHeadNode;
  #dummyTail: DummyTailNode;
  #length: number;

  constructor() {
    this.#dummyHead = new DummyHeadNode();
    this.#dummyTail = new DummyTailNode();
    this.#dummyHead.next = this.#dummyTail;
    this.#dummyTail.prev = this.#dummyHead;
    this.#length = 0;
  }

  isEmpty(): boolean {
    return this.#length === 0;
  }

  enqueue(value: T): number {
    const node = new Node(value);
    const prevLast = this.#dummyTail.prev as Node<T> | DummyHeadNode;

    prevLast.next = node;
    node.prev = prevLast;
    node.next = this.#dummyTail;
    this.#dummyTail.prev = node;
    this.#length++;

    return this.#length;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const node = this.#dummyHead.next as Node<T>;
    const newFirst = node.next as Node<T> | DummyTailNode;

    this.#dummyHead.next = newFirst;
    newFirst.prev = this.#dummyHead;
    node.next = null;
    this.#length--;

    return node.value;
  }

  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return (this.#dummyHead.next as Node<T>).value;
  }

  back(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return (this.#dummyTail.prev as Node<T>).value;
  }

  get length(): number {
    return this.#length;
  }
}
