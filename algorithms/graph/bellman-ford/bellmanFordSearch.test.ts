import {BellmanFord} from './bellmanFordSearch';

describe('BellmanFord', () => {
  test('should find shortest paths correctly for a valid graph', () => {
    const edges = [
      {source: 0, target: 1, weight: 4},
      {source: 0, target: 2, weight: 5},
      {source: 1, target: 2, weight: -3},
      {source: 1, target: 3, weight: 6},
      {source: 2, target: 3, weight: 1},
    ];
    const result = BellmanFord.findShortestPaths(4, edges, 0);
    expect(result).toEqual([0, 4, 1, 2]);
  });
  test('should detect negative weight cycle and return null', () => {
    const edges = [
      {source: 0, target: 1, weight: 1},
      {source: 1, target: 2, weight: 1},
      {source: 2, target: 0, weight: -3},
    ];
    const result = BellmanFord.findShortestPaths(3, edges, 0);
    expect(result).toBeNull();
  });
  test('should return null when reconstructing path for unreachable vertex', () => {
    const edges = [
      {source: 0, target: 1, weight: 4},
      {source: 1, target: 2, weight: 3},
    ];
    const path = BellmanFord.reconstructPath(4, edges, 0, 3);
    expect(path).toBeNull();
  });
  test('should throw error for invalid vertex count', () => {
    const edges = [
      {source: 0, target: 1, weight: 4},
      {source: 1, target: 2, weight: 3},
    ];
    expect(() => BellmanFord.findShortestPaths(0, edges, 0)).toThrow(
      'Number of vertices must be positive',
    );
  });
  test('should throw error for invalid edge vertices', () => {
    const edges = [{source: 0, target: 5, weight: 4}];
    expect(() => BellmanFord.findShortestPaths(4, edges, 0)).toThrow(
      'Edge contains an invalid vertex',
    );
  });
  test('should handle large graph with no negative weight cycles', () => {
    const edges = Array.from({length: 100}, (_, i) => ({
      source: i,
      target: (i + 1) % 100,
      weight: 1,
    }));
    const result = BellmanFord.findShortestPaths(100, edges, 0);
    expect(result).toHaveLength(100);
    expect(result![99]).toBe(99);
  });
});
