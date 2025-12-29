import {topologicalSort} from './topological-sort';

describe('topologicalSort', () => {
  test('should return a valid topological ordering for a simple DAG', () => {
    const graph = [[1], [2], [3], []];
    const result = topologicalSort(graph);
    expect(result).toEqual([0, 1, 2, 3]);
  });
  test('should return a valid topological ordering for a more complex DAG', () => {
    const graph = [[1, 2], [3], [3], []];
    const result = topologicalSort(graph);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.indexOf(0)).toBeLessThan(result.indexOf(1));
      expect(result.indexOf(0)).toBeLessThan(result.indexOf(2));
      expect(result.indexOf(1)).toBeLessThan(result.indexOf(3));
      expect(result.indexOf(2)).toBeLessThan(result.indexOf(3));
    }
  });
  test('should return null for a graph with a cycle', () => {
    const graph = [[1], [2], [0]];
    const result = topologicalSort(graph);
    expect(result).toBeNull();
  });
  test('should return a valid ordering for a disconnected DAG', () => {
    const graph = [[1], [], [3], []];
    const result = topologicalSort(graph);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.indexOf(0)).toBeLessThan(result.indexOf(1));
      expect(result.indexOf(2)).toBeLessThan(result.indexOf(3));
    }
  });

  test('should handle a graph with a single vertex', () => {
    const graph = [[]];
    const result = topologicalSort(graph);
    expect(result).toEqual([0]);
  });

  test('should handle an empty graph', () => {
    const graph: number[][] = [];
    const result = topologicalSort(graph);
    expect(result).toEqual([]);
  });
  test('should handle a graph with self-loops', () => {
    const graph = [[1], [1, 2], []];
    const result = topologicalSort(graph);
    expect(result).toBeNull();
  });
  test('should handle a graph with multiple cycles', () => {
    const graph = [[1], [2], [0], [4], [3]];
    const result = topologicalSort(graph);
    expect(result).toBeNull();
  });
});
