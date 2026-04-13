import {dfs, dfsRecursive, reconstructPath} from './dfs';

describe('DFS Algorithm (Iterative)', () => {
  test('should traverse a simple graph', () => {
    const graph = [
      [1, 2], // Edges from vertex 0
      [0, 3, 4], // Edges from vertex 1
      [0, 5], // Edges from vertex 2
      [1], // Edges from vertex 3
      [1], // Edges from vertex 4
      [2], // Edges from vertex 5
    ];
    const {visited, predecessors} = dfs(graph, 0);
    // Iterative DFS uses a stack (LIFO), so the last neighbor pushed
    // is visited first — yielding a different order from recursive DFS.
    expect(visited).toEqual([0, 2, 5, 1, 4, 3]);
    expect(predecessors[0]).toBe(-1);
  });

  test('should handle disconnected graph', () => {
    const graph = [
      [1], // Edges from vertex 0
      [0], // Edges from vertex 1
      [3], // Edges from vertex 2
      [2], // Edges from vertex 3
      [], // Edges from vertex 4 (isolated)
    ];
    const {visited, predecessors} = dfs(graph, 0);
    expect(visited).toEqual([0, 1]);
    expect(predecessors[1]).toBe(0);
    expect(predecessors[2]).toBe(-1);
    expect(predecessors[3]).toBe(-1);
    expect(predecessors[4]).toBe(-1);
  });

  test('should throw error for invalid start vertex', () => {
    const graph = [[1, 2], [0], [0]];
    expect(() => dfs(graph, -1)).toThrow('Start vertex is out of range');
    expect(() => dfs(graph, 3)).toThrow('Start vertex is out of range');
  });

  test('should handle a graph with a single vertex', () => {
    const graph = [[]];
    const {visited, predecessors} = dfs(graph, 0);
    expect(visited).toEqual([0]);
    expect(predecessors).toEqual([-1]);
  });

  test('should handle cyclic graphs correctly', () => {
    const graph = [
      [1, 2], // Edges from vertex 0
      [0, 2], // Edges from vertex 1
      [0, 1], // Edges from vertex 2
    ];
    const {visited} = dfs(graph, 0);
    expect(visited.length).toBe(3);
    expect(new Set(visited).size).toBe(3);
    expect(visited[0]).toBe(0);
  });

  test('should handle large graphs efficiently', () => {
    const largeGraph: number[][] = Array(1000)
      .fill(0)
      .map((_, i) => {
        if (i === 0) return [1];
        if (i === 999) return [998];
        return [i - 1, i + 1];
      });

    const startTime = performance.now();
    const {visited} = dfs(largeGraph, 0);
    const endTime = performance.now();

    expect(visited.length).toBe(1000);
    expect(visited[0]).toBe(0);
    expect(endTime - startTime).toBeLessThan(1000);
  });
});

describe('DFS Algorithm (Recursive)', () => {
  test('should traverse a simple graph in depth-first order', () => {
    const graph = [
      [1, 2], // Edges from vertex 0
      [0, 3, 4], // Edges from vertex 1
      [0, 5], // Edges from vertex 2
      [1], // Edges from vertex 3
      [1], // Edges from vertex 4
      [2], // Edges from vertex 5
    ];
    const {visited} = dfsRecursive(graph, 0);
    expect(visited[0]).toBe(0);
    expect(visited.length).toBe(6);
    expect(new Set(visited).size).toBe(6);
    // Recursive DFS follows adjacency list order: 0 -> 1 -> 3 -> 4 -> 2 -> 5
    expect(visited).toEqual([0, 1, 3, 4, 2, 5]);
  });

  test('should handle disconnected graph', () => {
    const graph = [
      [1], // Edges from vertex 0
      [0], // Edges from vertex 1
      [3], // Edges from vertex 2
      [2], // Edges from vertex 3
      [], // Edges from vertex 4 (isolated)
    ];
    const {visited} = dfsRecursive(graph, 0);
    expect(visited).toEqual([0, 1]);
  });

  test('should throw error for invalid start vertex', () => {
    const graph = [[1, 2], [0], [0]];
    expect(() => dfsRecursive(graph, -1)).toThrow('Start vertex is out of range');
    expect(() => dfsRecursive(graph, 3)).toThrow('Start vertex is out of range');
  });

  test('should handle a graph with a single vertex', () => {
    const graph = [[]];
    const {visited, predecessors} = dfsRecursive(graph, 0);
    expect(visited).toEqual([0]);
    expect(predecessors).toEqual([-1]);
  });
});

describe('DFS Recursive - stack depth limitation', () => {
  test('should throw RangeError on a very deep linear graph', () => {
    const depth = 20000;
    const deepGraph: number[][] = Array(depth)
      .fill(0)
      .map((_, i) => (i < depth - 1 ? [i + 1] : []));

    expect(() => dfsRecursive(deepGraph, 0)).toThrow(RangeError);
  });
});

describe('reconstructPath (DFS)', () => {
  test('should reconstruct a valid path', () => {
    const graph = [[1, 2], [3], [4], [], []];
    const {predecessors} = dfsRecursive(graph, 0);
    const path = reconstructPath(0, 3, predecessors);
    expect(path).toEqual([0, 1, 3]);
  });

  test('should handle path from vertex to itself', () => {
    const graph = [[1], [2], []];
    const {predecessors} = dfsRecursive(graph, 0);
    const path = reconstructPath(0, 0, predecessors);
    expect(path).toEqual([0]);
  });

  test('should return null for unreachable vertices', () => {
    const graph = [[1], [0], [3], [2]];
    const {predecessors} = dfsRecursive(graph, 0);
    const path = reconstructPath(0, 2, predecessors);
    expect(path).toBeNull();
  });

  test('should handle invalid target vertex', () => {
    const graph = [[1], [0]];
    const {predecessors} = dfsRecursive(graph, 0);
    const path = reconstructPath(0, 2, predecessors);
    expect(path).toBeNull();
  });
});
