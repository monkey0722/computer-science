/**
 * Dijkstra's algorithm implementation for finding the shortest path in a weighted graph.
 * The algorithm works with non-negative edge weights only.
 */

interface Edge {
  to: number;
  weight: number;
}

interface DijkstraResult {
  distances: number[];
  predecessors: number[];
}

/**
 * Implements Dijkstra's algorithm to find shortest paths from a source vertex to all other vertices.
 * This implementation uses an adjacency list representation of the graph.
 *
 * @param graph - Adjacency list representation of the graph where graph[i] is an array of edges from vertex i.
 * @param source - The source vertex to start the search from.
 * @returns An object containing the distances array and predecessors array.
 * @throws If any edge has a negative weight.
 */
export function dijkstra(graph: Edge[][], source: number): DijkstraResult {
  const n = graph.length;
  const distances: number[] = Array(n).fill(Infinity);
  distances[source] = 0;

  const predecessors: number[] = Array(n).fill(-1);
  const visited: boolean[] = Array(n).fill(false);

  // Check for negative weights, which are not allowed in Dijkstra's algorithm
  for (const edges of graph) {
    for (const edge of edges) {
      if (edge.weight < 0) {
        throw new Error("Dijkstra's algorithm does not work with negative edge weights");
      }
    }
  }

  for (let i = 0; i < n; i++) {
    const u = minDistanceVertex(distances, visited);
    if (u === -1 || distances[u] === Infinity) {
      break;
    }
    // Mark the picked vertex as visited
    visited[u] = true;
    // Update the distance values of the adjacent vertices
    for (const edge of graph[u]) {
      const v = edge.to;

      // Update if:
      // 1. The vertex v is not visited
      // 2. There is an edge from u to v
      // 3. The total weight of path from source to v through u is smaller than the current value of distances[v]
      if (!visited[v] && distances[u] + edge.weight < distances[v]) {
        distances[v] = distances[u] + edge.weight;
        predecessors[v] = u;
      }
    }
  }
  return {distances, predecessors};
}

/**
 * Helper function to find the vertex with the minimum distance value,
 * from the set of vertices not yet included in the shortest path tree.
 *
 * @param distances - Array of distances from source to each vertex.
 * @param visited - Array indicating which vertices have been visited.
 * @returns The index of the vertex with the minimum distance, or -1 if no unvisited vertices remain.
 */
function minDistanceVertex(distances: number[], visited: boolean[]): number {
  let min = Infinity;
  let minIndex = -1;
  for (let v = 0; v < distances.length; v++) {
    if (!visited[v] && distances[v] <= min) {
      min = distances[v];
      minIndex = v;
    }
  }
  return minIndex;
}

/**
 * Reconstructs the shortest path from a source vertex to a target vertex.
 *
 * @param source - The source vertex.
 * @param target - The target vertex.
 * @param predecessors - Array of predecessor vertices obtained from Dijkstra's algorithm.
 * @returns An array representing the path from source to target, or null if no path exists.
 */
export function reconstructPath(
  source: number,
  target: number,
  predecessors: number[],
): number[] | null {
  if (
    target < 0 ||
    target >= predecessors.length ||
    (predecessors[target] === -1 && source !== target)
  ) {
    return null;
  }

  const path: number[] = [];
  let current = target;

  while (current !== -1) {
    path.unshift(current);
    if (current === source) {
      break;
    }
    current = predecessors[current];
  }
  // Check if the path starts with the source vertex
  return path[0] === source ? path : null;
}
