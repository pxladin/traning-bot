const fs = require('fs');
const scopes = require('../../data/scopes.json');
const translate = require('../modules/translator/translate');

module.exports = (client, message) => {
  const { guildId } = message;
  const hasScope = scopes[guildId];

  if (hasScope) {
    delete scopes[guildId];
  } else {
    scopes[guildId] = message.channelId;
  }

  fs.writeFileSync('data/scopes.json', JSON.stringify(scopes, null, 2));

  message.channel.send(
    translate(hasScope ? 'info.aim_removed' : 'info.aim_added'),
  );
};
