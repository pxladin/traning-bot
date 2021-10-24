/*  eslint-disable no-unused-vars */
const { User, Message } = require('discord.js');
const Context = require('../Traning/Context');
/*  eslint-enable no-unused-vars */

const Guess = require('./Guess');
const util = require('../util');

/**
 * Represents a user who makes guesses.
 */
class Guesser {
  /**
   * @param {User} user The user structure of the guesser.
   */
  constructor(user) {
    /**
     * The ID of the guesser.
     */
    this.id = user.id;
    /**
     * The tag of the guesser.
     */
    this.tag = user.tag;
    /**
     * A map of traninge the guesser has guessed on.
     * @type {Map<any, string[]>}
     */
    this.traninge = new Map();
  }

  /**
   * Tries to solve a portion of the traning.
   *
   * @param {Message} msg The message containing the guess.
   * @param {Context} context The context the guess is for.
   *
   * @returns {boolean} Whether the solving was successful.
   */
  guess(msg, context) {
    const guess = new Guess(msg.content);
    const traning = context.fetch(guess.id || null);
    const { id: contextId } = context.thread;

    if (traning.author === guess.author) {
      traning.solve(this);
    }

    if (!this.traninge.has(contextId)) {
      this.traninge.set(contextId, []);
    }

    this.traninge.get(contextId).push(guess.raw);

    return traning.solved;
  }

  toJSON() {
    return {
      id: this.id,
      tag: this.tag,
      traninge: util.mapToObject(this.traninge),
    };
  }
}

module.exports = Guesser;
