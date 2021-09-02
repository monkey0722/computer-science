import { Node } from "../node";

export class Stack<T> {
  #tail: Node<T> | null;
  #length: number;

  constructor() {
    this.#tail = null;
    this.#length = 0;
  }

  isEmpty(): boolean {
    return this.#length === 0;
  }

  push(value: T): number {
    const node = new Node(value);
    node.next = this.#tail;
    this.#tail = node;
    this.#length++;
    return this.#length;
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const node = this.#tail as Node<T>;
    this.#tail = node.next as Node<T>;
    node.next = null;
    this.#length--;
    return node.value;
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#tail?.value;
  }

  get length(): number {
    return this.#length;
  }
}
