/**
 * Performs a breadth-first search (BFS) traversal on a graph.
 * BFS explores all vertices at the current level before moving to vertices at the next level.
 *
 * @param {number[][]} graph - An adjacency list representation of the graph.
 * @param {number} start - The starting vertex.
 * @returns {{ distances: number[], predecessors: number[] }}
 *          An object containing distances from the start vertex to all other vertices,
 *          and predecessors array for path reconstruction.
 * @throws {Error} If the start vertex is out of range.
 */
export function bfs(
  graph: number[][],
  start: number,
): {
  distances: number[];
  predecessors: number[];
} {
  if (start < 0 || start >= graph.length) {
    throw new Error('Start vertex is out of range');
  }
  const n = graph.length;
  const distances: number[] = Array(n).fill(Infinity);
  const predecessors: number[] = Array(n).fill(-1);
  const visited: boolean[] = Array(n).fill(false);
  // Initialize the queue with the start vertex
  const queue: number[] = [start];
  distances[start] = 0;
  visited[start] = true;

  while (queue.length > 0) {
    const current = queue.shift()!;
    // Visit all adjacent vertices
    for (const neighbor of graph[current]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        distances[neighbor] = distances[current] + 1;
        predecessors[neighbor] = current;
        queue.push(neighbor);
      }
    }
  }

  return {distances, predecessors};
}

/**
 * Reconstructs the shortest path from a source vertex to a target vertex
 * using the predecessors array obtained from BFS.
 *
 * @param {number} source - The source vertex.
 * @param {number} target - The target vertex.
 * @param {number[]} predecessors - The predecessors array from BFS.
 * @returns {number[] | null} The path from source to target, or null if no path exists.
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
