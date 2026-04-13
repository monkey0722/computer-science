/**
 * Performs a depth-first search (DFS) traversal on a graph.
 * DFS explores as far as possible along each branch before backtracking.
 *
 * @param {number[][]} graph - An adjacency list representation of the graph.
 * @param {number} start - The starting vertex.
 * @returns {{ visited: number[], predecessors: number[] }}
 *          An object containing the order of visited vertices
 *          and predecessors array for path reconstruction.
 * @throws {Error} If the start vertex is out of range.
 */
export function dfs(
  graph: number[][],
  start: number,
): {
  visited: number[];
  predecessors: number[];
} {
  if (start < 0 || start >= graph.length) {
    throw new Error('Start vertex is out of range');
  }
  const n = graph.length;
  const predecessors: number[] = Array(n).fill(-1);
  const seen: boolean[] = Array(n).fill(false);
  const visited: number[] = [];
  const stack: number[] = [start];
  seen[start] = true;

  while (stack.length > 0) {
    const current = stack.pop()!;
    visited.push(current);

    for (const neighbor of graph[current]) {
      if (!seen[neighbor]) {
        seen[neighbor] = true;
        predecessors[neighbor] = current;
        stack.push(neighbor);
      }
    }
  }

  return {visited, predecessors};
}

/**
 * Performs a recursive depth-first search (DFS) traversal on a graph.
 *
 * @param {number[][]} graph - An adjacency list representation of the graph.
 * @param {number} start - The starting vertex.
 * @returns {{ visited: number[], predecessors: number[] }}
 *          An object containing the order of visited vertices
 *          and predecessors array for path reconstruction.
 * @throws {Error} If the start vertex is out of range.
 */
export function dfsRecursive(
  graph: number[][],
  start: number,
): {
  visited: number[];
  predecessors: number[];
} {
  if (start < 0 || start >= graph.length) {
    throw new Error('Start vertex is out of range');
  }
  const n = graph.length;
  const predecessors: number[] = Array(n).fill(-1);
  const seen: boolean[] = Array(n).fill(false);
  const visited: number[] = [];

  function traverse(vertex: number): void {
    seen[vertex] = true;
    visited.push(vertex);
    for (const neighbor of graph[vertex]) {
      if (!seen[neighbor]) {
        predecessors[neighbor] = vertex;
        traverse(neighbor);
      }
    }
  }

  traverse(start);
  return {visited, predecessors};
}

/**
 * Reconstructs the path from a source vertex to a target vertex
 * using the predecessors array obtained from DFS.
 *
 * @param {number} source - The source vertex.
 * @param {number} target - The target vertex.
 * @param {number[]} predecessors - The predecessors array from DFS.
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

  return path[0] === source ? path : null;
}
