/*  eslint-disable no-unused-vars */
const { User, Message } = require('discord.js');
const Context = require('../Traning/Context');
/*  eslint-enable no-unused-vars */

const Guess = require('./Guess');
const translate = require('../translator/translate');
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
    this.guesses = new Map();
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

    if (!this.guesses.has(contextId)) {
      this.guesses.set(contextId, []);
    } else if (this.guesses.get(contextId).length === Guess.MAX) {
      msg.channel.send(
        translate('guessing.not_enough_guesses', {
          max: Guess.MAX,
        }),
      );

      return false;
    }

    this.guesses.get(contextId).push(guess.raw);

    if (traning.author === guess.author) {
      context.traninge.forEach((t) => {
        if (t.author === guess.author) {
          t.solve(this);
        }
      });

      msg.channel.send(
        translate('guessing.correct_answer', {
          person: traning.author,
        }),
      );
    }

    return traning.solved;
  }

  toJSON() {
    return {
      id: this.id,
      tag: this.tag,
      guesses: util.mapToObject(this.guesses),
    };
  }
}

module.exports = Guesser;
