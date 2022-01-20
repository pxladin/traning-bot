const regex = require('../regex');

class BaseContent {
  IS_SOLVABLE = true;

  constructor(context) {
    if (this.constructor.name === 'BaseContent') {
      throw new Error('BaseContent cannot be instantiated');
    }

    this.ctx = context;
  }

  static get PATTERN() {
    return /\0/;
  }

  /**
   * @param {string} string
   */
  static is(string) {
    return (
      this.name !== 'BaseContent' && regex[this.name.toLowerCase()].test(string)
    );
  }

  parse() {
    return this;
  }

  /**
   * Extracts atomic groups from the string using a regular expression.
   *
   * @param {string} string - The string to extract groups from.
   * @param {keyof regex} regexKey - The regex key to use.
   *
   * @returns {{ [key: string]: string }} The extracted groups.
   */
  extractGroups(string, regexKey) {
    const execArray = regex[regexKey].exec(string);

    regex.lastIndex = 0;

    return execArray?.groups ? execArray.groups : null;
  }

  toString() {
    return '';
  }
}

module.exports = BaseContent;
