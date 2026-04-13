/**
 * Represents a single node in the Trie.
 */
class TrieNode {
  private children: Map<string, TrieNode>;
  private isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }

  /**
   * Gets the child nodes of this TrieNode.
   * @returns {Map<string, TrieNode>} - A map of child nodes.
   */
  getChildren(): Map<string, TrieNode> {
    return this.children;
  }

  /**
   * Checks if this node marks the end of a word.
   * @returns {boolean} - True if this node is the end of a word, otherwise false.
   */
  isEnd(): boolean {
    return this.isEndOfWord;
  }

  /**
   * Sets whether this node marks the end of a word.
   * @param {boolean} isEnd - True to mark as the end of a word, otherwise false.
   */
  setEnd(isEnd: boolean): void {
    this.isEndOfWord = isEnd;
  }
}

/**
 * A Trie (Prefix Tree) data structure for efficient string storage and retrieval.
 */
export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  /**
   * Inserts a word into the Trie.
   * Converts the word to lowercase for case-insensitive storage.
   *
   * @param {string} word - The word to insert.
   * @throws {Error} Throws an error if the word is an empty string.
   */
  insert(word: string): void {
    if (word === '') {
      throw new Error('Cannot insert an empty string');
    }
    let current = this.root;
    for (const char of word.toLowerCase()) {
      const children = current.getChildren();
      if (!children.has(char)) {
        children.set(char, new TrieNode());
      }
      current = children.get(char)!;
    }
    current.setEnd(true);
  }

  /**
   * Searches for a complete word in the Trie.
   * Converts the word to lowercase for case-insensitive search.
   *
   * @param {string} word - The word to search for.
   * @returns {boolean} - True if the word exists, otherwise false.
   */
  search(word: string): boolean {
    const node = this.searchNode(word.toLowerCase());
    return node !== null && node.isEnd();
  }

  /**
   * Checks if there is any word in the Trie that starts with the given prefix.
   * Converts the prefix to lowercase for case-insensitive search.
   *
   * @param {string} prefix - The prefix to search for.
   * @returns {boolean} - True if any word starts with the prefix, otherwise false.
   */
  startsWith(prefix: string): boolean {
    return this.searchNode(prefix.toLowerCase()) !== null;
  }

  /**
   * Finds all words in the Trie that start with the given prefix.
   * Converts the prefix to lowercase for case-insensitive search.
   *
   * @param {string} prefix - The prefix to search for.
   * @returns {string[]} - A list of all words starting with the prefix.
   */
  findWords(prefix: string): string[] {
    const result: string[] = [];
    const node = this.searchNode(prefix.toLowerCase());
    if (node !== null) {
      this.dfs(node, prefix.toLowerCase(), result);
    }
    return result;
  }

  /**
   * Performs a depth-first search to find all words starting from the given node.
   *
   * @private
   * @param {TrieNode} node - The starting node.
   * @param {string} prefix - The current prefix being processed.
   * @param {string[]} result - The list to store found words.
   */
  private dfs(node: TrieNode, prefix: string, result: string[]): void {
    if (node.isEnd()) {
      result.push(prefix);
    }
    for (const [char, childNode] of node.getChildren()) {
      this.dfs(childNode, prefix + char, result);
    }
  }

  /**
   * Searches for the node corresponding to the given prefix.
   *
   * @private
   * @param {string} prefix - The prefix to search for.
   * @returns {TrieNode | null} - The corresponding node, or null if the prefix does not exist.
   */
  private searchNode(prefix: string): TrieNode | null {
    let current = this.root;
    for (const char of prefix.toLowerCase()) {
      const children = current.getChildren();
      if (!children.has(char)) {
        return null;
      }
      current = children.get(char)!;
    }
    return current;
  }
}
