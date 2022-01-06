const Author = require('./traning/Author');
const BaseContent = require('./BaseContent');
const modifierHandlers = require('./traning/modifiers');
const Quote = require('./traning/Quote');
const regex = require('../regex');

class Traning extends BaseContent {
  static get IS_SOLVABLE() {
    return true;
  }

  parse() {
    this.ctx.authors = [];

    const { authors } = this.ctx;

    const {
      author: authorName,
      modifiers,
      quote,
    } = this.extractGroups(
      this.raw,
      regex[this.constructor.name.toLowerCase()],
    );

    let authorIndex = authors.findIndex((a) => a.name === authorName);

    if (authorIndex === -1) {
      authorIndex = this.ctx.authors.push(new Author(authorName)) - 1;
    }

    const author = this.ctx.authors[authorIndex];
    this.quote = new Quote(quote);

    author.quotes.push(this.quote);

    this.modifiers = [];

    if (modifiers) {
      Array.from(modifiers).forEach((modifier) => {
        const handle = modifierHandlers[modifier];

        if (handle) {
          this.modifiers.push(modifier);
          handle(this);
        }
      });
    }

    return this;
  }
}

module.exports = Traning;
