import {LinkedList} from './linkedList';

describe('LinkedList', () => {
  let linkedList: LinkedList<number>;

  beforeEach(() => {
    linkedList = new LinkedList<number>();
  });

  test('should start empty', () => {
    expect(linkedList.length).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  test('append adds a new element to the list', () => {
    linkedList.append(5);
    expect(linkedList.length).toBe(1);
    expect(linkedList.head?.value).toBe(5);
    expect(linkedList.tail?.value).toBe(5);
  });

  test('prepend adds a new element to the start of the list', () => {
    linkedList.prepend(1);
    expect(linkedList.length).toBe(1);
    expect(linkedList.head?.value).toBe(1);
    expect(linkedList.tail?.value).toBe(1);
  });

  test('find returns null for an empty list', () => {
    expect(linkedList.find(5)).toBeNull();
  });

  test('find returns the correct node if it exists', () => {
    linkedList.append(1);
    linkedList.append(2);
    const node = linkedList.find(2);
    expect(node).not.toBeNull();
    expect(node?.value).toBe(2);
  });

  test('delete removes the correct element from the list', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.delete(2);
    expect(linkedList.find(2)).toBeNull();
    expect(linkedList.length).toBe(2);
  });

  test('toArray returns an array of all elements', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    expect(linkedList.toArray()).toEqual([1, 2, 3]);
  });

  test('handles a mix of operations', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.prepend(0);
    linkedList.delete(2);
    expect(linkedList.toArray()).toEqual([0, 1]);
    expect(linkedList.length).toBe(2);
  });
});
