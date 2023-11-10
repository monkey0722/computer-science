/**
 * Represents a simple hash table to demonstrate the concept.
 * @template K Type of the keys in the hash table.
 * @template V Type of the values in the hash table.
 */
export class HashTable<K, V> {
  private table: Array<{key: K; value: V}[]>;
  private size: number;

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
    const stringTypeKey = `${key}`;

    for (let i = 0; i < stringTypeKey.length; i++) {
      const charCode = stringTypeKey.charCodeAt(i);
      hashValue += charCode << (i * 8);
    }

    return hashValue % this.table.length;
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
