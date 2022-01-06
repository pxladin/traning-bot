const Author = require('./traning/Author');
const BaseContent = require('./BaseContent');
const modifierHandlers = require('./traning/modifiers');
const Quote = require('./traning/Quote');

class Traning extends BaseContent {
  static get IS_SOLVABLE() {
    return true;
  }

  parse(raw) {
    const { storage } = this.ctx;

    if (!storage.authors) {
      storage.authors = [];
    }

    const { authors } = storage;

    const {
      author: authorName,
      modifiers,
      quote,
    } = this.extractGroups(raw, 'traning');

    let author;
    let authorIndex = authors.findIndex(
      (a) => a.name === authorName.toUpperCase(),
    );

    if (authorIndex === -1) {
      author = new Author(authorName);
      authorIndex = authors.push(author) - 1;
    } else {
      author = authors[authorIndex];
    }

    this.authorId = authorIndex;
    this.quote = new Quote(quote);

    this.modifiers = [];
    const invalidModifiers = [];

    if (modifiers) {
      Array.from(modifiers).forEach((modifier) => {
        const handle = modifierHandlers[modifier];

        if (handle) {
          this.modifiers.push(modifier);
          handle(this.quote, author);
        } else {
          invalidModifiers.push(modifier);
        }
      });

      if (invalidModifiers.length > 0) {
        this.ctx.messageQueue.push(
          `Unknown modifier(s): ${invalidModifiers.join(', ')}`,
        );
      }
    }

    return this;
  }

  toString() {
    const { authors } = this.ctx.storage;
    const author = authors[this.authorId];
    let quote = this.quote.toString();

    authors.forEach(({ name: authorName, decrypted }, index) => {
      const nameRegex = new RegExp(`<${authorName}>`, 'gi');

      if (nameRegex.test(quote)) {
        let replacer;

        if (decrypted) {
          replacer = authorName;
        } else {
          replacer = `<${index + 1}>`;
        }

        quote = quote.replace(nameRegex, replacer);
      }
    });

    return [author.decrypted ? author.name : this.authorId + 1, quote].join(
      ': ',
    );
  }
}

module.exports = Traning;
