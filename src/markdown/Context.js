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
      if (!content.HIDE) {
        filteredContents.push(content);
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
    return { ...this };
  }
}

module.exports = Context;
