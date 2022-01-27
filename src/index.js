const { client, commands } = require('./client');
const { prefix } = require('../config.json');
const Context = require('./markdown/Context');
const Traning = require('./markdown/content/Traning');
const scopes = require('../data/scopes.json');
const storage = require('./global/storage');

client.on('messageCreate', (message) => {
  if (message.author.id === client.user.id) {
    return;
  }

  const { content, channel, author } = message;

  if (content.startsWith(prefix)) {
    const [command, ...args] = content.slice(prefix.length).split(/ +/g);

    commands[command]?.call(null, client, message, args);
  } else if (scopes[message.guildId] === message.channelId) {
    const ctx = new Context(content).parse();

    if (ctx.contents.length > 0) {
      message.delete();

      ctx.metaData = {
        id: message.id,
        channelId: channel.id,
        timestamp: Date.now(),
        submitter: {
          id: author.id,
          name: author.tag,
        },
      };

      ctx.messageQueue.forEach((msg) => void channel.send(msg));

      channel.send(ctx.toString()).then((message) => {
        message
          .startThread({
            name: 'Guess the dropper(s) of the traning.',
            autoArchiveDuration: 'MAX',
          })
          .then((channel) => {
            storage.set(channel.id, ctx);
          });
      });
    }
  } else if (channel.isThread() && storage.get(channel.id)) {
    const ctx = storage.get(channel.id);

    if (ctx.storage.authors.length > 0) {
      const guess = content.trim();
      const author = ctx.storage.authors.find(
        (author) => author.name.toLowerCase() === guess,
      );

      if (author) {
        author.decrypt();
        author.metaData = {
          solvedAt: Date.now(),
          solver: {
            author: message.author.tag,
            id: message.author.id,
          },
        };
      } else if (/\d+ *: *\w+/.test(guess)) {
        const [id, name] = guess.split(/ *: */g);

        ctx.contents.forEach((content) => {
          if (
            content instanceof Traning &&
            content.authorId === parseInt(id, 10)
          ) {
            const author = ctx.storage.authors[content.authorId - 1];

            if (author.name === name) {
              author.decrypt();
              author.metaData = {
                solvedAt: Date.now(),
                solver: {
                  author: message.author.tag,
                  id: message.author.id,
                },
              };
            }
          }
        });
      }

      channel.fetchStarterMessage({ force: true }).then((message) => {
        message.edit(ctx.toString());
        storage.set(channel.id, ctx);
      });
    }
  }
});
