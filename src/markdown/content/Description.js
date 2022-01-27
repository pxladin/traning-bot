const BaseContent = require('./BaseContent');

class Description extends BaseContent {
  parse(raw) {
    const { content } = this.extractGroups(
      raw.replace(/ +/g, ' '),
      'description',
    );

    this.content = content;

    return this;
  }

  toString() {
    return `Kontext: ${this.content}`;
  }
}

module.exports = Description;
