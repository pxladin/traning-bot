const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Returns a random traning.'),
  async execute(interaction, traninge) {
    const randomTraning = traninge.random();

    if (randomTraning) {
      interaction.reply({ content: randomTraning, ephemeral: true });
    }
  },
};
