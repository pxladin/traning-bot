const fs = require('fs');
const Context = require('./markdown/Context');
const storage = require('../data/storage.json');

class Storage {
  constructor() {
    this.values = {};
    this.json = storage;

    Object.keys(storage).forEach((key) => {
      this.values[key] = Context.fromJSON(storage[key]);
    });
  }

  save() {
    fs.writeFileSync('data/storage.json', JSON.stringify(this.json, null, 2));
  }

  set(id, ctx) {
    this.values[id] = ctx;
    this.json[id] = ctx.toJSON();

    this.save();

    return this;
  }

  /**
   * @returns {Context}
   */
  get(id) {
    return this.values[id];
  }
}

module.exports = Storage;
