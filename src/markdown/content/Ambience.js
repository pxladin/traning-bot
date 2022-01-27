const BaseContent = require('./BaseContent');

class Ambience extends BaseContent {
  parse(raw) {
    const { content } = this.extractGroups(raw.replace(/ +/g, ' '), 'ambience');

    this.content = content;

    return this;
  }

  toString() {
    return `*${this.content}*`;
  }
}

module.exports = Ambience;
