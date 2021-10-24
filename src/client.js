const { Client, Collection } = require('discord.js');
const fs = require('fs');
const { token } = require('../config.json');

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
  partials: ['CHANNEL'],
});

const commands = new Collection();
const commandFiles = fs.readdirSync('./commands');

commandFiles.forEach((file) => {
  // eslint-disable-next-line global-require
  const command = require(`../commands/${file}`);

  commands.set(command.data.name, command);
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
