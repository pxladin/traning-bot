const ContentTypes = require('./content');

/* eslint-disable */
const BaseContent = require('./content/BaseContent');
/* eslint-enable */

class Context {
  /**
   * @param {string} string - The raw string.
   */
  constructor(string) {
    this.raw = string;
    /**
     * @type {Array<BaseContent>}
     */
    this.contents = [];
    this.messageQueue = [];
    this.storage = {};
    this.metaData = {};
  }

  parse() {
    this.raw.split(/\n+/).forEach((line) => {
      if (!line) {
        return;
      }

      Object.values(ContentTypes).forEach((ContentType) => {
        if (ContentType.is(line)) {
          const content = new ContentType(this).parse(line);

          this.contents.push(content);
        }
      });
    });

    return this;
  }

  toString() {
    const filteredContents = [];

    this.contents.forEach((content) => {
      const string = content.toString();

      if (string) {
        filteredContents.push(string);
      }
    });

    let contextString = filteredContents.join('\n');

    if (this.storage.authors) {
      this.storage.authors.forEach(({ name: authorName, decrypted }, index) => {
        const nameRegex = new RegExp(`<${authorName}>`, 'gi');

        if (nameRegex.test(contextString)) {
          let replacer;

          if (decrypted) {
            replacer = authorName;
          } else {
            replacer = `<${index + 1}>`;
          }

          contextString = contextString.replace(nameRegex, replacer);
        }
      });
    }

    return contextString;
  }

  toJSON() {
    const copy = { ...this };

    // @ts-ignore
    copy.contents = copy.contents.map((content) => content.toString());

    delete copy.messageQueue;

    return copy;
  }

  static fromJSON(data) {
    const ctx = new Context(data.raw).parse();

    ctx.metaData = data.metaData;
    ctx.storage = data.storage;

    return ctx;
  }
}

module.exports = Context;
