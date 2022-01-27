module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['regexp'],
  extends: ['prettier', 'problems'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-console': 'warn',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    strict: 'off',
  },
};
