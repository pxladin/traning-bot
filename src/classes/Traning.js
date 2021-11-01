/*  eslint-disable no-unused-vars */
const Guesser = require('./Guesser');
/*  eslint-enable no-unused-vars */

const TraningLine = require('./TraningLine');
const util = require('../util');

/**
 * Represents a traning.
 */
class Traning {
  /**
   * @param {string} content The string containing the traning lines.
   * @param {{id: string, tag: string}} creator The message structure containing the traning.
   */
  constructor(content, creator) {
    /**
     * The ID of the traning.
     */
    this.id = null;
    /**
     * The raw string containing the traning lines.
     */
    this.raw = content;
    /**
     * The user who added the traning.
     */
    this.creator = creator;
    /**
     * The traning lines.
     * @type {Array<TraningLine>}
     */
    this.lines = [];
    /**
     * The authors of the traning lines in the traning.
     * @type {Object<string, Guesser>}
     */
    this.guessers = {};
    /**
     * The authors of the traning lines in the traning.
     * @type {Array<string>}
     */
    this.authors = [];
    /**
     * UNIX timestamp of when the traning was created.
     */
    this.createdAt = Date.now();
  }

  /**
   * Turns the context into a readable string
   * and replaces the author's acronyms with their ID.
   * This excludes all solved traning lines.
   * @param {Traning} traning The traning to format.
   */
  static format(traning) {
    return traning.lines
      .map((line) => {
        if (line.solver) {
          return TraningLine.format(line);
        }

        return TraningLine.format(line).replaceAll(line.author, line.id);
      })
      .join('\n');
  }

  /**
   * Parses the traning lines from the context's message.
   */
  parse() {
    const IDGenerator = util.IDGenerator();

    this.raw.split(/\n+/).forEach((line) => {
      if (!TraningLine.isTraningLine(line)) {
        return;
      }

      const traning = new TraningLine(line);
      const { author } = traning;

      if (!this.authors.includes(author)) {
        traning.id = String(IDGenerator.next().value);

        this.authors.push(author);
      } else {
        traning.id = String(this.authors.indexOf(author) + 1);
      }

      this.lines.push(traning);
    });

    return this;
  }

  toJSON() {
    return {
      createdAt: this.createdAt,
      creator: {
        id: this.creator.id,
        tag: this.creator.tag,
      },
      lines: this.lines,
    };
  }
}

module.exports = Traning;
