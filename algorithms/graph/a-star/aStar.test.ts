import {aStar, createManhattanHeuristic, createEuclideanHeuristic} from './aStar';

describe('A* Search Algorithm', () => {
  test('should find the shortest path in a simple graph', () => {
    // Graph: 0 -> 1 -> 2 -> 3
    const graph = [[{to: 1, weight: 1}], [{to: 2, weight: 1}], [{to: 3, weight: 1}], []];
    const heuristic = (v: number): number => 3 - v; // Simple heuristic

    const result = aStar(graph, 0, 3, heuristic);
    expect(result.path).toEqual([0, 1, 2, 3]);
    expect(result.distance).toBe(3);
  });

  test('should find optimal path when multiple paths exist', () => {
    // Graph with two paths: 0->1->3 (cost 5) and 0->2->3 (cost 3)
    const graph = [
      [
        {to: 1, weight: 2},
        {to: 2, weight: 1},
      ],
      [{to: 3, weight: 3}],
      [{to: 3, weight: 2}],
      [],
    ];
    const heuristic = (): number => 0; // Zero heuristic (degrades to Dijkstra)

    const result = aStar(graph, 0, 3, heuristic);
    expect(result.path).toEqual([0, 2, 3]);
    expect(result.distance).toBe(3);
  });

  test('should return null path when no path exists', () => {
    const graph = [[{to: 1, weight: 1}], [], [{to: 3, weight: 1}], []];
    const heuristic = (): number => 0;

    const result = aStar(graph, 0, 3, heuristic);
    expect(result.path).toBeNull();
    expect(result.distance).toBe(Infinity);
  });

  test('should handle source equals goal', () => {
    const graph = [[{to: 1, weight: 1}], []];
    const heuristic = (): number => 0;

    const result = aStar(graph, 0, 0, heuristic);
    expect(result.path).toEqual([0]);
    expect(result.distance).toBe(0);
  });

  test('should handle invalid source vertex', () => {
    const graph = [[{to: 1, weight: 1}], []];
    const heuristic = (): number => 0;

    const result = aStar(graph, -1, 1, heuristic);
    expect(result.path).toBeNull();
    expect(result.distance).toBe(Infinity);
  });

  test('should handle invalid goal vertex', () => {
    const graph = [[{to: 1, weight: 1}], []];
    const heuristic = (): number => 0;

    const result = aStar(graph, 0, 5, heuristic);
    expect(result.path).toBeNull();
    expect(result.distance).toBe(Infinity);
  });

  test('should work with a grid-based graph using Manhattan heuristic', () => {
    // 3x3 grid:
    // 0 - 1 - 2
    // |   |   |
    // 3 - 4 - 5
    // |   |   |
    // 6 - 7 - 8
    const graph = [
      [
        {to: 1, weight: 1},
        {to: 3, weight: 1},
      ],
      [
        {to: 0, weight: 1},
        {to: 2, weight: 1},
        {to: 4, weight: 1},
      ],
      [
        {to: 1, weight: 1},
        {to: 5, weight: 1},
      ],
      [
        {to: 0, weight: 1},
        {to: 4, weight: 1},
        {to: 6, weight: 1},
      ],
      [
        {to: 1, weight: 1},
        {to: 3, weight: 1},
        {to: 5, weight: 1},
        {to: 7, weight: 1},
      ],
      [
        {to: 2, weight: 1},
        {to: 4, weight: 1},
        {to: 8, weight: 1},
      ],
      [
        {to: 3, weight: 1},
        {to: 7, weight: 1},
      ],
      [
        {to: 4, weight: 1},
        {to: 6, weight: 1},
        {to: 8, weight: 1},
      ],
      [
        {to: 5, weight: 1},
        {to: 7, weight: 1},
      ],
    ];

    const goalX = 2;
    const goalY = 2;
    const gridWidth = 3;
    const heuristic = createManhattanHeuristic(goalX, goalY, gridWidth);

    const result = aStar(graph, 0, 8, heuristic);
    expect(result.distance).toBe(4);
    expect(result.path?.length).toBe(5);
    expect(result.path?.[0]).toBe(0);
    expect(result.path?.[result.path.length - 1]).toBe(8);
  });

  test('should work with Euclidean heuristic', () => {
    // Simple 2x2 grid
    const graph = [
      [
        {to: 1, weight: 1},
        {to: 2, weight: 1},
      ],
      [
        {to: 0, weight: 1},
        {to: 3, weight: 1},
      ],
      [
        {to: 0, weight: 1},
        {to: 3, weight: 1},
      ],
      [
        {to: 1, weight: 1},
        {to: 2, weight: 1},
      ],
    ];

    const heuristic = createEuclideanHeuristic(1, 1, 2);
    const result = aStar(graph, 0, 3, heuristic);

    expect(result.distance).toBe(2);
    expect(result.path?.length).toBe(3);
  });

  test('should handle disconnected components', () => {
    const graph = [
      [{to: 1, weight: 1}],
      [{to: 0, weight: 1}],
      [{to: 3, weight: 1}],
      [{to: 2, weight: 1}],
    ];
    const heuristic = (): number => 0;

    const result = aStar(graph, 0, 3, heuristic);
    expect(result.path).toBeNull();
    expect(result.distance).toBe(Infinity);
  });

  test('should handle graph with cycles', () => {
    // Triangle graph: 0 - 1 - 2 - 0
    const graph = [
      [
        {to: 1, weight: 1},
        {to: 2, weight: 3},
      ],
      [
        {to: 0, weight: 1},
        {to: 2, weight: 1},
      ],
      [
        {to: 0, weight: 3},
        {to: 1, weight: 1},
      ],
    ];
    const heuristic = (): number => 0;

    const result = aStar(graph, 0, 2, heuristic);
    expect(result.path).toEqual([0, 1, 2]);
    expect(result.distance).toBe(2);
  });
});

describe('Heuristic functions', () => {
  test('Manhattan heuristic should calculate correct distance', () => {
    const heuristic = createManhattanHeuristic(2, 2, 3);
    expect(heuristic(0)).toBe(4); // (0,0) to (2,2)
    expect(heuristic(4)).toBe(2); // (1,1) to (2,2)
    expect(heuristic(8)).toBe(0); // (2,2) to (2,2)
  });

  test('Euclidean heuristic should calculate correct distance', () => {
    const heuristic = createEuclideanHeuristic(3, 0, 4);
    expect(heuristic(0)).toBe(3); // (0,0) to (3,0)
    expect(heuristic(3)).toBe(0); // (3,0) to (3,0)
    expect(heuristic(4)).toBeCloseTo(Math.sqrt(10)); // (0,1) to (3,0)
  });
});
