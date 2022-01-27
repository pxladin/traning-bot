module.exports = (ctx) => {
  const { storage } = ctx;

  if (storage.authors) {
    storage.authors.forEach((author) => {
      author.decrypt();
    });
  }
};
