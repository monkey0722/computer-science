interface Edge {
  source: number;
  target: number;
  weight: number;
}

export class BellmanFord {
  /**
   * Finds the shortest paths from the source vertex to all other vertices.
   * Detects negative weight cycles and returns `null` if any are found.
   *
   * @param {number} vertices - The total number of vertices in the graph.
   * @param {Edge[]} edges - A list of edges in the graph, each containing source, target, and weight.
   * @param {number} source - The starting vertex.
   * @returns {number[] | null} - An array of shortest distances to each vertex from the source, or `null` if a negative weight cycle exists.
   * @throws {Error} If the input parameters are invalid.
   */
  static findShortestPaths(vertices: number, edges: Edge[], source: number): number[] | null {
    // Validate input
    this.validateInput(vertices, edges, source);

    // Initialize distances
    const distances = new Array(vertices).fill(Infinity);
    distances[source] = 0;

    // Relax all edges (V-1) times
    for (let i = 0; i < vertices - 1; i++) {
      for (const edge of edges) {
        if (
          distances[edge.source] !== Infinity &&
          distances[edge.source] + edge.weight < distances[edge.target]
        ) {
          distances[edge.target] = distances[edge.source] + edge.weight;
        }
      }
    }

    // Detect negative weight cycles
    if (this.hasNegativeCycle(edges, distances)) {
      return null;
    }

    return distances;
  }

  /**
   * Reconstructs the shortest path from the source to the target vertex.
   * Detects negative weight cycles and returns `null` if any are found.
   *
   * @param {number} vertices - The total number of vertices in the graph.
   * @param {Edge[]} edges - A list of edges in the graph, each containing source, target, and weight.
   * @param {number} source - The starting vertex.
   * @param {number} target - The destination vertex.
   * @returns {number[] | null} - An array representing the path from the source to the target, or `null` if no path exists or a negative weight cycle is detected.
   * @throws {Error} If the input parameters are invalid.
   */
  static reconstructPath(
    vertices: number,
    edges: Edge[],
    source: number,
    target: number,
  ): number[] | null {
    // Validate input
    this.validateInput(vertices, edges, source);

    const distances = new Array(vertices).fill(Infinity);
    const predecessor = new Array(vertices).fill(-1);
    distances[source] = 0;

    // Relax all edges (V-1) times
    for (let i = 0; i < vertices - 1; i++) {
      for (const edge of edges) {
        if (
          distances[edge.source] !== Infinity &&
          distances[edge.source] + edge.weight < distances[edge.target]
        ) {
          distances[edge.target] = distances[edge.source] + edge.weight;
          predecessor[edge.target] = edge.source;
        }
      }
    }

    // Detect negative weight cycles
    if (this.hasNegativeCycle(edges, distances)) {
      return null;
    }

    // Reconstruct the path
    const path: number[] = [];
    let current = target;

    while (current !== -1) {
      path.unshift(current);
      current = predecessor[current];
    }

    // Ensure the path starts from the source
    return path[0] === source && distances[target] !== Infinity ? path : null;
  }

  /**
   * Checks if a negative weight cycle exists in the graph.
   *
   * @private
   * @param {Edge[]} edges - A list of edges in the graph.
   * @param {number[]} distances - The current distances to each vertex.
   * @returns {boolean} - `true` if a negative weight cycle exists, otherwise `false`.
   */
  private static hasNegativeCycle(edges: Edge[], distances: number[]): boolean {
    for (const edge of edges) {
      if (
        distances[edge.source] !== Infinity &&
        distances[edge.source] + edge.weight < distances[edge.target]
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * Validates the input parameters for the algorithm.
   *
   * @private
   * @param {number} vertices - The total number of vertices in the graph.
   * @param {Edge[]} edges - A list of edges in the graph.
   * @param {number} source - The starting vertex.
   * @throws {Error} If the input parameters are invalid.
   */
  private static validateInput(vertices: number, edges: Edge[], source: number): void {
    if (vertices <= 0) {
      throw new Error('Number of vertices must be positive');
    }
    if (source < 0 || source >= vertices) {
      throw new Error('Source vertex is out of bounds');
    }
    for (const edge of edges) {
      if (
        edge.source < 0 ||
        edge.source >= vertices ||
        edge.target < 0 ||
        edge.target >= vertices
      ) {
        throw new Error('Edge contains an invalid vertex');
      }
    }
  }
}
