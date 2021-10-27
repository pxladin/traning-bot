const _ = require('lodash');
const translations = require('./translations');

const REPLACER_PREFIX = ':';

/**
 * Translates a key into a string.
 *
 * @param {string} key The translation key.
 * @param {Object<string, any>} replacer An object of strings to replace with given values.
 *
 * @returns {string} The translation.
 */
module.exports = (key, replacer = {}) => {
  let msg = _.get(translations, key);

  if (Array.isArray(msg)) {
    msg = _.sample(msg);
  }

  if (replacer) {
    Object.keys(replacer).forEach((k) => {
      msg = msg.replace(REPLACER_PREFIX + k, replacer[k]);
    });
  }

  return msg;
};
