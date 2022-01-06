class Author {
  /**
   * @param {string} name - The name of the author.
   */
  constructor(name) {
    this.name = name.toUpperCase();
    this.decrypted = false;
  }

  decrypt() {
    this.decrypted = true;
  }
}

module.exports = Author;
