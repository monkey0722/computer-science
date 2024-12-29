import {Graph} from './graph';

describe('Graph', () => {
  let graph: Graph<string, number>;

  beforeEach(() => {
    graph = new Graph<string, number>();
  });

  test('A new graph should be empty', () => {
    expect(graph.size).toBe(0);
  });
  test('Adding nodes increases graph size', () => {
    graph.addNode('A');
    expect(graph.size).toBe(1);
    graph.addNode('B');
    expect(graph.size).toBe(2);
  });
  test('Adding edges does not increase graph size', () => {
    graph.addNode('A').addNode('B');
    graph.addEdge('A', 'B', 1);
    expect(graph.size).toBe(2);
  });
  test('Can remove nodes and edges', () => {
    graph.addNode('A').addNode('B');
    graph.addEdge('A', 'B', 1);
    graph.removeEdge('A', 'B');
    expect(graph.isAdjacent('A', 'B')).toBe(false);
    graph.removeNode('A');
    expect(graph.size).toBe(1);
  });
  test('Correctly retrieves edge weights', () => {
    graph.addNode('A').addNode('B').addEdge('A', 'B', 1);
    expect(graph.getEdgeWeight('A', 'B')).toBe(1);
  });
  test('Correctly identifies adjacent nodes', () => {
    graph.addNode('A').addNode('B').addEdge('A', 'B', 1);
    expect(graph.isAdjacent('A', 'B')).toBe(true);
    expect(graph.isAdjacent('B', 'A')).toBe(false);
  });
});

// Performance tests
describe('Graph Performance', () => {
  let graph: Graph<number, number>;

  beforeEach(() => {
    graph = new Graph<number, number>();
  });

  test('Performance for adding 10,000 nodes', () => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      graph.addNode(i);
    }
    const end = performance.now();
    expect(end - start).toBeLessThan(500);
  });
  test('Performance for adding 10,000 edges', () => {
    for (let i = 0; i < 10000; i++) {
      graph.addNode(i);
    }
    const start = performance.now();
    for (let i = 0; i < 9999; i++) {
      graph.addEdge(i, i + 1, i);
    }
    const end = performance.now();
    expect(end - start).toBeLessThan(500);
  });
});
