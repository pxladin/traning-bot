const Author = require('./traning/Author');
const BaseContent = require('./BaseContent');
const modifierHandlers = require('./traning/modifiers');
const Quote = require('./traning/Quote');

class Traning extends BaseContent {
  IS_SOLVABLE = true;

  parse(raw) {
    const { storage } = this.ctx;

    if (!storage.authors) {
      storage.authors = [];
    }

    /**
     * @type {Array<Author>}
     */
    // eslint-disable-next-line prefer-destructuring
    const authors = storage.authors;

    const {
      author: authorName,
      modifiers,
      quote,
    } = this.extractGroups(raw, 'traning');

    this.quote = new Quote(quote);

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

    this.authorId = authorIndex + 1;

    if (modifiers) {
      this.modifiers = [];
      const invalidModifiers = [];

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
    const author = this.ctx.storage.authors[this.authorId - 1];
    const authorName = author.decrypted ? author.name : this.authorId;

    return `${authorName}: ${this.quote.toString()}`;
  }
}

module.exports = Traning;
