module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'no-underscore-dangle': 'off',
    'generator-star-spacing': 'off',
  },
};
