const { Client, Intents } = require('discord.js');
const commands = require('./commands');
const { token } = require('../config.json');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ['CHANNEL'],
});

client.on('ready', ({ user, guilds }) => {
  const message = `
User -> ${user.tag}
Guilds -> ${guilds.cache.size}
`;

  console.debug(message.trim());
});

client.login(token);

module.exports = {
  client,
  commands,
};
