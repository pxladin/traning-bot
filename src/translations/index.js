const fs = require('fs');
const yaml = require('yaml');

module.exports = yaml.parse(
  fs.readFileSync(`${__dirname}/messages.yaml`, 'utf-8'),
);
