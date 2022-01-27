class Author {
  /**
   * @param {string} name - The name of the author.
   */
  constructor(name) {
    this.name = name.trim().toUpperCase();
    this.decrypted = false;
    this.metaData = null;
  }

  decrypt() {
    this.decrypted = true;
  }
}

module.exports = Author;
