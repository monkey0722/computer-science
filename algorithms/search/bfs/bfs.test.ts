import {bfs, reconstructPath} from './bfs';

describe('BFS Algorithm', () => {
  test('should find the shortest paths in a simple graph', () => {
    const graph = [
      [1, 2], // Edges from vertex 0
      [0, 3, 4], // Edges from vertex 1
      [0, 5], // Edges from vertex 2
      [1], // Edges from vertex 3
      [1], // Edges from vertex 4
      [2], // Edges from vertex 5
    ];
    const {distances, predecessors} = bfs(graph, 0);
    expect(distances).toEqual([0, 1, 1, 2, 2, 2]);
    expect(predecessors).toEqual([-1, 0, 0, 1, 1, 2]);
  });
  test('should handle disconnected graph', () => {
    const graph = [
      [1], // Edges from vertex 0
      [0], // Edges from vertex 1
      [3], // Edges from vertex 2
      [2], // Edges from vertex 3
      [], // Edges from vertex 4 (isolated)
    ];
    const {distances, predecessors} = bfs(graph, 0);
    expect(distances).toEqual([0, 1, Infinity, Infinity, Infinity]);
    expect(predecessors).toEqual([-1, 0, -1, -1, -1]);
    expect(distances[2]).toBe(Infinity);
    expect(distances[3]).toBe(Infinity);
    expect(distances[4]).toBe(Infinity);
    expect(predecessors[2]).toBe(-1);
    expect(predecessors[3]).toBe(-1);
    expect(predecessors[4]).toBe(-1);
  });
  test('should throw error for invalid start vertex', () => {
    const graph = [[1, 2], [0], [0]];
    expect(() => bfs(graph, -1)).toThrow('Start vertex is out of range');
    expect(() => bfs(graph, 3)).toThrow('Start vertex is out of range');
  });
  test('should handle a graph with a single vertex', () => {
    const graph = [[]];
    const {distances, predecessors} = bfs(graph, 0);
    expect(distances).toEqual([0]);
    expect(predecessors).toEqual([-1]);
  });
  test('should handle BFS on a tree structure', () => {
    const graph = [
      [1, 2], // Root has two children
      [3, 4], // Left child has two children
      [5], // Right child has one child
      [],
      [],
      [], // Leaf nodes
    ];
    const {distances, predecessors} = bfs(graph, 0);
    expect(distances).toEqual([0, 1, 1, 2, 2, 2]);
    expect(predecessors).toEqual([-1, 0, 0, 1, 1, 2]);
  });
  test('should handle cyclic graphs correctly', () => {
    // A graph with cycles: 0-1-2-0 and 3-4-5-3
    const graph = [
      [1, 2], // Edges from vertex 0
      [0, 2], // Edges from vertex 1
      [0, 1], // Edges from vertex 2
      [4, 5], // Edges from vertex 3
      [3, 5], // Edges from vertex 4
      [3, 4], // Edges from vertex 5
    ];
    const {distances} = bfs(graph, 0);
    expect(distances[0]).toBe(0);
    expect(distances[1]).toBe(1);
    expect(distances[2]).toBe(1);
    expect(distances[3]).toBe(Infinity);
    expect(distances[4]).toBe(Infinity);
    expect(distances[5]).toBe(Infinity);

    const result2 = bfs(graph, 3);
    expect(result2.distances[3]).toBe(0);
    expect(result2.distances[4]).toBe(1);
    expect(result2.distances[5]).toBe(1);
    expect(result2.distances[0]).toBe(Infinity);
    expect(result2.distances[1]).toBe(Infinity);
    expect(result2.distances[2]).toBe(Infinity);
  });

  test('should handle large graphs efficiently', () => {
    // Create a larger graph (path graph with 1000 vertices)
    const largeGraph: number[][] = Array(1000)
      .fill(0)
      .map((_, i) => {
        if (i === 0) return [1];
        if (i === 999) return [998];
        return [i - 1, i + 1];
      });

    const startTime = performance.now();
    const {distances} = bfs(largeGraph, 0);
    const endTime = performance.now();

    expect(distances[0]).toBe(0);
    expect(distances[1]).toBe(1);
    expect(distances[10]).toBe(10);
    expect(distances[100]).toBe(100);
    expect(distances[999]).toBe(999);
    expect(endTime - startTime).toBeLessThan(1000); // Should complete in less than 1 second
  });
});

describe('reconstructPath', () => {
  test('should reconstruct the correct path', () => {
    const graph = [[1, 2], [3], [4], [], []];
    const {predecessors} = bfs(graph, 0);
    const path1 = reconstructPath(0, 3, predecessors);
    expect(path1).toEqual([0, 1, 3]);

    const path2 = reconstructPath(0, 4, predecessors);
    expect(path2).toEqual([0, 2, 4]);
  });

  test('should handle path from vertex to itself', () => {
    const graph = [[1], [2], []];
    const {predecessors} = bfs(graph, 0);

    const path = reconstructPath(0, 0, predecessors);
    expect(path).toEqual([0]);
  });

  test('should return null for unreachable vertices', () => {
    const graph = [[1], [0], [3], [2]];
    const {predecessors, distances} = bfs(graph, 0);

    expect(distances[2]).toBe(Infinity);
    expect(distances[3]).toBe(Infinity);

    const path = reconstructPath(0, 2, predecessors);
    expect(path).toBeNull();
  });

  test('should handle invalid target vertex', () => {
    const graph = [[1], [0]];
    const {predecessors} = bfs(graph, 0);

    const path = reconstructPath(0, 2, predecessors);
    expect(path).toBeNull();
  });
});
