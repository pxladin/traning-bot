/*  eslint-disable no-unused-vars */
const { Message } = require('discord.js');
const Traning = require('./Traning');
/*  eslint-enable no-unused-vars */

const Guess = require('./Guess');
const translate = require('../translator/translate');

/**
 * Represents a user who makes guesses.
 */
class Guesser {
  /**
   * @param {{ id: string, tag: string, timestamp: number }} user The user structure of the guesser.
   */
  constructor(user) {
    /**
     * The UNIX timestamp at which the guesser made their first guess.
     */
    this.timestamp = user.timestamp || Date.now();
    /**
     * The ID of the guesser.
     */
    this.id = user.id;
    /**
     * The tag of the guesser.
     */
    this.tag = user.tag;
    /**
     * The guesses of the guesser for a traning line.
     * @type {Array<string>}
     */
    this.guesses = [];
  }

  /**
   * Tries to solve a traning line of the traning.
   *
   * @param {Message} msg The message containing the guess.
   * @param {Traning} traning The traning the guess is for.
   *
   * @returns {boolean} Whether the solving was successful.
   */
  guess(msg, traning) {
    const guess = new Guess(msg.content);
    let traningLine = traning.lines.find((line) => !line.solver);

    if (guess.id) {
      traningLine = traning.lines.find((line) => line.id === guess.id);
    }

    if (this.guesses.length === Guess.MAX) {
      msg.channel.send(
        translate('guessing.not_enough_guesses', {
          max: Guess.MAX,
        }),
      );

      return false;
    }

    this.guesses.push(guess.author);

    if (traningLine.author === guess.author) {
      traning.lines.forEach((t) => {
        if (t.author === guess.author) {
          // eslint-disable-next-line no-param-reassign
          t.solver = this;
        }
      });

      msg.channel.send(
        translate('guessing.correct_guess', {
          person: guess.author,
        }),
      );
    } else {
      msg.channel.send(
        translate('guessing.incorrect_guess', {
          person: guess.author,
        }),
      );
    }

    return !!traningLine.solver;
  }

  toJSON() {
    return { ...this };
  }
}

module.exports = Guesser;
