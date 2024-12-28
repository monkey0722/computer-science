import {HashTable} from './hashTable';

describe('HashTable', () => {
  let hashTable: HashTable<string, number>;

  beforeEach(() => {
    hashTable = new HashTable<string, number>();
  });

  test('sets and gets a key-value pair', () => {
    hashTable.set('key1', 1);
    expect(hashTable.get('key1')).toBe(1);
  });

  test('updates value for an existing key', () => {
    hashTable.set('key1', 1);
    hashTable.set('key1', 2);
    expect(hashTable.get('key1')).toBe(2);
  });

  test('removes a key-value pair', () => {
    hashTable.set('key1', 1);
    expect(hashTable.remove('key1')).toBe(true);
    expect(hashTable.get('key1')).toBeUndefined();
  });

  test('removes a non-existing key', () => {
    expect(hashTable.remove('key1')).toBe(false);
  });

  test('returns correct size', () => {
    expect(hashTable.getSize()).toBe(0);
    hashTable.set('key1', 1);
    hashTable.set('key2', 2);
    expect(hashTable.getSize()).toBe(2);
  });

  test('handles hash collisions', () => {
    const keyA = 'keyA';
    const keyB = 'keyB';
    const smallHashTable = new HashTable<string, number>(5);

    smallHashTable.set(keyA, 1);
    smallHashTable.set(keyB, 2);

    expect(smallHashTable.get(keyA)).toBe(1);
    expect(smallHashTable.get(keyB)).toBe(2);
  });
});

describe('HashTable with large data set', () => {
  let hashTable: HashTable<number, number>;
  const largeSize = 100000;

  beforeEach(() => {
    hashTable = new HashTable<number, number>(largeSize);
  });

  test('handles a large number of inserts', () => {
    for (let i = 0; i < largeSize; i++) {
      hashTable.set(i, i);
    }
    expect(hashTable.getSize()).toBe(largeSize);
  });

  test('retrieves values correctly after a large number of inserts', () => {
    for (let i = 0; i < largeSize; i++) {
      hashTable.set(i, i * 2);
    }

    for (let i = 0; i < 100; i++) {
      const key = Math.floor(Math.random() * largeSize);
      expect(hashTable.get(key)).toBe(key * 2);
    }
  });

  test('insert performance for large data sets', () => {
    const startTime = performance.now();
    for (let i = 0; i < largeSize; i++) {
      hashTable.set(i, i);
    }
    const endTime = performance.now();
    console.log(`Inserting ${largeSize} items took ${endTime - startTime} milliseconds`);
  });
});
