const translate = require('../translator/translate');

/**
 * Represents a partial traning with no context.
 */
class TraningLine {
  /**
   * @param {string} string The string containing the traning.
   */
  constructor(string) {
    /**
     * The ID of the traning line.
     */
    this.id = '';
    /**
     * The author of the traning line.
     */
    this.author = '';
    /**
     * The content of the traning line.
     */
    this.content = '';
    /**
     * The `Guesser` who solved the traning line.
     */
    this.solver = null;

    Object.assign(
      this,
      TraningLine.pattern.exec(string.replace(/ +/g, ' ')).groups,
    );

    this.author = this.author.toUpperCase();
    this.content = this.content.trim();
  }

  /**
   * The regular expression pattern for a traning line.
   */
  static get pattern() {
    return /(?<author>[a-z]+)[^a-z:]*: *(?<content>[^\n]+)/i;
  }

  /**
   * @param {string} msg The string to test.
   * @returns {boolean} Whether `msg` contains a traning line.
   */
  static isTraningLine(msg) {
    return TraningLine.pattern.test(msg);
  }

  /**
   * Formats the traning line into a readable string.
   *
   * @param {TraningLine} line The traning line to format.
   *
   * @returns {string} The formatted traning line.
   */
  static format(line) {
    return translate('formatting.traning_line', {
      author: line.author,
      content: line.content,
    });
  }

  /**
   * @returns {Object<string, any>} The traning line as an object.
   */
  toJSON() {
    return {
      author: this.author,
      content: this.content,
      solver: this.solver,
    };
  }
}

module.exports = TraningLine;
