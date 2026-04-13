import {dijkstra, reconstructPath} from './dijkstra';

describe('Dijkstra Algorithm', () => {
  test('should find the shortest paths in a simple graph', () => {
    const graph = [
      [
        {to: 1, weight: 1},
        {to: 2, weight: 4},
      ],
      [
        {to: 2, weight: 2},
        {to: 3, weight: 5},
      ],
      [{to: 3, weight: 1}],
      [],
    ];
    const {distances, predecessors} = dijkstra(graph, 0);
    expect(distances).toEqual([0, 1, 3, 4]);
    expect(predecessors).toEqual([-1, 0, 1, 2]);
  });
  test('should handle unreachable vertices', () => {
    const graph = [[{to: 1, weight: 1}], [{to: 2, weight: 2}], [], []];
    const {distances, predecessors} = dijkstra(graph, 0);
    expect(distances).toEqual([0, 1, 3, Infinity]);
    expect(predecessors).toEqual([-1, 0, 1, -1]);
  });
  test('should throw error for negative edge weights', () => {
    const graph = [
      [
        {to: 1, weight: 1},
        {to: 2, weight: -2},
      ],
      [],
      [],
    ];
    expect(() => dijkstra(graph, 0)).toThrow(
      "Dijkstra's algorithm does not work with negative edge weights",
    );
  });
  test('should handle a graph with a single vertex', () => {
    const graph = [[]];
    const {distances, predecessors} = dijkstra(graph, 0);
    expect(distances).toEqual([0]);
    expect(predecessors).toEqual([-1]);
  });
  test('should handle a graph with multiple paths to the same vertex', () => {
    const graph = [
      [
        {to: 1, weight: 1},
        {to: 2, weight: 2},
      ],
      [{to: 3, weight: 4}],
      [{to: 3, weight: 3}],
      [],
    ];
    const {distances, predecessors} = dijkstra(graph, 0);
    expect(distances[3]).toBe(5);
    expect(predecessors[3]).toBe(1);
  });
});

describe('reconstructPath', () => {
  test('should reconstruct the correct path', () => {
    const predecessors = [-1, 0, 1, 2];
    const path = reconstructPath(0, 3, predecessors);
    expect(path).toEqual([0, 1, 2, 3]);
  });
  test('should handle direct paths', () => {
    const predecessors = [-1, 0, 0, 0];
    const path = reconstructPath(0, 1, predecessors);
    expect(path).toEqual([0, 1]);
  });
  test('should return null for unreachable vertices', () => {
    const predecessors = [-1, 0, 1, -1];
    const path = reconstructPath(0, 3, predecessors);
    expect(path).toBeNull();
  });
  test('should handle path from vertex to itself', () => {
    const predecessors = [-1, 0, 1, 2];
    const path = reconstructPath(0, 0, predecessors);
    expect(path).toEqual([0]);
  });
  test('should handle invalid target vertex', () => {
    const predecessors = [-1, 0, 1, 2];
    const path = reconstructPath(0, 4, predecessors);
    expect(path).toBeNull();
  });
});
