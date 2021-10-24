/**
 * Represents a guess for a traning context.
 */
class Guess {
  /**
   * @param {string} msg The string containing the guess.
   */
  constructor(msg) {
    /**
     * The raw string containing the guess.
     */
    this.raw = msg.replace(/ +/g, ' ');
    /**
     * The ID of the traning.
     */
    this.id = '';
    /**
     * The guessed author.
     */
    this.author = '';

    Object.assign(this, Guess.pattern.exec(this.raw).groups);
  }

  /**
   * How many guesses are allowed per user for a traning.
   */
  static get MAX() {
    return 4;
  }

  /**
   * The regular expression pattern for a guess.
   */
  static get pattern() {
    return /((?<id>\d+)?[^\d:]*: *)?(?<author>\S+)/i;
  }

  /**
   * @param {string} msg The string to test.
   * @returns {boolean} Whether `msg` contains a guess.
   */
  static isGuess(msg) {
    return Guess.pattern.test(msg);
  }
}

module.exports = Guess;
