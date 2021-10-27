const { SlashCommandBuilder } = require('@discordjs/builders');
const translate = require('../src/translator/translate');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Returns a random traning.'),
  async execute(interaction, traninge) {
    const randomTraning = traninge.random();

    if (randomTraning) {
      interaction.reply({ content: randomTraning, ephemeral: true });
    } else {
      interaction.reply({ content: translate('error.command.random.no_traning'), ephemeral: true });
    }
  },
};
