const translations = require('../../resources/translations');

const REPLACER_PREFIX = ':';

/**
 * Translates a key into a string.
 *
 * @param {string} key The translation key.
 * @param {Object<string, any>} [replacer] An object of strings to replace with given values.
 *
 * @returns {string} The translation.
 */
module.exports = (key, replacer) => {
  let translation = translations[key];

  if (Array.isArray(translation)) {
    translation = translation[Math.floor(Math.random() * translations.length)];
  }

  if (replacer) {
    Object.keys(replacer).forEach((k) => {
      let value = replacer[k];

      if (Array.isArray(value)) {
        value = value.join(', ');
      }

      translation = translation.replace(REPLACER_PREFIX + k, value);
    });
  }

  return translation;
};
