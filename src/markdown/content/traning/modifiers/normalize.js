module.exports = (traning) => {
  traning.quote.value = traning.quote.value.trim().replace(/\s+/g, ' ');
};
