const ContentTypes = require('./content');

/* eslint-disable */
const BaseContent = require('./content/BaseContent');
const Author = require('./content/traning/Author');
/* eslint-enable */

class Context {
  /**
   * @param {string} string - The raw string.
   */
  constructor(string) {
    this.raw = string;
    /**
     * @type {Array<Author>}
     */
    this.authors = [];
    /**
     * @type {Array<BaseContent>}
     */
    this.contents = [];
    this.storage = {};
    this.solved = false;
    this.cachedString = '';
  }

  parse() {
    this.raw.split(/\n+/).forEach((line) => {
      if (!line) {
        return;
      }

      Object.values(ContentTypes).forEach((ContentType) => {
        if (ContentType.is(line)) {
          const content = new ContentType(this, line).parse();

          this.contents.push(content);
        }
      });
    });
console.log(this.contents);
    return this;
  }

  toJSON() {
    return { ...this };
  }
}

module.exports = Context;
