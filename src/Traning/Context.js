/*  eslint-disable no-unused-vars */
const { Message } = require('discord.js');
/*  eslint-enable no-unused-vars */

const Traning = require('./Traning');
const util = require('../util');

/**
 * Represents a full traning with complete context.
 */
class Context {
  /**
   * @param {Message} msg The message structure containing the traning context.
   */
  constructor(msg) {
    /**
     * The message structure containing the traning.
     */
    this.msg = msg;
    /**
     * The raw string containing the traning context.
     */
    this.raw = msg.content;
    /**
     * The parent channel of the message.
     */
    this.parent = msg.channel;
    /**
     * The user who sent the message.
     */
    this.user = msg.author;
    /**
     * An array containing all the traninge.
     * @type {Traning[]}
     */
    this.traninge = [];
    /**
     * A set containg the authors of the traninge in the context.
     * @type {Set<string>}
     */
    this.authors = new Set();
    /**
     * UNIX timestamp of when the traning was created.
     */
    this.createdAt = Date.now();
  }

  /**
   * Gets a traning using the ID.
   * If no ID is provided, then the most recent unsolved traning is returned.
   *
   * @param {string} id The ID of the traning.
   *
   * @return {Traning} The traning with the ID or the most recent unsolved traning.
   */
  fetch(id) {
    if (id) {
      return this.traninge.find((t) => t.id === id);
    }

    return this.traninge.find((t) => !t.solved);
  }

  /**
   * Parses the traninge from the context's message.
   */
  parse() {
    const IDGenerator = util.IDGenerator();

    this.raw.split(/\n+/).forEach((line) => {
      if (!Traning.isTraning(line)) {
        return;
      }

      const traning = new Traning(line).clean();
      const { author } = traning;

      if (!this.authors.has(author)) {
        traning.id = String(IDGenerator.next().value);

        this.authors.add(author);
      } else {
        traning.id = String([...this.authors.values()].indexOf(author) + 1);
      }

      this.traninge.push(traning);
    });

    return this;
  }

  /**
   * Turns the context into a readable string
   * and replaces the author's acronyms with their ID.
   *
   * @param {string[]} exclude An array of traning authors to exclude.
   */
  encrypt(exclude = []) {
    return this.traninge
      .map((traning) => {
        if (exclude.includes(traning.author)) {
          return traning.format();
        }

        return traning
          .format()
          .replaceAll(traning.author.toUpperCase(), traning.id);
      })
      .join('\n');
  }

  /**
   * Fetches all traninge in the context and checks if they are solved.
   * If a traning is solved, then the thread starter message will be edited by
   * replacing the author ID with the real name.
   */
  sync() {
    const starterMsg = this.threadStarterMessage;
    const solvedTraninge = this.traninge
      .filter((traning) => traning.solved)
      .map((traning) => traning.author);

    if (starterMsg.editable) {
      starterMsg.edit(this.encrypt([...solvedTraninge]));
    }
  }

  /**
   * Starts a thread that allows users to guess the authors of the traning.
   */
  async startGuessThread() {
    this.threadStarterMessage = await this.msg.channel.send(this.encrypt());

    this.thread = await this.threadStarterMessage.startThread({
      name: 'Guess the dropper(s) of the traning.',
      autoArchiveDuration: 60,
    });
  }

  toJSON() {
    return {
      createdAt: this.createdAt,
      user: {
        tag: this.user.tag,
        id: this.user.id,
      },
      traninge: this.traninge,
    };
  }
}

module.exports = Context;
