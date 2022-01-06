const regex = require('../regex');

class BaseContent {
  /**
   * @param {string} string
   */
  constructor(context, string) {
    if (this.constructor.name === 'BaseContent') {
      throw new Error('BaseContent cannot be instantiated');
    }

    this.ctx = context;
    this.raw = string;
  }

  static get PATTERN() {
    return /\0/;
  }

  static get IS_SOLVABLE() {
    return false;
  }

  /**
   * @param {string} string
   */
  static is(string) {
    return regex[this.name.toLowerCase()].test(string);
  }

  parse() {
    return this;
  }

  /**
   * Extracts atomic groups from the string using a regular expression.
   *
   * @param {string} string - The string to extract groups from.
   * @param {RegExp} regex - The regular expression to use.
   *
   * @returns {{ [key: string]: string }} The extracted groups.
   */
  extractGroups(string, regex) {
    const execArray = regex.exec(string);

    regex.lastIndex = 0;

    return execArray?.groups ? execArray.groups : null;
  }

  toString() {
    return '';
  }
}

module.exports = BaseContent;
