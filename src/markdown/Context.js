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
    this.cachedString = '';
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
    return this.contents.map((content) => content.toString()).join('\n');
  }

  toJSON() {
    return { ...this };
  }
}

module.exports = Context;
