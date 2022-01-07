const { client, commands } = require('./client');
const { prefix } = require('../config.json');
const Context = require('./markdown/Context');
const scopes = require('../data/scopes.json');
const Storage = require('./Storage');

const storage = new Storage();

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

      channel.send(ctx.toString());
    }
  }
});
