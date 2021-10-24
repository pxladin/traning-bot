const { Client } = require('discord.js');

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
  partials: ['CHANNEL'],
});

client.on('ready', ({ user, guilds }) => {
  const message = `
User -> ${user.tag}
Guilds -> ${guilds.cache.size}
`;

  console.debug(message.trim());
});

module.exports = client;
