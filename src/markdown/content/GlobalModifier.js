const BaseContent = require('./BaseContent');
const globalModifierHandlers = require('./global-modifer/index');

class GlobalModifier extends BaseContent {
  parse(raw) {
    const { content } = this.extractGroups(
      raw.replace(/ +/g, ' '),
      'globalmodifier',
    );

    this.content = content;
    const invalidModifiers = [];

    Array.from(this.content).forEach((modifier) => {
      const handleModifier = globalModifierHandlers[modifier.toLowerCase()];

      if (handleModifier) {
        handleModifier(this.ctx);
      } else {
        invalidModifiers.push(modifier);
      }
    });

    if (invalidModifiers.length > 0) {
      this.ctx.messageQueue.push(
        `Unknown global modifier: ${invalidModifiers.join(', ')}`,
      );
    }

    return this;
  }
}

module.exports = GlobalModifier;
