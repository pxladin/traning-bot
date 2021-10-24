module.exports = {
  /**
   * Checks if `prop` exists in `obj`. This excludes the prototype chain.
   *
   * @param {object} obj The target object.
   * @param {string} prop The property to look for.
   *
   * @returns {boolean} Whether `prop` exists in `obj`.
   */
  has(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  },

  /**
   * Converts a map into an object.
   * @param {Map} map The map to convert.
   * @returns {object} The converted map.
   */
  mapToObject(map) {
    const obj = {};

    map.forEach((value, key) => {
      obj[key] = value;
    });

    return obj;
  },

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
