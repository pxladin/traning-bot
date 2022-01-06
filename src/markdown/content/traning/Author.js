/* eslint-disable */
const Quote = require('./Quote');
/* eslint-enable */

class Author {
  /**
   * @param {string} name - The name of the author.
   */
  constructor(name) {
    this.name = name;
    /**
     * @type {Array<Quote>}
     */
    this.quotes = [];
    this.decrypted = false;
  }

  decrypt() {
    this.decrypted = true;
  }
}

module.exports = Author;
