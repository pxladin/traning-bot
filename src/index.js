const { token } = require('../config.json');
const client = require('./client');
const Collection = require('./Traning/Collection');
const Context = require('./Traning/Context');
const Guess = require('./Guessing/Guess');
const Guesser = require('./Guessing/Guesser');
const Traning = require('./Traning/Traning');

const collection = new Collection('data/traninge.json');
collection.load();

client.on('messageCreate', async (msg) => {
  if (msg.author.id === client.user.id) {
    return;
  }

  const { content, channelId } = msg;

  if (Guess.isGuess(content) || Traning.isTraning(content)) {
    if (collection.has(channelId)) {
      if (!collection.guessers.has(msg.author.id)) {
        collection.guessers.set(msg.author.id, new Guesser(msg.author));
      }

      const guesser = collection.guessers.get(msg.author.id);
      const context = collection.get(channelId);
      const isSolved = guesser.guess(msg, context);

      if (isSolved) {
        collection.set(channelId, context);
        context.sync();
      }
    }

    if (Traning.isTraning(content)) {
      if (msg.deletable) {
        msg.delete();
      }

      const context = new Context(msg);

      context.parse();
      await context.startGuessThread();
      collection.set(context.thread.id, context);
    }

    collection.sync();
  }
});

client.login(token);
