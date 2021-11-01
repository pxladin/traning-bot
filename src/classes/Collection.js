const _ = require('lodash');
const fs = require('fs');
const path = require('path');

class Collection {
  /**
   * @param {string} file The relative path to the storage file.
   */
  constructor(file) {
    /**
     * The path to the storage file.
     */
    this.path = path.resolve(process.cwd(), file);
    /**
     * The JSON data of the storage file.
     */
    this.traninge = {};
  }

  /**
   * @param {string} id The ID of the traning.
   * @returns {boolean} Whether the collection has the traning with given ID.
   */
  has(id) {
    return _.has(this.traninge, id);
  }

  /**
   * @param {string} id The ID of the traning.
   * @returns {object} The traning associated with the given ID.
   */
  get(id) {
    return this.traninge[id];
  }

  /**
   * @param {string} id The ID of the traning.
   */
  set(id, traning) {
    this.traninge[id] = traning;
  }

  /**
   * Reads the JSON data of the storage file.
   * @returns {string} The content of the storage file.
   */
  read() {
    return fs.readFileSync(this.path, { encoding: 'utf8' });
  }

  /**
   * Pulls all the values from the storage file.
   */
   load() {
    this.traninge = JSON.parse(this.read());
  }

  /**
   * Syncs the collection with the storage file.
   */
  sync() {
    fs.writeFileSync(this.path, JSON.stringify(this.toJSON(), null, 2));
    this.load();
  }

  random() {
    if (!_.size(this.traninge)) {
      return null;
    }

    const key = _.sample(Object.keys(this.traninge));
    const traning = this.traninge[key];

    return Object.values(traning);
  }

  toJSON() {
    return { ...this.traninge };
  }
}

module.exports = Collection;
