/**
 * Implementation of Topological Sort algorithm.
 *
 * Topological Sort is an algorithm used to linearly order the vertices of a directed graph
 * such that for every directed edge (u, v), vertex u comes before vertex v in the ordering.
 *
 * This algorithm only works on Directed Acyclic Graphs (DAGs).
 * If the graph contains a cycle, no valid topological sort exists.
 */

const VertexState = {
  UNVISITED: 0,
  VISITING: 1,
  VISITED: 2,
} as const;

type VertexState = (typeof VertexState)[keyof typeof VertexState];

/**
 * Performs a topological sort on a directed graph represented as an adjacency list.
 *
 * @param graph - Adjacency list representation of the graph where graph[i] contains
 *                the vertices that vertex i has edges to.
 * @returns An array of vertices in topological order, or null if the graph contains a cycle.
 */
export function topologicalSort(graph: number[][]): number[] | null {
  const n = graph.length;
  const state: VertexState[] = Array(n).fill(VertexState.UNVISITED);
  const result: number[] = [];

  const dfs = (vertex: number): boolean => {
    if (state[vertex] === VertexState.VISITING) {
      return false;
    }

    // If vertex is already visited, no need to process it again
    if (state[vertex] === VertexState.VISITED) {
      return true;
    }

    state[vertex] = VertexState.VISITING;

    for (const neighbor of graph[vertex]) {
      if (!dfs(neighbor)) {
        return false;
      }
    }
    state[vertex] = VertexState.VISITED;
    result.unshift(vertex);
    return true;
  };

  // Try to visit each unvisited vertex
  for (let i = 0; i < n; i++) {
    if (state[i] === VertexState.UNVISITED) {
      if (!dfs(i)) {
        return null;
      }
    }
  }
  return result;
}
