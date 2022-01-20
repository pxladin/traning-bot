class Quote {
  /**
   * @param {string} string - The raw string.
   */
  constructor(string) {
    this.content = string.replace(/["']/g, '').trim().replace(/ +/g, ' ');
  }

  toString() {
    return `"${this.content}"`;
  }
}

module.exports = Quote;
