/**
 * A* Search algorithm implementation for finding the shortest path in a weighted graph.
 * A* uses a heuristic function to guide the search towards the goal more efficiently than Dijkstra.
 */

interface Edge {
  to: number;
  weight: number;
}

interface AStarResult {
  path: number[] | null;
  distance: number;
}

/**
 * Implements the A* search algorithm to find the shortest path from source to goal.
 *
 * @param graph - Adjacency list representation of the graph where graph[i] is an array of edges from vertex i.
 * @param source - The source vertex to start the search from.
 * @param goal - The goal vertex to reach.
 * @param heuristic - A function that estimates the distance from a vertex to the goal. Must be admissible (never overestimate).
 * @returns An object containing the path array and the total distance, or null path if no path exists.
 */
export function aStar(
  graph: Edge[][],
  source: number,
  goal: number,
  heuristic: (vertex: number) => number,
): AStarResult {
  const n = graph.length;

  if (source < 0 || source >= n || goal < 0 || goal >= n) {
    return {path: null, distance: Infinity};
  }

  // g[n] = actual cost from source to n
  const gScore: number[] = Array(n).fill(Infinity);
  gScore[source] = 0;

  // f[n] = g[n] + h[n] (estimated total cost)
  const fScore: number[] = Array(n).fill(Infinity);
  fScore[source] = heuristic(source);

  const predecessors: number[] = Array(n).fill(-1);
  const closedSet: boolean[] = Array(n).fill(false);
  const openSet: boolean[] = Array(n).fill(false);
  openSet[source] = true;

  while (hasOpenNodes(openSet)) {
    // Find node in openSet with lowest fScore
    const current = getLowestFScore(openSet, fScore);

    if (current === goal) {
      return {
        path: reconstructPath(source, goal, predecessors),
        distance: gScore[goal],
      };
    }

    openSet[current] = false;
    closedSet[current] = true;

    for (const edge of graph[current]) {
      const neighbor = edge.to;

      if (closedSet[neighbor]) {
        continue;
      }

      const tentativeGScore = gScore[current] + edge.weight;

      if (!openSet[neighbor]) {
        openSet[neighbor] = true;
      } else if (tentativeGScore >= gScore[neighbor]) {
        continue;
      }

      // This path is the best so far
      predecessors[neighbor] = current;
      gScore[neighbor] = tentativeGScore;
      fScore[neighbor] = gScore[neighbor] + heuristic(neighbor);
    }
  }

  // No path found
  return {path: null, distance: Infinity};
}

/**
 * Checks if there are any nodes in the open set.
 */
function hasOpenNodes(openSet: boolean[]): boolean {
  return openSet.some((isOpen) => isOpen);
}

/**
 * Finds the node in the open set with the lowest f score.
 */
function getLowestFScore(openSet: boolean[], fScore: number[]): number {
  let minScore = Infinity;
  let minIndex = -1;

  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i] && fScore[i] < minScore) {
      minScore = fScore[i];
      minIndex = i;
    }
  }

  return minIndex;
}

/**
 * Reconstructs the path from source to goal using the predecessors array.
 */
function reconstructPath(source: number, goal: number, predecessors: number[]): number[] {
  const path: number[] = [];
  let current = goal;

  while (current !== -1) {
    path.unshift(current);
    if (current === source) {
      break;
    }
    current = predecessors[current];
  }

  return path[0] === source ? path : [];
}

/**
 * Creates a Manhattan distance heuristic for grid-based pathfinding.
 * Assumes vertices are numbered row by row in a grid.
 *
 * @param goalX - The x coordinate of the goal.
 * @param goalY - The y coordinate of the goal.
 * @param gridWidth - The width of the grid.
 * @returns A heuristic function that calculates Manhattan distance to the goal.
 */
export function createManhattanHeuristic(
  goalX: number,
  goalY: number,
  gridWidth: number,
): (vertex: number) => number {
  return (vertex: number): number => {
    const x = vertex % gridWidth;
    const y = Math.floor(vertex / gridWidth);
    return Math.abs(x - goalX) + Math.abs(y - goalY);
  };
}

/**
 * Creates a Euclidean distance heuristic for grid-based pathfinding.
 *
 * @param goalX - The x coordinate of the goal.
 * @param goalY - The y coordinate of the goal.
 * @param gridWidth - The width of the grid.
 * @returns A heuristic function that calculates Euclidean distance to the goal.
 */
export function createEuclideanHeuristic(
  goalX: number,
  goalY: number,
  gridWidth: number,
): (vertex: number) => number {
  return (vertex: number): number => {
    const x = vertex % gridWidth;
    const y = Math.floor(vertex / gridWidth);
    return Math.sqrt((x - goalX) ** 2 + (y - goalY) ** 2);
  };
}
