/**
 * Class representing a generic weighted graph.
 * @template T - The type of the nodes in the graph.
 * @template V - The type of the weights associated with the edges.
 */
export class Graph<T, V> {
  private nodes: Map<T, Map<T, V>>;

  constructor() {
    this.nodes = new Map();
  }

  /**
   * Adds a new node to the graph.
   * @param value - The node value to add.
   * @returns The instance of the graph for chaining.
   */
  addNode(value: T): this {
    if (!this.nodes.has(value)) {
      this.nodes.set(value, new Map());
    }
    return this;
  }

  /**
   * Removes a node and all its associated edges from the graph.
   * @param value - The node value to remove.
   * @returns The instance of the graph for chaining.
   */
  removeNode(value: T): this {
    if (this.nodes.has(value)) {
      for (const [, edges] of this.nodes.entries()) {
        edges.delete(value);
      }
      this.nodes.delete(value);
    }
    return this;
  }

  /**
   * Adds an edge between two nodes in the graph with an associated weight.
   * @param from - The starting node.
   * @param to - The ending node.
   * @param weight - The weight of the edge.
   * @returns The instance of the graph for chaining.
   */
  addEdge(from: T, to: T, weight: V): this {
    if (!this.nodes.has(from)) {
      this.addNode(from);
    }
    if (!this.nodes.has(to)) {
      this.addNode(to);
    }
    this.nodes.get(from)!.set(to, weight);
    return this;
  }

  /**
   * Removes an edge between two nodes in the graph.
   * @param from - The starting node.
   * @param to - The ending node.
   * @returns The instance of the graph for chaining.
   */
  removeEdge(from: T, to: T): this {
    this.nodes.get(from)?.delete(to);
    return this;
  }

  /**
   * Gets the weight of the edge between two nodes.
   * @param from - The starting node.
   * @param to - The ending node.
   * @returns The weight of the edge, or undefined if the edge does not exist.
   */
  getEdgeWeight(from: T, to: T): V | undefined {
    return this.nodes.get(from)?.get(to);
  }

  /**
   * Gets all neighbors connected to a given node.
   * @param value - The node to get the neighbors of.
   * @returns An array of neighbors.
   */
  getNeighbors(value: T): T[] {
    return Array.from(this.nodes.get(value)?.keys() || []);
  }

  /**
   * Determines whether two nodes are adjacent.
   * @param from - The first node.
   * @param to - The second node.
   * @returns True if there is an edge from the first node to the second, false otherwise.
   */
  isAdjacent(from: T, to: T): boolean {
    return this.nodes.get(from)?.has(to) ?? false;
  }

  /**
   * Gets the total number of nodes in the graph.
   * @returns The number of nodes.
   */
  get size(): number {
    return this.nodes.size;
  }
}
