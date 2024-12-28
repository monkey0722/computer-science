/**
 * A Union-Find (Disjoint-Set) data structure implementation.
 * This data structure supports efficient union and find operations
 * with path compression and rank optimization.
 *
 * @template T - The type of elements stored in the union-find structure.
 */
export class UnionFind<T> {
  private parent: Map<T, T>;
  private rank: Map<T, number>;
  private size: Map<T, number>;

  constructor() {
    this.parent = new Map();
    this.rank = new Map();
    this.size = new Map();
  }

  /**
   * Creates a new set containing the given element.
   * If the element already exists, this method does nothing.
   *
   * @param {T} element - The element to create a set for.
   */
  makeSet(element: T): void {
    if (!this.parent.has(element)) {
      this.parent.set(element, element);
      this.rank.set(element, 0);
      this.size.set(element, 1);
    }
  }

  /**
   * Finds the representative (root) of the set containing the given element.
   * Uses path compression to optimize subsequent queries.
   *
   * @param {T} element - The element to find.
   * @returns {T} - The representative of the set.
   * @throws {Error} Will throw an error if the element is not found in any set.
   */
  find(element: T): T {
    if (!this.parent.has(element)) {
      throw new Error(`Element ${element} not found in any set`);
    }
    if (this.parent.get(element) !== element) {
      const newParent = this.find(this.parent.get(element)!);
      this.parent.set(element, newParent);
    }
    return this.parent.get(element)!;
  }

  /**
   * Unites the sets containing the two given elements.
   * If the elements are already in the same set, this method does nothing.
   *
   * Uses rank optimization to attach the smaller tree under the larger tree.
   *
   * @param {T} element1 - The first element.
   * @param {T} element2 - The second element.
   * @throws {Error} Will throw an error if one or both elements are not found in any set.
   */
  union(element1: T, element2: T): void {
    if (!this.parent.has(element1) || !this.parent.has(element2)) {
      throw new Error(
        `One or both elements (${element1}, ${element2}) not found in any set`
      );
    }

    const root1 = this.find(element1);
    const root2 = this.find(element2);

    if (root1 === root2) return;

    const rank1 = this.rank.get(root1) ?? 0;
    const rank2 = this.rank.get(root2) ?? 0;
    const size1 = this.size.get(root1) ?? 1;
    const size2 = this.size.get(root2) ?? 1;

    if (rank1 > rank2) {
      this.parent.set(root2, root1);
      this.size.set(root1, size1 + size2);
    } else if (rank1 < rank2) {
      this.parent.set(root1, root2);
      this.size.set(root2, size1 + size2);
    } else {
      this.parent.set(root2, root1);
      this.rank.set(root1, rank1 + 1);
      this.size.set(root1, size1 + size2);
    }
  }

  /**
   * Checks if the two given elements are in the same set.
   *
   * @param {T} element1 - The first element.
   * @param {T} element2 - The second element.
   * @returns {boolean} - True if both elements are in the same set, otherwise false.
   */
  connected(element1: T, element2: T): boolean {
    try {
      return this.find(element1) === this.find(element2);
    } catch {
      return false;
    }
  }

  /**
   * Gets the size of the set containing the given element.
   *
   * @param {T} element - The element whose set size is to be retrieved.
   * @returns {number} - The size of the set.
   * @throws {Error} Will throw an error if the element is not found in any set.
   */
  getSize(element: T): number {
    if (!this.parent.has(element)) {
      throw new Error(`Element ${element} not found in any set`);
    }
    return this.size.get(this.find(element)) ?? 0;
  }
}
