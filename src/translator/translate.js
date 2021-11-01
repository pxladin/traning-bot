const _ = require('lodash');
const translations = require('./translations');

const REPLACER_PREFIX = ':';

/**
 * Translates a key into a string.
 *
 * @param {string} key The translation key.
 * @param {Object<string, any> | null} replacer An object of strings to replace with given values.
 *
 * @returns {string} The translation.
 */
module.exports = (key, replacer = null) => {
  let translation = _.get(translations, key);

  if (Array.isArray(translation)) {
    translation = _.sample(translation);
  }

  if (replacer) {
    Object.keys(replacer).forEach((k) => {
      translation = translation.replace(REPLACER_PREFIX + k, replacer[k]);
    });
  }

  return translation;
};
