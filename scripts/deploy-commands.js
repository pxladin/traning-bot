const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('../config.json');

const commands = [];
const commandFiles = require('../commands');

Object.values(commandFiles).forEach((command) => {
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
