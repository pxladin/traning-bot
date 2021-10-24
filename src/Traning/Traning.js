const _ = require('lodash');

/*  eslint-disable no-unused-vars */
const Guesser = require('../Guessing/Guesser');
/*  eslint-enable no-unused-vars */

/**
 * Represents a partial traning with no context.
 */
class Traning {
  /**
   * @param {string} msg The string containing the traning.
   */
  constructor(msg) {
    /**
     * The raw string containing the traning.
     */
    this.raw = msg.replace(/ +/g, ' ');
    /**
     * The ID of the traning in the current context.
     */
    this.id = '';
    /**
     * The author of the traning.
     */
    this.author = '';
    /**
     * The content of the traning.
     */
    this.content = '';
    /**
     * Whether this traning's author was correctly guessed.
     */
    this.solved = false;
    /**
     * The guesser who solved the traning.
     */
    this.solver = null;

    Object.assign(this, Traning.pattern.exec(this.raw).groups);
  }

  /**
   * The regular expression pattern for a traning.
   */
  static get pattern() {
    return /(?<author>[a-z]+)[^a-z:]*: *(?<content>[^\n]+)/i;
  }

  /**
   * @param {string} msg The string to test.
   * @returns {boolean} Whether `msg` contains a traning.
   */
  static isTraning(msg) {
    return Traning.pattern.test(msg);
  }

  /**
   * @returns The `Traning` without the `raw` property.
   */
  clean() {
    delete this.raw;

    return this;
  }

  /**
   * Formats the traning into a readable string.
   * @returns {string} The formatted traning.
   */
  format() {
    return `${this.author.toUpperCase()}: "${this.content}"`;
  }

  /**
   * Sets `Traning#solved` to `true` and sets `Traning#solver` to `guesser`.
   * @param {Guesser} guesser The guesser who solved the traning.
   */
  solve(guesser) {
    this.solved = true;
    this.solver = guesser;
  }

  /**
   * @returns {Object<string, any>} The traning as an object.
   */
  toJSON() {
    const json = {
      author: this.author.toUpperCase(),
      content: this.content,
    };

    if (this.solver) {
      json.solver = _.omit(this.solver.toJSON(), 'traninge');
    }

    return json;
  }
}

module.exports = Traning;
