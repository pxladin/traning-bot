const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const Context = require('./Context');
/*  eslint-disable no-unused-vars */
const Guesser = require('../Guessing/Guesser');
/*  eslint-enable no-unused-vars */

const util = require('../util');

class Collection {
  /**
   * @param {string} file The relative path to the storage file.
   */
  constructor(file) {
    /**
     * The path to the storage file.
     */
    this.path = path.resolve(process.cwd(), '..', file);
    /**
     * Modifiable traning contexts mapped by their thread ID.
     * @type {Object<string, any>}
     */
    this.traninge = {};
    /**
     * The JSON data of the storage file.
     */
    this.json = {};
    /**
     * A map containing guessers to made at least 1 guess for a traning context.
     * @type {Map<string, Guesser>}
     */
    this.guessers = new Map();
  }

  /**
   * @param {string} id The ID of the traning context.
   * @returns {boolean} Whether the collection has the traning context with given ID.
   */
  has(id) {
    return util.has(this.traninge, id);
  }

  /**
   * @param {string} id The ID of the traning context.
   * @returns {Context} The traning context associated with the given ID.
   */
  get(id) {
    return this.traninge[id];
  }

  /**
   * @param {string} id The ID of the traning context.
   * @param {Context} context The traning context.
   */
  set(id, context) {
    this.traninge[id] = context;
  }

  /**
   * Reads the JSON data of the storage file.
   * @returns {string} The content of the storage file.
   */
  read() {
    return fs.readFileSync(this.path, { encoding: 'utf8' });
  }

  /**
   * Syncs the collection with the storage file.
   * @returns The current collection instance.
   */
  sync() {
    fs.writeFileSync(this.path, JSON.stringify(this.toJSON(), null, 2));
    this.load();
  }

  /**
   * Loads the JSON object from the storage file.
   * @returns The current collection instance.
   */
  load() {
    this.json = JSON.parse(this.read());

    return this;
  }

  random() {
    const key = _.sample(Object.keys(_.omit(this.json, 'guessers')));

    return Context.format(this.json[key]);
  }

  toJSON() {
    const traninge = {};

    Object.keys(this.traninge).forEach((key) => {
      traninge[key] = this.get(key).toJSON();
    });

    this.json.guessers = util.mapToObject(this.guessers);

    return {
      ...this.json,
      ...traninge,
    };
  }
}

module.exports = Collection;
