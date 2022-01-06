const fs = require('fs');
const Context = require('./markdown/Context');
const storage = require('../data/storage.json');

class Storage {
  constructor() {
    this.loadedStorage = {};
    this.json = storage;

    Object.keys(storage).forEach((key) => {
      this.loadedStorage[key] = new Context(storage[key].raw);
    });
  }

  save() {
    fs.writeFileSync('data/storage.json', JSON.stringify(this.json, null, 2));
  }

  add(id, ctx) {
    this.loadedStorage[id] = ctx;
    this.json[id] = ctx.toJSON();
  }

  get(id) {
    return this.loadedStorage[id];
  }
}

module.exports = Storage;
