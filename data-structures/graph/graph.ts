export class Graph<T, V> {
  private nodes: Map<
    T,
    {
      to: Map<T, V>;
      from: Set<T>;
    }
  >;

  constructor() {
    this.nodes = new Map();
  }

  private getIncomingNodes(value: T): ReadonlyArray<T> {
    const incoming = this.nodes.get(value)?.from;
    return Array.from(incoming != null ? incoming : []);
  }

  addNode(value: T): this {
    if (this.nodes.has(value)) {
      return this;
    }

    this.nodes.set(value, {
      to: new Map<T, V>(),
      from: new Set<T>(),
    });

    return this;
  }

  removeNode(value: T): this {
    const incoming = this.getIncomingNodes(value);
    incoming.forEach((incomingNode) => {
      this.removeEdge(incomingNode, value);
    });

    this.nodes.delete(value);
    return this;
  }

  get size(): number {
    return this.nodes.size;
  }

  addEdge(valueA: T, valueB: T, weight: V): this {
    this.addNode(valueA);
    this.addNode(valueB);
    const nodeA = this.nodes.get(valueA);
    (nodeA?.to as Map<T, V>).set(valueB, weight);
    (this.nodes.get(valueB)?.from as Set<T>).add(valueA);
    return this;
  }

  removeEdge(valueA: T, valueB: T): this {
    const nodeA = this.nodes.get(valueA)?.to;
    if (nodeA == null) {
      return this;
    }
    nodeA.delete(valueB);

    (this.nodes.get(valueB)?.from as Set<T>).delete(valueA);
    return this;
  }

  getEdgeWeight(valueA: T, valueB: T): V | undefined {
    const nodeA = this.nodes.get(valueA)?.to;
    if (nodeA == null) {
      return undefined;
    }

    return nodeA.get(valueB);
  }

  getNeighbors(value: T): ReadonlyArray<T> {
    const neighbors = this.nodes.get(value)?.to;
    return Array.from(neighbors != null ? neighbors.keys() : []);
  }

  isAdjacent(valueA: T, valueB: T): boolean {
    const neighbors = this.getNeighbors(valueA);
    return neighbors.includes(valueB);
  }
}
