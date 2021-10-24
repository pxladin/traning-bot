const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { token, clientId, guildId } = require('../config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands');

commandFiles.forEach((file) => {
  // eslint-disable-next-line global-require
  const command = require(`../commands/${file}`);

  commands.push(command.data.toJSON());
});

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  await rest
    .put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    })
    .then(() => {
      console.log('Successfully registered application commands.');
    })
    .catch(console.error);
})();
