class Quote {
  /**
   * @param {string} string - The raw string.
   */
  constructor(string) {
    this.value = string.replace(/["']/g, '').replace(/ +/g, ' ');
  }
}

module.exports = Quote;
