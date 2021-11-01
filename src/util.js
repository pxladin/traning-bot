module.exports = {
  /**
   * Generates an ID.
   * @generator
   */
  *IDGenerator() {
    let id = 0;

    while (true) {
      id += 1;

      yield id;
    }
  },
};
