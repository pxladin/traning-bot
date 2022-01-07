const Traning = require('../../content/Traning');

module.exports = (ctx) => {
  ctx.contents.forEach((content) => {
    if (content instanceof Traning) {
      ctx.storage.authors[content.authorId - 1].decrypt();
    }
  });
};
