const { client, commands } = require('./client');
const Collection = require('./classes/Collection');
const Traning = require('./classes/Traning');
const Guess = require('./classes/Guess');
const Guesser = require('./classes/Guesser');
const TraningLine = require('./classes/TraningLine');
const translate = require('./translator/translate');

const collection = new Collection('data/traninge.json');
collection.load();

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const command = commands[interaction.commandName];

  if (!command) {
    interaction.reply(
      translate('error.command.not_found', {
        command: interaction.commandName,
      }),
    );

    return;
  }

  command.execute(interaction, collection);
});

client.on('messageCreate', async (msg) => {
  if (msg.author.id === client.user.id) {
    return;
  }

  const { content, channelId, channel } = msg;

  if (
    Guess.isGuess(content) &&
    channel.isThread() &&
    collection.has(channelId)
  ) {
    // @ts-ignore
    const guesser = new Guesser(msg.author);
    const traning = collection.get(channelId);
    const isSolved = guesser.guess(msg, traning);

    if (isSolved) {
      collection.set(channelId, traning);

      const starterMessage = await channel.fetchStarterMessage();

      if (starterMessage.editable) {
        starterMessage.edit(Traning.format(traning));
      }
    }
  } else if (TraningLine.isTraningLine(content)) {
    if (msg.deletable) {
      msg.delete();
    }

    const traning = new Traning(content, msg.author);

    traning.parse();

    const starterMessage = await channel.send(Traning.format(traning));

    const thread = await starterMessage.startThread({
      name: translate('guessing.thread_title'),
      autoArchiveDuration: 'MAX',
    });

    collection.set(thread.id, traning);
  }

  collection.sync();
});
