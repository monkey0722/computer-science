/**
 * Represents a simple hash table to demonstrate the concept.
 * @template K Type of the keys in the hash table.
 * @template V Type of the values in the hash table.
 */
export class HashTable<K, V> {
  private table: Array<{key: K; value: V}[]>;
  private size: number;
  private loadFactorThreshold = 0.75;

  /**
   * Constructs a hash table.
   * @param {number} tableSize The size of the hash table. Default is 100.
   */
  constructor(tableSize: number = 100) {
    this.table = new Array(tableSize);
    this.size = 0;
  }

  /**
   * Generates a hash code for a key.
   * @param {K} key The key to hash.
   * @returns {number} The hash code of the key.
   */
  private hash(key: K): number {
    let hashValue = 0;
    const stringKey = `${key}`;
    for (let i = 0; i < stringKey.length; i++) {
      hashValue = (hashValue << 5) + hashValue + stringKey.charCodeAt(i);
    }
    return Math.abs(hashValue) % this.table.length;
  }

  /**
   * Resizes the table when the load factor exceeds loadFactorThreshold.
   */
  private resize(): void {
    const newSize = this.table.length * 2;
    const oldTable = this.table;

    this.table = new Array(newSize);
    this.size = 0;

    for (const bucket of oldTable) {
      if (bucket) {
        for (const item of bucket) {
          this.set(item.key, item.value);
        }
      }
    }
  }

  /**
   * Adds a new key-value pair to the hash table.
   * @param {K} key The key.
   * @param {V} value The value.
   */
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.table[index] || [];

    for (const item of bucket) {
      if (item.key === key) {
        item.value = value;
        return;
      }
    }

    bucket.push({key, value});
    this.table[index] = bucket;
    this.size++;

    // After insertion, check the load factor and resize if necessary.
    if (this.size / this.table.length > this.loadFactorThreshold) {
      this.resize();
    }
  }

  /**
   * Retrieves a value associated with a key.
   * @param {K} key The key.
   * @returns {V | undefined} The value associated with the key, or undefined if not found.
   */
  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.table[index];

    if (!bucket) {
      return undefined;
    }

    for (const item of bucket) {
      if (item.key === key) {
        return item.value;
      }
    }
    return undefined;
  }

  /**
   * Removes a key-value pair from the hash table.
   * @param {K} key The key.
   * @returns {boolean} True if an item was removed, false if the key was not found.
   */
  remove(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.table[index];

    if (!bucket) {
      return false;
    }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the number of key-value pairs stored in the hash table.
   * @returns {number} The size of the hash table.
   */
  getSize(): number {
    return this.size;
  }
}
